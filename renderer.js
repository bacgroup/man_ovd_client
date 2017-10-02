child = require('child_process').exec
request = require("request-with-cookies");
window.$ = window.jQuery = require('jquery');

const notifier = require('node-notifier');

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

function notify(icon, title, msj) {
    notifier.notify({
    'icon': icon,
    'title': title,
    'message': msj
});
}
function wait_for_ready_state()
{
        sm = $("#sm").val()
        
        options = {
            method: 'POST',
            headers: {'x-ovd-service': 'session_status', 'Cookie': 'PHPSESSID=ooddfdfdf34'}
        };

        client = request.createClient(options);
        client(sm+"/ovd/proxy.php",function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(response.body)
                setTimeout(function() {
                xmlDoc = $.parseXML(response.body);
                $xml = $(xmlDoc);
                try {
                $.each($xml.find('session'), function() {
                    status = $(this).attr("status");
                });
                }
                catch(err)
                {
                    return "None"
                }
                console.log(status);
                return(status);
                }, 2000);
            }
            else {
                return "None"
            }
        });
}


function check_ovd_status(ovd_data) {
    	return new Promise (function (res,rej) {
            
        //~ for (i = 0;  wait_for_ready_state() != "ready"; i++) {
            //~ console.log("Waiting Ready");
        //~ }
        
        //~ console.log("OVD is Ready");
        //~ res(ovd_data);
            
        login = $("#login").val()
        pwd = $("#pwd").val()
        sm = $("#sm").val()
        
        options = {
            method: 'POST',
            headers: {'x-ovd-service': 'session_status', 'Cookie': 'PHPSESSID=pokemon2'}
        };

        client = request.createClient(options);
        client(sm+"/ovd/proxy.php",function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(response.body)
                setTimeout(function() {
                xmlDoc = $.parseXML(response.body);
                $xml = $(xmlDoc);
                try {
                $.each($xml.find('session'), function() {
                    status = $(this).attr("status");
                });
                }
                catch(err)
                {
                    status = "None"
                }
                if(status == "init")
                {   
                    console.log(status);
                    check_ovd_status(ovd_data);
                    //notify(__dirname+"/conecting.png","Waiting when your OVD Session is Ready", "Please wait for a while...");
                }
                else if (status == "ready") {
                    console.log(response.body);
                    //ovd_data
                    validate_xml_response(ovd_data)
                    .then(xml => get_ovd_credentials(xml))
                    .then(params => create_os_command(params))
                    .then(command => run_rdp(command))
                   .catch(rejection => notify(__dirname+"/warning.png","Please contact your OVD Session Manager", "Reason for Rejection: "+rejection));
                }
                else {
                    console.log(status);
                    rej("Cant to connect");
                }
                }, 2000);
                //~ if (status == "ready") {
                    //~ console.log(status);
                    //~ res(ovd_data);
                //~ }
            }
            else {
                $("#connect").animateCss('wobble');
                rej("Unable to connect to OVD server");
            }
        });

        //~ $.ajax({
            //~ url: sm + "/ovd/proxy.php",
            //~ type: "POST",
            //~ async: true,
            //~ headers: {
                //~ "x-ovd-service": "session_status",
                //~ 'Cookie': 'PHPSESSID=Pokemon'
            //~ },
            //~ data: '<session mode="desktop"><user login="' + login + '" password="' + pwd + '"/></session>',
            //~ dataType: "text",
            //~ success: function(response) {
                //~ setTimeout(function() {
                //~ xmlDoc = $.parseXML(response);
                //~ $xml = $(xmlDoc);
                //~ try {
                //~ $.each($xml.find('session'), function() {
                    //~ response = $(this).attr("status");
                //~ });
                //~ }
                //~ catch(err)
                //~ {
                    //~ response = "None"
                //~ }
                //~ if(response == "init")
                //~ {   
                    //~ console.log(response);
                    //~ check_ovd_status(ovd_data);
                    //~ //notify(__dirname+"/conecting.png","Waiting when your OVD Session is Ready", "Please wait for a while...");
                //~ }
                //~ else if (response == "ready") {
                    //~ console.log(response);
                    //~ //res(ovd_data);
                //~ }
                //~ else {
                    //~ console.log(response);
                    //~ rej("Cant to connect");
                //~ }
                //~ }, 2000);
                //~ if (response == "ready") {
                    //~ console.log(response);
                    //~ res(ovd_data);
                //~ }
                //~ },
            //~ error: function(data) {
                //~ $("#connect").animateCss('wobble');
                //~ rej("Unable to connect to OVD server");
            //~ },
        //~ });
});
}

