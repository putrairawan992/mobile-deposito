<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DatabaseController extends Controller
{
    public function createDynamicDatabase()
    {
        // Generate a unique database name
        $dbName = 'dynamic_db_' . time();

        // Create the database
        DB::statement("CREATE DATABASE $dbName");

        // Configure the database connection dynamically
        config([
            'database.connections.dynamic_db' => [
                'driver' => env('DB_CONNECTION'),
                'host' => env('DB_HOST'),
                'port' => env('DB_PORT'),
                'database' => $dbName,
                'username' => env('DB_USERNAME'),
                'password' => env('DB_PASSWORD'),
                'charset' => env('DB_CHARSET', 'utf8mb4'),
                'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            ],
        ]);

        // Reconnect to the dynamically created database
        DB::purge('dynamic_db');

        // Perform database operations using the dynamic connection
        $results = DB::connection('dynamic_db')->select('SELECT * FROM your_table');

        // ...

        // Drop the dynamically created database if needed
        DB::statement("DROP DATABASE IF EXISTS $dbName");

        // Return the results or perform other actions as needed
        return $results;
    }
}
