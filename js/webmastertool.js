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
                // make 'show vultr tab' checkboxed ticked
                $("input#show_vultr_box").prop('checked', 'true');
                // show Vultr tab
                $("div#tabs ul li:eq(1)").css("display", "block");
            }else{
                // hide Vultr tab
                $("div#tabs ul li:eq(1)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }

            // show/hide DO tab
            if(settings.webmastertool['show_do_tab']=='yes'){
                // make 'show DO tab' checkboxed ticked
                $("input#show_do_box").prop('checked', 'true');
                // show DO tab
                $("div#tabs ul li:eq(2)").css("display", "block");
            }else{
                // hide DO tab
                $("div#tabs ul li:eq(2)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }

            // show/hide Linode tab
            if(settings.webmastertool['show_linode_tab']=='yes'){
                // make 'show linode tab' checkboxed ticked
                $("input#show_linode_box").prop('checked', 'true');
                // show linode tab
                $("div#tabs ul li:eq(3)").css("display", "block");
            }else{
                // hide linode tab
                $("div#tabs ul li:eq(3)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }

            // show/hide Heroku tab
            if(settings.webmastertool['show_heroku_tab']=='yes'){
                // make show Heroku tab checkboxed ticked
                $("input#show_heroku_box").prop('checked', 'true');
                // show Heroku tab
                $("div#tabs ul li:eq(4)").css("display", "block");
            }else{
                // hide Heroku tab
                $("div#tabs ul li:eq(4)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }

            // show/hide Cloudflare tab
            if(settings.webmastertool['show_cloudflare_tab']=='yes'){
                // make show cloudflare tab checkboxed ticked
                $("input#show_cloudflare_box").prop('checked', 'true');
                // show cloudflare tab
                $("div#tabs ul li:eq(5)").css("display", "block");
            }else{
                // hide cloudflare tab
                $("div#tabs ul li:eq(5)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }            
            
            // show/hide Namesilo tab
            if(settings.webmastertool['show_namesilo_tab']=='yes'){
                // make show Namesilo tab checkboxed ticked
                $("input#show_namesilo_box").prop('checked', 'true');
                // show Namesilo tab
                $("div#tabs ul li:eq(6)").css("display", "block");
            }else{
                // hide Namesilo tab
                $("div#tabs ul li:eq(6)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }
            
            // show/hide Name.com tab
            if(settings.webmastertool['show_namecom_box']=='yes'){
                // make show Name.com tab checkboxed ticked
                $("input#show_namecom_box").prop('checked', 'true');
                // show Name.com tab
                $("div#tabs ul li:eq(7)").css("display", "block");
            }else{
                // hide Name.com tab
                $("div#tabs ul li:eq(7)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }
            
            // show/hide Namecheap tab
            if(settings.webmastertool['show_namecheap_box']=='yes'){
                // make show namecheap tab checkboxed ticked
                $("input#show_namecheap_box").prop('checked', 'true');
                // show namecheap tab
                $("div#tabs ul li:eq(8)").css("display", "block");
            }else{
                // hide namecheap tab
                $("div#tabs ul li:eq(8)").css("display", "none");
                // make settings tab as default
                $( "#tabs" ).tabs({ active: 0 });
            }            
            
            // Load Vultr API key to UI
            if(settings.webmastertool['vultr_api_key']) {
              $('input#vultr_api_key').val(settings.webmastertool['vultr_api_key']);

              // only show vultr tab if the vultr checkbox is ticked in settings
              if(settings.webmastertool['show_vultr_tab']=='yes'){
                  update_vultr_account_info(settings.webmastertool['vultr_api_key'],  'vultr-account', 'dashboard-account-vultr');
                  update_vultr_server_info(settings.webmastertool['vultr_api_key'],   'vultr-server', 'dashboard-server-vultr');
                  update_vultr_backup_info(settings.webmastertool['vultr_api_key'],   'vultr-backup');
                  update_vultr_snapshot_info(settings.webmastertool['vultr_api_key'], 'vultr-snapshot');
                  update_vultr_dns_info(settings.webmastertool['vultr_api_key'], 'vultr-dns');
              }
            }else{
              // hide vultr tab if API key is not present
              $("div#tabs ul li:eq(1)").css("display", "none");
              updateStatus("Empty Vultr API Key.");
            }

            // Load DO API key to UI
            if(settings.webmastertool['do_api_key']) {
              $('input#do_api_key').val(settings.webmastertool['do_api_key']);

              // only show DO tab if the DO checkbox is ticked in settings
              if(settings.webmastertool['show_do_tab']=='yes'){
                  update_do_account_info(settings.webmastertool['do_api_key'],  'do-account');
                  update_do_droplets_info(settings.webmastertool['do_api_key'], 'do-droplets', 'dashboard-server-do');
                  update_do_snapshots_info(settings.webmastertool['do_api_key'], 'do-snapshots');
                  update_do_domains_info(settings.webmastertool['do_api_key'], 'do-domains');
                  update_do_sshkeys_info(settings.webmastertool['do_api_key'], 'do-sshkeys');
              }
            }else{
              // hide DO tab if DO API key is not present
              $("div#tabs ul li:eq(2)").css("display", "none");
              updateStatus("Empty DO API Key.");
            }

            // Load linode API key to UI
            if(settings.webmastertool['linode_api_key']) {
              $('input#linode_api_key').val(settings.webmastertool['linode_api_key']);

              // only show linode tab if the linode checkbox is ticked in settings
              if(settings.webmastertool['show_linode_tab']=='yes'){
                  update_linode_account_info(settings.webmastertool['linode_api_key'],  'linode-account', 'dashboard-account-linode');
                  update_linode_profile_info(settings.webmastertool['linode_api_key'],  'linode-profile');
                  update_linode_invoices_info(settings.webmastertool['linode_api_key'],  'linode-invoices');
                  update_linode_instances_info(settings.webmastertool['linode_api_key'],  'linode-instances', 'dashboard-server-linode');
              }
            }else{
              // hide linode tab if linode API key is not present
              $("div#tabs ul li:eq(3)").css("display", "none");
              updateStatus("Empty linode API Key.");
            }
            
            // Load Heroku API key to UI
            if(settings.webmastertool['heroku_api_key']) {
              $('input#heroku_api_key').val(settings.webmastertool['heroku_api_key']);
              
              // only show Heroku tab if the Heroku checkbox is ticked in settings
              if(settings.webmastertool['show_heroku_tab']=='yes'){
                  update_heroku_account_info(settings.webmastertool['heroku_api_key'],  'heroku-account');
                  update_heroku_invoices_info(settings.webmastertool['heroku_api_key'],  'heroku-invoices');
                  update_heroku_invoices_info(settings.webmastertool['heroku_api_key'],  'heroku-credits');
                  update_heroku_apps_info(settings.webmastertool['heroku_api_key'],  'heroku-apps', 'heroku-dynos', 'heroku-domains');
              }
            }else{
              // hide Heroku tab if Heroku API key is not present
              $("div#tabs ul li:eq(4)").css("display", "none");  
              updateStatus("Empty Heroku API Key.");
            }
            
            // Load cloudflare API key to UI
            if(settings.webmastertool['cloudflare_api_key']) {
              $('input#cloudflare_auth_email').val(settings.webmastertool['cloudflare_auth_email']);
              $('input#cloudflare_api_key').val(settings.webmastertool['cloudflare_api_key']);
              
              // only show cloudflare tab if the cloudflare checkbox is ticked in settings
              if(settings.webmastertool['show_cloudflare_tab']=='yes'){
                  update_cloudflare_user_info(settings.webmastertool['cloudflare_auth_email'], settings.webmastertool['cloudflare_api_key'], 'cloudflare-user');
                  update_cloudflare_domains_info(settings.webmastertool['cloudflare_auth_email'], settings.webmastertool['cloudflare_api_key'], 'cloudflare-domains','dashboard-domain-cloudflare','cloudflare-dns','cloudflare-rules');
                  
              }
            }else{
              // hide cloudflare tab if cloudflare API key is not present
              $("div#tabs ul li:eq(5)").css("display", "none");  
              updateStatus("Empty cloudflare API Key.");
            }     

            // Load Namesilo API key to UI
            if(settings.webmastertool['namesilo_api_key']) {
              $('input#namesilo_api_key').val(settings.webmastertool['namesilo_api_key']);
              
              // only show Namesilo tab if the Namesilo checkbox is ticked in settings
              if(settings.webmastertool['show_namesilo_tab']=='yes'){
                update_namesilo_user_info(settings.webmastertool['namesilo_api_key'],'namesilo-user');
                update_namesilo_balance(settings.webmastertool['namesilo_api_key'],'namesilo-balance','dashboard-account-namesilo');
                update_namesilo_domains_info(settings.webmastertool['namesilo_api_key'],'namesilo-domains','namesilo-dns','namesilo-emailforwards','dashboard-domain-namesilo');
              }
            }else{
              // hide Namesilo tab if Namesilo API key is not present
              $("div#tabs ul li:eq(6)").css("display", "none");  
              updateStatus("Empty Namesilo API Key.");
            }  

            // Load Name.com API key to UI
            if(settings.webmastertool['namecom_api_key']) {
              $('input#namecom_username').val(settings.webmastertool['namecom_username']);
              $('input#namecom_api_key').val(settings.webmastertool['namecom_api_key']);
              
              // only show name.com tab if the name.com checkbox is ticked in settings
              if(settings.webmastertool['show_namecom_box']=='yes'){
                  update_namecom_domains_info(settings.webmastertool['namecom_username'],settings.webmastertool['namecom_api_key'],'namecom-domains', 'namecom-dns','namecom-emailforwards','namecom-urlforwards');
              }
            }else{
              // hide namecom tab if name.com API key is not present
              $("div#tabs ul li:eq(7)").css("display", "none");  
              updateStatus("Empty name.com API Key.");
            }  

            // Load Namecheap API key to UI
            if(settings.webmastertool['namecheap_api_key']) {
              $('input#namecheap_username').val(settings.webmastertool['namecheap_username']);
              $('input#namecheap_api_key').val(settings.webmastertool['namecheap_api_key']);
              
              // only show namecheap tab if the namecheap checkbox is ticked in settings
              if(settings.webmastertool['show_namecheap_box']=='yes'){
                  //update_namecheap_domains_info(settings.webmastertool['namecheap_username'],settings.webmastertool['namecheap_api_key'],'namecheap-domains', 'namecheap-dns','namecheap-emailforwards','namecheap-urlforwards');
              }
            }else{
              // hide namecheap tab if namecheap API key is not present
              $("div#tabs ul li:eq(8)").css("display", "none");  
              updateStatus("Empty namecheap API Key.");
            }              
	  }else{
        // set default value for UI elements
	    $("div#tabs ul li:eq(1)").css("display", "none");  // hide vultr tab
        $("div#tabs ul li:eq(2)").css("display", "none");  // hide do tab
        $("div#tabs ul li:eq(3)").css("display", "none");  // hide linode tab
        $("div#tabs ul li:eq(4)").css("display", "none");  // hide heroku tab
        $("div#tabs ul li:eq(5)").css("display", "none");  // hide cloudflare tab
        $("div#tabs ul li:eq(6)").css("display", "none");  // hide namesilo tab
        $("div#tabs ul li:eq(7)").css("display", "none");  // hide namecom tab
        $("div#tabs ul li:eq(8)").css("display", "none");  // hide namecheap tab
        $( "#tabs" ).tabs({ active: 0 });

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
        $("div#tabs ul li:eq(1)").css("display", "block");
        // save 'show vultr tab' option to settings
        settings['show_vultr_tab'] = 'yes';
    }else{
        // hide vultr tab
        $("div#tabs ul li:eq(1)").css("display", "none");
        // save 'show vultr tab' option to settings
        settings['show_vultr_tab'] = 'no';
    } 

    // show/hide 'DO' tab
    if($('#show_do_box').is(":checked")) {
        // show DO tab
        $("div#tabs ul li:eq(2)").css("display", "block");
        // save 'show DO tab' option to settings
        settings['show_do_tab'] = 'yes';
    }else{
        // hide DO tab
        $("div#tabs ul li:eq(2)").css("display", "none");
        // save 'show DO tab' option to settings
        settings['show_do_tab'] = 'no';
    }  

    // show/hide 'linode' tab
    if($('#show_linode_box').is(":checked")) {
        // show linode tab
        $("div#tabs ul li:eq(3)").css("display", "block");
        // save 'show linode tab' option to settings
        settings['show_linode_tab'] = 'yes';
    }else{
        // hide linode tab
        $("div#tabs ul li:eq(3)").css("display", "none");
        // save 'show linode tab' option to settings
        settings['show_linode_tab'] = 'no';
    }
    
    // show/hide 'Heroku' tab
    if($('#show_heroku_box').is(":checked")) {
        // show Heroku tab
        $("div#tabs ul li:eq(4)").css("display", "block");
        // save 'show Heroku tab' option to settings
        settings['show_heroku_tab'] = 'yes';
    }else{
        // hide Heroku tab
        $("div#tabs ul li:eq(4)").css("display", "none");
        // save 'show Heroku tab' option to settings
        settings['show_heroku_tab'] = 'no';
    }  

    // show/hide 'cloudflare' tab
    if($('#show_cloudflare_box').is(":checked")) {
        // show cloudflare tab
        $("div#tabs ul li:eq(5)").css("display", "block");
        // save 'show cloudflare tab' option to settings
        settings['show_cloudflare_tab'] = 'yes';
    }else{
        // hide cloudflare tab
        $("div#tabs ul li:eq(5)").css("display", "none");
        // save 'show cloudflare tab' option to settings
        settings['show_cloudflare_tab'] = 'no';
    }      

    // show/hide 'Namesilo' tab
    if($('#show_namesilo_box').is(":checked")) {
        // show Namesilo tab
        $("div#tabs ul li:eq(6)").css("display", "block");
        // save 'show Namesilo tab' option to settings
        settings['show_namesilo_tab'] = 'yes';
    }else{
        // hide Namesilo tab
        $("div#tabs ul li:eq(6)").css("display", "none");
        // save 'show Namesilo tab' option to settings
        settings['show_namesilo_tab'] = 'no';
    }  

    // show/hide 'Name.com' tab
    if($('#show_namecom_box').is(":checked")) {
        // show Namecom tab
        $("div#tabs ul li:eq(7)").css("display", "block");
        // save 'show Name.com tab' option to settings
        settings['show_namecom_box'] = 'yes';
    }else{
        // hide Name.com tab
        $("div#tabs ul li:eq(7)").css("display", "none");
        // save 'show Name.com tab' option to settings
        settings['show_namecom_box'] = 'no';
    } 

    // show/hide 'namecheap' tab
    if($('#show_namecheap_box').is(":checked")) {
        // show namecheap tab
        $("div#tabs ul li:eq(8)").css("display", "block");
        // save 'show namecheap tab' option to settings
        settings['show_namecheap_box'] = 'yes';
    }else{
        // hide namecheap tab
        $("div#tabs ul li:eq(8)").css("display", "none");
        // save 'show namecheap tab' option to settings
        settings['show_namecheap_box'] = 'no';
    }     
    
    if($('input#vultr_api_key').val() || $('input#do_api_key').val() || $('input#linode_api_key').val() || $('input#heroku_api_key').val() || $('input#cloudflare_api_key').val() || $('input#namesilo_api_key').val() || $('input#namecom_api_key').val()) {
        // If API key is valid
        if($('input#vultr_api_key').val()) {
            // Save setting
            settings['vultr_api_key'] = $('input#vultr_api_key').val();

            // only update UI if 'show vultr box' is ticked
            if($('#show_vultr_box:checked').length > 0) {
                $("div#tabs ul li:eq(1)").css("display", "block");

                update_vultr_account_info($('input#vultr_api_key').val(),  'vultr-account', 'dashboard-account-vultr');
                update_vultr_server_info($('input#vultr_api_key').val(),   'vultr-server', 'dashboard-server-vultr');
                update_vultr_backup_info($('input#vultr_api_key').val(),   'vultr-backup');
                update_vultr_snapshot_info($('input#vultr_api_key').val(), 'vultr-snapshot');
                update_vultr_dns_info($('input#vultr_api_key').val(), 'vultr-dns');
            }else{
                // hide Vultr tab
                $("div#tabs ul li:eq(1)").css("display", "none");
            }   
        }

        // If DO API key is valid
        if($('input#do_api_key').val()) {
            settings['do_api_key'] = $('input#do_api_key').val();

            // only update DO tab if show 'DO' checkbox is ticked
            if(($('#show_do_box:checked').length > 0)) {  
                $("div#tabs ul li:eq(2)").css("display", "block");

                update_do_account_info($('input#do_api_key').val(),  'do-account');
                update_do_droplets_info($('input#do_api_key').val(), 'do-droplets', 'dashboard-server-do');
                update_do_snapshots_info($('input#do_api_key').val(), 'do-snapshots');
                update_do_domains_info($('input#do_api_key').val(), 'do-domains');
                update_do_sshkeys_info($('input#do_api_key').val(), 'do-sshkeys');
            }else{
                // hide DO tab
                $("div#tabs ul li:eq(2)").css("display", "none");
            }    
        }

        // If linode API key is valid
        if($('input#linode_api_key').val()) {
            settings['linode_api_key'] = $('input#linode_api_key').val();

            // only update linode tab if show 'linode' checkbox is ticked
            if(($('#show_linode_box:checked').length > 0)) {  
                $("div#tabs ul li:eq(3)").css("display", "block");
                update_linode_account_info($('input#linode_api_key').val(),  'linode-account', 'dashboard-account-linode'); 
                update_linode_profile_info($('input#linode_api_key').val(),  'linode-profile');  
                update_linode_invoices_info($('input#linode_api_key').val(),  'linode-invoices');
                update_linode_instances_info($('input#linode_api_key').val(),  'linode-instances', 'dashboard-server-linode');
            }else{
                // hide linode tab
                $("div#tabs ul li:eq(3)").css("display", "none");
            }    
        }
        
        // If Heroku API key is valid
        if($('input#heroku_api_key').val()) {
            settings['heroku_api_key'] = $('input#heroku_api_key').val();
            
            // only update Heroku tab if show 'Heroku' checkbox is ticked
            if(($('#show_heroku_box:checked').length > 0)) {  
                $("div#tabs ul li:eq(4)").css("display", "block");
                update_heroku_account_info($('input#heroku_api_key').val(),  'heroku-account');
                update_heroku_invoices_info($('input#heroku_api_key').val(),  'heroku-invoices');
                update_heroku_invoices_info($('input#heroku_api_key').val(),  'heroku-credits');
                update_heroku_apps_info($('input#heroku_api_key').val(),  'heroku-apps', 'heroku-dynos', 'heroku-domains');
            }else{
                // hide Heroku tab
                $("div#tabs ul li:eq(4)").css("display", "none");
            }    
        }    

        // If cloudflare API key is valid
        if($('input#cloudflare_api_key').val()) {
            settings['cloudflare_auth_email'] = $('input#cloudflare_auth_email').val();
            settings['cloudflare_api_key'] = $('input#cloudflare_api_key').val();
            
            // only update cloudflare tab if show 'cloudflare' checkbox is ticked
            if(($('#show_cloudflare_box:checked').length > 0)) {  
                $("div#tabs ul li:eq(5)").css("display", "block");
                update_cloudflare_user_info($('input#cloudflare_auth_email').val(), $('input#cloudflare_api_key').val(), 'cloudflare-user');
                update_cloudflare_domains_info($('input#cloudflare_auth_email').val(), $('input#cloudflare_api_key').val(), 'cloudflare-domains', 'dashboard-domain-cloudflare','cloudflare-dns','cloudflare-rules');
            }else{
                // hide cloudflare tab
                $("div#tabs ul li:eq(5)").css("display", "none");
            }    
        }  

        // If Namesilo API key is valid
        if($('input#namesilo_api_key').val()) {
            settings['namesilo_api_key'] = $('input#namesilo_api_key').val();
            
            // only update Namesilo tab if show 'Namesilo' checkbox is ticked
            if(($('#show_namesilo_box:checked').length > 0)) {  
                $("div#tabs ul li:eq(6)").css("display", "block");
                update_namesilo_user_info(settings['namesilo_api_key'], 'namesilo-user');
                update_namesilo_balance(settings['namesilo_api_key'], 'namesilo-balance','dashboard-account-namesilo');
                update_namesilo_domains_info(settings['namesilo_api_key'], 'namesilo-domains','namesilo-dns','namesilo-emailforwards','dashboard-domain-namesilo');
            }else{
                // hide Namesilo tab
                $("div#tabs ul li:eq(6)").css("display", "none");
            }    
        }   

        // If Name.com API key is valid
        if($('input#namecom_api_key').val()) {
            settings['namecom_api_key'] = $('input#namecom_api_key').val();
            settings['namecom_username'] = $('input#namecom_username').val();
                        
            // only update Name.com tab if show 'Name.com' checkbox is ticked
            if(($('#show_namecom_box:checked').length > 0)) { 
                $("div#tabs ul li:eq(7)").css("display", "block");
                update_namecom_domains_info(settings['namecom_username'],settings['namecom_api_key'],'namecom-domains', 'namecom-dns','namecom-emailforwards','namecom-urlforwards');
            }else{
                // hide Name.com tab
                $("div#tabs ul li:eq(7)").css("display", "none");
            }    
        }   

        // If namecheap API key is valid
        if($('input#namecheap_api_key').val()) {
            settings['namecheap_api_key'] = $('input#namecheap_api_key').val();
            settings['namecheap_username'] = $('input#namecheap_username').val();
                        
            // only update namecheap tab if show 'namecheap' checkbox is ticked
            if(($('#show_namecheap_box:checked').length > 0)) { 
                $("div#tabs ul li:eq(8)").css("display", "block");
                //update_namecheap_domains_info(settings['namecheap_username'],settings['namecheap_api_key'],'namecheap-domains', 'namecheap-dns','namecheap-emailforwards','namecheap-urlforwards');
            }else{
                // hide namecheap tab
                $("div#tabs ul li:eq(8)").css("display", "none");
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
        $("#linode-div").accordion({
            heightStyle: "content"
        });
        $("#heroku-div").accordion({
            heightStyle: "content"
        }); 
        $("#cloudflare-div").accordion({
            heightStyle: "content"
        }); 
        $("#namesilo-div").accordion({
            heightStyle: "content"
        }); 
        $("#namecom-div").accordion({
            heightStyle: "content"
        });  
        $("#namecheap-div").accordion({
            heightStyle: "content"
        });          
        // Load settings to UI
        loadSettings();
    });
    $('button#save_settings').click(function() {
        saveSettings();
    });

}, false);
