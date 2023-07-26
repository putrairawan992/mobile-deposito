@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/masjid.js"></script>
    <script src="js/pages/petugas.js"></script>

    <head>
        <title>Masjid | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Daftar Masjid</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Daftar Masjid</li>
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
                                    <i class="fas fa-mosque mr-3"></i>
                                    Daftar Masjid Pengelola
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
                                <div class="tab-content p-0">
                                    <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="custom-tabs-one-list-tab" data-toggle="pill"
                                                href="#custom-tabs-one-list" role="tab"
                                                aria-controls="custom-tabs-one-list" aria-selected="true">Masjid <span
                                                    class="badge badge-pill badge-success" id="jmlMasjid">0</span></a>
                                        </li>
                                        <li class="nav-item" id="list-upz" style="display: none">
                                            <a class="nav-link" id="custom-tabs-one-blm-valid-tab" data-toggle="pill"
                                                href="#custom-tabs-one-blm-valid" role="tab"
                                                aria-controls="custom-tabs-one-blm-valid" aria-selected="false">U P Z <span
                                                    class="badge badge-pill badge-success" id="jmlUPZ">0</span></a>
                                        </li>
                                    </ul>

                                    <div class="tab-content" id="custom-tabs-one-tabContent">
                                        <div class="tab-pane fade active show" id="custom-tabs-one-list" role="tabpanel"
                                            aria-labelledby="custom-tabs-one-ploting-tab">
                                            <div class="row d-flex justify-content-end align-items-center m-2">
                                                <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                    id="buat-baru-masjid" data-target="#modal-masjid"
                                                    onclick="newMasjid()">Tambah
                                                    Baru</button>
                                            </div>

                                            <table id="tabel-list-masjid" class="table table-bordered table-striped"
                                                data-export-title="List Masjid" style="width:100%"></table>
                                            <div class="text-center">
                                                <button class="btn btn-outline-danger m-3" type="button" disabled
                                                    style="pointer-events: none;" id="spinnerloadinglistmasjid">
                                                    <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                        aria-hidden="true"></span>
                                                    Loading...
                                                </button>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="custom-tabs-one-blm-valid" role="tabpanel"
                                            aria-labelledby="custom-tabs-one-pembimbing-tab">
                                            <div class="row d-flex justify-content-end align-items-center m-2">
                                                <button class="btn btn-outline-info btn-sm" data-toggle="modal"
                                                    data-target="#modal-petugas" onclick="newPetugas()">UPZ
                                                    Baru</button>
                                            </div>

                                            <table id="tabel-list-petugas" class="table table-bordered table-striped"
                                                data-export-title="List Petugas" style="width:100%"></table>
                                            <div class="text-center">
                                                <button class="btn btn-outline-danger m-3" type="button" disabled
                                                    style="pointer-events: none;" id="spinnerloadinglistpetugas">
                                                    <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                        aria-hidden="true"></span>
                                                    Loading...
                                                </button>
                                            </div>
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

        <div class="modal" tabindex="-1" role="dialog" id="modal-masjid">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="title-masjid">Masjid</h5>
                        <button type="button" class="close btn_close_masjid" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form id="form-upload-masjid" accept-charset="UTF-8" method="post" enctype="multipart/form-data"
                        target="hiddenFrame">
                        <input hidden type="file" class="file-masjid" accept=".xls,.xlsx" id="filena-masjid"
                            name="masjid">
                    </form>

                    <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                        <div class="modal-body">
                            <div class="form-group" id="upload-masjid">
                                <label for="group">Upload Daftar Masjid</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" disabled placeholder="File Excel Masjid"
                                        id="file-masjid">
                                    <div class="input-group-append mb-3">
                                        <button type="button" class="browse-masjid-baru btn btn-primary"
                                            onclick="browseFile()">Cari</button>
                                        <button type="button" onclick="clearFile()"
                                            class="clear-masjid-baru btn btn-outline-primary">Clear</button>
                                    </div>
                                </div>
                                <a class="btn btn-info btn-sm" href="template/TemplateMasjid.xlsx">Download</a>
                                <button type="button" class="btn btn-sm btn-outline-info" id="btn-upload-masjid"
                                    onclick="tambahData()">Upload</button>
                                <hr>
                            </div>
                            <div id="masjid-baru">
                                <div class="row">
                                    <div class="form-group col">
                                        <input type="text" id="idNa" hidden>
                                        <label for="group">Nama Masjid</label>
                                        <input required type="text" class="form-control" id="nama"
                                            placeholder="Nama Masjid...">
                                        <small class="form-text text-muted">Nama Masjid</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Jalan / Desa</label>
                                        <input required type="text" class="form-control" id="jalan"
                                            placeholder="Alamat...">
                                        <small class="form-text text-muted">Nama Jalan / Desa</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Kelurahan</label>
                                        <input required type="text" class="form-control" id="kelurahan"
                                            placeholder="Kelurahan...">
                                        <small class="form-text text-muted">Nama Kelurahan</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Kecamatan</label>
                                        <input required type="text" class="form-control" id="kecamatan"
                                            placeholder="Kecamatan...">
                                        <small class="form-text text-muted">Lokasi Kecamatan</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Tahun Berdiri</label>
                                        <input required type="number" class="form-control" id="tahun_berdiri"
                                            placeholder="Tahun...">
                                        <small class="form-text text-muted">Tahun Berdiri</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Tipiologi Masjid</label>
                                        <input required type="text" class="form-control" id="tipiologi"
                                            placeholder="Tipiologi Masjid...">
                                        <small class="form-text text-muted">Tipiologi Masjid</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Luas Tanah</label>
                                        <input required type="number" class="form-control" id="luas_tanah"
                                            placeholder="Luas Tanah...">
                                        <small class="form-text text-muted">Luas Tanah (m2)</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Luas Bangunan</label>
                                        <input required type="number" class="form-control" id="luas_bangunan"
                                            placeholder="Luas Bangunan...">
                                        <small class="form-text text-muted">Luas Bangunan (m2)</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Status Tanah</label>
                                        <select required type="text" class="form-control" id="status_tanah">
                                            <option value="" selected disabled>--Status Tanah--</option>
                                            <option value="1">Wakaf</option>
                                            <option value="2">Milik</option>
                                            <option value="3">Lainnya</option>
                                        </select>
                                        <small class="form-text text-muted">Status Kepemilikan Tanah</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Sertifikat</label>
                                        <select required type="text" class="form-control" id="sertifikat">
                                            <option value="" selected disabled>--Sertifikat--</option>
                                            <option value="1">Sudah</option>
                                            <option value="0">Belum</option>
                                        </select>
                                        <small class="form-text text-muted">Apakah Sudah Bersetifikat</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Imam</label>
                                        <input required type="number" class="form-control" id="jml_imam"
                                            placeholder="Jumlah Orang...">
                                        <small class="form-text text-muted">Jumlah Imam</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Khatib</label>
                                        <input required type="text" class="form-control" id="jml_khatib"
                                            placeholder="Jumlah Orang...">
                                        <small class="form-text text-muted">Jumlah Khatib</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Pengurus Masjid</label>
                                        <input required type="text" class="form-control" id="jml_pengurus"
                                            placeholder="Jumlah Orang...">
                                        <small class="form-text text-muted">Jumlah Pengurus Masjid</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Jamaah</label>
                                        <select required type="text" class="form-control" id="jml_jamaah">
                                            <option value="" selected disabled>--Jml Jamaah--</option>
                                            <option value="0">kurang dari 50 orang</option>
                                            <option value="1">50 - 100 orang</option>
                                            <option value="2">100 - 150 orang</option>
                                            <option value="3">150 - 200 orang</option>
                                            <option value="4">lebih dari 200 orang</option>
                                        </select>
                                        <small class="form-text text-muted">Jumlah Jamaah</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Kondisi Bangunan</label>
                                        <select required type="text" class="form-control" id="kondisi_bangunan">
                                            <option value="" selected disabled>--Kondisi--</option>
                                            <option value="1">Baik</option>
                                            <option value="2">Rusak</option>
                                            <option value="3">Rehab</option>
                                        </select>
                                        <small class="form-text text-muted">Kondisi Bangunan Saat Ini</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Remaja Masjid</label>
                                        <select required type="text" class="form-control" id="keg_remaja_masjid">
                                            <option value="" selected disabled>--Pilih--</option>
                                            <option value="1">Ada</option>
                                            <option value="0">Tidak Ada</option>
                                        </select>
                                        <small class="form-text text-muted">Kegiatan Remaja Masjid</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Masjid Taklim</label>
                                        <select required type="text" class="form-control" id="keg_majelis_taklim">
                                            <option value="" selected disabled>--Pilih--</option>
                                            <option value="1">Ada</option>
                                            <option value="0">Tidak Ada</option>
                                        </select>
                                        <small class="form-text text-muted">Kegiatan Masjid Taklim</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">TPA</label>
                                        <select required type="text" class="form-control" id="keg_tpa">
                                            <option value="" selected disabled>--Pilih--</option>
                                            <option value="1">Ada</option>
                                            <option value="0">Tidak Ada</option>
                                        </select>
                                        <small class="form-text text-muted">Kegiatan TPA</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" id="btn-save-masjid"
                                onclick="tambahData()">Tambah</button>
                            <button type="button" class="btn btn-success" id="btn-update-masjid"
                                onclick="updateData()">Simpan</button>
                            <button type="button" class="btn btn-secondary" id="btn-close-validasi"
                                data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modal-petugas">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="title-petugas">U P Z</h5>
                        <button type="button" class="close btn_close_petugas" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form id="form-upload-petugas" accept-charset="UTF-8" method="post" enctype="multipart/form-data"
                        target="hiddenFrame">
                        <input hidden type="file" class="file-petugas" accept=".xls,.xlsx" id="filena-petugas"
                            name="petugas">
                    </form>

                    <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                        <div class="modal-body">
                            <div class="form-group" id="upload-petugas">
                                <label for="group">Upload Daftar UPZ</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" disabled placeholder="File Excel UPZ"
                                        id="file-petugas">
                                    <div class="input-group-append mb-3">
                                        <button type="button" class="browse-petugas-baru btn btn-primary"
                                            onclick="browseFilePetugas()">Cari</button>
                                        <button type="button" onclick="clearFilePetugas()"
                                            class="clear-petugas-baru btn btn-outline-primary">Clear</button>
                                    </div>
                                </div>
                                <a class="btn btn-info btn-sm" href="template/TemplateMuzakki.xlsx">Download</a>
                                <button type="button" class="btn btn-sm btn-outline-info" id="btn-upload-petugas"
                                    onclick="tambahDataPetugas()">Upload</button>
                                <hr>
                            </div>
                            <div id="petugas-baru">
                                <div class="form-group">
                                    <label for="group">Pada Masjid</label>
                                    <select required type="text" class="form-control" id="id_masjid">
                                        <option value="" selected disabled>--Masjid--</option>
                                    </select>
                                    <small class="form-text text-muted">Bertugas di Masjid</small>
                                </div>
                                <div class="row">
                                    <div class="form-group col">
                                        <input type="text" id="idNa-petugas" hidden>
                                        <label for="group">Nama UPZ</label>
                                        <input required type="text" class="form-control" id="nama-petugas"
                                            placeholder="Nama Petugas...">
                                        <small class="form-text text-muted">Nama UPZ</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Email</label>
                                        <input required type="email" class="form-control" id="email"
                                            placeholder="Email...">
                                        <small class="form-text text-muted">Email Petugas</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Password</label>
                                        <input required type="password" class="form-control" id="password"
                                            placeholder="Password...">
                                        <small class="form-text text-muted">Password Min 6 Digit</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Jabatan</label>
                                        <select required type="text" class="form-control" id="role">
                                            <option value="" selected disabled>--Jabatan--</option>
                                            <option value="7">Pembina</option>
                                            <option value="4">Ketua</option>
                                            <option value="5">Sekertaris</option>
                                            <option value="6">Bendahara</option>
                                        </select>
                                        <small class="form-text text-muted">Lokasi Kecamatan</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col">
                                        <label for="group">Alamat</label>
                                        <input required type="text" class="form-control" id="alamat"
                                            placeholder="Alamat...">
                                        <small class="form-text text-muted">Alamat User</small>
                                    </div>
                                    <div class="form-group col">
                                        <label for="group">Phone</label>
                                        <input required type="text" class="form-control" id="phone"
                                            placeholder="Tlp / WA...">
                                        <small class="form-text text-muted">No Telp / WA</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" id="btn-save-petugas"
                                onclick="tambahDataPetugas()">Tambah</button>
                            <button type="button" class="btn btn-success" id="btn-update-petugas"
                                onclick="updateDataPetugas()">Simpan</button>
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
