<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class Nasabah
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            return response(['status' => 'error', 'message' => 'Unauthorized.']);
        }

        if (auth()->user()->role == 10 || auth()->user()->role == 0 || auth()->user()->role == 99 || auth()->user()->role == 1) {
            return $next($request);
        } else {
            return response(['status' => 'error', 'message' => 'You are Not Nasabah.']);
        }

        return $next($request);
    }
}
