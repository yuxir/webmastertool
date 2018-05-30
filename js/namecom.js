'use strict';

const namecom_api_url = 'https://api.name.com/v4/';

// Load Name.com domain information
const update_namecom_domains_info = (username, api_key, domains_div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'Authorization': 'Basic ' + btoa(username + ':' + api_key) 
            }
        };

        // Call Name.com API to get domains info
        fetch(namecom_api_url + 'domains', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            // Construct HTML for domains DIV in 'name.com' tab
            let domains_html_block = '';
            
            for(let d in data['domains']){
              domains_html_block += '<div class="row divblock">';
              domains_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + data['domains'][d]['domainName'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Created</div><div class="col-sm-8">' + data['domains'][d]['createDate'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Expires</div><div class="col-sm-8">' + data['domains'][d]['expireDate'] + '</div>';
              domains_html_block += '<div class="col-sm-4">Autorenew enabled</div><div class="col-sm-8">' + data['domains'][d]['autorenewEnabled'] + '</div>';
              domains_html_block += '</div>';
            }
            
            // Update domains UI
            $("#" + domains_div_id).html(domains_html_block);
            
            // Update status bar
            updateStatus('Loaded domains info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

