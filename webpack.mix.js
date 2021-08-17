const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.react('resources/assets/backend/js/app.js', 'public/backend/js')
    .sass('resources/assets/backend/sass/app.scss', 'public/backend/css')
    .copyDirectory('node_modules/tinymce/skins', 'public/backend/js/skins')
    .copyDirectory('resources/assets/backend/dist', 'public/backend/dist')
    .browserSync({
        proxy: 'http://127.0.0.1:8000'
    });
    
// mix.react('resources/js/app.js', 'public/backend/assets/js')
//     .sass('resources/sass/app.scss', 'public/backend/assets/css')
    
