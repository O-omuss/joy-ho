Take the viewfile function from lle and add in helpers

Add this in filesystem.php links array (public_path('uploads') => storage_path('app/uploads'),)

Add this is composer.json ("files": [
                                "app/helpers.php"
                            ],)
then fire composer dump-autoload
then fire php artisan storage:link