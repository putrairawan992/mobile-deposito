@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/donasi.js"></script>

    <head>
        <title>Donasi | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Donasi</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Donasi</li>
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
                                    Rekap Zakat Infaq Shodaqoh
                                </h3>
                                <div class="card-tools" hidden>
                                    {{-- <ul class="nav nav-pills ml-auto">
                                        <li class="nav-item">
                                            <select required type="text" class="form-control form-control-sm text-sm"
                                                id="id_masjid_rekap" onchange="rekapDonasi()">
                                                <option selected disabled>Loading...</option>
                                            </select>
                                        </li>
                                        <li class="nav-item">
                                            <select required type="text" class="form-control form-control-sm text-sm"
                                                id="jenis_zis_rekap" onchange="rekapDonasi()">
                                                <option selected disabled>Loading...</option>
                                            </select>
                                        </li>
                                    </ul> --}}
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="row px-2" style="margin-top: -5px">
                                        <select required type="text"
                                            class="col mr-1 form-control form-control-sm text-sm" id="tahun_rekap"
                                            onchange="rekapDonasi()">
                                            <option value="" selected>-- Loading --</option>
                                        </select>
                                        <select required type="text"
                                            class="col mr-1 form-control form-control-sm text-sm" id="bulan_rekap"
                                            onchange="rekapDonasi()">
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
                                            onchange="rekapDonasi()">
                                            <option selected disabled>Loading...</option>
                                        </select>
                                        <select required type="text" class="col form-control form-control-sm text-sm"
                                            id="jenis_zis_rekap" onchange="rekapDonasi()">
                                            <option selected disabled>Loading...</option>
                                        </select>
                                    </div>
                                    <table id="tabel-list-donasi-rekap" class="mt-2 table table-bordered table-striped"
                                        data-export-title="List Donasi" style="width:100%"></table>
                                    <div class="text-center">
                                        <button class="btn btn-outline-danger m-3" type="button" disabled
                                            style="pointer-events: none;" id="spinnerloadinglistdonasirekap">
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
                                    Donasi Zakat Infaq Shodaqoh
                                </h3>
                                <div class="card-tools">
                                    <ul class="nav nav-pills ml-auto">
                                        <li class="nav-item">
                                            <button onclick="newDonasi()" class="btn btn-outline-info btn-sm" id="buat-baru"
                                                data-toggle="modal" data-target="#modal-donasi">Buat Baru</button>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content p-0">
                                    <table id="tabel-list-donasi" class="table table-bordered table-striped"
                                        data-export-title="List Donasi" style="width:100%"></table>
                                    <div class="text-center">
                                        <button class="btn btn-outline-danger m-3" type="button" disabled
                                            style="pointer-events: none;" id="spinnerloadinglistdonasi">
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

        <div class="modal" tabindex="-1" role="dialog" id="modal-donasi">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="title-donasi">Donasi</h5>
                        <button type="button" class="close btn_close_donasi" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form accept-charset="UTF-8" method="post" enctype="multipart/form-data" target="hiddenFrame">
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" id="idNa" hidden>
                                <label for="group">Nama Muzakki</label>
                                <select required type="text" class="form-control" id="id_donatur">
                                    <option selected disabled>Loading...</option>
                                </select>
                                <small class="form-text text-muted">Pilih Nama Muzakki</small>
                            </div>
                            <div class="form-group" id="id-masjid">
                                <label for="group">Nama Masjid</label>
                                <select required type="text" class="form-control" id="id_masjid"
                                    onchange="gantiPetugas()">
                                    <option selected disabled>Loading...</option>
                                </select>
                                <small class="form-text text-muted">Pilih Nama Masjid</small>
                            </div>
                            <div class="form-group" id="id-petugas">
                                <label for="group">Petugas UPZ</label>
                                <select required type="text" class="form-control" id="id_muzakki">
                                    <option selected disabled>Loading...</option>
                                </select>
                                <small class="form-text text-muted">Pilih Nama Muzakki</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Jenis ZIS</label>
                                <select required type="text" class="form-control" id="jenis_zis">
                                    <option selected disabled>Loading...</option>
                                </select>
                                <small class="form-text text-muted">Pilih Jenis ZIS</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Jenis Transaksi</label>
                                <select required type="text" class="form-control" id="jenis_transaksi">
                                    <option selected disabled>Loading...</option>
                                </select>
                                <small class="form-text text-muted">Pilih Jenis ZIS</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Tanggal</label>
                                <input required type="date" class="form-control" id="tanggal">
                                <small class="form-text text-muted">Input Tanggal Transaksi</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Donasi Uang</label>
                                <input required type="number" class="form-control" id="amount"
                                    placeholder="Uang dalam Rupiah">
                                <small class="form-text text-muted">Input Donasi Uang Dalam Rupiah</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Donasi Beras</label>
                                <input required type="text" class="form-control" id="beras"
                                    placeholder="Beras dalam Liter">
                                <small class="form-text text-muted">Input Berat Beras dalam Liter</small>
                            </div>
                            <div class="form-group">
                                <label for="group">Keterangan</label>
                                <input required type="text" class="form-control" id="keterangan"
                                    placeholder="Keterangan">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" id="btn-update-donasi"
                                onclick="updateDonasi()">Simpan</button>
                            <button type="button" class="btn btn-success" id="btn-save-donasi"
                                onclick="tambahData()">Tambah</button>
                            <button type="button" class="btn btn-secondary" id="btn-close-donasi"
                                data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modal-kwitansi">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="title-kwitansi">Kwitansi Donasi</h5>
                        <button type="button" class="close btn_close_donasi" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body" id="print-kwitansi">
                        <table class="text-center align-items-center">
                            <thead>
                                <tr>
                                    <th class="col-2"></th>
                                    <th class="col-2"></th>
                                    <th class="col-2"></th>
                                    <th class="col-2"></th>
                                </tr>
                            </thead>
                            <tbody class="border">
                                <tr>
                                    <th>
                                        <img class="rounded" src="img/Logo_BAZNAS_RI-Hijau-01.png" alt="">
                                    </th>
                                    <th colspan="2">
                                        <div class="text-lg text-bold">BADAN AMIL ZAKAT NASIONAL</div>
                                        <div style='margin-top: -7px'>Kota Pare Pare</div>
                                        Jl. K. H. Agussalim .No 63<br>
                                        ( Komp. Islamic Center Lantai 2 )<br>
                                        KotaParepare<br>
                                        081342346244
                                    </th>
                                    <th>
                                        <div class="row align-items-center p-2">
                                            <h5 class="mr-4 text-bold">Lembar</h5>
                                            <h1 class="border p-2 px-4">1</h1>
                                        </div>
                                        <div class="text-sm">Untuk Arsip Wajib Pajak</div>
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="4" class="text-lg text-bold">
                                        <hr>Bukti Setoran Zakat
                                    </th>
                                </tr>
                                <tr>
                                    <th class="text-left">&nbsp;&nbsp;&nbsp;Nomor<br>&nbsp;&nbsp;&nbsp;Periode</th>
                                    <th class="text-left" colspan="3">
                                        <div id="nomor">: Nomor/BAZNASPR/BULAN/TAHUN</div>
                                        <div id="periode">: Bulan Tahun</div>
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="4">
                                        <hr>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="text-left">&nbsp;&nbsp;&nbsp;Telah di Terima dari
                                        <br>&nbsp;&nbsp;&nbsp;NPWZ<br>&nbsp;&nbsp;&nbsp;NPWP
                                        <br>&nbsp;&nbsp;&nbsp;Alamat<br>&nbsp;&nbsp;&nbsp;Telepon / Email
                                    </th>
                                    <th class="text-left" colspan="3">
                                        <div id="dari">:</div>
                                        <div id="NPWZ">:</div>
                                        <div id="NPWP">:</div>
                                        <div id="alamat">:</div>
                                        <div id="telepon">:</div>
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="4">
                                        <br>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="border p-2">Objek ZIS</th>
                                    <th class="border p-2">Uraian</th>
                                    <th class="border p-2">Via</th>
                                    <th class="border p-2">Jumlah</th>
                                </tr>
                                <tr class="text-left text-xs">
                                    <th class="border p-2" id="objek">Objek ZIS</th>
                                    <th class="border p-2" id="uraian">Uraian</th>
                                    <th class="border p-2 text-center" id="via">Via</th>
                                    <th class="border p-2 text-right" id="jumlah">Jumlah</th>
                                </tr>
                                <tr>
                                    <th class="border p-2">Total</th>
                                    <th class="border p-2 text-right" colspan="3" id="total">Rp 1xx.xxxx</th>
                                </tr>
                                <tr>
                                    <th colspan="4" class="text-sm text-left">
                                        <div class="p-2" id="terbilang">Terbilang :</div>
                                        <hr>
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="4" class="text-sm">
                                        <div class="p-2 row" id="namaDonatur"> </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="border p-2" colspan="2">
                                        <div>Pengesahan Petugas Amil</div>
                                        <div id="tgl-petugas">Pare pare Tgl 14/03/2023</div>
                                        <br>
                                        <br>
                                        <br>
                                        <div id="petugas">Petugas : Saiful, S.Sos.I., M.Pd</div>
                                    </th>
                                    <th class="border p-2" colspan="2">
                                        <div>Penyetor Wajib Zakat</div>
                                        <div id="tgl-donatur">Pare pare Tgl 14/03/2023</div>
                                        <br>
                                        <br>
                                        <br>
                                        <div id="atsnamadonatur">Penyetor : H. Iwan Asaad, AP, M.Si</div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning"
                            onclick="printDiv('print-kwitansi')">Print</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
@endsection