function start_session() {
    	return new Promise (function (res,rej) {
        login = $("#login").val()
        pwd = $("#pwd").val()
        sm = $("#sm").val()
        
        options = {
            method: 'POST',
            headers: {'x-ovd-service': 'start', 'Cookie': 'PHPSESSID=pokemon2'},
            body: '<session mode="desktop"><user login="' + login + '" password="' + pwd + '"/></session>'
        };

        client = request.createClient(options);
        client(sm+"/ovd/proxy.php",function (error, response, body) {
        if (!error && response.statusCode == 200) {
            notify(__dirname+"/conecting.png","Conecting to your OVD Session Manager", "Please wait for a while...");
            res(response.body)
        }
        else {
                $("#connect").animateCss('wobble');
                rej("Unable to connect to OVD server");
        }
        });
        
        
        //~ $.ajax({
            //~ url: sm + "/ovd/proxy.php",
            //~ type: "POST",
            //~ headers: {
                //~ "x-ovd-service": "start",
                //~ 'Cookie': 'PHPSESSID=Pokemon'

            //~ },
            //~ data: '<session mode="desktop"><user login="' + login + '" password="' + pwd + '"/></session>',
            //~ dataType: "text",
            //~ success: function(response) {
                //~ notify(__dirname+"/conecting.png","Conecting to your OVD Session Manager", "Please wait for a while...");
                //~ res(response);
                //~ },
            //~ error: function(data) {
                //~ $("#connect").animateCss('wobble');
                //~ rej("Unable to connect to OVD server");
            //~ },
        //~ });
});
}

function validate_xml_response(xml) {
    return new Promise (function (res,rej) {
    try {
        xmlDoc = $.parseXML(xml);
        $xml = $(xmlDoc);
        $.each($xml.find('response'), function() {
            response = $(this).attr("code");
        });
        if(response != undefined && response != 'ReferenceError: response is not defined')
        {
            $("#connect").animateCss('wobble');
            rej(response);
        }
        }
        catch(err)
        {
            res(xml);
        }
    });
}

function get_ovd_credentials(xml) {
    return new Promise (function (res,rej) {
    try {
        xmlDoc = $.parseXML(xml);
        $xml = $(xmlDoc);
        params = {};
         $.each($xml.find('server'), function() {
           params['login'] = $(this).attr("login");
           params['fqdn'] = $(this).attr("fqdn");
           try{
           params['port'] = $(this).attr("port");
           }
           catch(err)
           {
               params[port] = 3389
           }
           params['password'] = $(this).attr("password");
         });
        res(params);
    }
    catch(err)
    {
        $("#connect").animateCss('wobble');
        rej("Unable to Login, OVD Server provides wrong Credential Data, "+err); 
    }
});
    
}

function create_os_command(params) {
    return new Promise (function (res,rej) {
    try {    
        os_rdp_exe = {
            linux: "xfreerdp /v:" + params['fqdn'] + ":" + params['port'] + " /u:" + params['login'] + " /p:'" + params['password'] + "' /sec:rdp /drive:home,$HOME /printer +clipboard /jpeg /parent-window:`xwininfo -name 'MAN OVD Client' | grep 'Window id' | cut -d' ' -f4` /size:`xwininfo -name 'MAN OVD Client' | grep 'Width' | tr -s ' '|cut -d' ' -f3`x`xwininfo -name 'MAN OVD Client' | grep 'Height' | tr -s ' '|cut -d' ' -f3`",
            win32: "resources\\app\\rdp.exe /v:" + params['fqdn'] + ":" + params['port'] + " /u:" + params['login'] + " /p:" + params['password'] + " /printers /drives /max",
            darwin: "open "+__dirname+"/MacFreeRDP/MacFreeRDP.app --args /f /v:" + params['fqdn'] + ":" + params['port'] + " /u:" + params['login'] + " /p:'" + params['password'] + "' /sec:rdp /drive:home,$HOME /printer +clipboard"
        }
        res(os_rdp_exe[process.platform]);
    }
    catch(err) {
        rej(err);
    }
        
    })    
}

function run_rdp(command){
    return new Promise (function (res,rej) {
        try {
            child(command);
            console.log("Corriendo RDP")
            res('Done');
        }
        catch(err)
        {
            rej(err);
        }
        
    });
    
}

$("#connect").click(function() {
     document.cookie = "PHPSESSID="+$("#login").val();
     start_session()
     .then(ovd_data => check_ovd_status(ovd_data))
    .catch(rejection => notify(__dirname+"/warning.png","Please contact your OVD Session Manager", "Reason for Rejection.: "+rejection));
});
