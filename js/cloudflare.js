'use strict';

const cloudflare_api_url = 'https://api.cloudflare.com/client/v4/';

// Load cloudflare user information
const update_cloudflare_user_info = (auth_email, api_key, div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'X-Auth-Email': auth_email,
              'X-Auth-Key':   api_key,
              'Content-Type': 'application/json'
            }
        };

        // Call cloudflare API to get user info
        fetch(cloudflare_api_url + 'user', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            // Construct HTML for user DIV in 'cloudflare' tab
            let user_html_block = '';
                
            user_html_block += '<div class="row">';
            user_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + data['result']['id'] + '</div>';
            user_html_block += '<div class="col-sm-4">Username</div><div class="col-sm-8">' + data['result']['username'] + '</div>';
            user_html_block += '<div class="col-sm-4">Created on</div><div class="col-sm-8">' + data['result']['created_on'] + '</div>';
            user_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + data['result']['first_name'] + ' ' + data['result']['last_name'] + '</div>';
            user_html_block += '<div class="col-sm-4">Phone</div><div class="col-sm-8">' + data['result']['telephone'] + '</div>';
            user_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + data['result']['email'] + '</div>';
            user_html_block += '<div class="col-sm-4">Postcode</div><div class="col-sm-8">' + data['result']['zipcode'] + '</div>';
            user_html_block += '<div class="col-sm-4">Country</div><div class="col-sm-8">' + data['result']['country'] + '</div>';
            user_html_block += '<div class="col-sm-4">Two factor authentication enabled</div><div class="col-sm-8">' + data['result']['two_factor_authentication_enabled'] + '</div>';

            user_html_block += '</div>';
                
            // Update user UI
            $("#" + div_id).html(user_html_block);
            // Update status bar
            updateStatus('Loaded account info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}
