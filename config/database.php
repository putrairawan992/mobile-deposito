<?php

return [
    'default' => env('DB_CONNECTION', 'sqlsrv'),
    'connections' => [
        // 'sqlite' => [
        //     'driver' => 'sqlite',
        //     'url' => env('DATABASE_URL'),
        //     'database' => env('DB_DATABASE', database_path('database.sqlite')),
        //     'prefix' => '',
        //     'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        // ],

        // 'mysql' => [
        //     'driver' => 'mysql',
        //     'url' => env('DATABASE_URL'),
        //     'host' => env('DB_HOST', '127.0.0.1'),
        //     'port' => env('DB_PORT', '3306'),
        //     'database' => env('DB_DATABASE', 'forge'),
        //     'username' => env('DB_USERNAME', 'forge'),
        //     'password' => env('DB_PASSWORD', ''),
        //     'unix_socket' => env('DB_SOCKET', ''),
        //     'charset' => 'utf8mb4',
        //     'collation' => 'utf8mb4_unicode_ci',
        //     'prefix' => '',
        //     'prefix_indexes' => true,
        //     'strict' => true,
        //     'engine' => null,
        //     'options' => extension_loaded('pdo_mysql')
        //         ? array_filter([
        //             PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        //         ])
        //         : [],
        // ],

        // 'pgsql' => [
        //     'driver' => 'pgsql',
        //     'url' => env('DATABASE_URL'),
        //     'host' => env('DB_HOST', '127.0.0.1'),
        //     'port' => env('DB_PORT', '5432'),
        //     'database' => env('DB_DATABASE', 'forge'),
        //     'username' => env('DB_USERNAME', 'forge'),
        //     'password' => env('DB_PASSWORD', ''),
        //     'charset' => 'utf8',
        //     'prefix' => '',
        //     'prefix_indexes' => true,
        //     'schema' => 'public',
        //     'sslmode' => 'prefer',
        // ],

        'db_master' => [
            'driver' => 'sqlsrv',
            'host' => '192.168.88.42',
            'database' => 'ds_utama',
            'username' => 'sa',
            'password' => '123',
            'port' => '1433',
            'charset' => 'utf8',
            'prefix' => '',
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'db_slave' => [
            'driver' => 'sqlsrv',
            'host' => '192.168.88.42',
            'database' => 'ds_utama_slave',
            'username' => 'sa',
            'password' => '123',
            'port' => '1433',
            'charset' => 'utf8',
            'prefix' => '',
            'encrypt' => 'yes',
            'trust_server_certificate' => true,

            // 'driver' => 'sqlsrv',
            // 'host' => 'sql.bsite.net\MSSQL2016',
            // 'database' => 'superbwx_ds_main',
            // 'username' => 'superbwx_ds_main',
            // 'password' => 'Ferari123',
            // 'port' => '1433',
            // 'charset' => 'utf8',
            // 'prefix' => '',
            // 'encrypt' => 'yes',
            // 'trust_server_certificate' => true,
        ],

        'db_slave1' => [
            'driver' => 'sqlsrv',
            'host' => 'ds_utama.mssql.somee.com',
            'database' => 'ds_utama',
            'username' => 'superbwx_SQLLogin_1',
            'password' => 'ferari123',
            'port' => '1433',
            'charset' => 'utf8',
            'prefix' => '',
            'encrypt' => 'yes',
            'trust_server_certificate' => true,
        ],

        'myconn' => [
            'driver' => 'sqlsrv',
            'charset' => 'utf8',
            'prefix' => '',
            'encrypt' => 'yes',
            'engine' => null,
            'trust_server_certificate' => true,

            'read' => [
                [
                    'host' => '192.168.88.42',
                    'database' => 'ds_utama',
                    'username' => 'sa',
                    'password' => '123',
                    'port' => '1433',
                ],
                [
                    'host' => '192.168.88.42',
                    'database' => 'ds_utama_slave',
                    'username' => 'sa',
                    'password' => '123',
                    'port' => '1433',
                ],
                [
                    'host' => 'ds_utama.mssql.somee.com',
                    'database' => 'ds_utama',
                    'username' => 'superbwx_SQLLogin_1',
                    'password' => 'ferari123',
                    'port' => '1433',
                ],
            ], // Comma-separated list of read dbs
            'write' => [
                [
                    'sticky' => true, // Enable sticky sessions
                    'host' => '192.168.88.42',
                    'database' => 'ds_utama',
                    'username' => 'sa',
                    'password' => '123',
                    'port' => '1433',
                ],
                [
                    'sticky' => true, // Enable sticky sessions
                    'host' => '192.168.88.42',
                    'database' => 'ds_utama',
                    'username' => 'sa',
                    'password' => '123',
                    'port' => '1433',
                ],
                [
                    'sticky' => true, // Enable sticky sessions
                    'host' => 'ds_utama.mssql.somee.com',
                    'database' => 'ds_utama',
                    'username' => 'superbwx_SQLLogin_1',
                    'password' => 'ferari123',
                    'port' => '1433',
                ], // Comma-separated list of read dbs // Comma-separated list of write db
            ],
        ],

        'myconn_slave' => [
            'driver' => 'sqlsrv',
            'charset' => 'utf8',
            'prefix' => '',
            'encrypt' => 'yes',
            'engine' => null,
            'trust_server_certificate' => true,
            'host' => 'ds_utama.mssql.somee.com',
            'database' => 'ds_utama',
            'username' => 'superbwx_SQLLogin_1',
            'password' => 'ferari123',
            'port' => '1433',
        ],

        'db1' => [
            'driver' => 'sqlsrv',
            'host' => '192.168.0.123',
            // 'host' => '192.168.0.106',
            // 'host' => '192.168.88.42',
            'database' => 'ds_utama',
            'username' => 'sa',
            'password' => '123',
            'port' => '1433',
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'engine' => null,
            'trust_server_certificate' => true,
        ],

        'db2' => [
            'driver' => 'sqlsrv',
            'host' => '192.168.0.123',
            // 'host' => '192.168.0.106',
            // 'host' => '192.168.88.42',
            'database' => 'ds_utama',
            'username' => 'sa1',
            'password' => '123',
            'port' => '1433',
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'engine' => null,
            'trust_server_certificate' => true,
        ],

        // 'db3' => [
        //     'driver' => 'sqlsrv',
        //     'host' => 'ds_utama.mssql.somee.com',
        //     'database' => 'ds_utama',
        //     'username' => 'superbwx_SQLLogin_1',
        //     'password' => 'ferari123',
        //     'port' => '1433',
        //     'charset' => 'utf8',
        //     'prefix' => '',
        //     'prefix_indexes' => true,
        //     'encrypt' => 'yes',
        //     'engine' => null,
        //     'trust_server_certificate' => true,
        // ],
    ],
];
