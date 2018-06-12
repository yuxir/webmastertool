'use strict';

const namecheap_api_url = 'https://api.namecheap.com/xml.response';

// Load Namecheap domain information
const update_namecheap_domains_info = (username, api_key, domains_div_id) => {
    if (api_key) {
        // As required by Namecheap API, client IP must be provided
        fetch('https://api.ipify.org/?format=json').then(function(response) {
            return response.json();
        }).then(function(json) {  
            let ip = json['ip'];
            // Call Namecheap API to get domains info
            let url = namecheap_api_url+'?ApiUser='+username+'&ApiKey='+api_key+'&UserName='+username+'&ClientIP='+ip+'&Command=namecheap.domains.getList';
            fetch(url).then(function(response) {
                return response.text();
            }).then(function(data) {
                let xmlDoc = $.parseXML( data ); 
                let xml    = $(xmlDoc);

                // Construct HTML for domains DIV in 'namecheap' tab
                let html_block = '';
                let domains = xml.find('Domain');
                for(let d in domains) {
                    if($(domains[d]).attr('Name')) {
                        html_block += '<div class="row divblock">';
                        html_block += '<div class="row">';
                        html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + $(domains[d]).attr('ID') + '</div>';
                        html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + $(domains[d]).attr('Name') + '</div>';
                        html_block += '<div class="col-sm-4">Created</div><div class="col-sm-8">' + $(domains[d]).attr('Created') + '</div>';
                        html_block += '<div class="col-sm-4">Expires</div><div class="col-sm-8">' + $(domains[d]).attr('Expires') + '</div>';
                        html_block += '<div class="col-sm-4">IsExpired</div><div class="col-sm-8">' + $(domains[d]).attr('IsExpired') + '</div>';
                        html_block += '<div class="col-sm-4">IsLocked</div><div class="col-sm-8">' + $(domains[d]).attr('IsLocked') + '</div>';
                        html_block += '<div class="col-sm-4">AutoRenew</div><div class="col-sm-8">' + $(domains[d]).attr('AutoRenew') + '</div>';
                        html_block += '<div class="col-sm-4">WhoisGuard</div><div class="col-sm-8">' + $(domains[d]).attr('WhoisGuard') + '</div>';
                        html_block += '<div class="col-sm-4">IsPremium</div><div class="col-sm-8">' + $(domains[d]).attr('IsPremium') + '</div>';
                        html_block += '<div class="col-sm-4">Namechap DNS?</div><div class="col-sm-8">' + $(domains[d]).attr('IsOurDNS') + '</div>';
                        html_block += '</div>';  
                        html_block += '</div>';                          
                    }
                }
                
                html_block += '</div>';
                    
                // Update domain info UI
                $("#" + domains_div_id).html(html_block);
                // Update status bar
                updateStatus('Loaded domain info.');
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

