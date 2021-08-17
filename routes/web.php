<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
|
*/

Route::namespace('Frontend')->name('frontend.')->group(function () {
    //Joyville Scream Routes
    Route::get('/', 'IndexController@index')->name('index');
    Route::view('form', 'frontend.pages.scream-files.form')->name('index');
    Route::post('form-submit', 'IndexController@formSubmit')->name('form-submit');
    Route::get('thank-you/{slug}', 'IndexController@thankYou')->name('thank-you');

    //Joyho game routes
    Route::get('/play', 'IndexController@play')->name('play');
    Route::view('/play/form', 'frontend.pages.form')->name('play-form');
    Route::post('contactSubmit', 'IndexController@contactSubmit')->name('contactSubmit');
});

/*
|--------------------------------------------------------------------------
| Backend Auth Routes
|--------------------------------------------------------------------------
|
*/

Auth::routes(['register' => false]);

/*
|--------------------------------------------------------------------------
| Backend Routes
|--------------------------------------------------------------------------
|
*/

Route::namespace('Backend')->prefix('backend')->name('backend.')->middleware(['auth'])->group(function () {
    Route::get('dashboard', 'DashboardController@index')->name('dashboard');
    Route::get('user', 'UserController@index')->name('user');
    Route::get('user/edit/{id}', 'UserController@edit')->name('user.edit');

    Route::get('contacts', 'ContactController@index')->name('contacts');

    Route::resource('screamContacts','ScreamModelController');
});
