/*jshint esversion: 6 */
const remote = require('electron').remote
child = require('child_process').exec;
moment = require('moment');

request = require("request-with-cookies");
window.$ = window.jQuery = require('jquery');

notifier = require('node-notifier');

var ready = false;

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

function show_login(){
    $('#inner_box').show();
    $('#progress').hide();
}

$(".logo").click(function() {
    //$(this).animateCss('wobble');
    window.open("https://manconsulting.co.uk","MAN Consulting", "width=1280,height=700")
});

function create_os_command() {
    return new Promise (function (res,rej) {
    //st=$('select[name=st]').val();
    sm=$("#sm").val();
    try {
        os_rdp_exe = {
            linux: "java -jar  "+__dirname+"/OVDNativeClient/OVDNativeClient.jar -s "+sm+" -u "+$("#login").val()+" -p "+$("#pwd").val(),
            win32: "java.exe -jar  "+__dirname+"\OVDNativeClient\OVDNativeClient.jar -s "+sm+" -u "+$("#login").val()+" -p "+$("#pwd").val(),
            darwin: "java -jar  "+__dirname+"/OVDNativeClient/OVDNativeClient.jar -s "+sm+" -u "+$("#login").val()+" -p "+$("#pwd").val()
        };
        alert(os_rdp_exe[process.platform])
        res(os_rdp_exe[process.platform]);
    }
    catch(err) {
        rej(err);
    }

    });
}

function run_rdp(command){
    return new Promise (function (res,rej) {
           try {

                   child(command, function(error, stdout, stderr) {
                   console.log('stdout: ' + stdout);
                   console.log('stderr: ' + stderr);
                   if (stderr != "") {
                       //console.log('exec error: ' + error);
                       reject("Jar Error");
                   }
                   });

                console.log(command);
                console.log("Corriendo RDP");
                res('Done');
            }
            catch(err)
            {
                rej(err);
            }
    });
}

function close_window(done){
    return new Promise (function (res,rej) {
           try {
               remote.getCurrentWindow().close()
            }
            catch(err)
            {
                rej(err);
            }
    });
}


$("#connect").click(function() {
     //set_status("Connecting to OVD", true);
     notify(__dirname+"/conecting.png","Conecting to your OVD Session Manager", "Please wait...");
     $('#inner_box').hide();
     $('#progress').show();
     create_os_command()
     .then(command => run_rdp(command))
     .then(result => close_window(result))
    .catch(rejection => { 
	     notify(__dirname+"/warning.png","Please install Java JRE 8 or better.", "Reason: "+rejection);
	     show_login();
     });
});

$("input").change(function() {
  sm=$(this).val();
  $(this).val(sm.replace(/(^\w+:|^)\/\//, ''));
});
