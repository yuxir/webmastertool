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
            success: function (result) {
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

