<?php

use App\Http\Controllers\API\productController;
use App\Http\Controllers\Auth\AuthAdminController;
use App\Http\Controllers\Auth\AuthUserController;
use App\Http\Controllers\API\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'user'])->group(function () {
    // Route::apiResource('categories', ControllersCategoryController::class);
});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', productController::class);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Route::apiResource('products', productController::class);
});

Route::post('admin/register', [AuthAdminController::class, 'register']);
Route::post('admin/login', [AuthAdminController::class, 'login']);

Route::post('user/register', [AuthUserController::class, 'register']);
Route::post('user/login', [AuthUserController::class, 'login']);
