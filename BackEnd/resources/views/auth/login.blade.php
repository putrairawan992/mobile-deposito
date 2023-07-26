@extends ('layout.nasabah')

@section('content')
    <script src="js/layout.js"></script>

    <head>
        <title>Login - Deposito Syariah</title>
    </head>

    <div class="flex items-center justify-center h-4/5">
        <div
            class="p-3 relative flex w-5/6 sm:w-3/5 md:w-2/5 flex-col rounded-xl bg-white bg-clip-border
            text-gray-700 shadow-sm shadow-white">
            <div class="flex items-center justify-center">
                <img class="h-8 md:h-10 lg:h-16" src="/img/Logo Harta Insan Karimah.png" alt="Logo HIK">
            </div>
            <div class="text-center text-md md:text-xl font-semibold mt-2">Selamat Datang</div>
            <div class="text-center text-xs lg:text-sm" id="textLogin">Silahkan masukan nomor handphone. </div>

            <div id="form-login" class="-mt-2">
                <div class="px-3">
                    <div id="formUsernameLogin" class="mx-0 lg:mx-5">
                        <div id="username" class="mb-6 relative h-10 w-full min-w-[100px] my-4">
                            <input name="username" id="usernameNa"
                                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent 
                                px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 
                                transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
                                placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-800 
                                focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" " />
                            <label
                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Phone
                            </label>
                        </div>
                        <div id="passwordInput" class="hidden mb-10 relative h-10 w-full min-w-[100px] mt-4">
                            <input id="password" name="password" type="password"
                                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent 
                                px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 
                                transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
                                placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-800 
                                focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" " />
                            <label
                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                            <label class="mb-6 text-xs italic">Anda lupa password ? <a href="#"
                                    class="underline">Klik</a></label>
                        </div>
                    </div>

                    <div id="formOTPLogin" class="hidden flex-col mt-7">
                        <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                            <div class="w-9 h-12">
                                <input
                                    class="w-full h-full flex flex-col items-center justify-center text-center 
                                    px-1 outline-none rounded-md border border-gray-200 text-sm bg-white 
                                    focus:bg-gray-50 focus:ring-1 ring-green-700"
                                    type="text" maxlength="1" onkeypress="inputOTP()" id="otp1">
                            </div>
                            <div class="w-9 h-12">
                                <input
                                    class="w-full h-full flex flex-col items-center justify-center text-center 
                                    px-1 outline-none rounded-md border border-gray-200 text-sm bg-white 
                                    focus:bg-gray-50 focus:ring-1 ring-green-700"
                                    type="text" maxlength="1" onkeypress="inputOTP()" id="otp2">
                            </div>
                            <div class="w-9 h-12">
                                <input
                                    class="w-full h-full flex flex-col items-center justify-center text-center 
                                    px-1 outline-none rounded-md border border-gray-200 text-sm bg-white 
                                    focus:bg-gray-50 focus:ring-1 ring-green-700"
                                    type="text" maxlength="1" onkeypress="inputOTP()" id="otp3">
                            </div>
                            <div class="mx-2 text-lg">-</div>
                            <div class="w-9 h-12">
                                <input
                                    class="w-full h-full flex flex-col items-center justify-center text-center 
                                    px-1 outline-none rounded-md border border-gray-200 text-sm bg-white 
                                    focus:bg-gray-50 focus:ring-1 ring-green-700"
                                    type="text" maxlength="1" onkeypress="inputOTP()" id="otp4">
                            </div>
                            <div class="w-9 h-12">
                                <input
                                    class="w-full h-full flex flex-col items-center justify-center text-center 
                                    px-1 outline-none rounded-md border border-gray-200 text-sm bg-white 
                                    focus:bg-gray-50 focus:ring-1 ring-green-700"
                                    type="text" maxlength="1" onkeypress="inputOTP()" id="otp5">
                            </div>
                            <div class="w-9 h-12">
                                <input
                                    class="w-full h-full flex flex-col items-center justify-center text-center 
                                    px-1 outline-none rounded-md border border-gray-200 text-sm bg-white 
                                    focus:bg-gray-50 focus:ring-1 ring-green-700"
                                    type="text" maxlength="1" onkeypress="inputOTP()" id="otp6">
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center my-4">
                        <button id="nextBtn" onclick="nextLogin()"
                            class="w-2/6 items-center justify-center middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 
                            py-2 px-4 font-sans text-xs font-thin text-white shadow-md shadow-green-500/20 transition-all 
                            hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none 
                            disabled:opacity-50 disabled:shadow-none flex"
                            data-ripple-light="true">
                            <i class="fas fa-arrow-right mr-2 text-xs"></i>Lanjut
                        </button>
                        <button id="backBtn" onclick="backLogin()"
                            class="hidden pr-2 pl-4 mr-1 items-center justify-center middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 
                            py-2 font-sans text-xs font-thin text-white shadow-md shadow-green-500/20 transition-all 
                            hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none 
                            disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true">
                            <i class="fas fa-arrow-left mr-2 text-xs"></i>
                        </button>
                        <button id="loginBtn" onclick="loginUser()"
                            class="w-2/6 items-center justify-center middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 
                            py-2 px-4 font-sans text-xs font-thin text-white shadow-md shadow-green-500/20 transition-all 
                            hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none 
                            disabled:opacity-50 disabled:shadow-none flex"
                            data-ripple-light="true">
                            <i class="fas fa-sign-in-alt mr-2 text-xs"></i>Login
                        </button>
                        <button id="loginOTPBtn" onclick="loginOTP()"
                            class="w-2/6 items-center justify-center middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 
                            py-2 px-4 font-sans text-xs font-thin text-white shadow-md shadow-green-500/20 transition-all 
                            hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none 
                            disabled:opacity-50 disabled:shadow-none flex"
                            data-ripple-light="true">
                            <i class="fas fa-sign-in-alt mr-2 text-xs"></i>Login
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    <div class="md:hidden flex justify-center items-center w-full text-xs absolute bottom-16 sm:bottom-10 text-green-100">
        <div>Tercatat dan diawasi oleh OJK &nbsp;</div>
        <div class="font-semibold">No.S-123/MS.123/122/2023</div>
    </div>
    <div class="hidden md:block absolute text-xs bottom-12 left-8 text-green-100">
        <div>Tercatat dan diawasi oleh OJK</div>
        <div class="font-semibold">No.S-123/MS.123/122/2023</div>
    </div>

    <script>
        $("#signIn").css('pointer-events', 'none')
        $("#signInBar").css('pointer-events', 'none')
        $('#textLogin').text('Silahkan masukan nomor handphone.')
        $('#loginOTPBtn').hide()
        $('#loginBtn').hide()

        document.getElementById("usernameNa").addEventListener("keypress", function(event) {
            if (event.key === "Enter") nextLogin()
        });

        document.getElementById("password").addEventListener("keypress", function(event) {
            if (event.key === "Enter") loginUser()
        });

        function nextLogin() {
            if ($('#usernameNa').val().length > 5) {
                ajaxCall(serverApi + "ceklogin", JSON.stringify({
                    'username': $("#usernameNa").val(),
                }), "POST", "jenisLogin")
            } else {
                swalGagal("Perhatian", "Dimohon untuk mengisi dengan lengkap")
            }
        }

        function jenisLogin(data) {
            if (data == "password") {
                $('#textLogin').text('Silahkan masukan password anda.')
                $('#nextBtn').hide()
                $('#username').hide()
                $('#loginOTPBtn').hide()
                $('#backBtn').fadeIn()
                $('#passwordInput').fadeIn()
                $('#loginBtn').fadeIn()
            } else if (data == "otp") {
                $('#textLogin').text('Silahkan masukan OTP yang kami kirimkan.')
                $('#nextBtn').hide()
                $('#username').hide()
                $('#loginBtn').hide()
                $('#formOTPLogin').fadeIn()
                $('#loginOTPBtn').fadeIn()
                $('#backBtn').fadeIn()
            }
        }

        function backLogin() {
            $('#textLogin').text('Silahkan masukan nomor handphone.')
            $('#nextBtn').fadeIn()
            $('#username').fadeIn()
            $('#backBtn').hide()
            $('#passwordInput').hide()
            $('#loginOTPBtn').hide()
            $('#loginBtn').hide()
            $('#formOTPLogin').hide()
            $("#password").val() = ''
        }

        function loginUser() {
            dataNa = {
                'username': $("#usernameNa").val(),
                'password': $("#password").val(),
            }
            ajaxCall(serverApi + "login", JSON.stringify(dataNa), "POST", "afterLogin")
        }

        function loginOTP() {
            passNa = $('#otp1').val() + $('#otp2').val() + $('#otp3').val() + $('#otp4').val() + $('#otp5').val() + $(
                '#otp6').val()
            dataNa = {
                'username': $("#usernameNa").val(),
                'password': passNa,
            }
            ajaxCall(serverApi + "login", JSON.stringify(dataNa), "POST", "afterLogin")
        }

        function afterLogin(data) {
            var icon = "success";
            var title = "Login Berhasil";
            var text = "Menuju Dashboard";

            swal({
                icon: icon,
                title: title,
                text: text,
                button: false,
            });

            if (data["status"] == "success") {
                window.localStorage.setItem("jwttoken", data["token"]);
                setTimeout(function() {
                    window.open("/dashboard", "_self");
                }, 1000);
            }
        }

        function afterLoginFailed(text) {
            swalGagal("Perhatian", text)
        }

        function inputOTP() {
            passNa = $('#otp1').val() + $('#otp2').val() + $('#otp3').val() + $('#otp4').val() + $('#otp5').val() + $(
                '#otp6').val()

            console.log(passNa)
        }
    </script>
@endsection
