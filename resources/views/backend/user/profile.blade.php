@extends('backend.master-layouts.master')

@section('contentHeader')
    User Profile
@endsection

@section('content.wrapper')

<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-primary card-outline">
                    <div class="card-body box-profile">
                        <div class="text-center">
                            @php
                            $email = "vishal@tingmail.in";
                            $default = "https://www.somewhere.com/homestar.jpg";
                            $size = 200;
                            $grav_url = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;   
                            @endphp
                            <img class="profile-user-img img-fluid img-circle" src="{{ $grav_url }}" alt="User profile picture">
                        </div>
                        
                        <h3 class="profile-username text-center">{{ auth()->user()->email }}</h3>
                        
                        <p class="text-muted text-center">Software Engineer</p>

                        <ul class="list-group list-group-unbordered mb-3">
                            <li class="list-group-item">
                                <b>Date</b> <a class="float-right">{{auth()->user()->created_at}}</a>
                            </li>
                        </ul>
                        <a href="{{route('backend.user.edit', ['id' => auth()->user()->id])}}" class="btn btn-primary btn-center"><b>Edit</b></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection