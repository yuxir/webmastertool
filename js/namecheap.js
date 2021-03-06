'use strict';

const namecheap_api_url = 'https://api.namecheap.com/xml.response';

// Load Namecheap account information
const update_namecheap_account_info = (username, api_key, div_id) => {
    if (api_key) {
        // As required by Namecheap API, client IP must be provided
        fetch('https://api.ipify.org/?format=json').then(function(response) {
            return response.json();
        }).then(function(json) {  
            let ip = json['ip'];
            // Call Namecheap API to get domains info
            let url = namecheap_api_url+'?ApiUser='+username+'&ApiKey='+api_key+'&UserName='+username+'&ClientIP='+ip+'&Command=namecheap.users.getBalances';
            fetch(url).then(function(response) {
                return response.text();
            }).then(function(data) {
                let x2js = new X2JS();
                // convert returned XML to json
                let jsonObj = x2js.xml_str2json(data);
                
                if(jsonObj && 
                   jsonObj['ApiResponse'] && 
                   jsonObj['ApiResponse']['CommandResponse'] && 
                   jsonObj['ApiResponse']['CommandResponse']['UserGetBalancesResult']){
                    let result = jsonObj['ApiResponse']['CommandResponse']['UserGetBalancesResult'];
                    // Construct HTML for account DIV in 'Namecheap' tab
                    let html_block = '<div class="row divblock">';
                    html_block += '<div class="col-sm-4">Currency</div><div class="col-sm-8"><b>' + result['_Currency'] + '</b></div>';
                    html_block += '<div class="col-sm-4">Account balance</div><div class="col-sm-8"><b>' + result['_AccountBalance'] + '</b></div>';
                    html_block += '<div class="col-sm-4">Available balance</div><div class="col-sm-8"><b>' + result['_AvailableBalance'] + '</b></div>';
                    html_block += '<div class="col-sm-4">Earned amount</div><div class="col-sm-8"><b>' + result['_EarnedAmount'] + '</b></div>';
                    html_block += '<div class="col-sm-4">Funds required for autorenew</div><div class="col-sm-8"><b>' + result['_FundsRequiredForAutoRenew'] + '</b></div>';
                    html_block += '<div class="col-sm-4">Withdrawable amount</div><div class="col-sm-8"><b>' + result['_WithdrawableAmount'] + '</b></div>';
                
                    html_block += '</div>';

                    // Update account info UI
                    $("#" + div_id).html(html_block);
                
                    // Update status bar
                    updateStatus('Loaded account info.');
                }
            }).catch(function(err) {
                let html = '<span style="color:red;">Error while getting namecheap account info.' + err + '</span>';
                updateStatus(html);
            });
            
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load Namecheap domain information
const update_namecheap_domains_info = (username, api_key, domains_div_id) => {
    if (api_key) {
        // As required by Namecheap API, client IP must be provided
        fetch('https://api.ipify.org/?format=json').then(function(response) {
            return response.json();
        }).then(function(json) {  
            let ip = json['ip'];
            $('#namecheap-client-ip').val(ip);
            // Call Namecheap API to get domains info
            let url = namecheap_api_url+'?ApiUser='+username+'&ApiKey='+api_key+'&UserName='+username+'&ClientIP='+ip+'&Command=namecheap.domains.getList';
            fetch(url).then(function(response) {
                return response.text();
            }).then(function(data) {
                let x2js = new X2JS();
                let jsonObj = x2js.xml_str2json(data);
                let domains = jsonObj['ApiResponse']['CommandResponse']['DomainGetListResult']['Domain'];
                let domainlist = '';  // domainlist will be kept in a hidden field, and to be used in other Namecheap API calls
                // Construct HTML for domains DIV in 'namecheap' tab
                let html_block = '';
                for(let d in domains) {
                    if(domains[d]['_Name']) {
                        domainlist = domainlist + ',' + domains[d]['_Name'];
                        html_block += '<div class="row divblock">';
                        html_block += '<div class="row">';
                        html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + domains[d]['_ID'] + '</div>';
                        html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + domains[d]['_Name'] + '</div>';
                        html_block += '<div class="col-sm-4">Created</div><div class="col-sm-8">' + domains[d]['_Created'] + '</div>';
                        html_block += '<div class="col-sm-4">Expires</div><div class="col-sm-8">' + domains[d]['_Expires'] + '</div>';
                        html_block += '<div class="col-sm-4">IsExpired</div><div class="col-sm-8">';
                        if(domains[d]['_IsExpired']=='false') {
                            html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                        }else{
                            html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
                        }
                        html_block += domains[d]['_IsExpired'] + '</div>';
                        
                        html_block += '<div class="col-sm-4">IsLocked</div><div class="col-sm-8">' + domains[d]['_IsLocked'] + '</div>';
                        html_block += '<div class="col-sm-4">AutoRenew</div><div class="col-sm-8">' + domains[d]['_AutoRenew'] + '</div>';
                        html_block += '<div class="col-sm-4">WhoisGuard</div><div class="col-sm-8">';
                        if(domains[d]['_WhoisGuard']=='ENABLED') {
                            html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                        }else{
                            html_block += '<i class="fa fa-times" style="color:red;font-size:16px;"></i>';
                        }
                        html_block += '</div>';
                        
                        html_block += '<div class="col-sm-4">IsPremium</div><div class="col-sm-8">' + domains[d]['_IsPremium'] + '</div>';
                        html_block += '<div class="col-sm-4">Namechap DNS?</div><div class="col-sm-8">' + domains[d]['_IsOurDNS'] + '</div>';
                        html_block += '</div>';  
                        html_block += '</div>';                          
                    }
                }
                
                html_block += '</div>';
                    
                // Update domain info UI
                $("#" + domains_div_id).html(html_block);
                
                // Update status bar
                updateStatus('Loaded domain info.');
                
                // Save domain list to a hidden field
                $('input#namecheap-domains-hidden').val(domainlist);
            }).catch(function(err) {
                let html = '<span style="color:red;">Error while getting namecheap domain info.' + err + '</span>';
                updateStatus(html);
            });
            
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Load namecheap Name servers
const update_namecheap_ns = (ip, username, api_key, domains, ns_div_id) => {
    $("#" + ns_div_id).html('');   
    let x2js = new X2JS();
    
    for(let i in domains){
        let domain = domains[i];
        let sld = domain.substr(0, domain.indexOf('.'));
        let tld = domain.substr(domain.indexOf('.')+1, domain.length);
        // Call Namecheap API to get NS info
        let url = namecheap_api_url+'?ApiUser='+username+'&ApiKey='+api_key+'&UserName='+username+'&ClientIP='+ip+'&Command=namecheap.domains.dns.getList&SLD='+sld+'&TLD='+tld;
        
        fetch(url).then(function(response) {
            return response.text();
        }).then(function(data) {
            let jsonObj = x2js.xml_str2json(data);

            if(jsonObj && 
                jsonObj['ApiResponse'] &&
                jsonObj['ApiResponse']['CommandResponse'] &&
                jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetListResult'] &&
                jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetListResult']['Nameserver']){
               
                let name_servers = jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetListResult']['Nameserver'];
                    
                // Construct HTML for DNS DIV in 'Namesilo' tab
                let html_block = '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8"><b>' + domain + '</b></div>';
                    
                for(let n in name_servers){
                    html_block += '<div class="col-sm-4">Name server</div><div class="col-sm-8"><b>' + name_servers[n] + '</b></div>';
                }
                html_block += '</div>';
                
                // Update NS section
                $("#" + ns_div_id).html($("#" + ns_div_id).html()+html_block);
                // Update status bar
                updateStatus('Loaded Namecheap DNS info.');
            }
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }
}

// Load namecheap Email forwarding
const update_namecheap_email_forwarding = (ip, username, api_key, domains, div_id) => {
    $("#" + div_id).html('');   
    let x2js = new X2JS();
    
    for(let i in domains){
        let domain = domains[i];
        // Call Namecheap API to get Email  forwarding
        let url = namecheap_api_url+'?ApiUser='+username+'&ApiKey='+api_key+'&UserName='+username+'&ClientIP='+ip+'&Command=namecheap.domains.dns.getEmailForwarding&DomainName='+domain;
        
        fetch(url).then(function(response) {
            return response.text();
        }).then(function(data) {
            let jsonObj = x2js.xml_str2json(data);
            if(jsonObj && 
              jsonObj['ApiResponse'] && 
              jsonObj['ApiResponse']['CommandResponse'] && 
              jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetEmailForwardingResult'] &&
              jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetEmailForwardingResult']['Forward']){
               let result = jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetEmailForwardingResult'];
                
               // Construct HTML for DNS DIV in 'Namesilo' tab
               let html_block = '<div class="row divblock">';
               html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8"><b>' + domain + '</b></div>';
                    
               for(let r in result){
                   if(result[r]['_mailbox'] && result[r]['__text']) {
                       html_block += '<div class="col-sm-4">Mailbox</div><div class="col-sm-8"><b>' + result[r]['_mailbox'] + '</b></div>';
                       html_block += '<div class="col-sm-4">Forward to</div><div class="col-sm-8"><b>' + result[r]['__text'] + '</b></div>';
                   }
               }
               html_block += '</div>';
                
               // Update email forwards UI
               $("#" + div_id).html($("#" + div_id).html()+html_block);
               // Update status bar
               updateStatus('Loaded Namecheap Email forward info.');
            }
            
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }
}

// Load namecheap DNS
const update_namecheap_dns = (ip, username, api_key, domains, div_id) => {
    $("#" + div_id).html('');   
    let x2js = new X2JS();
    
    for(let i in domains){
        let domain = domains[i];
        let sld = domain.substr(0, domain.indexOf('.'));
        let tld = domain.substr(domain.indexOf('.')+1, domain.length);
        
        // Call Namecheap API to get DNS records
        let url = namecheap_api_url+'?ApiUser='+username+'&ApiKey='+api_key+'&UserName='+username+'&ClientIP='+ip+'&Command=namecheap.domains.dns.getHosts&SLD='+sld+'&TLD='+tld;;
        fetch(url).then(function(response) {
            return response.text();
        }).then(function(data) {
            let jsonObj = x2js.xml_str2json(data);
            
            if(jsonObj && 
              jsonObj['ApiResponse'] && 
              jsonObj['ApiResponse']['CommandResponse'] && 
              jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetHostsResult'] &&
              jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetHostsResult']['host']){
                let result = jsonObj['ApiResponse']['CommandResponse']['DomainDNSGetHostsResult']['host'];
                // Construct HTML for DNS DIV in 'Namecheap' tab
                let html_block = '<div class="row divblock">';
                html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8"><b>' + domain + '</b></div>';
                    
                for(let r in result){
                    if(result[r]['_Name'] && result[r]['_Type']) {
                        html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8"><b>' + result[r]['_Name'] + '</b></div>';
                        html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8"><b>' + result[r]['_Type'] + '</b></div>';
                        html_block += '<div class="col-sm-4">Address</div><div class="col-sm-8"><b>' + result[r]['_Address'] + '</b></div>';
                    }
                }
                html_block += '</div>';
                
                // Update email forwards UI
                $("#" + div_id).html($("#" + div_id).html()+html_block);
                // Update status bar
                updateStatus('Loaded Namecheap DNS records.');
            }
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }
}
