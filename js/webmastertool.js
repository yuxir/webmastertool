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
                update_account_info(settings.webmastertool['vultr_api_key'],  'vultr-account');
                update_server_info(settings.webmastertool['vultr_api_key'],   'vultr-server');
                update_backup_info(settings.webmastertool['vultr_api_key'],   'vultr-backup');
                update_snapshot_info(settings.webmastertool['vultr_api_key'], 'vultr-snapshot');
            }
		}else{
			$('input#vultr_api_key').val('YOUR_VULTR_API_KEY');
		}
	});
}

// save settings
const saveSettings = () => {
    let settings = {};
    settings['vultr_api_key'] = $('input#vultr_api_key').val();

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
        $( "#vultr-div" ).accordion();
        loadSettings();
    });

    $('button#save_settings').click(function() {
        saveSettings();
    });

}, false);
