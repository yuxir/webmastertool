'use strict';

const api_url = 'https://api.vultr.com/';

const update_account_info = (api_key, div_id) => {
    if (api_key) {
        // Load Vultr account information
        $.ajax({
            type: "GET",
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

