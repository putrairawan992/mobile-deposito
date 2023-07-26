@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/jeniszis.js"></script>
    <script src="js/pages/jenismustahik.js"></script>
    <script src="js/pages/jenistransaksi.js"></script>
    <script src="js/pages/jenisprogram.js"></script>

    <head>
        <title>Pengaturan | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Pengaturan</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Pengaturan</li>
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
                                    <i class="fas fa-cogs mr-3"></i>
                                    Pengaturan Jenis ZIS, Jenis Pembayaran, Program Penyalur, Jenis Mustahik
                                </h3>
                                <div class="card-tools">
                                    <ul class="nav nav-pills ml-auto" hidden>
                                        <li class="nav-item">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="tab">Buat Baru</button>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="pill" href="#tab-jeniszis" role="tab"
                                            aria-controls="tab-jeniszis" aria-selected="true">Jenis ZIS</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="pill" href="#tab-jenis-pembayaran" role="tab"
                                            aria-controls="tab-jenis-pembayaran" aria-selected="false">Payments</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="pill" href="#tab-jenis-program" role="tab"
                                            aria-controls="tab-jenis-program" aria-selected="false">Program</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="pill" href="#tab-jenis-mustahik" role="tab"
                                            aria-controls="tab-jenis-mustahik" aria-selected="false">Jenis Mustahik</a>
                                    </li>
                                </ul>

                                <div class="tab-content">
                                    <div class="tab-pane fade active show" id="tab-jeniszis" role="tabpanel">
                                        <div class="row d-flex justify-content-end align-items-center m-2">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                data-target="#modal-pengaturan" onclick="newJeniszis()">Tambah Baru</button>
                                        </div>

                                        <table id="tabel-list-jeniszis" class="table table-bordered table-striped"
                                            data-export-title="List Masjid" style="width:100%"></table>
                                        <div class="text-center">
                                            <button class="btn btn-outline-danger m-3" type="button" disabled
                                                style="pointer-events: none;" id="spinnerloadinglistjeniszis">
                                                <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                    aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tab-jenis-pembayaran" role="tabpanel">
                                        <div class="row d-flex justify-content-end align-items-center m-2">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                data-target="#modal-pengaturan" onclick="newPayment()">Tambah Baru</button>
                                        </div>

                                        <table id="tabel-list-payment" class="table table-bordered table-striped"
                                            data-export-title="List Petugas" style="width:100%"></table>
                                        <div class="text-center">
                                            <button class="btn btn-outline-danger m-3" type="button" disabled
                                                style="pointer-events: none;" id="spinnerloadinglistpayment">
                                                <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                    aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tab-jenis-program" role="tabpanel">
                                        <div class="row d-flex justify-content-end align-items-center m-2">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                data-target="#modal-pengaturan" onclick="newProgram()">Tambah
                                                Baru</button>
                                        </div>

                                        <table id="tabel-list-program" class="table table-bordered table-striped"
                                            data-export-title="List Petugas" style="width:100%"></table>
                                        <div class="text-center">
                                            <button class="btn btn-outline-danger m-3" type="button" disabled
                                                style="pointer-events: none;" id="spinnerloadinglistprogram">
                                                <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                    aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tab-jenis-mustahik" role="tabpanel">
                                        <div class="row d-flex justify-content-end align-items-center m-2">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                data-target="#modal-pengaturan" onclick="newJenismustahik()">Tambah
                                                Baru</button>
                                        </div>

                                        <table id="tabel-list-jenismustahik" class="table table-bordered table-striped"
                                            data-export-title="List Petugas" style="width:100%"></table>
                                        <div class="text-center">
                                            <button class="btn btn-outline-danger m-3" type="button" disabled
                                                style="pointer-events: none;" id="spinnerloadinglistjenismustahik">
                                                <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                    aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        </div>
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

        <div class="modal" tabindex="-1" role="dialog" id="modal-pengaturan">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="title-pengaturan">Pengaturan</h5>
                        <button type="button" class="close btn_close_mustahik" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" id="idNa" hidden>
                                <label for="group" id="label-nama-pengaturan">Nama</label>
                                <input required type="text" class="form-control" id="nama"
                                    placeholder="Nama...">
                                <small class="form-text text-muted" id="nama-pengaturan">Nama</small>
                            </div>
                            <div class="form-group">
                                <label for="group" id="label-deskripsi-pengaturan">Deskripsi</label>
                                <input required type="text" class="form-control" id="deskripsi"
                                    placeholder="Deskripsi...">
                                <small class="form-text text-muted" id="deskripsi-pengaturan">Deskripsi</small>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <div class="row" id="btn-jeniszis">
                                <button type="button" class="btn btn-success mr-2" id="update-jeniszis"
                                    onclick="updateDataJeniszis()">Simpan</button>
                                <button type="button" class="btn btn-success" id="simpan-jeniszis"
                                    onclick="tambahDataJeniszis()">Tambah</button>
                            </div>
                            <div class="row" id="btn-jenistransaksi">
                                <button type="button" class="btn btn-success mr-2" id="update-jenistransaksi"
                                    onclick="updateDataJenistransaksi()">Simpan</button>
                                <button type="button" class="btn btn-success" id="simpan-jenistransaksi"
                                    onclick="tambahDataJenistransaksi()">Tambah</button>
                            </div>
                            <div class="row" id="btn-jenisprogram">
                                <button type="button" class="btn btn-success mr-2" id="update-jenisprogram"
                                    onclick="updateDataJenisProgram()">Simpan</button>
                                <button type="button" class="btn btn-success" id="simpan-jenisprogram"
                                    onclick="tambahDataJenisProgram()">Tambah</button>
                            </div>
                            <div class="row" id="btn-jenismustahik">
                                <button type="button" class="btn btn-success mr-2" id="update-jenismustahik"
                                    onclick="updateDataJenismustahik()">Simpan</button>
                                <button type="button" class="btn btn-success" id="simpan-jenismustahik"
                                    onclick="tambahDataJenismustahik()">Tambah</button>
                            </div>

                            <button type="button" class="btn btn-secondary" id="btn-close-pengaturan"
                                data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
@endsection
