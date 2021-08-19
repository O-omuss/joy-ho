@extends('frontend.master-layouts.master-scream')

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

@push('styles')
<style>
#thank-you{
background: url({{asset('dist-scream/images/joy-emojis.png')}}) no-repeat center bottom #f6c641;
background-size: 40vh;}

#thank-you h1 {
    font-size: 2.5rem;
    color: #000;
    text-align: center;
    padding-top: 35px;
    padding-bottom: 10px;
	
}
 #thank-you p {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
@endpush
		<body id="thank-you">
		<div class="container header">
		<div class="row">

		<div class="col-lg-12 col-md-12">
		<img class="d-block img-fluid" src="{{asset('dist-scream/images/joyville-logo.png')}}" alt="JoyvilleHomes" >		             

		</div>
		</div>
		<!-- /.row -->
		</div>
		<div class="container thankyou">
		<div class="row justify-content-center">
        <div class="col-lg-8"> 
		<h1>Your Score {{ $contact->decibels }}</h1>
		@if($contact->decibels > 0 && $contact->decibels <= 40)

		<p>Haule haule se hawa lagti hai, Aur aapki awaaz bhi</p>

		@elseif($contact->decibels > 40 && $contact->decibels <= 80)

		<p>Kitne Duur, Kitne Paas!</p>

		@elseif($contact->decibels > 80)
		
		<p>JOY HOOOO! Ye hoti hai tabadtod performance!</p>

		@endif
		 
		
		</div>
		
		</div>
		
		 
		 </div>
		 
@endsection
@push('scripts')




		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

		</body>
		
@endpush
