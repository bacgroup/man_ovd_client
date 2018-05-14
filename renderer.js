/*jshint esversion: 6 */
const remote = require('electron').remote
child = require('child_process').exec;
child_run = require('child_process').exec;
moment = require('moment');
request = require("request-with-cookies");
window.$ = window.jQuery = require('jquery');

notifier = require('node-notifier');

let w = remote.getCurrentWindow()


$( document ).ready(function() {

os = {
    darwin: "JAVA=`echo \"$(java -version 2>&1)\" | grep \"java version\"`;echo ${JAVA:14:9}"
}

os_run = {
    darwin: "java -jar  "+__dirname+"/OVDNativeClient/OVDNativeClient.jar"
}

child(os[process.platform], function(error, stdout, stderr) {
    if(stdout.includes("1.8."))
    {   

        child_run(os_run[process.platform], function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
        console.log('exec error: ' + error);
        }
        });
        setTimeout(function(){ w.close(); }, 3000);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});



});

