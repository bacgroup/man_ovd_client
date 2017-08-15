   child_process = require('child_process')
   window.$ = window.jQuery = require('jquery');
    $( "#connect" ).click(function() {
    login = $( "#login" ).val()
    pwd = $( "#pwd" ).val()
    sm = $( "#sm" ).val()

    $( "#connect" ).prop("disabled",true);
    

    $.ajax({
      url:sm+"/ovd/proxy.php",
      type:"POST",
      headers: {
          "x-ovd-service": "start"
      },
      data: '<session mode="desktop" language="es" timezone="America/Guatemala"><user login="'+login+'" password="'+pwd+'"/></session>',
      dataType: "text",
      success:function(response){

      child_process.execSync("sleep 10");

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
      executablePath = "/usr/bin/rdesktop -u "+login+" -p '"+password+"' "+fqdn+":"+port+" -f -r printer:`lpstat -d | cut -d':' -f2 | cut -d' ' -f2`=\"Ulteo TS Printer Driver\"";
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
        $( "#connect" ).prop("disabled",false);

        if (error !== null) {
            console.log('exec error: ' + error);
            $( "#connect" ).prop("disabled",false);

        }
    });

    }
      },
      error:function(data){
       //alert("failure");
      },
    })
});
