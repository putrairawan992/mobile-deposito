<?php

return [
    'default' => env('DB_CONNECTION', 'sqlsrv'),
    'connections' => [
        'db1' => [
            'driver' => 'sqlsrv',
            // 'host' => '192.168.0.123',
            'host' => '192.168.0.106',
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
            'host' => '141.136.47.196',
            'database' => 'coba',
            'username' => 'sa',
            'password' => 'DataSains123',
            'port' => '1433',
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'encrypt' => 'yes',
            'engine' => null,
            'trust_server_certificate' => true,
        ],
    ],
];
