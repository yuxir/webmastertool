'use strict';

const do_api_url = 'https://api.digitalocean.com/v2/';

const update_do_account_info = (api_key, div_id) => {
    if (api_key) {
        // Load DO account information
        $.ajax({
            type: "GET",
            url: do_api_url + 'account',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {  // update account info
                let status            = result['account']['status'];
		        let email             = result['account']['email'];
                let droplet_limit     = result['account']['droplet_limit'];
                let floating_ip_limit = result['account']['floating_ip_limit'];

                let account_html_block = '<div class="row">';
                account_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">';

                if(status=='active') {
                    account_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                }else{
                    account_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
                }
                account_html_block += status + '</div>';

                account_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + email + '</div>';
                account_html_block += '<div class="col-sm-4">Droplet limit</div><div class="col-sm-8">' + droplet_limit + '</div>';
                account_html_block += '<div class="col-sm-4">Floating IP limit</div><div class="col-sm-8">' + droplet_limit + '</div>';
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

const update_do_droplets_info = (api_key, div_id) => {
    if (api_key) {
        // Load DO droplets information
        $.ajax({
            type: "GET",
            url: do_api_url + 'droplets',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {
                let server_html_block = '';
                for(var s in result["droplets"]) {  // update droplet info
		            server_html_block += '<div class="row divblock">';
		            server_html_block += '<div class="col-sm-4">Server name</div><div class="col-sm-8">' + result["droplets"][s]['name'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Region</div><div class="col-sm-8">' + result["droplets"][s]['region']['name'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">';
                    if (result["droplets"][s]['status'].trim()=='active') {
                        server_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                    }else{
                        server_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
                    }
                    server_html_block += ' ' + result["droplets"][s]['status'] + '</div>';

                    server_html_block += '<div class="col-sm-4">Memory</div><div class="col-sm-8">' + result["droplets"][s]['memory'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Disk</div><div class="col-sm-8">' + result["droplets"][s]['disk'] + ' GB</div>';
                    server_html_block += '<div class="col-sm-4">Kernel</div><div class="col-sm-8">' + result["droplets"][s]['kernel']['name'] + ' GB</div>';
                    server_html_block += '<div class="col-sm-4">Price monthly</div><div class="col-sm-8">$ ' + result["droplets"][s]['size']['price_monthly'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Price hourly</div><div class="col-sm-8">$ ' + result["droplets"][s]['size']['price_hourly'] + '</div>';
                    server_html_block += '<div class="col-sm-4">Next backup window</div><div class="col-sm-8">' + result["droplets"][s]['next_backup_window'] + '</div>';
   		    server_html_block += '</div>';
                }
                $("#" + div_id).html(server_html_block);
                updateStatus('Loaded droplets information.');
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

const update_do_snapshots_info = (api_key, div_id) => {
    if (api_key) {
        // Load DO snapshots information
        $.ajax({
            type: "GET",
            url: do_api_url + 'snapshots',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {
                let server_html_block = '';
                for(var s in result["snapshots"]) {  // update snapshots info
		           server_html_block += '<div class="row divblock">';
                   server_html_block += '<div class="col-sm-4">Snapshot</div><div class="col-sm-8">' + result["snapshots"][s]['name'] + '</div>';
                   server_html_block += '<div class="col-sm-4">Region</div><div class="col-sm-8">' + result["snapshots"][s]['regions'][0] + '</div>';
                   server_html_block += '<div class="col-sm-4">Creation date</div><div class="col-sm-8">' + result["snapshots"][s]['created_at'] + '</div>';
                   server_html_block += '<div class="col-sm-4">Size</div><div class="col-sm-8">' + result["snapshots"][s]['size_gigabytes'] + ' GB</div>';
                   server_html_block += '<div class="col-sm-4">Minimal disk size when restore</div><div class="col-sm-8">' + result["snapshots"][s]['min_disk_size'] + ' GB</div>';
                    
   		           server_html_block += '</div>';
                }
                $("#" + div_id).html(server_html_block);
                updateStatus('Loaded snapshots information.');
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

const update_do_domains_info = (api_key, div_id) => {
    if (api_key) {
        // Load DO domain records
        $.ajax({
            type: "GET",
            url: do_api_url + 'domains',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {  // update domain info
                let domains_html_block = '';
                for(var s in result["domains"]) {
		           domains_html_block += '<div class="row divblock">';
                   domains_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + result["domains"][s]['name'] + '</div>';
                   domains_html_block += '<div class="col-sm-4">ttl</div><div class="col-sm-8">' + result["domains"][s]['ttl'] + '</div>';
                   domains_html_block += '<div class="col-sm-4">zone file</div><div class="col-sm-8">' + result["domains"][s]['zone_file'] + '</div>';
                   
   		           domains_html_block += '</div>';
                }
                $("#" + div_id).html(domains_html_block);
                updateStatus('Loaded DO domains.');
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


const update_do_sshkeys_info = (api_key, div_id) => {
    if (api_key) {
        // Load DO SSH keys
        $.ajax({
            type: "GET",
            url: do_api_url + 'account/keys',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
            },
            success: function (result) {  // update SSH keys
                let sshkeys_html_block = '';
                for(var s in result["ssh_keys"]) {
		           sshkeys_html_block += '<div class="row divblock">';
                   sshkeys_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + result["ssh_keys"][s]['name'] + '</div>';
                   sshkeys_html_block += '<div class="col-sm-4">Fingerpint</div><div class="col-sm-8">' + result["ssh_keys"][s]['fingerprint'] + '</div>';
                   sshkeys_html_block += '<div class="col-sm-4">Public key</div><div class="col-sm-8" style="word-wrap: break-word;">' + result["ssh_keys"][s]['public_key'] + '</div>';
                   
   		           sshkeys_html_block += '</div>';
                }
                $("#" + div_id).html(sshkeys_html_block);
                updateStatus('Loaded SSH keys.');
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
