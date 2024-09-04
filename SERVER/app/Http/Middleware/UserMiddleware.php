<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Check if the authenticated user is from the users table
        if (auth()->user() instanceof User) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
