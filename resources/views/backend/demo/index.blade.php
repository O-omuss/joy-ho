@extends('backend.master-layouts.master')

@section('content.wrapper')

<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header border-0">
                        <h3 class="card-title">Home Banners</h3>
                        <div class="card-tools">
                            <!-- Collapse Button -->
                            <a type="button" href="{{ route('backend.home-banner.create') }}" class="btn btn-primary btn-sm"><i class="fas fa-plus" style="color: #fff;"></i></a>
                        </div>
                    </div>

                    <div class="card-body">
                        <table id="admin-datatable" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Sub Title</th>
                                    <th>Banner URL</th>
                                    <th>Image</th>
                                    <th>Video</th>
                                    <th>Position</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($homeBanners as $homeBanner)
                                <tr>
                                    <td>{{$homeBanner->id}}</td>
                                    <td>{{$homeBanner->title}}</td>
                                    <td>{{$homeBanner->sub_title}}</td>
                                    <td>{{$homeBanner->banner_url}}</td>
                                    <td><img src="{{ asset($homeBanner->image) }}" style="height: 30px;"/></td>
                                    <td><a href="{{ asset($homeBanner->video) }}" target="_blank">{{ asset($homeBanner->image) }}</a></td>
                                    <td>{{$homeBanner->position}}</td>
                                    <td>
                                        {!! $homeBanner->status ? '<span class="badge badge-pill badge-success">enabled</span>' : '<span class="badge badge-pill badge-danger">disabled</span>' !!}
                                    </td>
                                    <td style="white-space: nowrap;">
                                        <a href="{{ route('backend.home-banner.edit', ['home_banner' => $homeBanner->id]) }}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <form action="{{ route('backend.home-banner.destroy', ['home_banner' => $homeBanner->id]) }}" method="post" style="display: inline;">
                                            @csrf
                                            @method('delete')
                                            <button type="submit" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                        </form>
                                    </td>
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