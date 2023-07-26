<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sipakat | Login</title>

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

<body class="hold-transition">
    <section class="">
        <div class="container-fluid h-custom" style="background-color: #044500">
            <div class="row d-flex justify-content-center align-items-center vh-100">
                <div class="col-5 text-white d-none d-xl-block text-center">
                    <img class="img-fluid" src="img/loginbaznas.png" width="180px" alt="">
                    <div class="text-center text-bold text-xl">BAZNAS</div>
                    <div class="text-center" style="margin-top: -10px">Kota Parepare</div>
                </div>
                <div class="col-9 col-sm-7 col-md-6 col-lg-3 col-xl-3 offset-xl-1 px-3 pt-2 mb-10 text-center"
                    style="border-radius: 10px;background-color: #A0de98">
                    <form>
                        <div class="mb-4 mt-4">
                            <img class="img-fluid m-2" src="img/loginbaznas.png" width="70px" alt="">
                            <img class="img-fluid" src="img/dsada.png" width="90px" alt="">
                            <div class="text-center text-bold mt-1">BAZNAS Kota Parepare</div>
                            <h5 class="text-center fw-bold mx-3 mb-0">Login</h5>
                        </div>

                        <form action="index3.html" method="post">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Username / Email"
                                    id="email">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password" id="password">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="g-recaptcha" data-sitekey="6LcLKrYlAAAAABr-VA-lOLHICWEdyw6IHlOk00qH"
                                data-callback='doSomething' data-expired-callback="expireCaptcha"
                                style="transform: scale(0.89); -webkit-transform: scale(0.89); transform-origin: 0 0; -webkit-transform-origin: 0 0;">
                            </div>
                            <hr>
                            <div class="row d-flex justify-content-between">
                                <div class="col-4">
                                    <button type="button" class="btn-sm btn btn-success btn-block" id="submit"
                                        onclick="login()">Sign
                                        In</button>
                                </div>
                                <div class="col-5">
                                    <div class="icheck-primary">
                                        <a href="#" class="text-xs text-right" nowrap>
                                            Lupa Password ?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div class="social-auth-links text-center mt-2 mb-3">
                            <a href="/register" class="btn-sm btn btn-block btn-outline-success">
                                Daftar Baru
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="js/adminlte.min.js"></script>
    <!-- Sweetalert2 App -->
    <script src="plugins/sweetalert.min.js"></script>
    <script src="js/auth/login.js"></script>
</body>

</html>
