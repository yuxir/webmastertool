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
            let domains = []; 
            
            for(let d in data['domains']){
                domains.push(data['domains'][d]['domainName']);
            }
            return domains;            
        }).then(function(domains) {  // pass domains to make the second API call to retrieve domain details
            update_namecom_domains_details(options, domains, domains_div_id);
            return domains;
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load Name.com domain details
const update_namecom_domains_details = (options, domains, domains_div_id) => {
    $("#" + domains_div_id).html('');    

    for(let i in domains){
        // Call Name.com API to get domain details
        fetch(namecom_api_url + 'domains/' + domains[i], options).then(function(response) {
            return response.json();
        }).then(function(data) {
            // Construct HTML for DNS DIV in 'DNS records' tab
            let domains_html_block = '';
                        
            domains_html_block += '<div class="row divblock">';
            domains_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + data['domainName'] + '</div>';
            domains_html_block += '<div class="col-sm-4">Name servers</div><div class="col-sm-8">';
            for(let j in data['nameservers']){
                domains_html_block += data['nameservers'][j] + '<br/>';
            }
            domains_html_block += '</div>';
            domains_html_block += '<div class="col-sm-4">Registrant first name</div><div class="col-sm-8">' + data['contacts']['registrant']['firstName'] + '</div>';
            domains_html_block += '<div class="col-sm-4">Registrant last name</div><div class="col-sm-8">' + data['contacts']['registrant']['lastName'] + '</div>';
            domains_html_block += '<div class="col-sm-4">Registrant address</div><div class="col-sm-8">';
            domains_html_block += data['contacts']['registrant']['address1'] + '<br/>';
            domains_html_block += data['contacts']['registrant']['address2'] + '<br/>';
            domains_html_block += data['contacts']['registrant']['city'] + '<br/>';
            domains_html_block += data['contacts']['registrant']['state'] + '<br/>';
            domains_html_block += data['contacts']['registrant']['zip'] + '<br/>';
            domains_html_block += data['contacts']['registrant']['country'] + '<br/>';
            domains_html_block +=  '</div>';
            domains_html_block += '<div class="col-sm-4">Registrant phone</div><div class="col-sm-8">' + data['contacts']['registrant']['phone'] + '</div>';
            domains_html_block += '<div class="col-sm-4">Registrant email</div><div class="col-sm-8">' + data['contacts']['registrant']['email'] + '</div>';
                
            domains_html_block += '</div>';
                        
            // Update domain section under 'Name.com' tab
            $("#" + domains_div_id).html($("#" + domains_div_id).html()+domains_html_block);
            // Update status bar
            updateStatus('Loaded domain details.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }  
    // Update domains UI
    $("#" + domains_div_id).html(domains_html_block);    
}

