<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/run-migrate', function () {
    Artisan::call('migrate'); // Run the migration command
    return 'Migrations have been run successfully!';
});

Route::get('/create-storage-link', function () {
    Artisan::call('storage:link'); // Run the storage:link command
    return 'Storage link created successfully!';
});
require __DIR__.'/auth.php';
