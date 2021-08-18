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
<body>
	<div id="popup_bg">
		<div id="popup">
			<img src="{{asset('dist-scream/img/close.png')}}" class="close_img" alt="Close">
			<!-- <div class="container header">
			<div class="row">

				<div class="col-lg-12 col-md-12">
					<img class="d-block img-fluid" src="{{asset('dist-scream/images/joyville-logo.png')}}" alt="JoyvilleHomes">

				</div>
			</div>
		</div> -->

			<div class="container">
				
				<div class="row justify-content-center">

					<div class="col-lg-8 joy-form" style="padding-top: 40px;">

						<h1>Roar to Cheer*</h1>
						<p>Your roar has been recorded! Woot woot! Share your details and show us how loudly you can roar to win.</p>

					</div>
				</div>

				<div class="row justify-content-center ">
					<div class="col-lg-8 man-joyform">
						<form id="register-form" name="register-form" method="post">
							<input type="hidden" name="decibel" id="meter">
							@csrf
							<div class="form-group mb-3">
								<div class="input-group">

									<input type="text" class="form-control input_box" id="name" name="name" placeholder="name" required>
								</div>
							</div>
							<div class="form-group mb-3">
								<div class="input-group">

									<input type="email" class="form-control input_box" id="email" name="email" placeholder="email" required>
								</div>
							</div>
							<div class="form-group mb-3">
								<div class="input-group">

									<input type="number" class="form-control input_box" id="phone" name="phone" placeholder="phone" required>

								</div>


							</div>
							<!-- <div class="form-group mb-3">
								<div class="input-group">

									<textarea placeholder="  Message" tabindex="1" name="message"
										style="color:#000; width: 100%;"></textarea>

								</div>


							</div> -->
							<input type="submit" class="btn btn-dark mb-3" value="Submit Your Roar">
							<br />
							<p class="sven-message"></p>
							@if(Session::has('message'))
							<p class="sven-message">{{ Session::get('message') }}</p>
							@endif
							<input type="file" class="audio_file" name="audio_file" style="display: none;">
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


		</div>
	</div>
	<div class="container header">
		<div class="row">

			<div class="col-lg-12 col-md-12">
				<img class="d-block img-fluid" src="{{asset('dist-scream/images/joyville-logo.png')}}" alt="JoyvilleHomes">

			</div>
		</div>
		<!-- /.row -->
	</div>
	<div class="container">
		<div class="row">

			<div class="col-lg-12 man-header">
				<img class="d-block mx-auto img-fluid" src="{{asset('dist-scream/images/man-joy.png')}}" alt="JoyvilleHomes">
			</div>



		</div>
		<div class="row justify-content-center ">
			<div class="col-lg-8 metre man-joy">


				<p>Join in the celebrations of our multi-city property fest by raising the roof with a simple activity
					- shout "JOY HO" as loudly as you can and stand a chance to win an amazing voucher!</p>

				<img class="d-block mx-auto img-fluid metre_img" src="{{asset('dist-scream/images/metre.png')}}" alt="JoyvilleHomes">
				<canvas></canvas>
			</div>

		</div>
		<div class="row justify-content-center align-items-center joy-button">
			<!-- <div id="msg">Recording...</div> -->
			<div class="col-lg-3">
				<button type="button" id="record" class="btn btn-dark d-block mx-auto">Hold for record</button>
			</div>
		</div>
		<!-- /.row -->

		<div class="app d-none">
			<select name="" id="micSelect"></select>
			<select id="visSelect">
				<option value="frequencybars">Bar</option>
				<option value="sinewave">Wave</option>
				<option value="circle">Circle</option>
			</select>
			<a id="download">Download</a>

			<div class="audio-controls">
				<button id="record">Record</button>
				<button id="stop">Stop</button>
				<audio id="audio" controls></audio>
			</div>

			<div id="msg">Recording...</div>
			<canvas width="500" height="300"></canvas>
			<div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row justify-content-center">

			<div class="col-lg-12 joy-page-1-par">
				<p>Our multi-city property fest is here with a special activity for you to express yourself with the
					excitement of this festival - JOY HO!</p>
				<p>All you have to do is shout out Joy Ho as loud as you can, top the Joy Ho meter and stand a chance
					to win an amazing voucher!</p>
				<p>So what are you waiting for? Get ready to raise the roof with JOY HO!</p>
			</div>
		</div>
	</div>
