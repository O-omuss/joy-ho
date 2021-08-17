<!doctype html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="">
<!--<![endif]-->
<head>

    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
    />

    <meta name="theme-color" content="#000" />

    <meta property="og:title" content="Joyville" />
    <meta property="og:description" content="Joyville" />
    <meta property="og:url" content="https://domainname.in/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="{{ asset('img/og-image.jpg')}}" />
    <meta property="og:image:secure_url" content="{{ asset('img/og-image.jpg')}}" />

    <title>Joyville</title>
    <meta name="description" content="Joyville" />

    
    {{--Share Tags--}}
    
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:description" content="@yield('twitter_description')"/>
    <meta name="twitter:title" content="@yield('twitter_title')"/>
    <meta name="twitter:site" content="@yield('twitter_site')"/>
    <meta name="twitter:image" content="@yield('twitter_image')"/>
    {{--End Share Tags--}}
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('img/favicon.png')}}" />
    <link rel="stylesheet" href="{{ asset('dist/css/app.min.css') }}"/>


    <!-- Global site tag (gtag.js) - Google Ads: 322128060 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-322128060"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-322128060');
    </script>

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '558467918515741');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=558467918515741&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel Code -->
    
    @stack('styles')
</head>

<body>
    @include('frontend.includes.loader')
    {{-- @include('frontend.includes.header') --}}
    @include('frontend.includes.sidebar')
    @yield('content')
    @include('frontend.includes.footer')
    <script src="{{ asset('dist/js/app.min.js') }}"></script>
    @stack('scripts')
</body>
</html>
