<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/output.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <header class="w-full bg-[url('img/leaves.jpg')] bg-cover bg-bottom">
        <div class="w-full min-h-screen md:w-1/2 bg-gray-900/80 p-10 flex">
            <div class="w-full text-center my-auto">
                <h1 class="font-bold text-5xl text-green-400 mb-8 md:text-right">Deposito Syariah
                    <br><span class="text-white">Indonesia</span>
                </h1>
                <h6 class="font-bold uppercase text-2xl md:text-3xl lg:text-4xl mb-7 text-white md:text-right">
                    Coming <span class="text-green-400">soon</span></h6>

                <!-- Count down -->
                <div class="w-full text-left flex mb-10">
                    <ul class="w-full flex place-content-center md:place-content-end gap-5 mx-auto text-gray-50">
                        <li>
                            <div class="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
                                id="cdD">00</div>
                            <p class="text-center text-xs mt-2">Days</p>
                        </li>

                        <li>
                            <div class="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
                                id="cdH">00</div>
                            <p class="text-center text-xs mt-2">Hours</p>
                        </li>

                        <li>
                            <div class="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
                                id="cdM">00</div>
                            <p class="text-center text-xs mt-2">Minutes</p>
                        </li>

                        <li>
                            <div class="font-bold text-white rounded-full border-dotted border-gray-700 border-4 flex items-center justify-center text-2xl lg:text-4xl h-16 lg:h-24 w-16 lg:w-24"
                                id="cdS">00</div>
                            <p class="text-center text-xs mt-2">Seconds</p>
                        </li>

                    </ul>
                </div>
                <!-- Content -->
                <p class="text-base mb-5 text-gray-200 md:text-right">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dicta reprehenderit delectus quasi eligendi maiores consectetur repellat
                    necessitatibus libero deleniti quaerat debitis, odit earum modi. Magni porro iste dolores. </p>

                <!-- Social media -->
                <div class="w-full text-left flex mb-10">
                    <ul class="w-full flex place-content-center md:place-content-end gap-10 mx-auto text-gray-100">
                        <li>
                            <a href="#" class="text-lg hover:text-green-400">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="text-lg hover:text-green-400">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="text-lg hover:text-green-400">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="text-lg hover:text-green-400">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </li>

                    </ul>
                </div>

                <div>
                    <p class="text-base text-gray-200 md:text-right font-extralight">Copyright <span
                            class="font-bold">Deposito
                            Syariah.</span> All Rights Reserved</p>
                    <p class="text-base text-gray-200 md:text-right font-extralight">Designed by <span
                            class="font-bold text-lime-500">Deposito Syariah</span></p>
                </div>

            </div>
        </div>
    </header>

    <script>
        // Change the value of countDownEndDate to the day you want to end the count down
        var countDownEndDate = "May 3, 2024 08:00:00";

        var endDate = new Date(countDownEndDate).getTime();

        var x = setInterval(function() {

            var timeNow = new Date().getTime();

            var timeLeft = endDate - timeNow;

            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);


            if (days < 10) {
                days = "0" + days;
            }

            if (hours < 10) {
                hours = "0" + hours;
            }

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (timeLeft > 0) {
                document.getElementById("cdD").innerHTML = days;
                document.getElementById("cdH").innerHTML = hours;
                document.getElementById("cdM").innerHTML = minutes;
                document.getElementById("cdS").innerHTML = seconds;
            }
        }, 1000);
    </script>
</body>

</html>
