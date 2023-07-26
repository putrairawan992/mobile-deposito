<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sipakat | Register</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="css/adminlte.min.css">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body class="hold-transition login-page" style="background-color: #044500">
    <div class="login-box">
        <!-- /.login-logo -->
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                {{-- <h1>el <b>Baznas</b></h1> --}}
                <img class="rounded" src="img/Logo_BAZNAS_RI-Hijau-01.png" alt="">
                <div class="text-center text-bold" style="margin-top: -10px">Kota Parepare</div>
            </div>
            <div class="card-header text-center">
                <h4><b>Daftar Baru Member</b></h4>
                <form>
                    <div class="input-group mb-3">
                        <input required type="text" class="form-control" placeholder="Nama" id="nama">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input required type="email" class="form-control" placeholder="Username" id="username">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-id-card"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input required type="email" class="form-control" placeholder="Email" id="email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input required type="password" class="form-control" placeholder="Password" id="password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input required type="text" class="form-control" placeholder="Alamat" id="alamat">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-address-card"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input required type="text" class="form-control" placeholder="No Telp / WA" id="phone">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-phone"></span>
                            </div>
                        </div>
                    </div>
                    <div class="g-recaptcha" data-sitekey="6LcLKrYlAAAAABr-VA-lOLHICWEdyw6IHlOk00qH"
                        data-callback='doSomething' data-expired-callback="expireCaptcha"></div>
                    <hr>
                    <div class="row d-flex justify-content-center">
                        <div class="col-4">
                            <button type="button" class="btn btn-success btn-block" id="submit"
                                onclick="daftar()">Daftar</button>
                        </div>
                        <div class="col-4">
                            <a href="/login" class="btn btn-block btn-outline-success">
                                Login
                            </a>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="js/adminlte.min.js"></script>
    <!-- Sweetalert2 App -->
    <script src="plugins/sweetalert.min.js"></script>
    <script src="js/auth/register.js"></script>
</body>

</html>
