@extends('backend.master-layouts.master')

{{-- @section('contentHeader')
    User Profile Edit
@endsection --}}

@section('content.wrapper')
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header border-0">
                        <h3 class="card-title">Home Banner Create</h3>
                    </div>

                    <form role="form" action="{{ route('backend.home-banner.store') }}" method="post" enctype="multipart/form-data">
                        @csrf

                        <div class="card-body">

                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" class="form-control" id="title" name="title" placeholder="Enter title for banner">
                            </div>

                            <div class="form-group">
                                <label for="sub_title">Sub Title</label>
                                <input type="text" class="form-control" id="sub_title" name="sub_title" placeholder="Enter sub title for banner">
                            </div>

                            <div class="form-group">
                                <label for="banner_url">Banner URL</label>
                                <input type="url" class="form-control" id="banner_url" name="banner_url" placeholder="Enter banner url">
                            </div>

                            <div class="form-group">
                                <label for="image">Image</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="image" name="image">
                                        <label class="custom-file-label" for="image">Choose Banner Image</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="video">Video</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="video" name="video">
                                        <label class="custom-file-label" for="video">Choose Banner Video</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="position">Position</label>
                                <input type="text" class="form-control" id="position" name="position" value="0" data-inputmask-regex="[0-9]*">
                            </div>

                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="status" name="status" checked>
                                <label class="form-check-label" for="status">Status</label>
                            </div>
                            
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection