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
        <div class="popup_bg">
            <div class="popup">
                <h2 class="popup_title">Register<br>to Play & Win</h2>
                <p class="popup_text">Read the T&C to know how we use your data. No spam. We promise!</p>
                <div class="close"><img src="{{asset('img/close.png')}}" alt="Close"></div>
                <div class="entry_form_section">
                    <form id="entry_form" class="entry_form">
                        @csrf
                        <div class="input_group w-100">
                            <input class="input_box" type="text" name="fullname" placeholder="Name" required>
                        </div>
                        <div class="input_group w-48">
                            <input class="input_box" type="email" name="email" placeholder="Email Id" required>
                        </div>
                        <div class="input_group w-48">
                            <input class="input_box" type="number" name="mobile" placeholder="Phone no." required>
                        </div>
                        <div class="input_group w-100">
                            <textarea class="input_box" rows="1" name="address" placeholder="Address"
                                required></textarea>
                        </div>
                        <div class="input_group w-100">
                            <input type="hidden" class="score" name="score">
                        </div>
                        <input type="submit" value="Submit your entry" class="submit_btn">
                    </form>
                </div>
                <div class="thank_you" style="display:none;">
                    <h2 class="thank_you_text">You have successfully<br><span class="color_primary">completed the
                            game.</span></h2>
                    <p class="thank_subtext">Stay tuned to our social media platforms for the winner announcement on
                        August 28th at 5 pm.</p>
                    <div class="social_links">
                        <p class="social_icons">
                            <a class="rem_link_style facebook" href="https://www.facebook.com/JoyvilleHomes" target="_blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="rem_link_style linkedin" href="https://www.linkedin.com/company/13234582/admin/" target="_blank">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a class="rem_link_style instagram" href="https://www.instagram.com/joyvillehomes/" target="_blank">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a class="rem_link_style youtube" href="https://www.youtube.com/channel/UCz_7FewrJtCixVDGbA5oaUw" target="_blank">
                                <i class="fab fa-youtube"></i>
                            </a>
                            <a class="rem_link_style twitter" href="https://twitter.com/JoyvilleHomes" target="_blank">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

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
        var locationUrl = window.location.search;
        var score = locationUrl.split("?")[1];
        $(".score").val("Score is " + score);
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


        $("#entry_form").submit(function(e) {
            
        e.preventDefault();
        $.ajax({
            url: "{{ route('frontend.contactSubmit') }}",
            data: $(this).serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if (response) {
                    $("#entry_form")[0].reset();
                    $('.thank_you').css({"display":"block"});
                    $('.popup_title').css({"display":"none"});
                    $('.entry_form').css({"display":"none"});

                    // setTimeout(function() {
                    //     $('#thank-you-msg').hide();
                    // }, 10000);
                }
            }
        });
    });
    </script>

@endpush