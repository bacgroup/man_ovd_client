var db = new PouchDB('logins');

$(document).ready(function() {
    $('#progress').hide();
    $('#connect').click(function() {
        $('#inner_box').hide();
        $('#progress').show();
        setTimeout(function() {
            $('#inner_box').show();
            $('#progress').hide();
        }, 30000);

        db.put({
            _id: '34',
            login: $("#login").val(),
            password: $("#pwd").val(),
            sm: $("#sm").val()
        });

        db.get('34')
            .then(function(doc) {
                doc.login = $("#login").val();
                doc.password = $("#pwd").val();
                doc.sm = $("#sm").val();
                return db.put(doc);
            })
            .then(function() {
                return db.get('34');
            }).then(function(doc) {
                console.log(doc);
            });

    });

    db.get('34')
        .then(function(doc) {
            $("#login").val(doc["login"]);
            $("#pwd").val(doc["password"]);
            $("#sm").val(doc["sm"]);

        })
        .catch(function(err) {
            console.log(err)
        })


});
