'use strict';

// check vultr balance, and update notification icon if needed
const check_vultr_balance = () => {
    chrome.storage.sync.get('webmastertool', function(settings) {
        if(settings && settings.webmastertool && settings.webmastertool['vultr_api_key']) {
            let options = {
                method: 'GET',
                headers: {
                  "API-Key": settings.webmastertool['vultr_api_key']
                }
            };
            fetch('https://api.vultr.com/v1/account/info', options).then(function(response) {
              return response.json();
            }).then(function(data) {
                let balance = data['balance'];
                // if balance is low, show notifications
                if(balance >= 0) { // negtive balance means in credit
                    chrome.browserAction.setBadgeText({text: '!'});
                    chrome.browserAction.setBadgeBackgroundColor({color: "red"});
                }
            }).catch(function(err) {
                console.log(err);
            });    
        }
    });
}

// check Linode balance, and update notification icon if needed
const check_linode_balance = () => {
    chrome.storage.sync.get('webmastertool', function(settings) {
        if(settings && settings.webmastertool && settings.webmastertool['linode_api_key']) {
            let options = {
                method: 'GET',
                headers: {
                  "API-Key": settings.webmastertool['vultr_api_key']
                }
            };
            fetch('https://api.linode.com/v4/account', options).then(function(response) {
              return response.json();
            }).then(function(data) {
                let balance = data['balance'];
                // if balance is low, show notifications
                if(balance >= 0) {
                    chrome.browserAction.setBadgeText({text: '!'});
                    chrome.browserAction.setBadgeBackgroundColor({color: "red"});
                }
            }).catch(function(err) {
                console.log(err);
            });    
        }
    });
}

chrome.runtime.onInstalled.addListener(function() {
    check_vultr_balance();
    check_linode_balance();
});