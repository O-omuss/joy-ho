@extends('backend.master-layouts.master')

@section('content.wrapper')

<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header border-0">
                        <h3 class="card-title">Scream Contacts</h3>
                        <div class="card-tools">
                            <!-- Collapse Button -->
                            {{-- <a type="button" href="{{ route('backend.home-banner.create') }}" class="btn btn-primary btn-sm"><i class="fas fa-plus" style="color: #fff;"></i></a> --}}
                        </div>
                    </div>

                    <div class="card-body">
                        <table id="admin-datatable" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Audio</th>
                                    <th>Decibels</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($contacts as $contact)
                                <tr>
                                    <td>{{$contact->id}}</td>
                                    <td>{{$contact->name}}</td>
                                    <td>{{$contact->email}}</td>
                                    <td>{{$contact->number}}</td>
                                    <td><audio controls><source src="{{viewFile($contact->audio)}}"></audio></td>
                                    <td>{{$contact->decibels}}</td>
                                    
                                    
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection