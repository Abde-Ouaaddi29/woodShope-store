<?php

use App\Http\Controllers\API\productController;
use App\Http\Controllers\Auth\AuthAdminController;
use App\Http\Controllers\Auth\AuthUserController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\orderItemsController;
use Illuminate\Support\Facades\Route;



//// public routes ////

Route::post('admin/register', [AuthAdminController::class, 'register']);
Route::post('admin/login', [AuthAdminController::class, 'login']);

Route::post('user/register', [AuthUserController::class, 'register']);
Route::post('user/login', [AuthUserController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/products', [productController::class, 'index']);
Route::get('/products/{id}', [productController::class, 'show']);

Route::get('/feedback', [FeedbackController::class, 'index']);
Route::post('/feedback', [FeedbackController::class, 'store']);

Route::apiResource('orderItems', orderItemsController::class);

///// user routes /////

// Route::middleware(['auth:sanctum', 'user'])->group(function () {
 
// });



//// admin routes ////

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('/products', [productController::class, 'store']);
    Route::put('/products/{id}', [productController::class, 'update']);
    Route::delete('/products/{id}', [productController::class, 'destroy']);


    Route::put('/feedback/{id}', [FeedbackController::class, 'update']);
    Route::delete('/feedback/{id}', [FeedbackController::class, 'destroy']);
});

route::middleware(['auth:sanctum'])->post('/logout', [AuthUserController::class, 'logout']);
