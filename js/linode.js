'use strict';

const linode_api_url = 'https://api.linode.com/v4/';

const update_linode_account_info = (api_key, div_id) => {
    if (api_key) {
        // Load linode account information
        $.ajax({
            type: "GET",
            url: linode_api_url + 'account',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {  // update account info
                let address_1 = result['address_1']
                let address_2 = result['address_2']
                let city      = result['city']
                let postcode  = result['zip']
                let country   = result['country']
                let balance   = result['balance']
                let phone     = result['phone']
                let email     = result['email']
                
                let account_html_block = '<div class="row">';
                account_html_block += '<div class="col-sm-4">Address</div><div class="col-sm-8">' + address_1 + '<br/>' + address_2 + '<br/>' + city + ' ' + country + ' ' + postcode + '</div>';
                account_html_block += '<div class="col-sm-4">Phone</div><div class="col-sm-8">'   + phone + '</div>';
                account_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">'   + email + '</div>';
                account_html_block += '<div class="col-sm-4">Balance</div><div class="col-sm-8">' + balance + '</div>';
                
                account_html_block += '</div>';

                $("#" + div_id).html(account_html_block);
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

const update_linode_profile_info = (api_key, div_id) => {
    if (api_key) {
        // Load linode profile information
        let request = new Request(linode_api_url + 'profile', {
            method: 'GET', 
            headers: new Headers({
              'Authorization': "Bearer " + api_key
            })
        });

        fetch(request)
        .then(function(response) {
          response.json().then(function(data) {
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

            $("#" + div_id).html(profile_html_block);
            updateStatus('Loaded profile information.');
          });
        })
        .catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

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
                let invoice_html_block = '';
                for(var s in result["data"]) {  // update instances info
		            invoice_html_block += '<div class="row divblock">';
		            invoice_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result["data"][s]['id'] + '</div>';
                    invoice_html_block += '<div class="col-sm-4">Label</div><div class="col-sm-8">' + result["data"][s]['label'] + '</div>';
                    invoice_html_block += '<div class="col-sm-4">Date</div><div class="col-sm-8">' + result["data"][s]['date'] + '</div>';
                    invoice_html_block += '<div class="col-sm-4">Total</div><div class="col-sm-8">' + result["data"][s]['total'] + '</div>';
   		            invoice_html_block += '</div>';
                }
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

const update_linode_instances_info = (api_key, div_id) => {
    if (api_key) {
        // Load linode instances
        $.ajax({
            type: "GET",
            url: linode_api_url + 'linode/instances',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {
                let server_html_block = '';
                for(var s in result["data"]) {  // update instances info
		            server_html_block += '<div class="row divblock">';
		            server_html_block += '<div class="col-sm-4">Linode</div><div class="col-sm-8">' + result["data"][s]['label'] + '</div>';
                    server_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result["data"][s]['id'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Created</div><div class="col-sm-8">' + result["data"][s]['created'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Hypervisor</div><div class="col-sm-8">' + result["data"][s]['hypervisor'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">';
                    if (result["data"][s]['status'].trim()=='running') {
                        server_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                    }else{
                        server_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
                    }
                    server_html_block += ' ' + result["data"][s]['status'].trim() + '</div>';
                    server_html_block += '<div class="col-sm-4">Region</div><div class="col-sm-8">' + result["data"][s]['region'] + '</div>';
                    server_html_block += '<div class="col-sm-4">IP</div><div class="col-sm-8">' + result["data"][s]['ipv4'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Type</div><div class="col-sm-8">' + result["data"][s]['type'] + '</div>';
                    server_html_block += '<div class="col-sm-4">RAM</div><div class="col-sm-8">' + parseFloat(result["data"][s]['specs']['memory'])/1024 + ' GB</div>';
                    server_html_block += '<div class="col-sm-4">Disk</div><div class="col-sm-8">' + Math.round(parseFloat(result["data"][s]['specs']['disk'])/1024) + ' GB</div>';
                    server_html_block += '<div class="col-sm-4">Network</div><div class="col-sm-8">' + result["data"][s]['specs']['transfer'] + ' GB</div>';
   		            server_html_block += '</div>';
                }
                $("#" + div_id).html(server_html_block);
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
                let domain_html_block = '';
                for(var s in result["data"]) {  // update domains info
		            domain_html_block += '<div class="row divblock">';
		            domain_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + result["data"][s]['domain'] + '</div>';
                    domain_html_block += '<div class="col-sm-4">Description</div><div class="col-sm-8">' + result["data"][s]['description'] + '</div>';
                    domain_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">' + result["data"][s]['status'] + '</div>';
                    domain_html_block += '<div class="col-sm-4">IPs</div><div class="col-sm-8">' + result["data"][s]['master_ips'] + '</div>';
   		            domain_html_block += '</div>';
                }
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