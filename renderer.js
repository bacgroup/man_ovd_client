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

var ubuntu = ""

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
    });
}

function check_os() {
    return new Promise (function (res,rej) {
            try {
                $("#msj").html("Checking OS compatibility...");
                os = child_sync("cat /etc/*release|grep 'DISTRIB_DESCRIPTION'| cut -d'=' -f2 | sed 's/\"//g'");
                status = "Detected"
                if (os.includes("Ubuntu") && os.includes("18.04")) {
                run["ubuntu"] = "18.04"
                os_run[process.platform].replace("OVDNativeClient.jar", "OVDNativeClient_18.04.jar");
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
                if (java_version < 1.8 || java_version == 0 || isNaN(java_version)) {
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

function run_ads_client() {
    return new Promise (function (res,rej) {
            try {


                os = child_sync("cat /etc/*release|grep 'DISTRIB_DESCRIPTION'| cut -d'=' -f2 | sed 's/\"//g'");
                if (os.includes("Ubuntu") && os.includes("18.04")) {
                run["ubuntu"] = "18.04"
                    os_run[process.platform] = os_run[process.platform].replace("OVDNativeClient.jar", "OVDNativeClient_18.04.jar");
                    child(os_run[process.platform]);
                res('DONE');
                }
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
     .delay(500)
     .then(result => run_ads_client(result))
     .delay(2000)
     .then( result => { w.close() })
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

