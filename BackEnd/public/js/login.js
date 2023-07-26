var serverURL = "/";
var serverApi = serverURL + "api/";
var token = null;
var role = null;

if (window.localStorage.getItem("jwttoken")) {
    token = window.localStorage.getItem("jwttoken");
    ajaxCall(serverApi + "userprofile");
}

$(document).ready(function () {
    $('#submit').prop('disabled', true)
});

function login() {
    dataNa = {
        email: $("#email").val(),
        password: $("#password").val(),
    };

    swal({
        icon: "info",
        title: "Tunggu...",
        text: "Mohon Menunggu, Data Anda sedang di Proses",
        button: false,
    });

    $.ajax({
        url: "/api/login",
        type: "POST",
        data: JSON.stringify(dataNa),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var icon = "success";
            var title = "Login Berhasil";
            var text = "Login Berhasil di Proses";
            if (data["status"] == "error") {
                icon = "error";
                title = "Belum Aktif";
                text = data["message"];
            } else if (data["status"] == "failed") {
                icon = "error";
                title = "Login Gagal";
                text = data["message"];
            }

            if (data["status"] == "success") {
                window.localStorage.setItem("jwttoken", data["token"]);
                window.open("/dashboard", "_self");
            }

            swal({
                icon: icon,
                title: title,
                text: text,
                button: false,
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            swal({
                icon: "error",
                title: "Login Gagal",
                text: "Status " + textStatus,
                button: false,
            });
        },
    });
}

function ajaxCall(url, dataNa = null, type = "GET") {
    $.ajax({
        url: url,
        type: type,
        data: dataNa,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        headers: {
            Accept: "application/json",
        },
        success: function (data) {
            var icon = "success";
            var title = "Welcome Back";
            var text = "Go to Dashboard Page";
            var link = 'dashboard'

            if (type == "GET") {
                if (data["status"] == "error") {
                } else {
                    if (data.userProfile.role == 4 || data.userProfile.role == 5 || data.userProfile.role == 6) { link = 'donasi' }
                    else { link = 'dashboard' }
                    role = data.role
                    swal({
                        icon: icon,
                        title: title,
                        text: text,
                        button: false,
                    });
                    window.open("/" + link, "_self");
                }
            } else {
                if (data["status"] == "error") {
                    icon = "error";
                    title = "Belum Aktif";
                    text = data["message"];
                } else if (data["status"] == "failed") {
                    icon = "error";
                    title = "Login Gagal";
                    text = data["message"];
                }

                if (data["status"] == "success") {
                    window.localStorage.setItem("jwttoken", data["token"]);
                    location.reload()
                }

                swal({
                    icon: icon,
                    title: title,
                    text: text,
                    button: false,
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            swal({
                icon: "error",
                title: "Koneksi Gagal",
                text: "Status " + textStatus,
                button: false,
            });
        },
    });
}

function expireCaptcha() {
    $('#submit').prop('disabled', true)
}

function doSomething() {
    if (grecaptcha.getResponse() == "") {
        $('#submit').prop('disabled', true)
    } else {
        $('#submit').prop('disabled', false)
    }
}