@endsection

@push('scripts')


			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous">
			</script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/additional-methods.min.js"></script>
			<script>
				var audioFile;
				$("#popup_bg").css("display", "none");
						(async () => {
							let leftchannel = [];
							let rightchannel = [];
							let recorder = null;
							let recording = false;
							let recordingLength = 0;
							let volume = null;
							let audioInput = null;
							let sampleRate = null;
							let AudioContext = window.AudioContext || window.webkitAudioContext;
							let context = null;
							let analyser = null;
							let canvas = document.querySelector('canvas');
							let canvasCtx = canvas.getContext("2d");
							let visualSelect = document.querySelector('#visSelect');
							let micSelect = document.querySelector('#micSelect');
							let stream = null;
							let tested = false;

							try {
								window.stream = stream = await getStream();
								console.log('Got stream');
							} catch (err) {
								alert('Issue getting mic', err);
							}

							const deviceInfos = await navigator.mediaDevices.enumerateDevices();

							var mics = [];
							for (let i = 0; i !== deviceInfos.length; ++i) {
								let deviceInfo = deviceInfos[i];
								if (deviceInfo.kind === 'audioinput') {
									mics.push(deviceInfo);
									let label = deviceInfo.label ||
										'Microphone ' + mics.length;
									console.log('Mic ', label + ' ' + deviceInfo.deviceId)
									const option = document.createElement('option')
									option.value = deviceInfo.deviceId;
									option.text = label;
									micSelect.appendChild(option);
								}
							}

							function showForm() {
								var x = document.getElementById("popup_bg");
								x.style.display = "block";
							}

							function hideForm() {
								var x = document.getElementById("popup_bg");
								x.style.display = "none";
							}

							function getStream(constraints) {
								if (!constraints) {
									constraints = {
										audio: true,
										video: false
									};
								}
								return navigator.mediaDevices.getUserMedia(constraints);
							}


							setUpRecording();

							function setUpRecording() {
								context = new AudioContext();
								sampleRate = context.sampleRate;

								// creates a gain node
								volume = context.createGain();

								// creates an audio node from teh microphone incoming stream
								audioInput = context.createMediaStreamSource(stream);

								// Create analyser
								analyser = context.createAnalyser();

								// connect audio input to the analyser
								audioInput.connect(analyser);

								// connect analyser to the volume control
								// analyser.connect(volume);

								let bufferSize = 2048;
								let recorder = context.createScriptProcessor(bufferSize, 2, 2);

								// we connect the volume control to the processor
								// volume.connect(recorder);

								analyser.connect(recorder);

								// finally connect the processor to the output
								recorder.connect(context.destination);

								recorder.onaudioprocess = function (e) {
									// Check 
									if (!recording) return;
									// Do something with the data, i.e Convert this to WAV
									console.log('recording');
									let left = e.inputBuffer.getChannelData(0);
									let right = e.inputBuffer.getChannelData(1);
									if (!tested) {
										tested = true;
										// if this reduces to 0 we are not getting any sound
										if (!left.reduce((a, b) => a + b)) {
											alert("There seems to be an issue with your Mic");
											// clean up;
											stop();
											stream.getTracks().forEach(function (track) {
												track.stop();
											});
											context.close();
										}
									}
									// we clone the samples
									leftchannel.push(new Float32Array(left));
									rightchannel.push(new Float32Array(right));
									recordingLength += bufferSize;
								};
								visualize();
							};

							function mergeBuffers(channelBuffer, recordingLength) {
								let result = new Float32Array(recordingLength);
								let offset = 0;
								let lng = channelBuffer.length;
								for (let i = 0; i < lng; i++) {
									let buffer = channelBuffer[i];
									result.set(buffer, offset);
									offset += buffer.length;
								}
								return result;
							}

							function interleave(leftChannel, rightChannel) {
								let length = leftChannel.length + rightChannel.length;
								let result = new Float32Array(length);

								let inputIndex = 0;

								for (let index = 0; index < length;) {
									result[index++] = leftChannel[inputIndex];
									result[index++] = rightChannel[inputIndex];
									inputIndex++;
								}
								return result;
							}

							function writeUTFBytes(view, offset, string) {
								let lng = string.length;
								for (let i = 0; i < lng; i++) {
									view.setUint8(offset + i, string.charCodeAt(i));
								}
							}

							function start() {
								recording = true;
								// document.querySelector('#msg').style.visibility = 'visible'
								// reset the buffers for the new recording
								leftchannel.length = rightchannel.length = 0;
								recordingLength = 0;
								console.log('context: ', !!context);
								if (!context) setUpRecording();
							}

							function stop() {
								console.log('Stop')
								recording = false;
								// document.querySelector('#msg').style.visibility = 'hidden'


								// we flat the left and right channels down
								let leftBuffer = mergeBuffers(leftchannel, recordingLength);
								let rightBuffer = mergeBuffers(rightchannel, recordingLength);
								// we interleave both channels together
								let interleaved = interleave(leftBuffer, rightBuffer);

								///////////// WAV Encode /////////////////
								// from http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
								//

								// we create our wav file
								let buffer = new ArrayBuffer(44 + interleaved.length * 2);
								let view = new DataView(buffer);

								// RIFF chunk descriptor
								writeUTFBytes(view, 0, 'RIFF');
								view.setUint32(4, 44 + interleaved.length * 2, true);
								writeUTFBytes(view, 8, 'WAVE');
								// FMT sub-chunk
								writeUTFBytes(view, 12, 'fmt ');
								view.setUint32(16, 16, true);
								view.setUint16(20, 1, true);
								// stereo (2 channels)
								view.setUint16(22, 2, true);
								view.setUint32(24, sampleRate, true);
								view.setUint32(28, sampleRate * 4, true);
								view.setUint16(32, 4, true);
								view.setUint16(34, 16, true);
								// data sub-chunk
								writeUTFBytes(view, 36, 'data');
								view.setUint32(40, interleaved.length * 2, true);

								// write the PCM samples
								let lng = interleaved.length;
								let index = 44;
								let volume = 1;
								for (let i = 0; i < lng; i++) {
									view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
									index += 2;
								}

								// our final binary blob
								audioFile = new Blob([view], {
									type: 'audio/wav'
								});

								const audioUrl = URL.createObjectURL(audioFile);
								console.log('BLOB ', audioFile);
								console.log('URL ', audioUrl);
								document.querySelector('#audio').setAttribute('src', audioUrl);
								const link = document.querySelector('#download');
								link.setAttribute('href', audioUrl);
								console.log('link ', link);
								link.download = 'output.wav';


								var ctx = new AudioContext(),
									url = audioUrl,
									audio = new Audio(url)
									// 2048 sample buffer, 1 channel in, 1 channel out  
									,
									processor = ctx.createScriptProcessor(2048, 1, 1),
									meter = document.getElementById('meter'),
									source

								audio.crossOrigin = 'anonymous'

								audio.addEventListener('canplaythrough', function () {
									source = ctx.createMediaElementSource(audio)
									source.connect(processor)
									source.connect(ctx.destination)
									processor.connect(ctx.destination)
									audio.play()
								}, false);

								var maxrms = 0;
								// loop through PCM data and calculate average
								// volume for a given 2048 sample buffer
								processor.onaudioprocess = function (evt) {
									var input = evt.inputBuffer.getChannelData(0),
										len = input.length,
										total = i = 0,
										rms
									while (i < len) total += Math.abs(input[i++])
									rms = Math.sqrt(total / len)
									if (rms > maxrms) {
										maxrms = rms;
									}
									fiveDec = maxrms.toFixed(5);
									meter.value = fiveDec;
									// console.log("hello", rms, maxrms,fiveDec);
								}

								showForm();
							}

							// Visualizer function from
							// https://webaudiodemos.appspot.com/AudioRecorder/index.html
							//
							function visualize() {
								WIDTH = canvas.width;
								HEIGHT = canvas.height;
								CENTERX = canvas.width / 2;
								CENTERY = canvas.height / 2;

								let visualSetting = visualSelect.value;
								console.log(visualSetting);
								if (!analyser) return;

								if (visualSetting === "sinewave") {
									analyser.fftSize = 2048;
									var bufferLength = analyser.fftSize;
									console.log(bufferLength);
									var dataArray = new Uint8Array(bufferLength);

									canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

									var draw = function () {

										drawVisual = requestAnimationFrame(draw);

										analyser.getByteTimeDomainData(dataArray);

										canvasCtx.fillStyle = 'rgb(200, 200, 200)';
										canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

										canvasCtx.lineWidth = 2;
										canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

										canvasCtx.beginPath();

										var sliceWidth = WIDTH * 1.0 / bufferLength;
										var x = 0;

										for (var i = 0; i < bufferLength; i++) {

											var v = dataArray[i] / 128.0;
											var y = v * HEIGHT / 2;

											if (i === 0) {
												canvasCtx.moveTo(x, y);
											} else {
												canvasCtx.lineTo(x, y);
											}

											x += sliceWidth;
										}

										canvasCtx.lineTo(canvas.width, canvas.height / 2);
										canvasCtx.stroke();
									};

									draw();

								} else if (visualSetting == "frequencybars") {
									analyser.fftSize = 64;
									var bufferLengthAlt = analyser.frequencyBinCount;
									console.log(bufferLengthAlt);
									var dataArrayAlt = new Uint8Array(bufferLengthAlt);

									canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

									var maxBarHeight = 0;
									var drawAlt = function () {
										drawVisual = requestAnimationFrame(drawAlt);

										analyser.getByteFrequencyData(dataArrayAlt);
										canvasCtx.fillStyle = 'rgb(0, 0, 0)';
										canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

										var barWidth = (WIDTH / bufferLengthAlt);
										var barHeight;
										var x = 0;

										for (var i = 0; i < bufferLengthAlt; i++) {
											barHeight = dataArrayAlt[i];

											if (dataArrayAlt[i] > maxBarHeight) {
												maxBarHeight = dataArrayAlt[i];
												// console.log(maxBarHeight);
											}

											canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',198,65)';
											canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

											x += barWidth + 1;
										}
										// console.log(maxBarHeight);
									};

									drawAlt();

								} else if (visualSetting == "circle") {
									analyser.fftSize = 32;
									let bufferLength = analyser.frequencyBinCount;
									console.log(bufferLength);
									let dataArray = new Uint8Array(bufferLength);

									canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

									let draw = () => {
										drawVisual = requestAnimationFrame(draw);

										analyser.getByteFrequencyData(dataArray);
										canvasCtx.fillStyle = 'rgb(0, 0, 0)';
										canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

										// let radius = dataArray.reduce((a,b) => a + b) / bufferLength;
										let radius = dataArray[2] / 2
										if (radius < 20) radius = 20;
										if (radius > 100) radius = 100;
										// console.log('Radius ', radius)
										canvasCtx.beginPath();
										canvasCtx.arc(CENTERX, CENTERY, radius, 0, 2 * Math.PI, false);
										// canvasCtx.fillStyle = 'rgb(50,50,' + (radius+100) +')';
										// canvasCtx.fill();
										canvasCtx.lineWidth = 6;
										canvasCtx.strokeStyle = 'rgb(50,50,' + (radius + 100) + ')';
										canvasCtx.stroke();
									}
									draw()
								}

							}

							visualSelect.onchange = function () {
								window.cancelAnimationFrame(drawVisual);
								visualize();
							};

							micSelect.onchange = async e => {
								console.log('now use device ', micSelect.value);
								stream.getTracks().forEach(function (track) {
									track.stop();
								});
								context.close();

								stream = await getStream({
									audio: {
										deviceId: {
											exact: micSelect.value
										}
									},
									video: false
								});
								setUpRecording();
							}

							function pause() {
								recording = false;
								context.suspend()
							}

							function resume() {
								recording = true;
								context.resume();
							}

							$("#record").bind('touchstart', function () {
								start();
							}).bind('touchend', function () {
								stop();
							});

							$("#record").mousedown(function () {
								start();
							});
							$("#record").mouseup(function () {
								stop();
							});
							$(".close_img").click(function () {
								hideForm();
							})
						})()

						//for letters only
						$.validator.addMethod("lettersonly", function (value, element) {
							return this.optional(element) || /^[a-zA-Z][a-zA-Z ]+$/i.test(value);
						});

						//for email only
						$.validator.addMethod("emailtest", function (value, element) {
							return this.optional(element) || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i.test(value);
						});
						$("#register-form").validate({
							rules: {
								name: {
									required: true,
									lettersonly: true,
									minlength: 2
								},
								phone: {
									required: true,
									minlength: 10,
									maxlength: 10,
									digits: true
								},
								email: {
									emailtest: true,
									required: true,
									email: true
								},
								// message: {
								//     required: true
								// }
							},
							messages: {
								name: {
									required: "This field is required",
									lettersonly: "Please enter a text only"
								},
								phone: {
									required: "This field is required",
									minlength: "Please enter a valid mobile number",
									maxlength: "Please enter a valid mobile number",
									digits: "Please enter a digits only"
								},
								email: {
									required: "This field is required",
									emailtest: "Please enter a valid email address"
								},
								// message: {
								//     required: "This field is required"
								// }
							}
						});

						// $("#register-form").ajaxForm({
						// 	success: function ($response) {
						// 		if ($response == 1) {
						// 			$('#thank-you-msg').show();
						// 			setTimeout(function () {
						// 				$('#thank-you-msg').hide();
						// 			}, 5000);
						// 		}
						// 	}
						// });
			


