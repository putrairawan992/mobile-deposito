@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/donatur.js"></script>

    <head>
        <title>Muzakki | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Muzakki ZIS</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Muzakki ZIS</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <!-- Main row -->
                <div class="row">
                    <!-- Left col -->
                    <section class="col connectedSortable">
                        <!-- Custom tabs (Charts with tabs)-->
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-user mr-3"></i>
                                    Muzakki Zakat Infaq Shodaqoh
                                </h3>
                                <div class="card-tools">
                                    <ul class="nav nav-pills ml-auto">
                                        <li class="nav-item">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal" id="buat-baru"
                                                data-target="#modal-donatur" onclick="newDonatur()">Buat Baru</button>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content p-0">
                                    <table id="tabel-list-donatur" class="table table-bordered table-striped"
                                        data-export-title="List Muzakki" style="width:100%"></table>
                                    <div class="text-center">
                                        <button class="btn btn-outline-danger m-3" type="button" disabled
                                            style="pointer-events: none;" id="spinnerloadinglistdonatur">
                                            <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                        <!-- /.card -->
                    </section>
                    <!-- /.Left col -->
                </div>
                <!-- /.row (main row) -->
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="modal-donatur">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="title-donatur">Muzakki</h5>
                    <button type="button" class="close btn_close_donatur" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <form id="form-upload-donatur" accept-charset="UTF-8" method="post" enctype="multipart/form-data"
                    target="hiddenFrame">
                    <input hidden type="file" class="file-donatur" accept=".xls,.xlsx" id="filena-donatur"
                        name="donatur">
                </form>

                <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                    <div class="modal-body">
                        <div class="form-group" id="upload-donatur">
                            <label for="group">Upload Daftar Muzakki</label>
                            <div class="input-group">
                                <input type="text" class="form-control" disabled placeholder="File Excel Muzakki"
                                    id="file-donatur">
                                <div class="input-group-append mb-3">
                                    <button type="button" class="browse-donatur-baru btn btn-primary"
                                        onclick="browseFileDonatur()">Cari</button>
                                    <button type="button" onclick="clearFileDonatur()"
                                        class="clear-donatur-baru btn btn-outline-primary">Clear</button>
                                </div>
                            </div>
                            <a class="btn btn-info btn-sm" href="template/TemplateDonatur.xlsx">Download</a>
                            <button type="button" class="btn btn-sm btn-outline-info" id="btn-upload-donatur"
                                onclick="tambahDataDonatur()">Upload</button>
                            <hr>
                        </div>
                        <div id="donatur-baru">
                            <div class="form-group">
                                <input type="text" id="idNa" hidden>
                                <label for="group">Nama</label>
                                <input required type="text" class="form-control" id="nama"
                                    placeholder="Nama Muzakki...">
                                <small class="form-text text-muted">Nama Muzakki</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Email</label>
                                <input required type="text" class="form-control" id="email"
                                    placeholder="Email Muzakki...">
                                <small class="form-text text-muted">Email Muzakki</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Alamat</label>
                                <input required type="text" class="form-control" id="alamat"
                                    placeholder="Alamat Muzakki...">
                                <small class="form-text text-muted">Alamat Muzakki</small>
                            </div>
                            <div class="form-group">
                                <label for="group">No Telp / WA</label>
                                <input required type="text" class="form-control" id="phone"
                                    placeholder="No Telp / WA Muzakki...">
                                <small class="form-text text-muted">No Telp / WA Muzakki</small>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="btn-save-donatur"
                            onclick="tambahDataDonatur()">Tambah</button>
                        <button type="button" class="btn btn-success" id="btn-update-donatur"
                            onclick="updateDataDonatur()">Simpan</button>
                        <button type="button" class="btn btn-secondary" id="btn-close-validasi"
                            data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
@endsection
