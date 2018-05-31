'use strict';

const namecom_api_url = 'https://api.name.com/v4/';

// Load Name.com domain information
const update_namecom_domains_info = (username, api_key, domains_div_id, dns_div_id, email_forwarding_div_id, url_forwarding_div_id) => {
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
        }).then(function(domains) {  // pass domains to make the second API call to retrieve DNS records
            update_namecom_dns_records(options, domains, dns_div_id);
            return domains;
        }).then(function(domains) {  // pass domains to make the second API call to retrieve email forwarding info
            update_namecom_email_forwarding(options, domains, email_forwarding_div_id);
            return domains;
        }).then(function(domains) {  // pass domains to make the second API call to retrieve URL forwarding info
            update_namecom_url_forwarding(options, domains, url_forwarding_div_id);
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
            console.log(err);
            updateStatus(html);
        });        
    }  
}

// Load Name.com DNS records
const update_namecom_dns_records = (options, domains, dns_div_id) => {
    $("#" + dns_div_id).html('');    
    for(let i in domains){
        // Call Name.com API to get DNS records
        fetch(namecom_api_url + 'domains/' + domains[i] + '/records', options).then(function(response) {
            return response.json();
        }).then(function(data) {
            // Construct HTML for DNS DIV in 'DNS records' tab
            let dns_html_block = '';
                        
            for(let j in data["records"]) { 
                dns_html_block += '<div class="row divblock">';
                dns_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + data["records"][j]['domainName'] + '</div>';
                dns_html_block += '<div class="col-sm-4">Host</div><div class="col-sm-8">' + data["records"][j]['host'] + '</div>';
                dns_html_block += '<div class="col-sm-4">fqdn</div><div class="col-sm-8">' + data["records"][j]['fqdn'] + '</div>';
                dns_html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8">' + data["records"][j]['type'] + '</div>';
                dns_html_block += '<div class="col-sm-4">Answer</div><div class="col-sm-8">' + data["records"][j]['answer'] + '</div>';
                dns_html_block += '<div class="col-sm-4">ttl</div><div class="col-sm-8">' + data["records"][j]['ttl'] + '</div>';
                dns_html_block += '</div>';
            }            
                        
            // Update domain section under 'Name.com' tab
            $("#" + dns_div_id).html($("#" + dns_div_id).html()+dns_html_block);
            // Update status bar
            updateStatus('Loaded DNS records.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            console.log(html);
            updateStatus(html);
        });        
    }  
}

// Load Name.com Email forwarding
const update_namecom_email_forwarding = (options, domains, email_forwarding_div_id) => {
    $("#" + email_forwarding_div_id).html('');    
    for(let i in domains){
        // Call Name.com API to get Email forwarding
        fetch(namecom_api_url + 'domains/' + domains[i] + '/email/forwarding', options).then(function(response) {
            return response.json();
        }).then(function(data) {
            // Construct HTML for Email forwarding DIV in 'Email forwarding' section
            let html_block = '';
                        
            for(let j in data["emailForwarding"]) { 
                html_block += '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + data["emailForwarding"][j]['domainName'] + '</div>';
                html_block += '<div class="col-sm-4">From</div><div class="col-sm-8">' + data["emailForwarding"][j]['emailBox'] + '</div>';
                html_block += '<div class="col-sm-4">To</div><div class="col-sm-8">' + data["emailForwarding"][j]['emailTo'] + '</div>';
                html_block += '</div>';
            }            
                        
            // Update email forwarding section under 'Name.com' tab
            $("#" + email_forwarding_div_id).html($("#" + email_forwarding_div_id).html()+html_block);
            // Update status bar
            updateStatus('Loaded email forwarding.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            console.log(err);
            updateStatus(html);
        });        
    }  
}

// Load Name.com URL forwarding
const update_namecom_url_forwarding = (options, domains, url_forwarding_div_id) => {
    $("#" + url_forwarding_div_id).html('');    
    for(let i in domains){
        // Call Name.com API to get URL forwarding
        fetch(namecom_api_url + 'domains/' + domains[i] + '/url/forwarding', options).then(function(response) {
            return response.json();
        }).then(function(data) {
            // Construct HTML for URL forwarding DIV in 'Url forwarding' section
            let html_block = '';
                        
            for(let j in data["urlForwarding"]) { 
                html_block += '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + data["urlForwarding"][j]['domainName'] + '</div>';
                html_block += '<div class="col-sm-4">From</div><div class="col-sm-8">' + data["urlForwarding"][j]['host'] + '</div>';
                html_block += '<div class="col-sm-4">To</div><div class="col-sm-8">' + data["urlForwarding"][j]['forwardsTo'] + '</div>';
                html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8">' + data["urlForwarding"][j]['type'] + '</div>';
                html_block += '</div>';
            }            
                        
            // Update URL forwarding section under 'Name.com' tab
            $("#" + url_forwarding_div_id).html($("#" + url_forwarding_div_id).html()+html_block);
            // Update status bar
            updateStatus('Loaded URL forwarding.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            console.log(err);
            updateStatus(html);
        });        
    }  
}
