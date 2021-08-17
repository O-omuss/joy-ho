<!-- Main Sidebar Container -->

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    
    <a href="index3.html" class="brand-link">
        <img src="{{ asset('backend/dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">Joyville</span>
    </a>
    
    <!-- Sidebar -->
    <div class="sidebar">
        @php
        $email = "vishal@tingmail.in";
        $default = "https://www.somewhere.com/homestar.jpg";
        $size = 40;
        $grav_url = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;   
        @endphp
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{ $grav_url }}" class="img-circle elevation-2" alt="User Image">
            </div>
            
            <div class="info">
                <a href="#" class="d-block">{{ Auth::user()->email }}</a>
            </div>
        </div>
        
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="{{ route('backend.dashboard') }}" class="nav-link {{ strcmp(url()->current(), route('backend.dashboard')) == 0 ? 'active' : '' }}">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                {{-- <li class="nav-item">
                    <a href="{{ route('backend.user') }}" class="nav-link {{ strcmp(url()->current(), route('backend.user')) == 0 ? 'active' : '' }}">
                        <i class="nav-icon fas fa-users"></i>
                        <p>User</p>
                    </a>
                </li> --}}

                <li class="nav-item">
                    <a href="{{ route('backend.contacts') }}" class="nav-link {{ strcmp(url()->current(), route('backend.contacts')) == 0 ? 'active' : '' }}">
                        <i class="nav-icon fas fa-users"></i>
                        <p>Contacts</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="{{ route('backend.screamContacts.index') }}" class="nav-link {{ strcmp(url()->current(), route('backend.screamContacts.index')) == 0 ? 'active' : '' }}">
                        <i class="nav-icon fas fa-users"></i>
                        <p>Scream Contacts</p>
                    </a>
                </li>

            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>