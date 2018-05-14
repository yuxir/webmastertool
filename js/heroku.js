'use strict';

const heroku_api_url = 'https://api.heroku.com/';

const update_heroku_account_info = (api_key, div_id) => {
    if (api_key) {
        // Load Heroku account information
        $.ajax({
            type: "GET",
            url: heroku_api_url + 'account',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
                xhr.setRequestHeader('Accept', "application/vnd.heroku+json; version=3");
            },
            success: function (result) {  // update account info
                let account_html_block = '';
                
		        account_html_block += '<div class="row">';
                account_html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result['id'] + '</div>';
                account_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + result['name'] + '</div>';
                account_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + result['email'] + '</div>';
                account_html_block += '<div class="col-sm-4">Sms number</div><div class="col-sm-8">' + result['sms_number'] + '</div>';
                account_html_block += '<div class="col-sm-4">Identity Provider</div><div class="col-sm-8">' + result['identity_provider'] + '</div>';
                account_html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + result['created_at'] + '</div>';
                account_html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + result['updated_at'] + '</div>';
   		        account_html_block += '<div class="col-sm-4">Last login</div><div class="col-sm-8">' + result['last_login'] + '</div>';
                account_html_block += '</div>';
                
                $("#" + div_id).html(account_html_block);
                updateStatus('Loaded account info.');
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

const update_heroku_apps_info = (api_key, div_id) => {
    if (api_key) {
        // Load Heroku application information
        $.ajax({
            type: "GET",
            url: heroku_api_url + 'apps',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
                xhr.setRequestHeader('Accept', "application/vnd.heroku+json; version=3");
            },
            success: function (result) {  // update apps info
                let apps_html_block = '';
                for(var s in result) {
		           apps_html_block += '<div class="row divblock">';
                   apps_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + result[s]['name'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Buildpack</div><div class="col-sm-8">' + result[s]['buildpack_provided_description'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Repo size</div><div class="col-sm-8">' + result[s]['repo_size'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Slug size</div><div class="col-sm-8">' + result[s]['slug_size'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Created at</div><div class="col-sm-8">' + result[s]['created_at'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Released at</div><div class="col-sm-8">' + result[s]['released_at'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Updated at</div><div class="col-sm-8">' + result[s]['updated_at'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Region</div><div class="col-sm-8">' + result[s]['region']['name'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Git url</div><div class="col-sm-8">' + result[s]['git_url'] + '</div>';
                   apps_html_block += '<div class="col-sm-4">Url</div><div class="col-sm-8"><a target="_blank" href="' + result[s]['web_url'] + '">' + result[s]['web_url'] + '</a></div>';
   		           apps_html_block += '</div>';
                   
                   // update dyno info
                   update_heroku_dynos_info(api_key, result[s]['id'], 'heroku-dynos');
                }
                $("#" + div_id).html(apps_html_block);
                updateStatus('Loaded apps info.');
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

const update_heroku_dynos_info = (api_key, appid, div_id) => {
    if (api_key) {
        // Load Heroku dyno information
        $.ajax({
            type: "GET",
            url: heroku_api_url + appid + '/dynos',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + api_key);
                xhr.setRequestHeader('Accept', "application/vnd.heroku+json; version=3");
            },
            success: function (result) {  // update dyno info
                let html_block = '';
                for(var s in result) {
		           html_block += '<div class="row divblock">';
                   html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + result[s]['name'] + '</div>';
                   html_block += '<div class="col-sm-4">ID</div><div class="col-sm-8">' + result[s]['id'] + '</div>';
                   html_block += '</div>';
                }
                $("#" + div_id).html(html_block);
                updateStatus('Loaded dyno info.');
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
