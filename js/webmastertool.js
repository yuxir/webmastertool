'use strict';

// on document ready
document.addEventListener('DOMContentLoaded', function() {
    // init tabs
    $(function() {
        $( "#tabs" ).tabs();
        $( "#vultr-div" ).accordion();

        // Load Vultr account information
        let balance             = '-43.01';
        let pending_charges     = '3.72';
        let last_payment_date   = '2018-01-22 07:52:58';
        let last_payment_amount = '-100.00';
        let account_html_block = '';
        account_html_block += 'Balance: '              + balance + '<br/>';
        account_html_block += 'Pending charges: '      + pending_charges + '<br/>';
        account_html_block += 'Last payment date: '    + last_payment_date + '<br/>';
        account_html_block += 'Last payment account: ' + last_payment_amount + '<br/>';
        $("#vultr-account").html(account_html_block);


        // Load Vultr server information
        let servers = ["server1", "server2"];
        let server_html_block = '';
        servers.forEach(function(server, index, array) {
            server_html_block += server + '<br/>';
        });
        $("#vultr-server").html(server_html_block);

        // Load Vultr backup information
        let backups = ["backup1", "backup2"];
        let backup_html_block = '';
        backups.forEach(function(backup, index, array) {
            backup_html_block += backup + '<br/>';
        });
        $("#vultr-backup").html(backup_html_block);

        // Load Vultr snapshot information
        let snapshots = ["snapshot1", "snapshot2"];
        let snapshot_html_block = '';
        snapshots.forEach(function(snapshot, index, array) {
            snapshot_html_block += snapshot + '<br/>';
        });
        $("#vultr-snapshot").html(snapshot_html_block);


        $("#info-window").html(' Loaded.');
    });

}, false);

