# Develop REST API with Lumen and JWT authentication

# Installation

1. Clone this repo

```
git clone https://github.com/samironbarai/lumen-rest-api-jwt-auth.git
```

2. Install composer packages

```
cd lumen-rest-api-jwt-auth
$ composer install
```

3. Create and setup .env file

```
make a copy of .env.example
$ copy .env.example .env
$ php artisan key:generate
put database credentials in .env file
$ php artisan jwt:secret
```

4. Migrate and insert records

```
$ php artisan migrate
$ php artisan serve --host=localhost --port=8000
$ php artisan serve --host=0.0.0.0 --port=8000
```

To test application follow the tutorial bellow.
Click on the image bellow to see YouTube video.

[![Lumen REST API Crash Course 2021 (Passport and JWT authentication)](https://img.youtube.com/vi/qG0djDRXV_g/0.jpg)](https://www.youtube.com/watch?v=qG0djDRXV_g)

Please visit my website.
[samironbarai.com](https://samironbarai.com/)

5. SQL Clear Data

delete ds_utama.dbo.users;
delete ds_utama_slave.dbo.users;

DBCC CHECKIDENT ('ds_utama.dbo.users', RESEED, 0);
DBCC CHECKIDENT ('ds_utama_slave.dbo.users', RESEED, 0);
