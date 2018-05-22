'use strict';

const namesilo_api_url = 'https://www.namesilo.com/api/';

// Load namesilo user information
const update_namesilo_user_info = (api_key, div_id) => {
    if (api_key) {
        // Call namesilo API to get user info
        fetch(namesilo_api_url + 'contactList?version=1&type=xml&key=' + api_key).then(function(response) {
          return response.text();            
        }).then(function(data) {
            let xmlDoc = $.parseXML( data ); 
            let xml    = $(xmlDoc);
            
            // Construct HTML for user DIV in 'cloudflare' tab
            let user_html_block = '';
                
            user_html_block += '<div class="row">';
            user_html_block += '<div class="col-sm-4">Name</div><div class="col-sm-8">' + xml.find('first_name').text() + ' ' + xml.find('last_name').text() + '</div>';
            user_html_block += '<div class="col-sm-4">Address</div><div class="col-sm-8">';
            user_html_block += xml.find('address').text() + '<br/>';
            user_html_block += xml.find('address2').text() + '<br/>';
            user_html_block += xml.find('city').text() + '<br/>';
            user_html_block += xml.find('state').text() + '<br/>';
            user_html_block += xml.find('zip').text() + '<br/>';
            user_html_block += xml.find('country').text() + '<br/>';
            user_html_block += '</div>';
            user_html_block += '<div class="col-sm-4">Email</div><div class="col-sm-8">' + xml.find('email').text() + '</div>';
            user_html_block += '<div class="col-sm-4">Phone</div><div class="col-sm-8">' + xml.find('phone').text() + '</div>';
            
            user_html_block += '</div>';
                
            // Update user UI
            $("#" + div_id).html(user_html_block);
            // Update status bar
            updateStatus('Loaded user info.');
        }).catch(function(err) {
            let html = '<span style="color:red;">Error: ' + err + '</span>';
            updateStatus(html);
        });        
    }else{
        let html = '<span style="color:red;">Invalid API key.</span>';
        updateStatus(html);
    }
}
