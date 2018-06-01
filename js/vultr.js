'use strict';

const vultr_api_url = 'https://api.vultr.com/v1/';

const update_vultr_account_info = (api_key, div_id, dashboard_div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'API-Key':   api_key
            }
        };
        fetch(vultr_api_url + 'account/info', options).then(function(response) {
            return response.json();
        }).then(function(result) {
            let balance = result['balance'];
            let pending_charges = result['pending_charges'];
            let last_payment_date = result['last_payment_date'];
            let last_payment_amount = result['last_payment_amount'];
				
            let account_html_block = '<div class="row">';
            let dashboard_account_html_block = '<div class="row">';

			account_html_block           += '<div class="col-sm-4">Balance</div><div class="col-sm-8">';
            dashboard_account_html_block += '<div class="col-sm-6">Vultr balance</div><div class="col-sm-6">';
			if(Math.abs(balance)>Math.abs(pending_charges)) {
                account_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                dashboard_account_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
            }else{
                account_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>Insufficient balance! ';
                dashboard_account_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>Insufficient balance! ';
            }
            account_html_block += balance + '</div>';
            dashboard_account_html_block += balance + '</div>';

            account_html_block += '<div class="col-sm-4">Pending charges</div><div class="col-sm-8">' + pending_charges + '</div>';
            account_html_block += '<div class="col-sm-4">Last payment date</div><div class="col-sm-8">' + last_payment_date + '</div>';
            account_html_block += '<div class="col-sm-4">Last payment amount</div><div class="col-sm-8">' + last_payment_amount + '</div>';
			account_html_block += '</div>';
                
            dashboard_account_html_block += '</div>';
				
            $("#" + div_id).html(account_html_block);
            $("#" + dashboard_div_id).html(dashboard_account_html_block);
            updateStatus('Loaded account information.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });           
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_vultr_server_info = (api_key, div_id, dashboard_div_id) => {
    if (api_key) {
        let options = {
            method: 'GET',
            headers: {
              'API-Key':   api_key
            }
        };
        
        // get Vultr server info
        fetch(vultr_api_url + 'server/list', options).then(function(response) {
            return response.json();
        }).then(function(result) {
            let server_html_block = '';
            let dashboard_server_html_block = '';
            for(var s in result) {
                server_html_block += '<div class="row divblock">';
                dashboard_server_html_block += '<div class="row">';
                server_html_block += '<div class="col-sm-4">Server</div><div class="col-sm-8">' + result[s]['label'] + '</div>';

                server_html_block += '<div class="col-sm-4">State</div><div class="col-sm-8">';
                if (result[s]['server_state'].trim()=='ok') {
                    server_html_block += '<i class="fa fa-check" style="color:green;font-size:16px;"></i>';
                }else{
                    server_html_block += '<i class="fa fa-question" style="color:red;font-size:16px;"></i>';
                }
                server_html_block += ' ' + result[s]['server_state'] + '</div>';

                server_html_block += '<div class="col-sm-4">Power status</div><div class="col-sm-8">';
				if (result[s]['power_status'].trim()=='running') {
                    server_html_block += '<i class="fa fa-power-off" style="color:red;font-size:16px;"></i>';
                }else{
                    server_html_block += '<i class="fa fa-power-off" style="color:lightgrey;font-size:16px;"></i>';
                }
                server_html_block += ' ' + result[s]['power_status'] + '</div>';
                    
                // HTML in dashboard 
                dashboard_server_html_block += '<div class="col-sm-6">Vultr server: ' + result[s]['label'] + '</div>';
                dashboard_server_html_block += '<div class="col-sm-6">';
				if (result[s]['power_status'].trim()=='running') {
                    dashboard_server_html_block += '<i class="fa fa-power-off" style="color:red;font-size:16px;"></i>';
                }else{
                    dashboard_server_html_block += '<i class="fa fa-power-off" style="color:lightgrey;font-size:16px;"></i>';
                }
                dashboard_server_html_block += ' ' + result[s]['power_status'] + '</div>';

                server_html_block += '<div class="col-sm-4">Location</div><div class="col-sm-8">' + result[s]['location'] + '</div>';
                server_html_block += '<div class="col-sm-4">IP</div><div class="col-sm-8">' + result[s]['main_ip'] + '</div>';
                server_html_block += '<div class="col-sm-4">Ram</div><div class="col-sm-8">' + result[s]['ram'] + '</div>';
                server_html_block += '<div class="col-sm-4">Disk</div><div class="col-sm-8">' + result[s]['disk'] + '</div>';
                server_html_block += '</div>';
                dashboard_server_html_block += '</div>';
            }
            $("#" + div_id).html(server_html_block);
            $("#" + dashboard_div_id).html(dashboard_server_html_block);
            updateStatus('Loaded server information.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });           
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_vultr_backup_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr backup information
        let options = {
            method: 'GET',
            headers: {
              'API-Key':   api_key
            }
        };
        fetch(vultr_api_url + 'backup/list', options).then(function(response) {
            return response.json();
        }).then(function(result) {
            let backup_html_block = '';
            for(var s in result) {
                backup_html_block += '<div class="row divblock">';
                backup_html_block += '<div class="col-sm-4">Description</div><div class="col-sm-8">' + result[s]['description'] + '</div>';
                backup_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result[s]['BACKUPID'] + '</div>';
                backup_html_block += '<div class="col-sm-4">Date</div><div class="col-sm-8">' + result[s]['date_created'] + '</div>';
                backup_html_block += '<div class="col-sm-4">Size</div><div class="col-sm-8">' + parseFloat(result[s]['size'])/(1024*1024*1024) + ' GB' + '</div>';
                backup_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">' + result[s]['status'] + '</div>';
                backup_html_block += '</div>';
            }

            $("#" + div_id).html(backup_html_block);
            updateStatus('Loaded backup information.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_vultr_snapshot_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr snapshot information
        let options = {
            method: 'GET',
            headers: {
              'API-Key':   api_key
            }
        };
        fetch(vultr_api_url + 'snapshot/list', options).then(function(response) {
            return response.json();
        }).then(function(result) {
            let snapshot_html_block = '';
            for(var s in result) {
                snapshot_html_block += '<div class="row divblock">';
                snapshot_html_block += '<div class="col-sm-4">Description</div><div class="col-sm-8">' + result[s]['description'] + '</div>';
                snapshot_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result[s]['SNAPSHOTID'] + '</div>';
                snapshot_html_block += '<div class="col-sm-4">Date</div><div class="col-sm-8">' + result[s]['date_created'] + '</div>';
                snapshot_html_block += '<div class="col-sm-4">Size</div><div class="col-sm-8">' + parseFloat(result[s]['size'])/(1024*1024*1024) + ' GB' + '</div>';
                snapshot_html_block += '<div class="col-sm-4">Status</div><div class="col-sm-8">' + result[s]['status'] + '</div>';
                snapshot_html_block += '</div>';
            }

            $("#" + div_id).html(snapshot_html_block);
            updateStatus('Loaded snapshot information.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });  
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_vultr_dns_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr DNS information
        let options = {
            method: 'GET',
            headers: {
              'API-Key':   api_key
            }
        };
        fetch(vultr_api_url + 'dns/list', options).then(function(response) {
            return response.json();
        }).then(function(result) {
            let dns_html_block = '';
            for(var s in result) {
                dns_html_block += '<div class="row divblock">';
                dns_html_block += '<div class="col-sm-4">Domain</div><div class="col-sm-8">' + result[s]['domain'] + '</div>';
                dns_html_block += '<div class="col-sm-4">Creation date</div><div class="col-sm-8">' + result[s]['date_created'] + '</div>';
                dns_html_block += '</div>';
            }

            $("#" + div_id).html(dns_html_block);
            updateStatus('Loaded DNS information.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });         
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}