$("[type='submit']").on('click submit', function(event) {

	event.preventDefault();

	let formData = new FormData();
	formData.append('audioFile', audioFile);
	formData.append('name', document.forms['register-form']['name'].value);
	formData.append('email', document.forms['register-form']['email'].value);
	formData.append('number', document.forms['register-form']['phone'].value);
	formData.append('decibel', document.forms['register-form']['decibel'].value);
	formData.append("_token","{{ csrf_token() }}");


	console.log(audioFile);
	//    event.preventDefault();
	   
	//    var formEl = $(this).closest("form");
	//    var msgLabel = $(".sven-message");
	//    var formData = formEl.serialize();
	//    var $inputBoxes = $('input, [type=\'submit\']', "#" + formEl[0].id);
	//    $inputBoxes.prop('disabled', true);
	//    msgLabel.css("visibility", "hidden");
	//    msgLabel.css("visibility", "visible").html('<i class="fa fa-hourglass-start"></i>registering your details...');
	//    var url = formEl.attr("action");
	   $.ajax({
			method: "POST",
			processData: false,
			contentType: false,
			url: "{{route('frontend.form-submit')}}",
			data: formData, // serializes the form's elements.
	// 	   dataType: 'json',
		   success: function(data) {
			
				window.location.href ='{{ url("/thank-you")}}' + "/" + data;
	// 		   if (data.error) {
	// 			   msgLabel.css("visibility", "hidden");
	// 			   msgLabel.removeClass("error success").addClass("error").css("visibility", "visible").html('<i class="fa fa-times"></i> ' + data.message);
	// 			   $inputBoxes.prop('disabled', false);
	// 		   } else {
	// 			   window.location.href = "thank-you.html";
	// 		   }
		   },
	// 	   error: function() {
	// 		   msgLabel.css("visibility", "hidden");
	// 		   msgLabel.removeClass("error success").addClass("error").css("visibility", "visible").html('<i class="fa fa-times"></i> Problem connecting to server. Please try again');
	// 		   $inputBoxes.prop('disabled', false);
	// 	   }
	   });
	//    event.preventDefault();


		// $('form').submit();

   });


			</script>


</body>

@endpush