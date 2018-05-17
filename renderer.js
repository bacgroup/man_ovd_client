/*jshint esversion: 6 */
const remote = require('electron').remote
child = require('child_process').exec;
child_sync = require('child_process').execSync;
moment = require('moment');
request = require("request-with-cookies");
window.$ = window.jQuery = require('jquery');

notifier = require('node-notifier');

let w = remote.getCurrentWindow();

$( document ).ready(function() {

var java_check_os = {
    darwin: "JAVA=`echo \"$(java -version 2>&1)\" | grep \"java version\"`;echo ${JAVA:14:9}",
    linux: 'bash -c \'JAVA=`echo "$(java -XshowSettings:properties -version 2>&1)" | grep "java.specification.version"`; echo ${JAVA:32}\''
}

os_run = {
    darwin: "java -jar  "+__dirname+"/OVDNativeClient/OVDNativeClient.jar",
    linux: "java -jar  "+__dirname+"/OVDNativeClient/OVDNativeClient.jar"
}

var run = {}

/*
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
}); */

function delay(t, v) {
   return new Promise(function(resolve) {
       setTimeout(resolve.bind(null, v), t)
   });
}

Promise.prototype.delay = function(t) {
    return this.then(function(v) {
        return delay(t, v);
    });
}

function start_up() {
    return new Promise (function (res,rej) {
            try {
                //$("#msj").html("Initiating system checks");
                res("Initiating system checks...");
            }
            catch(err)
            {
                rej(err);
            }
c    });
}

function check_os() {
    return new Promise (function (res,rej) {
            try {
                $("#msj").html("Checking OS compatibility...");
                os = child_sync("cat /etc/*release|grep 'DISTRIB_DESCRIPTION'| cut -d'=' -f2 | sed 's/\"//g'");
                //if os.includes("ubuntu");
                status = "Detected"
                if (os.includes("Ubuntu") && os.includes("18.04")) {
                run["ubuntu"] = "18.04"
                }
                res(os+" "+status);
            }
            catch(err)
            {
                rej(err);
            }
    });

}

function check_java() {
    return new Promise (function (res,rej) {
            try {
                $("#msj").html("Checking Java version...");
                java_version = parseFloat(child_sync(java_check_os[process.platform]));
                if (java_version <= 1.8 || java_version == 0) {
                rej("JAVA")
                }
                res('Java version "'+java_version+'" is OK');
            }
            catch(err)
            {
                rej("SOME_THING");
            }
    });
}

function show_result(result) {
    return new Promise (function (res,rej) {
            try {
                $("#msj").html(result);
                res("DONE");
            }
            catch(err)
            {
                rej(err);
            }
    });
}

$( document ).ready(function() {
     start_up()
     .delay(500)
     .then(result => show_result(result))
     .delay(500)
     .then(result => check_os(result))
     .delay(500)
     .then(result => show_result(result))
     .delay(500)
     .then(result => check_java(result))
     .delay(500)
     .then(result => show_result(result))
     .catch(error => {
     error_msj={
     JAVA: "Man Application Delivery System requires Java JRE/JDK 1.8 or above.\nPlease install or upgrade your Java.",
     SOME_THING: "Something went wrong."
     }
     alert(error_msj[error]);
     w.close()
     })
});

});

