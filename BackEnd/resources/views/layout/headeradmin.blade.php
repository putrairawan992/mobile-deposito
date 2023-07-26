<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

    <!-- SA, Excel to JSON, JQUERY -->
    <script src="plugins/sweetalert.min.js"></script>
    <script src="plugins/jquery-3.7.0.min.js"></script>
    <script src="plugins/xlsx.min.js"></script>
    <link href="/output.css" rel="stylesheet">

    <!-- Material Icons Link -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

    <!-- Font Awesome Link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
        crossorigin="anonymous" />

    <link rel="icon" type="image/x-icon" href="/img/Favicon Harta Insan Karimah.png">
</head>

<body>
    <div class="wrapper">
        <!-- Preloader -->
        <div class="preloader" id="preloader" style="background: green">
            <div class="loader"></div>
            <img class="-m-16 pr-2" src="img/Favicon Harta Insan Karimah.png" alt="HIK Logo" height="62"
                width="62">
        </div>

        <!-- Navbar -->
        @include('layout.topbar')
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        @include('layout.sidebar')
        <!-- /.Main Sidebar Container -->

    </div>
    <!-- ./wrapper -->
</body>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    /* Preloader styles */
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loader {
        border: 6px solid whitesmoke;
        /* Light grey border */
        border-top: 6px solid #3498db;
        /* Blue border for the loader animation */
        border-radius: 50%;
        width: 74px;
        height: 74px;
        animation: spin 1.5s linear infinite;
        /* Animation for the loader */
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>

<script>
    const preloader = document.querySelector('.preloader');
    setTimeout(function() {
        $('#preloader').fadeOut()
    }, 1500);
</script>

</html>
