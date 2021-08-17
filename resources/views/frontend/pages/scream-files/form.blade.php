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
<body id="thankyou">
	<div class="container header">
	<div class="row">

	<div class="col-lg-12 col-md-12">
	<img class="d-block img-fluid" src="{{asset('dist-scream/images/joyville-logo.png')}}" alt="JoyvilleHomes" >		             

	</div>
	</div>
	<!-- /.row -->
	</div>
	
	<div class="container">
	<div class="row justify-content-center">

	<div class="col-lg-8 joy-form" style="padding-top: 40px;">

	<h1>Roar to Cheer*</h1>
	<p>Your roar has been recorded! Woot woot! Share your details and show us how loudly you can roar to win.</p>

	</div>
	</div>

	<div class="row justify-content-center ">
	<div class="col-lg-8 man-joyform">
	<form id="register-form" action="contact.php" method="post">
	<div class="form-group mb-3">
	<div class="input-group">
	 
	<input type="text" class="form-control" id="name" name="name" required placeholder="name">
	</div>
	</div>
	<div class="form-group mb-3">
	<div class="input-group">
	 
	<input type="email" class="form-control" id="email" name="email" required placeholder="Email">
	</div>
	</div>
	<div class="form-group mb-3">
	<div class="input-group">
	 
	<input type="text" class="form-control" id="phone" name="phone" required placeholder="phone">
	
	</div>
	
	
	</div>
	<div class="form-group mb-3">
	<div class="input-group">
	 
	<textarea placeholder="  Message" tabindex="1" name="message" style="color:#000; width: 100%;" ></textarea>
	
	</div>
	
	
	</div>
	<button type="submit" class="btn btn-dark mb-3">Submit Your Roar</button>
	<br/>		 <p class="sven-message"></p>
	</form>
	</div>
	</div>
	
	<div class="row justify-content-center joy-button text-center">
	<div class="col-lg-8 ">
	
 	
	<p>* Read the T&C to know how we use your data. No spam. We promise!<p>
	</div>
	</div>
	<!-- /.row -->
	</div>

	@endsection

	@push('scripts')

<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
 
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

</body>

@endpush