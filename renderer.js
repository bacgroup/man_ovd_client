child_process = require('child_process')
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

function start_session() {
    	return new Promise (function (res,rej) {
        login = $("#login").val()
        pwd = $("#pwd").val()
        sm = $("#sm").val()
        $.ajax({
            url: sm + "/ovd/proxy.php",
            type: "POST",
            headers: {
                "x-ovd-service": "start"
            },
            data: '<session mode="desktop"><user login="' + login + '" password="' + pwd + '"/></session>',
            dataType: "text",
            success: function(response) {
                res(response);
                },
            error: function(data) {
                rej({error : "Can't to Connect"});
            },
        });
});
}

function validate_xml_response(xml) {
    return new Promise (function (res,rej) {
        var xmlDoc = $.parseXML(xml),
        $xml = $(xmlDoc);
        try {
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
            res("xml");
        }
    });
}
            
            
/*            
               $.each($xml.find('server'), function() {
                   login = $(this).attr("login");
                   fqdn = $(this).attr("fqdn");
                   port = $(this).attr("port");
                   password = $(this).attr("password");
               });
               if (port == null) {
                   port = 3389
               };
               var executablePath;
               if (process.platform == "linux") {
                   var child = require('child_process').exec;
                   executablePath = "xfreerdp /v:" + fqdn + ":" + port + " /u:" + login + " /p:'" + password + "' /sec:rdp /drive:home,$HOME /printer +clipboard /jpeg /parent-window:`xwininfo -name 'MAN OVD Client' | grep 'Window id' | cut -d' ' -f4` /size:`xwininfo -name 'MAN OVD Client' | grep 'Width' | tr -s ' '|cut -d' ' -f3`x`xwininfo -name 'MAN OVD Client' | grep 'Height' | tr -s ' '|cut -d' ' -f3`";
                   setTimeout(() => child(executablePath), 5000);
               } else if (process.platform == "darwin") {
                   var child = require('child_process').execSync;
                   //executablePath = __dirname+"/rdesktop/bin/rdesktop -u "+login+" -p '"+password+"' -f -r printer:`lpstat -d | cut -d':' -f2 | cut -d' ' -f2`=\"Ulteo TS Printer Driver\" -r disk:share=$HOME "+fqdn+":"+port;
                   executablePath = "open "+__dirname+"/MacFreeRDP/MacFreeRDP.app --args /f /v:" + fqdn + ":" + port + " /u:" + login + " /p:'" + password + "' /sec:rdp /drive:home,$HOME /printer +clipboard"
                   //executablePath = "@rpath"+__dirname+"/xfreerdp_darwin/lib/ && "+__dirname+"/xfreerdp_darwin/bin/xfreerdp /f /v:" + fqdn + ":" + port + " /u:" + login + " /p:'" + password + "' /sec:rdp /drive:home,$HOME /printer +clipboard"
                   //alert(executablePath);
                   var child2 = require('child_process').execSync;
                       child(executablePath);
               }
               //else if (process.platform == "win32"){
               else {
                   var child = require('child_process').exec;
                   executablePath = "resources\\app\\rdp.exe /v:" + fqdn + ":" + port + " /u:" + login + " /p:" + password + " /printers /drives /max";
                   setTimeout(() => child(executablePath), 5000);               }

           },
           error: function(data) {
               alert("failure");
           },
       }) */
    

   

   $("#connect").click(function() {
         start_session()
        .then(xml => validate_xml_response(xml))
        //.then(response => alert(response))
        .catch(rejection => notify(__dirname+"/warning.png","Please contact your OVD Session Manager", "Reason for Rejection: "+rejection));
   });
