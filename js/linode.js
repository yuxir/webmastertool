'use strict';

const linode_api_url = 'https://api.linode.com/v4/';

// The mothod to update linode account information UI
const update_linode_account_info = (api_key, div_id, dashboard_div_id) => {
    if (api_key) {
        // Load linode account information
        $.ajax({
            type: "GET",
            url: linode_api_url + 'account',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {  
                // parse result JSON
                let address_1 = result['address_1']
                let address_2 = result['address_2']
                let city      = result['city']
                let postcode  = result['zip']
                let country   = result['country']
                let balance   = result['balance']
                let phone     = result['phone']
                let email     = result['email']

                // construct HTML for 'Linode' tab and the 'Dashboard'
                let account_html_block = '<div class="row">';
                let dashboard_account_html_block = '<div class="row">';
                account_html_block += '<div class="col-sm-4">Address</div><div class="col-sm-8">' + address_1 + '<br/>' + address_2 + '<br/>' + city + ' ' + country + ' ' + postcode + '</div>';
                account_html_block += '<div class="col-sm-4">Phone</div><div class="col-sm-8">'   + phone + '</div>';
                account_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">'   + email + '</div>';
                account_html_block += '<div class="col-sm-4">Balance</div><div class="col-sm-8">';
                dashboard_account_html_block += '<div class="col-sm-6">Linode Balance</div><div class="col-sm-6">';
                if(balance<0) {
                    account_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                    dashboard_account_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                }else{
                    account_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>Insufficient balance! ';
                    dashboard_account_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>Insufficient balance! ';
                }
                account_html_block += balance + '</div>';
                dashboard_account_html_block += balance + '</div>';
                account_html_block += '</div>';
                dashboard_account_html_block += '</div>';
                
                // Update 'Linode' tab
                $("#" + div_id).html(account_html_block);
                
                // Update Dashboard
                $("#" + dashboard_div_id).html(dashboard_account_html_block);
                updateStatus('Loaded account information.');
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Update Linode profile UI
const update_linode_profile_info = (api_key, div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + api_key
            }
        };

        fetch(linode_api_url + 'profile', options).then(function(response) {
          return response.json();
        }).then(function(data) {
            // construct HTML for profile UI
            let profile_html_block = '<div class="row">';
            profile_html_block += '<div class="col-sm-4">Username</div><div class="col-sm-8">' + data['username'] + '</div>';
            profile_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + data['email'] + '</div>';
            profile_html_block += '<div class="col-sm-4">Two factor auth enabled</div><div class="col-sm-8">' + data['two_factor_auth'] + '</div>';
            profile_html_block += '<div class="col-sm-4">Referrals code</div><div class="col-sm-8">' + data['referrals']['code'] + '</div>';
            profile_html_block += '<div class="col-sm-4">Referral URL</div><div class="col-sm-8">' + data['referrals']['url'] + '</div>';
            profile_html_block += '<div class="col-sm-4">Referrals</div><div class="col-sm-8">';
            profile_html_block += 'Completed: ' + data['referrals']['completed'] + '<br/>';
            profile_html_block += 'Total: '   + data['referrals']['total'] + '<br/>';
            profile_html_block += 'Pending: ' + data['referrals']['pending'] + '<br/>';
            profile_html_block += 'Credit: '  + data['referrals']['credit'];
            profile_html_block += '</div>';
            profile_html_block += '</div>';

            // Update profile UI
            $("#" + div_id).html(profile_html_block);
            // Update status bar
            updateStatus('Loaded profile information.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Update Linode invoices in the UI
const update_linode_invoices_info = (api_key, div_id) => {
    if (api_key) {
        // Load linode invoices
        $.ajax({
            type: "GET",
            url: linode_api_url + 'account/invoices',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {
                // Construct invoice HTML
                let invoice_html_block = '';
                for(var s in result["data"]) {  // update instances info
		            invoice_html_block += '<div class="row divblock">';
		            invoice_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result["data"][s]['id'] + '</div>';
                    invoice_html_block += '<div class="col-sm-4">Label</div><div class="col-sm-8">' + result["data"][s]['label'] + '</div>';
                    invoice_html_block += '<div class="col-sm-4">Date</div><div class="col-sm-8">' + $.format.date(result["data"][s]['date'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                    invoice_html_block += '<div class="col-sm-4">Total</div><div class="col-sm-8">' + result["data"][s]['total'] + '</div>';
   		            invoice_html_block += '</div>';
                }
                // Update invoice UI
                $("#" + div_id).html(invoice_html_block);
                updateStatus('Loaded invoices.');
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Update Linode instances information in the UI
const update_linode_instances_info = (api_key, div_id, dashboard_div_id) => {
    if (api_key) {
        // Load linode instances
        $.ajax({
            type: "GET",
            url: linode_api_url + 'linode/instances',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {
                // construct HTML for server information in 'Linode' tab and the dashboard
                let server_html_block = '';
                let dashboard_server_html_block = '';
                for(var s in result["data"]) {  // update instances info
		            server_html_block += '<div class="row divblock">';
                    dashboard_server_html_block += '<div class="row">';
		            server_html_block += '<div class="col-sm-4">Linode</div><div class="col-sm-8">' + result["data"][s]['label'] + '</div>';
                    server_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result["data"][s]['id'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Created</div><div class="col-sm-8">' + $.format.date(result["data"][s]['created'], "yyyy-MM-dd HH:mm:ss") + '</div>';
                    server_html_block += '<div class="col-sm-4">Hypervisor</div><div class="col-sm-8">' + result["data"][s]['hypervisor'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">';
                    if (result["data"][s]['status'].trim()=='running') {
                        server_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                    }else{
                        server_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
                    }
                    
                    // HTML in Linode dashboard 
                    dashboard_server_html_block += '<div class="col-sm-4">Linode server: ' + result["data"][s]['label'] + '</div>';
                    dashboard_server_html_block += '<div class="col-sm-8">';
					if (result["data"][s]['status'].trim()=='running') {
                        dashboard_server_html_block += '<i class="fa fa-power-off" style="color:red;font-size:16px;"></i>';
                    }else{
                        dashboard_server_html_block += '<i class="fa fa-power-off" style="color:lightgrey;font-size:16px;"></i>';
                    }
                    dashboard_server_html_block += ' ' + result["data"][s]['status'] + '</div>';
                    
                    server_html_block += ' ' + result["data"][s]['status'].trim() + '</div>';
                    server_html_block += '<div class="col-sm-4">Region</div><div class="col-sm-8">' + result["data"][s]['region'] + '</div>';
                    server_html_block += '<div class="col-sm-4">IP</div><div class="col-sm-8">' + result["data"][s]['ipv4'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8">' + result["data"][s]['type'] + '</div>';
                    server_html_block += '<div class="col-sm-4">RAM</div><div class="col-sm-8">' + parseFloat(result["data"][s]['specs']['memory'])/1024 + ' GB</div>';
                    server_html_block += '<div class="col-sm-4">Disk</div><div class="col-sm-8">' + Math.round(parseFloat(result["data"][s]['specs']['disk'])/1024) + ' GB</div>';
                    server_html_block += '<div class="col-sm-4">Network</div><div class="col-sm-8">' + result["data"][s]['specs']['transfer'] + ' GB</div>';
   		            server_html_block += '</div>';
                    dashboard_server_html_block += '</div>';
                }
                // Update server section UI in Linode 'tab'
                $("#" + div_id).html(server_html_block);
                // Update dashboard UI
                $("#" + dashboard_div_id).html(dashboard_server_html_block);
                updateStatus('Loaded instances.');
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

// Update domain information in 'Linode' tab
const update_linode_domains_info = (api_key, div_id) => {
    if (api_key) {
        // Load linode domains
        $.ajax({
            type: "GET",
            url: linode_api_url + 'domains',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {
                // Construct HTML for domain section in Linode tab 
                let domain_html_block = '';
                for(var s in result["data"]) {  
		            domain_html_block += '<div class="row divblock">';
		            domain_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + result["data"][s]['domain'] + '</div>';
                    domain_html_block += '<div class="col-sm-4">Description</div><div class="col-sm-8">' + result["data"][s]['description'] + '</div>';
                    domain_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">' + result["data"][s]['status'] + '</div>';
                    domain_html_block += '<div class="col-sm-4">IPs</div><div class="col-sm-8">' + result["data"][s]['master_ips'] + '</div>';
   		            domain_html_block += '</div>';
                }
                // Update domain section UI 
                $("#" + div_id).html(domain_html_block);
                updateStatus('Loaded domains.');
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}
