'use strict';

// update status bar
const updateStatus = (message) => {
    $("#info-window").html(message);
}

// load settings
const loadSettings = () => {
	chrome.storage.sync.get('webmastertool', function(settings) {
		if(settings && settings.webmastertool) {
            $('input#vultr_api_key').val(settings.webmastertool['vultr_api_key']);
            if(settings.webmastertool['vultr_api_key']) {
                update_vultr_account_info(settings.webmastertool['vultr_api_key'],  'vultr-account');
                update_vultr_server_info(settings.webmastertool['vultr_api_key'],   'vultr-server');
                update_vultr_backup_info(settings.webmastertool['vultr_api_key'],   'vultr-backup');
                update_vultr_snapshot_info(settings.webmastertool['vultr_api_key'], 'vultr-snapshot');
                update_vultr_dns_info(settings.webmastertool['vultr_api_key'], 'vultr-dns');
            }else{
                updateStatus("Empty Vultr API Key.");
            }
		}else{
			$('input#vultr_api_key').val('YOUR_VULTR_API_KEY');
            updateStatus("Cannot load settings.");
		}
	});
}

// save settings
const saveSettings = () => {
	if($('input#vultr_api_key').val()) {
        let settings = {};
        settings['vultr_api_key'] = $('input#vultr_api_key').val();

        update_vultr_account_info($('input#vultr_api_key').val(),  'vultr-account');
        update_vultr_server_info($('input#vultr_api_key').val(),   'vultr-server');
        update_vultr_backup_info($('input#vultr_api_key').val(),   'vultr-backup');
        update_vultr_snapshot_info($('input#vultr_api_key').val(), 'vultr-snapshot');
        update_vultr_dns_info(settings.webmastertool['vultr_api_key'], 'vultr-dns');
                
        chrome.storage.sync.set({ 
            'webmastertool': settings
        }, function() {
            updateStatus("Saved settings.");
        });
	}else{
        updateStatus('<span style="color:red;">Invalid API key.</span>');
    }
}

// when content loaded
document.addEventListener('DOMContentLoaded', function() {
    // init tabs
    $(function() {
        $( "#tabs" ).tabs();
        $("#vultr-div").accordion({ 
            heightStyle: "content" 
        });
		
        loadSettings();
    });
	
	$('button#save_settings').click(function() {
        saveSettings();
    });

}, false);