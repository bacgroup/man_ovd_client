   window.$ = window.jQuery = require('jquery');
    $( "#connect" ).click(function() {
    login = $( "#login" ).val()
    pwd = $( "#pwd" ).val()
    sm = $( "#sm" ).val()
    $.ajax({
      url:sm+"/ovd/proxy.php",
      type:"POST",
      headers: {
          "x-ovd-service": "start"
      },
      data: '<session mode="desktop" language="es" timezone="America/Guatemala"><user login="'+login+'" password="'+pwd+'"/></session>',
      dataType: "text",
      success:function(response){
        var xml = response,
        xmlDoc = $.parseXML(xml),
        $xml = $(xmlDoc);

        $.each($xml.find('server'), function () {
            login = $(this).attr("login");
            fqdn = $(this).attr("fqdn");
            port = $(this).attr("port");
            password = $(this).attr("password");
        });

     var executablePath;
     if (process.platform == "linux") {
      var child = require('child_process').exec;
      executablePath = "/usr/bin/rdesktop -u "+login+" -p '"+password+"' "+fqdn+":"+port;
      //alert(executablePath);
      child(executablePath, function(error, stdout, stderr) {
        //alert('stdout: ' + stdout);
        //alert('stderr: ' + stderr);
        if (error !== null) {
            //alert('exec error: ' + error);
        }
    });
    }
    else if (process.platform == "darwin"){
     var child = require('child_process').execFile;
      executablePath = "/usr/bin/open";
      opt = "rdp://"+login+":"+password+"@"+fqdn+":"+port+"?forwardDisks###yes\&forwardPrinters###yes";
      options = [opt];
    child(executablePath, options, function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

    }



      },
      error:function(data){
       alert("failure");
      },
    })
});
