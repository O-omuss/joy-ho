@extends('frontend.master-layouts.master')

@section('title')
@endsection

{{--SEO Tags--}}

@section('og_title')
@endsection
@section('og_url')
@endsection
@section('og_description')
@endsection
@section('og_image')
@endsection

@section('twitter_title')
@endsection
@section('twitter_site')
@endsection
@section('twitter_description')
@endsection
@section('twitter_image')
@endsection

{{--End SEO Tags--}}

@push('styles')
@endpush

@section('content')
<main id="index_page" class="smooth_scroll_pages index_page">
    <!--  insert body content  -->
    <section class="container">
        <article class="row_flex">
            <div class="logo_section">
                <a href="{{route('frontend.play')}}" class="rem_link_style"><img src="{{asset('img/logo.png')}}" alt=""
                        class="img-responsive"></a>
            </div>
        </article>
        <article class="home_fest">
            <img src="{{asset('img/man.png')}}" alt="Man" class="img-responsive man">
            <div class="home_fest_text">
                <img src="{{asset('img/home_fest.png')}}" alt="Fest" class="img-responsive fest">
                <h1 class="banner_title">Har Khel Mein Joy Ho!</h1>
                <h4 class="sub_title">Play And Win voucher worth <span
                        class="color_blue"><sup class="font_rupee">&#8377;</sup>10,000</span></h4>
            </div>
            <img src="{{asset('img/woman.png')}}" alt="Woman" class="img-responsive woman">
        </article>
        <article class="black_bg">
            <iframe src="{{asset('game/index.html')}}" title="W3Schools Free Online Web Tutorials"></iframe>
        </article>
    </section>
</main>
@endsection

@push('scripts')

<script defer type="text/javascript"
src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>
<script defer>
//for letters only
$.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-zA-Z][a-zA-Z ]+$/i.test(value);
});

//for email only
$.validator.addMethod("emailtest", function (value, element) {
    return this.optional(element) || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i.test(value);
});


$("#entry_form").validate({
    rules: {
        fullname: {
            required: true,
            lettersonly: true,
            minlength: 2
        },
        // mobile: {
        //     required: true,
        //     minlength: 10,
        //     maxlength: 10,
        //     digits: true
        // },
        email: {
            emailtest: true,
            required: true,
            email: true
        },
        message: {
            required: true
        }
    },
    messages: {
        fullname: {
            required: "This field is required",
            lettersonly: "Please enter a text only"
        },
        // mobile: {
        //     required: "This field is required",
        //     minlength: "Please enter a valid mobile number",
        //     maxlength: "Please enter a valid mobile number",
        //     digits: "Please enter a digits only"
        // },
        email: {
            required: "This field is required",
            emailtest: "Please enter a valid email address"
        },
        message: {
            required: "This field is required"
        }
    }
});

$("#entry_form").ajaxForm({
    success: function ($response) {
        if ($response == 1) {
            $('#thank-you-msg').show();
            setTimeout(function () {
                $('#thank-you-msg').hide();
            }, 5000);
        }
    }
});
</script>

@endpush