// This is an empty file
//    x = requests.post("", headers=custom_headers, data='')
   window.$ = window.jQuery = require('jquery');

    $( "#connect" ).click(function() {

    login = $( "#login" ).val()
    pwd = $( "#pwd" ).val()
    sm = $( "#sm" ).val()

    //alert(login+pwd+sm);


    $.ajax({
      url:"https://"+sm+"/ovd/proxy.php",
      type:"POST",
      headers: {
          "x-ovd-service": "start"
      },
      data: '<session mode="desktop" language="es" timezone="America/Guatemala"><user login="'+login+'" password="'+pwd+'"/></session>',
      dataType: "text",
      success:function(response){
       //alert(response);


        var xml = response,
        xmlDoc = $.parseXML(xml),
        $xml = $(xmlDoc);

        $.each($xml.find('server'), function () {

            login = $(this).attr("login");
            fqdn = $(this).attr("fqdn");
            port = $(this).attr("port");
            password = $(this).attr("password");

           // alert(login+fqdn+port+password)

        });

       var child = require('child_process').exec;

     if (process.platform = "Linux") {
      //alert("Estas en Linux")
      var executablePath = "/usr/bin/rdesktop -u "+login+" -p '"+password+"' "+fqdn+":"+port+" &";
         //alert(executablePath)
      }
      else {
      var executablePath = "/usr/bin/open";
          var opt = "rdp://"+login+":"+password+"@"+fqdn+":"+port+"?forwardDisks###yes\&forwardPrinters###yes"
      }
      // RDESKTOP
      //  var opt = "-u "+login+" -p "+password+" "+fqdn+":"+port
       //alert(opt)
       //var parameters = [opt];

child(executablePath, function(err, data) {
     //alert(data.toString())
});

      },
      error:function(data){
       alert("failure");
      },
    })
});
