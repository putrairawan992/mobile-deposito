@extends('layout.default')

@section('content')
    <script src="js/pages/layout.js"></script>
    <script src="js/pages/laporan.js"></script>

    <head>
        <title>Laporan | Sipakat</title>
    </head>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Laporan</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Admin</a></li>
                            <li class="breadcrumb-item active">Laporan</li>
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
                <div class="col">
                    <!-- Left col -->
                    <section class="col connectedSortable">
                        <!-- Custom tabs (Charts with tabs)-->
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-file mr-3"></i>
                                    Pengaturan Laporan Zakat Infaq Shodaqoh dan Distribusi
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
                                    <div class="justify-content-end row">
                                        <div class="col-2">
                                            <input type="date" class="text-sm form-control form-control-sm"
                                                placeholder="Input Tanggal" id="tglAwal" onchange="filterNa()">
                                            <small class="form-text text-muted">Pilih Tanggal Awal</small>
                                        </div>
                                        <div class="col-2">
                                            <input type="date" class="text-sm form-control form-control-sm"
                                                placeholder="Input Tanggal" id="tglAkhir" onchange="filterNa()">
                                            <small class="form-text text-muted">Pilih Tanggal Akhir</small>
                                        </div>
                                        <div class="col-2">
                                            <select required type="text" class="text-sm form-control form-control-sm"
                                                id="bulan" onchange="filterBulan()">
                                                <option value="" selected>-- Pilih Bulan --</option>
                                                <option value="0">Semua Bulan</option>
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
                                            <small class="form-text text-muted">Pilih Bulan</small>
                                        </div>
                                        <div class="col-1">
                                            <select required type="text" class="form-control form-control-sm text-sm"
                                                id="tahun_laporan" onchange="filterBulan()">
                                                <option value="" selected>-- Loading --</option>
                                            </select>
                                            <small class="form-text text-muted">Pilih Tahun</small>
                                        </div>
                                        <div class="col-2">
                                            <select required type="text" class="text-sm form-control form-control-sm"
                                                id="program" onchange="filterNa()">
                                                <option value="" disabled selected>-- Pilih Program --</option>
                                                <option value="All">Semua Program</option>
                                                <option value="Program Kesehatan">Program Kesehatan</option>
                                                <option value="Program Advokasi dan Dakwah">Program Advokasi dan Dakwah
                                                </option>
                                                <option value="Program Kemanusiaan">Program Kemanusiaan</option>
                                                <option value="Program Pendidikan">Program Pendidikan</option>
                                                <option value="Program Ekonomi">Program Ekonomi</option>
                                                <option value="Program Berdasarkan Asnaf">Program Berdasarkan Asnaf</option>
                                            </select>
                                            <small class="form-text text-muted">Pilih Jenis Program</small>
                                        </div>
                                        <div class="col-2">
                                            <select required type="text" class="text-sm form-control form-control-sm"
                                                id="id_masjid" onchange="filterNa()">
                                                <option selected disabled>Loading...</option>
                                            </select>
                                            <small class="form-text text-muted">Pilih Masjid</small>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn btn-sm btn-outline-info"
                                                onclick="printDiv('printableArea')">Print</button>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- /.card-body -->
                    </section>

                    <section class="col connectedSortable">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-file mr-3"></i>
                                    Laporan Zakat Infaq Shodaqoh dan Distribusi
                                </h3>
                                <div class="card-tools">
                                    <ul class="nav nav-pills ml-auto" hidden>
                                        <li class="nav-item">
                                            <button class="btn btn-outline-info btn-sm" data-toggle="tab">Buat
                                                Baru</button>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- /.card-header -->
                            <div class="card-body" id="printableArea">
                                <div class="tab-content text-center mt-3">
                                    <img class="rounded" src="img/Logo_BAZNAS_RI-Hijau-01.png" alt="">
                                    <h3 class="text-bold">KOTA PAREPARE</h3>
                                    <h4 class="text-bold"><u>LAPORAN PENERIMAAN DAN PENYALURAN ZAKAT FITRAH</h4>
                                    <h4 class="text-bold" id="tahun-laporan">TAHUN ( 1444 H/2023 M)</u></h4>
                                    <br>
                                    <br>
                                    <table class="mx-lg-5 mt-lg-4" style="margin-left: 140px;">
                                        <tbody class="text-left text-md">
                                            <tr>
                                                <td>Nama Masjid</td>
                                                <td id="nama-masjid">: Masjid RAYA</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Alamat</td>
                                                <td id="nama-jalan">: Jl. Sultan Hasanuddin</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td class="align-top">Nama Amil
                                                    Zakat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </td>
                                                <td>
                                                    <div id="pembina">1. Pak Pembina</div>
                                                    <div id="ketua">2. Pak Ketua</div>
                                                    <div id="sekertaris">3. Pak Sekertaris</div>
                                                    <div id="bendahara">4. Pak Bendahara</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah Muzakki</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah Jiwa</td>
                                                <td id="jmlOrang">: 10 Orang</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah Uang</td>
                                                <td id="jmlUang">: Rp 200.000</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah Beras</td>
                                                <td id="jmlBeras">: 10 Liter</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="text-left mx-lg-5 mt-lg-4"
                                        style="margin-left: 140px;margin-bottom: 10px;margin-top: 20px">
                                        Penerimaan
                                        Donasi</div>
                                    <table id="tabel-penerimaan" class="table table-bordered w-75"
                                        style="margin-left: 140px;margin-right: 140px">
                                        <thead>
                                            <th class="col-1">No.</th>
                                            <th class="col-2">Jenis ZIS</th>
                                            <th class="col-1">Jml Orang</th>
                                            <th class="col-1">Uang (Rp)</th>
                                            <th class="col-1">Beras (Liter)</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>Zakat Penghasilan</td>
                                                <td>3 Orang</td>
                                                <td>Rp 100.000</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>2.</td>
                                                <td>Infaq</td>
                                                <td>1 Orang</td>
                                                <td>Rp 100.000</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>3.</td>
                                                <td>Shodaqoh</td>
                                                <td>4 Orang</td>
                                                <td>Rp 20.000</td>
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="text-left mx-lg-5 mt-lg-4"
                                        style="margin-left: 140px;margin-bottom: 10px;margin-top: 20px">
                                        Penyaluran Kepada</div>
                                    <table id="table-penyaluran" class="table table-bordered w-75"
                                        style="margin-left: 140px;margin-right: 140px">
                                        <thead>
                                            <th class="col-1">No.</th>
                                            <th class="col-2">Mustahik</th>
                                            <th class="col-1">Uang (Rp)</th>
                                            <th class="col-1">Jml Orang</th>
                                            <th class="col-1">Beras (Liter)</th>
                                            <th class="col-1">Jml Orang</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>Fakir</td>
                                                <td>Rp 100.000</td>
                                                <td>3 Orang</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>2.</td>
                                                <td>Miskin</td>
                                                <td>Rp 100.000</td>
                                                <td>1 Orang</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>3.</td>
                                                <td>Duafa</td>
                                                <td>Rp 20.000</td>
                                                <td>4 Orang</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div id="tgl-print" class="text-right mt-2"
                                        style="margin-left: 140px;margin-right: 140px">Parepare, 18
                                        April 2023</div>
                                    <br>
                                    <div class="text-left mx-lg-5" style="margin-left: 140px;margin-right: 140px">PANITIA
                                        AMIL ZAKAT FITRAH</div>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <div id="nama-print" class="text-left mx-lg-5"
                                        style="margin-left: 140px;margin-right: 140px">(Nama Ketua Panitia)</div>
                                </div>
                            </div>
                        </div>
                </div>
        </section>
    </div>
    <!-- /.card -->
    <!-- /.card -->
    <!-- /.Left col -->
    </div>
    <!-- /.row (main row) -->
    </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@endsection
