<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Joyville</title>
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('img/favicon.png')}}" />
        <link rel="stylesheet" href="{{ asset('backend/css/app.css') }}">
    </head>

    <body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
        
        <div class="wrapper" /*id="reactApp"*/>
            @include('backend.includes.navbar')
            @include('backend.includes.sidebar')
            <div class="content-wrapper">
                @include('backend.includes.content-header')
                @yield('content.wrapper')
            </div>
            {{-- @include('backend.includes.control-sidebar') --}}
            @include('backend.includes.footer')
        </div>

        <script src="{{ asset('backend/js/app.js') }}"></script>
    </body>

</html>