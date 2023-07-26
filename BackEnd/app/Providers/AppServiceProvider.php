<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    public function boot()
    {
        // Listen for database connection events
        Event::listen('Illuminate\Database\Events\ConnectionEvent', function ($event) {
            // Check if the event represents a database error
            if ($event instanceof \Illuminate\Database\Events\QueryException) {
                // Get the underlying exception
                $exception = $event->getException();

                // Check if it's a connection-related error
                if ($exception instanceof \PDOException) {
                    // Check if the error is a connection failure
                    if ($exception->getCode() === 2002) {
                        // Use the slave connection for subsequent queries
                        DB::setDefaultConnection('db_slave');
                    }
                }
            }
        });
    }
}
