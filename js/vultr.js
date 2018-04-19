'use strict';

const api_url = 'https://api.vultr.com/';

const update_account_info = (api_key, div) => {
    $.ajax({
        type: "GET",
        //headers: {"API-Key": api_key},
        url: 'https://api.vultr.com/v1/account/info',
        beforeSend: function(xhr){xhr.setRequestHeader('API-Key', api_key);},
        success: function(result) {
            console.log(result);
            console.log(result['balance']);
            console.log(result['pending_charges']);
            console.log(result['last_payment_amount']);
            console.log(result['pending_charges']);
        },
        error: function(request, status, error) {
            console.log('error');
            console.log(request.responseText);
            console.log(error);
            console.log(status);
        },
        complete: function(data) {
            console.log('done');
        }
    });
}

