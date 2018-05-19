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
            updateStatus('Loaded user info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load cloudflare domains information
const update_cloudflare_domains_info = (auth_email, api_key, domains_div_id, dns_div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'X-Auth-Email': auth_email,
              'X-Auth-Key':   api_key,
              'Content-Type': 'application/json'
            }
        };

        // Call cloudflare API to get domains info
        fetch(cloudflare_api_url + 'zones', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            // Construct HTML for domains DIV in 'cloudflare' tab
            let domains_html_block = '';
            let zone_ids = [];   // zone_ids array is used to make the second round API calls to get DNS records
            
            for(let d in data['result']){
              zone_ids.push(data['result'][d]['id']);    
              domains_html_block += '<div class="row divblock">';
              domains_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + data['result'][d]['name'] + '</div>';
              domains_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + data['result'][d]['id'] + '</div>';
              
              domains_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">';
              if (data['result'][d]['status'].trim()=='active') {
                domains_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
              }else{
                domains_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
              }
              domains_html_block += data['result'][d]['status'] + '</div>';

              domains_html_block += '<div class="col-sm-4">Created on</div><div class="col-sm-8">' + data['result'][d]['created_on'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Modified on</div><div class="col-sm-8">' + data['result'][d]['modified_on'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Name servers</div><div class="col-sm-8">' + data['result'][d]['name_servers'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Original name servers</div><div class="col-sm-8">' + data['result'][d]['original_name_servers'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Plan</div><div class="col-sm-8">' + data['result'][d]['plan']['name'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Plan price</div><div class="col-sm-8">' + data['result'][d]['plan']['price'] +  ' ' + data['result'][d]['plan']['currency'] +'</div>';
              
              domains_html_block += '</div>';
            }
            
            // Update domains UI
            $("#" + domains_div_id).html(domains_html_block);
            // Update status bar
            updateStatus('Loaded domains info.');
            return zone_ids;
        }).then(function(zone_ids) {  // pass zone_ids to make the second API call to retrieve DNS info
            update_cloudflare_dns_info(auth_email, api_key, options, zone_ids, dns_div_id);
            return zone_ids;
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load cloudflare DNS information
const update_cloudflare_dns_info = (auth_email, api_key, options, zone_ids, dns_div_id) => {
    if (api_key) {
        $("#" + dns_div_id).html('');    

        for(let i in zone_ids){
            // Call cloudflare API to get DNS info
            fetch(cloudflare_api_url + 'zones/' + zone_ids[i] + '/dns_records', options).then(function(response) {
              return response.json();
            }).then(function(data) {
                // Construct HTML for DNS DIV in 'DNS records' tab
                let dns_html_block = '';
            
                for(let d in data['result']){
                    dns_html_block += '<div class="row divblock">';
                    dns_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + data['result'][d]['zone_name'] + '</div>';
                    dns_html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8">' + data['result'][d]['type'] + '</div>';
                    dns_html_block += '<div class="col-sm-4">Record</div><div class="col-sm-8">' + data['result'][d]['name'] + '</div>';
                    dns_html_block += '<div class="col-sm-4">Content</div><div class="col-sm-8" style="word-wrap: break-word;">' + data['result'][d]['content'] + '</div>';
                    dns_html_block += '<div class="col-sm-4">Created on</div><div class="col-sm-8">' + data['result'][d]['created_on'] + '</div>';
                    dns_html_block += '<div class="col-sm-4">Modified on</div><div class="col-sm-8">' + data['result'][d]['modified_on'] + '</div>';
                    dns_html_block += '</div>';
                }
            
                // Update DNS records section
                $("#" + dns_div_id).html($("#" + dns_div_id).html()+dns_html_block);
                // Update status bar
                updateStatus('Loaded DNS info.');
            }).catch(function(err) {
                let html = '<span style="color:red;">Error: ' + err + '</span>';
                updateStatus(html);
            });        
        }
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}