'use strict';

// update status bar
const updateStatus = (message) => {
    $("#info-window").html(message);
}

// load settings
const loadSettings = () => {
	chrome.storage.sync.get('webmastertool', function(settings) {
	  if(settings && settings.webmastertool) {
            // show/hide Vultr tab
            if(settings.webmastertool['show_vultr_tab']=='yes'){
                // make show vultr tab checkboxed ticked
                $("input#show_vultr_box").prop('checked', 'true');
                // show Vultr tab
                $("div#tabs ul li:eq(0)").css("display", "block");
            }else{
                // hide Vultr tab
                $("div#tabs ul li:eq(0)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 2 });
            }
            
            // show/hide DO tab
            if(settings.webmastertool['show_do_tab']=='yes'){
                // make show DO tab checkboxed ticked
                $("input#show_do_box").prop('checked', 'true');
                // show DO tab
                $("div#tabs ul li:eq(1)").css("display", "block");
            }else{
                // hide DO tab
                $("div#tabs ul li:eq(1)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 2 });
            }
            
            // Load Vultr API key to UI
            if(settings.webmastertool['vultr_api_key']) {
              $('input#vultr_api_key').val(settings.webmastertool['vultr_api_key']);
              
              // only show vultr tab if the vultr checkbox is ticked in settings
              if(settings.webmastertool['show_vultr_tab']=='yes'){
                  update_vultr_account_info(settings.webmastertool['vultr_api_key'],  'vultr-account');
                  update_vultr_server_info(settings.webmastertool['vultr_api_key'],   'vultr-server');
                  update_vultr_backup_info(settings.webmastertool['vultr_api_key'],   'vultr-backup');
                  update_vultr_snapshot_info(settings.webmastertool['vultr_api_key'], 'vultr-snapshot');
                  update_vultr_dns_info(settings.webmastertool['vultr_api_key'], 'vultr-dns');
              }
            }else{
              // hide vultr tab if API key is not present  
              $("div#tabs ul li:eq(0)").css("display", "none");  
              updateStatus("Empty Vultr API Key.");
            }

            // Load DO API key to UI
            if(settings.webmastertool['do_api_key']) {
              $('input#do_api_key').val(settings.webmastertool['do_api_key']);
              
              // only show DO tab if the DO checkbox is ticked in settings
              if(settings.webmastertool['show_do_tab']=='yes'){
                  update_do_account_info(settings.webmastertool['do_api_key'],  'do-account');
                  update_do_droplets_info(settings.webmastertool['do_api_key'], 'do-droplets');
                  update_do_snapshots_info(settings.webmastertool['do_api_key'], 'do-snapshots');
                  update_do_domains_info(settings.webmastertool['do_api_key'], 'do-domains');
                  update_do_sshkeys_info(settings.webmastertool['do_api_key'], 'do-sshkeys');
              }
            }else{
              // hide DO tab if DO API key is not present
              $("div#tabs ul li:eq(1)").css("display", "none");  
              updateStatus("Empty DO API Key.");
            }
	  }else{
        // set default value for UI elements  
	    $('input#vultr_api_key').val('YOUR_VULTR_API_KEY');
        $('input#do_api_key').val('YOUR_DO_API_KEY');
        $("div#tabs ul li:eq(0)").css("display", "none");
        $("div#tabs ul li:eq(1)").css("display", "none");
        $( "#tabs" ).tabs({ active: 2 });
        
        updateStatus("Cannot load settings.");
      }
	});
}

// save settings
const saveSettings = () => {
    let settings = {};
	
    // show/hide 'Vultr' tab
    if($('#show_vultr_box').is(":checked")) {
        // show vultr tab
        $("div#tabs ul li:eq(0)").css("display", "block");
        // save 'show vultr tab' option to settings
        settings['show_vultr_tab'] = 'yes';
    }else{
        // hide vultr tab
        $("div#tabs ul li:eq(0)").css("display", "none");
        // save 'show vultr tab' option to settings
        settings['show_vultr_tab'] = 'no';
    } 

    // show/hide 'DO' tab
    if($('#show_do_box').is(":checked")) {
        // show DO tab
        $("div#tabs ul li:eq(1)").css("display", "block");
        // save 'show DO tab' option to settings
        settings['show_do_tab'] = 'yes';
    }else{
        // hide DO tab
        $("div#tabs ul li:eq(1)").css("display", "none");
        // save 'show DO tab' option to settings
        settings['show_do_tab'] = 'no';
    }     
    
    if($('input#vultr_api_key').val() || $('input#do_api_key').val()) {
        // If API key is valid
        if($('input#vultr_api_key').val()) {
            // Save setting
            settings['vultr_api_key'] = $('input#vultr_api_key').val();

            // only update UI if 'show vultr box' is ticked
            if($('#show_vultr_box:checked').length > 0) {
                update_vultr_account_info($('input#vultr_api_key').val(),  'vultr-account');
                update_vultr_server_info($('input#vultr_api_key').val(),   'vultr-server');
                update_vultr_backup_info($('input#vultr_api_key').val(),   'vultr-backup');
                update_vultr_snapshot_info($('input#vultr_api_key').val(), 'vultr-snapshot');
                update_vultr_dns_info($('input#vultr_api_key').val(), 'vultr-dns');
            }
        }
          
        // If DO API key is valid
        if($('input#do_api_key').val()) {
            settings['do_api_key'] = $('input#do_api_key').val();
            
            // only update DO tab if show 'DO' checkbox is ticked
            if(($('#show_do_box:checked').length > 0)) {  
                $("div#tabs ul li:eq(1)").css("display", "block");
                                
                update_do_account_info($('input#do_api_key').val(),  'do-account');
                update_do_droplets_info($('input#do_api_key').val(), 'do-droplets');
                update_do_snapshots_info($('input#do_api_key').val(), 'do-snapshots');
                update_do_domains_info($('input#do_api_key').val(), 'do-domains');
                update_do_sshkeys_info($('input#do_api_key').val(), 'do-sshkeys');
            }else{
                // hide DO tab
                $("div#tabs ul li:eq(1)").css("display", "none");
            }    
        }
	}else{
        updateStatus('<span style="color:red;">Invalid API key.</span>');
    }
    
    chrome.storage.sync.set({ 
        'webmastertool': settings
    }, function() {
        updateStatus("Saved settings.");
    });
}

// when content loaded
document.addEventListener('DOMContentLoaded', function() {
    // init tabs
    $(function() {
        $( "#tabs" ).tabs();
        $("#vultr-div").accordion({ 
            heightStyle: "content" 
        });
        $("#do-div").accordion({
            heightStyle: "content"
        });
        // Load settings to UI
        loadSettings();
    });
    $('button#save_settings').click(function() {
        saveSettings();
    });

}, false);
