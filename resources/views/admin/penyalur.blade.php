@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/penyalur.js"></script>

    <head>
        <title>Penyalur | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Penyalur</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Penyalur</li>
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
                                    <i class="fas fa-money-bill-wave mr-3"></i>
                                    Rekap Distribusi Donasi
                                </h3>
                                <div class="card-tools" hidden>
                                    {{-- <ul class="nav nav-pills ml-auto">
                                        <li class="nav-item">
                                            <select required type="text" class="form-control form-control-sm text-sm"
                                                id="id_masjid_rekap" onchange="rekapPenyalur()">
                                                <option selected disabled>Loading...</option>
                                            </select>
                                        </li>
                                        <li class="nav-item">
                                            <select required type="text" class="form-control form-control-sm text-sm"
                                                id="jenis_zis_rekap" onchange="rekapPenyalur()">
                                                <option selected disabled>Loading...</option>
                                            </select>
                                        </li>
                                    </ul> --}}
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content p-0">
                                    <div class="row px-2" style="margin-top: -5px">
                                        <select required type="text"
                                            class="col mr-1 form-control form-control-sm text-sm" id="tahun_rekap"
                                            onchange="rekapPenyalur()">
                                            <option value="" selected>-- Loading --</option>
                                        </select>
                                        <select required type="text" class="col form-control form-control-sm text-sm"
                                            id="bulan_rekap" onchange="rekapPenyalur()">
                                            <option value="" disabled>-- Piih Bulan --</option>
                                            <option value="0" selected>Semua Bulan</option>
                                            <option value="1">Januari</option>
                                            <option value="2">Februari</option>
                                            <option value="3">Maret</option>
                                            <option value="4">April</option>
                                            <option value="5">Mei</option>
                                            <option value="6">Juni</option>
                                            <option value="7">Juli</option>
                                            <option value="8">Agustus</option>
                                            <option value="9">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </select>
                                        <select required type="text"
                                            class="col mx-1 form-control form-control-sm text-sm" id="id_masjid_rekap"
                                            onchange="rekapPenyalur()">
                                            <option selected disabled>Loading...</option>
                                        </select>
                                        <select required type="text" class="col form-control form-control-sm text-sm"
                                            id="program_rekap" onchange="rekapPenyalur()">
                                            <option value="" disabled>-- Jenis Program --</option>
                                            <option value="All" selected>-- Semua Program --</option>
                                            <option value="Program Kesehatan">Program Kesehatan</option>
                                            <option value="Program Advokasi dan Dakwah">Program Advokasi dan Dakwah
                                            </option>
                                            <option value="Program Kemanusiaan">Program Kemanusiaan</option>
                                            <option value="Program Pendidikan">Program Pendidikan</option>
                                            <option value="Program Ekonomi">Program Ekonomi</option>
                                            <option value="Program Berdasarkan Asnaf">Program Berdasarkan Asnaf</option>
                                        </select>
                                    </div>
                                    <table id="tabel-list-penyalur-rekap" class="mt-2 table table-bordered table-striped"
                                        data-export-title="List Donasi" style="width:100%"></table>
                                    <div class="text-center">
                                        <button class="btn btn-outline-danger m-3" type="button" disabled
                                            style="pointer-events: none;" id="spinnerloadinglistpenyalurrekap">
                                            <span class="spinner-border spinner-border-sm mr-1" role="status"
                                                aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </section>
                    <!-- /.Left col -->
                </div>
                <!-- /.row (main row) -->
            </div><!-- /.container-fluid -->
        </section>
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
                                    Penyalur Zakat Infaq Shodaqoh
                                </h3>
                                <div class="card-tools">
                                    <ul class="nav nav-pills ml-auto">
                                        <li class="nav-item">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="modal" id="buat-baru"
                                                data-target="#modal-penyalur" onclick="newPenyalur()">Buat Baru</button>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content p-0">
                                    <table id="tabel-list-penyalur" class="table table-bordered table-striped"
                                        data-export-title="List Penyalur" style="width:100%"></table>
                                    <div class="text-center">
                                        <button class="btn btn-outline-danger m-3" type="button" disabled
                                            style="pointer-events: none;" id="spinnerloadinglistpenyalur">
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

    <div class="modal" tabindex="-1" role="dialog" id="modal-penyalur">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="title-penyalur">Penyalur</h5>
                    <button type="button" class="close btn_close_penyalur" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                    <div class="modal-body">
                        <div id="penyalur-baru">
                            <div class="form-group">
                                <input type="text" id="idNa" hidden>
                                <label for="group">Masjid UPZ</label>
                                <select required type="text" class="form-control" id="id_masjid">
                                    <option value="" selected disabled>--Loading Masjid--</option>
                                </select>
                                <small class="form-text text-muted">Masjid UPZ Penyalur</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Nama</label>
                                <select required type="text" class="form-control" id="id_mustahik">
                                    <option value="" selected disabled>--Loading Mustahik--</option>
                                </select>
                                <small class="form-text text-muted">Nama Mustahik</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Jenis</label>
                                <select required type="text" class="form-control" id="id_jenis_mustahik">
                                    <option value="" selected disabled>--Loading Jenis--</option>
                                </select>
                                <small class="form-text text-muted">Jenis Mustahik</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Program</label>
                                <select required type="text" class="form-control" id="program">
                                    <option value="" selected disabled>-- Jenis Program --</option>
                                    <option value="Program Kesehatan">Program Kesehatan</option>
                                    <option value="Program Advokasi dan Dakwah">Program Advokasi dan Dakwah</option>
                                    <option value="Program Kemanusiaan">Program Kemanusiaan</option>
                                    <option value="Program Pendidikan">Program Pendidikan</option>
                                    <option value="Program Ekonomi">Program Ekonomi</option>
                                    <option value="Program Berdasarkan Asnaf">Program Berdasarkan Asnaf</option>
                                </select>
                                <small class="form-text text-muted">Program Kegiatan Penerimaan</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Tanggal</label>
                                <input required type="date" class="form-control" id="tanggal">
                                <small class="form-text text-muted">Input Tanggal Transaksi</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Penerima Uang</label>
                                <input required type="number" class="form-control" id="amount"
                                    placeholder="Uang Dalam Rupiah...">
                                <small class="form-text text-muted">Total Penyalur Berupa Uang dalam Rupiah</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Orang Penerima Uang</label>
                                <input required type="number" class="form-control" id="jml_orang_amount"
                                    placeholder="Jumlah Orang Penerima Uang...">
                                <small class="form-text text-muted">Jumlah Orang Penerima Uang Penyalur</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Penerima Beras</label>
                                <input required type="text" class="form-control" id="beras"
                                    placeholder="Penerima Beras Dalam Liter...">
                                <small class="form-text text-muted">Total Penyalur Berupa Beras dalam Liter</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Orang Penerima Beras</label>
                                <input required type="text" class="form-control" id="jml_orang_beras"
                                    placeholder="Jumlah Orang Penerima Beras...">
                                <small class="form-text text-muted">Jumlah Orang Penerima Beras Penyalur</small>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="btn-save-penyalur"
                            onclick="tambahDataPenyalur()">Tambah</button>
                        <button type="button" class="btn btn-success" id="btn-update-penyalur"
                            onclick="updateDataPenyalur()">Simpan</button>
                        <button type="button" class="btn btn-secondary" id="btn-close-validasi"
                            data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
@endsection
