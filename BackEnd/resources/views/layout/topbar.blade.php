<nav
    class="sticky inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/80 bg-white bg-opacity-90 py-2 px-4 text-white shadow-sm shadow-green-100 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
    <div class="flex items-center text-gray-900">
        <a href="#">
            <img class="h-8 md:h-10 lg:h-16 -my-4" src="/img/Logo Harta Insan Karimah.png" alt="Logo HIK">
        </a>
        <ul class="ml-auto hidden items-center gap-2 md:flex md:font-light md:text-sm lg:font-normal">
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Beranda
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Promo
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Blog
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    FAQ
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Hubungi Kami
                </a>
            </li>
            <a id="signIn" href="/login"
                class="items-center middle none center hidden rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-2 px-4 font-sans text-xs font-bold text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:flex"
                data-ripple-light="true">
                <i class="fas fa-sign-in-alt mr-2 text-lg"></i>Masuk
            </a>
        </ul>
        <ul style="display: none" id="menuBar"
            class="absolute right-0 top-11  bg-white bg-opacity-90 rounded-md p-1 text-xs overflow-hidden text-blue-gray-900 
            transition-all duration-300 ease-in lg:hidden font-semibold">
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 font-sans font-normal leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Beranda
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 font-sans font-normal leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Promo
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 font-sans font-normal leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Blog
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 font-sans font-normal leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    FAQ
                </a>
            </li>
            <li
                class="border-green-900 hover:border-2 whitespace-nowrap rounded-md px-2 lg:px-5 block p-1 font-sans font-normal leading-normal text-inherit antialiased">
                <a class="flex items-center" href="#">
                    Hubungi Kami
                </a>
            </li>
            <a id="signInBar" href="/"
                class="my-1 items-center middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 
                py-2 px-4 font-sans text-xs font-thin text-white shadow-md shadow-green-500/20 transition-all 
                hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none 
                disabled:opacity-50 disabled:shadow-none flex"
                data-ripple-light="true">
                <i class="fas fa-sign-in-alt mr-2 text-xs"></i>Masuk
            </a>
        </ul>
        <button onclick="showMenu()"
            class="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans 
            text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent 
            active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:hidden">
            <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </span>
        </button>
    </div>
</nav>

<script>
    let menuStatus = 0

    function showMenu() {
        if (menuStatus == 0) {
            $('#menuBar').fadeIn()
            menuStatus = 1
        } else {
            $('#menuBar').hide()
            menuStatus = 0
        }
    }
</script>

<script
  type="module"
  src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js"
></script>
