$(document).ready(function () {
    $('#submit').prop('disabled', true)
});

function daftar() {
    dataNa = {
        nama: $("#nama").val(),
        username: $("#username").val(),
        email: $("#email").val(),
        alamat: $("#alamat").val(),
        phone: $("#phone").val(),
        password: $("#password").val()
    }

    swal({
        icon: "info",
        title: "Tunggu...",
        text: "Mohon Menunggu, Pendaftaran Anda sedang di Proses",
        button: false,
    });

    $.ajax({
        url: "/api/register",
        type: "POST",
        data: JSON.stringify(dataNa),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        // beforeSend: function (xhr, settings) {
        //     xhr.setRequestHeader("Authorization", "Bearer " + token);
        // },
        // headers: {
        //     Accept: "application/json",
        // },
        success: function (data) {
            swal({
                icon: "success",
                title: "Berhasil",
                text: "Permintaan Berhasil di Proses",
                button: false,
            });
        },
        error: function (xhr, XMLHttpRequest, textStatus, errorThrown) {
            swal({
                icon: "error",
                title: "Register Gagal",
                text: xhr.responseText,
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
