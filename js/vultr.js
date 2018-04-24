'use strict';

const api_url = 'https://api.vultr.com/';

const update_account_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr account information
        $.ajax({
            type: "GET",
            //headers: {"API-Key": api_key},
            url: 'https://api.vultr.com/v1/account/info',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('API-Key', api_key);
            },
            success: function (result) {
                let balance = result['balance'];
                let pending_charges = result['pending_charges'];
                let last_payment_date = result['last_payment_date'];
                let last_payment_amount = result['last_payment_amount'];
                let account_html_block = '';
                account_html_block += 'Balance: ' + balance + '<br/>';
                account_html_block += 'Pending charges: ' + pending_charges + '<br/>';
                account_html_block += 'Last payment date: ' + last_payment_date + '<br/>';
                account_html_block += 'Last payment account: ' + last_payment_amount + '<br/>';
                $("#" + div_id).html(account_html_block);
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
                updateStatus('Loaded account information.');
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_server_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr server information
        $.ajax({
            type: "GET",
            url: 'https://api.vultr.com/v1/server/list',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('API-Key', api_key);
            },
            success: function (result) {
                let server_html_block = '';
                for(var s in result) {
                    server_html_block += '<h4>Server: ' + result[s]['label']    + '</h4>';
                    server_html_block += 'Location: '   + result[s]['location'] + '<br/>';
                    server_html_block += 'IP: '         + result[s]['main_ip']  + '<br/>';
                    server_html_block += 'Ram: '        + result[s]['ram']      + '<br/>';
                    server_html_block += 'Disk: '       + result[s]['disk']     + '<br/>';
                }

                $("#" + div_id).html(server_html_block);
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
                updateStatus('Loaded server information.');
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_backup_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr backup information
        $.ajax({
            type: "GET",
            url: 'https://api.vultr.com/v1/backup/list',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('API-Key', api_key);
            },
            success: function (result) {
                let backup_html_block = '';
                for(var s in result) {
                    backup_html_block += '<h4>Description: ' + result[s]['description']    + '</h4>';
                    backup_html_block += 'ID: '              + result[s]['BACKUPID']  + '<br/>';
                    backup_html_block += 'Date: '            + result[s]['date_created'] + '<br/>';
                    backup_html_block += 'Size: '            + parseFloat(result[s]['size'])/(1024*1024*1024) + ' GB<br/>';
                    backup_html_block += 'Status: '          + result[s]['status']     + '<br/>';
                }

                $("#" + div_id).html(backup_html_block);
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
                updateStatus('Loaded backup information.');
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

const update_snapshot_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr snapshot information
        $.ajax({
            type: "GET",
            url: 'https://api.vultr.com/v1/snapshot/list',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('API-Key', api_key);
            },
            success: function (result) {
                let snapshot_html_block = '';
                for(var s in result) {
                    snapshot_html_block += '<h4>Description: ' + result[s]['description']    + '</h4>';
                    snapshot_html_block += 'ID: '              + result[s]['SNAPSHOTID']  + '<br/>';
                    snapshot_html_block += 'Date: '            + result[s]['date_created'] + '<br/>';
                    snapshot_html_block += 'Size: '            + parseFloat(result[s]['size'])/(1024*1024*1024) + ' GB<br/>';
                    snapshot_html_block += 'Status: '          + result[s]['status']     + '<br/>';
                }

                $("#" + div_id).html(snapshot_html_block);
            },
            error: function (request, status, error) {
                let html = '<span style="color:red;">Error: ' + request.responseText + '</span>';
                updateStatus(html);
            },
            complete: function (data) {
                updateStatus('Loaded snapshot information.');
            }
        });
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}

