<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Backend Constants
    |--------------------------------------------------------------------------
    */

    'backend_url_prefix' => 'backend',
    'uploads' => [
        'image' => 'uploads/images',
        'audio' => 'uploads/audio',
        'pdf' => 'uploads/pdf',
        'video' => 'uploads/videos',
    ],

    /*
    |--------------------------------------------------------------------------
    | Backend Crud Messages
    |--------------------------------------------------------------------------
    */

    'message' => [
        'save' => 'Successfully save the information',
        'update' => 'Successfully update the information',
        'delete' => 'Successfully delete the information',
    ],

    /*
    |--------------------------------------------------------------------------
    | Backend App Setting
    |--------------------------------------------------------------------------
    */
    'app' => [
        'creator' => [
            'name' => 'Mvishal Shukla',
            'email' => 'mvishu405@gmail.com',
            'url' => 'https://github.com/mvishu405',
        ],
        'developers' => [
            'name' => 'Ting',
            'email' => 'ting@ting.in',
            'url' => 'http://ting.in',
        ],
        'url' => env('APP_URL', 'javascript:void(0);'),
        'logo' => [
            'logo' => 'http://www.placehold.it/200x70',
            'mini' => 'http://www.placehold.it/50x50',
            'lg' => 'http://www.placehold.it/50x50',
            'profile' => 'http://placehold.it/200x200',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Backend Route Setting
    |--------------------------------------------------------------------------
    */

    'register' => true,

    /*
    |--------------------------------------------------------------------------
    | Frontend Constants
    |--------------------------------------------------------------------------
    */

];