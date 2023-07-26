@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/mustahik.js"></script>

    <head>
        <title>Mustahik | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Daftar Mustahik</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Daftar Mustahik</li>
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
                                    Daftar Mustahik
                                </h3>
                                <div class="card-tools">
                                    <ul class="nav nav-pills ml-auto">
                                        <li class="nav-item">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                data-target="#modal-mustahik" onclick="newMustahik()">Buat Baru</button>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="card-body">
                                    <div class="tab-content p-0">
                                        <table id="tabel-list-mustahik" class="table table-bordered table-striped"
                                            data-export-title="List Mustahik" style="width:100%"></table>
                                        <div class="text-center">
                                            <button class="btn btn-outline-danger m-3" type="button" disabled
                                                style="pointer-events: none;" id="spinnerloadinglistmustahik">
                                                <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                    aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        </div>
                                    </div>
                                </div><!-- /.card-body -->
                            </div>
                        </div>
                    </section>
                    <!-- /.Left col -->
                </div>
                <!-- /.row (main row) -->
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->

        <div class="modal" tabindex="-1" role="dialog" id="modal-mustahik">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="title-mustahik">Mustahik</h5>
                        <button type="button" class="close btn_close_mustahik" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form id="form-upload-mustahik" accept-charset="UTF-8" method="post" enctype="multipart/form-data"
                        target="hiddenFrame">
                        <input hidden type="file" class="file-mustahik" accept=".xls,.xlsx" id="filena-mustahik"
                            name="mustahik">
                    </form>

                    <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                        <div class="modal-body">
                            <div class="form-group" id="upload-mustahik">
                                <label for="group">Upload Daftar Mustahik</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" disabled placeholder="File Excel Mustahik"
                                        id="file-mustahik">
                                    <div class="input-group-append mb-3">
                                        <button type="button" class="browse-mustahik-baru btn btn-primary"
                                            onclick="browseFileMustahik()">Cari</button>
                                        <button type="button" onclick="clearFileMustahik()"
                                            class="clear-mustahik-baru btn btn-outline-primary">Clear</button>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <select required type="text" class="ml-2 form-select form-select-sm col-4 mr-1"
                                        id="id_masjidna" disabled>
                                        <option value="" selected disabled>--Loading Masjid--</option>
                                    </select>
                                    <a class="btn btn-info btn-sm mr-1" href="template/TemplateMustahik.xlsx">Download</a>
                                    <button type="button" class="btn btn-sm btn-outline-info" id="btn-upload-mustahik"
                                        onclick="tambahDataMustahik()">Upload</button>
                                    <hr>
                                </div>
                            </div>
                            <div id="mustahik-baru">
                                <div class="form-group">
                                    <label for="group">Masjid UPZ</label>
                                    <select required type="text" class="form-control" id="id_masjid">
                                        <option value="" selected disabled>--Loading Masjid--</option>
                                    </select>
                                    <small class="form-text text-muted">Pilih Masjid UPZ</small>
                                </div>
                                <div class="form-group">
                                    <input type="text" id="idNa" hidden>
                                    <label for="group">Nama Mustahik</label>
                                    <input required type="text" class="form-control" id="nama"
                                        placeholder="Nama Mustahik...">
                                    <small class="form-text text-muted">Nama Mustahik</small>
                                </div>
                                <div class="form-group">
                                    <label for="group">Alamat</label>
                                    <input required type="text" class="form-control" id="alamat"
                                        placeholder="Alamat Mustahik...">
                                    <small class="form-text text-muted">Alamat Mustahik</small>
                                </div>
                                <div class="form-group">
                                    <label for="group">No Telp / WA</label>
                                    <input required type="text" class="form-control" id="phone"
                                        placeholder="No Telp / WA Mustahik...">
                                    <small class="form-text text-muted">No Telp / WA Mustahik</small>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" id="btn-save-mustahik"
                                onclick="tambahDataMustahik()">Tambah</button>
                            <button type="button" class="btn btn-success" id="btn-update-mustahik"
                                onclick="updateDataMustahik()">Simpan</button>
                            <button type="button" class="btn btn-secondary" id="btn-close-validasi"
                                data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
@endsection
