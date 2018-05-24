'use strict';

const namesilo_api_url = 'https://www.namesilo.com/api/';

// Load namesilo user information
const update_namesilo_user_info = (api_key, div_id) => {
    if (api_key) {
        // Call namesilo API to get user info
        fetch(namesilo_api_url + 'contactList?version=1&type=xml&key=' + api_key).then(function(response) {
            return response.text();            
        }).then(function(data) {
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            
            // Construct HTML for user DIV in 'namesilo' tab
            let user_html_block = '';
                
            user_html_block += '<div class="row">';
            user_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + xml.find('first_name').text() + ' ' + xml.find('last_name').text() + '</div>';
            user_html_block += '<div class="col-sm-4">Address</div><div class="col-sm-8">';
            user_html_block += xml.find('address').text() + '<br/>';
            user_html_block += xml.find('address2').text() + '<br/>';
            user_html_block += xml.find('city').text() + '<br/>';
            user_html_block += xml.find('state').text() + '<br/>';
            user_html_block += xml.find('zip').text() + '<br/>';
            user_html_block += xml.find('country').text() + '<br/>';
            user_html_block += '</div>';
            user_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + xml.find('email').text() + '</div>';
            user_html_block += '<div class="col-sm-4">Phone</div><div class="col-sm-8">' + xml.find('phone').text() + '</div>';
            
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

// Load namesilo balance
const update_namesilo_balance = (api_key, div_id) => {
    if (api_key) {
        // Call namesilo API to get balance info
        fetch(namesilo_api_url + 'getAccountBalance?version=1&type=xml&key=' + api_key).then(function(response) {
            return response.text();            
        }).then(function(data) {
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            
            // Construct HTML for balance DIV in 'namesilo' tab
            let balance_html_block = '';
                
            balance_html_block += '<div class="row">';
            balance_html_block += '<div class="col-sm-4">Balance</div><div class="col-sm-8">';
            if(xml.find('balance').text()>0) {
                balance_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
            }else{
                balance_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i> ';
            }
            balance_html_block += xml.find('balance').text() + '</div>';
            balance_html_block += '</div>';
                
            // Update balance UI
            $("#" + div_id).html(balance_html_block);
            // Update status bar
            updateStatus('Loaded balance info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load namesilo domains info
const update_namesilo_domains_info = (api_key, domain_div_id, dns_div_id, forwards_div_id) => {
    if (api_key) {
        // Call namesilo API to get domains info
        fetch(namesilo_api_url + 'listDomains?version=1&type=xml&key=' + api_key).then(function(response) {
            return response.text();            
        }).then(function(data) {  // parse response data to get domain list
            let domainlist = [];
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            let domains = xml.find('domain').each(function(){
              domainlist.push($(this).text());
            });
            return domainlist;
        }).then(function(domains) {  // get details for each domain
            update_namesilo_domain_details(api_key, domains, domain_div_id);
            update_namesilo_dns(api_key, domains, dns_div_id);
            update_namesilo_email_forwards(api_key, domains, forwards_div_id);
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load namesilo domain details
const update_namesilo_domain_details = (api_key, domains, div_id) => {
    $("#" + div_id).html('');    

    for(let i in domains){
        // Call Namesilo API to get domains info
        fetch(namesilo_api_url + 'getDomainInfo?version=1&type=xml&key=' + api_key+'&domain='+domains[i]).then(function(response) {
            return response.text();
        }).then(function(data) {
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            // Construct HTML for domains DIV in 'Namesilo' tab
            let html_block = '';
            
            html_block += '<div class="row divblock">';
            html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8"><b>' + domains[i] + '</b></div>';
            let status = xml.find('status').text();
            html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">';
            if(status.trim()=='Active') {
                html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
            }else{
                html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
            }
            html_block += status + '</div>';
            html_block += '<div class="col-sm-4">Created</div><div class="col-sm-8">'      + xml.find('created').text()      + '</div>';
            html_block += '<div class="col-sm-4">Expires</div><div class="col-sm-8">'      + xml.find('expires').text()      + '</div>';
            html_block += '<div class="col-sm-4">Locked</div><div class="col-sm-8">'       + xml.find('locked').text()       + '</div>';
            html_block += '<div class="col-sm-4">Auto renw</div><div class="col-sm-8">'    + xml.find('auto_renew').text()   + '</div>';
            html_block += '<div class="col-sm-4">Traffic type</div><div class="col-sm-8">' + xml.find('traffic_type').text() + '</div>';
            html_block += '<div class="col-sm-4">Forward URL</div><div class="col-sm-8">'  + xml.find('forward_url').text()  + '</div>';
            html_block += '<div class="col-sm-4">Forward type</div><div class="col-sm-8">' + xml.find('forward_type').text() + '</div>';
            html_block += '<div class="col-sm-4">Name servers</div><div class="col-sm-8">';
            xml.find('nameserver').each(function(){
              html_block += $(this).text() + '<br/>';
            });
            html_block += '</div>';
            
            html_block += '</div>';
            
            // Update DNS records section
            $("#" + div_id).html($("#" + div_id).html()+html_block);
            // Update status bar
            updateStatus('Loaded Namesilo domains info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }
}

// Load namesilo DNS records
const update_namesilo_dns = (api_key, domains, div_id) => {
    $("#" + div_id).html('');    

    for(let i in domains){
        // Call Namesilo API to get DNS info
        fetch(namesilo_api_url + 'dnsListRecords?version=1&type=xml&key=' + api_key+'&domain='+domains[i]).then(function(response) {
            return response.text();
        }).then(function(data) {
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            // Construct HTML for DNS DIV in 'Namesilo' tab
            let html_block = '';
            
            xml.find('resource_record').each(function(){
                html_block += '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8"><b>' + $(this).find('host').text() + '</b></div>';
                html_block += '<div class="col-sm-4">Record type</div><div class="col-sm-8">' + $(this).find('type').text() + '</div>';
                html_block += '<div class="col-sm-4">Value</div><div class="col-sm-8">' + $(this).find('value').text() + '</div>';
                html_block += '<div class="col-sm-4">TTL</div><div class="col-sm-8">' + $(this).find('ttl').text() + '</div>';
                html_block += '</div>';
            });
            
            // Update DNS records section
            $("#" + div_id).html($("#" + div_id).html()+html_block);
            // Update status bar
            updateStatus('Loaded Namesilo DNS info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }
}

// Load namesilo email forwards
const update_namesilo_email_forwards = (api_key, domains, div_id) => {
    $("#" + div_id).html('');    

    for(let i in domains){
        // Call Namesilo API to get email forwards
        fetch(namesilo_api_url + 'listEmailForwards?version=1&type=xml&key=' + api_key+'&domain='+domains[i]).then(function(response) {
            return response.text();
        }).then(function(data) {
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            // Construct HTML for Email forwards DIV in 'Namesilo' tab
            let html_block = '';
            
            xml.find('addresses').each(function(){
                html_block += '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + $(this).find('email').text() + '</div>';
                html_block += '<div class="col-sm-4">Forwards to</div><div class="col-sm-8">';
                $(this).find('forwards_to').each(function(){
                    html_block += $(this).text() + '<br/>';
                });
                html_block += '</div>';
                
                html_block += '</div>';
            });
            
            // Update Email forwards info
            $("#" + div_id).html($("#" + div_id).html()+html_block);
            // Update status bar
            updateStatus('Loaded Namesilo email forwards info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }
}