<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DonasiController extends Controller
{
    public function index()
    {
        $donasi = DB::table('donasi')
            ->leftjoin('jenis_zis', 'donasi.jenis_zis', '=', 'jenis_zis.id')
            ->leftjoin('masjid', 'donasi.id_masjid', '=', 'masjid.id')
            ->leftjoin('jenis_transaksi', 'donasi.jenis_transaksi', '=', 'jenis_transaksi.id')
            ->leftjoin('user_transaksi as u1', 'donasi.id_donatur', '=', 'u1.id')
            ->leftjoin('users as u2', 'donasi.id_muzakki', '=', 'u2.id')
            ->select('donasi.*', 'jenis_transaksi.nama as jenisTransaksi', 'u1.npwz', 'u1.npwp', 'u1.nama as namaDonatur', 'u2.nama as namaMuzaki', 'jenis_zis.nama as jenisZis', 'masjid.nama as namaMasjid');
        if (auth()->user()->role == 4 || auth()->user()->role == 5 || auth()->user()->role == 6 || auth()->user()->role == 7) {
            $donasi->where('donasi.id_masjid', '=', auth()->user()->id_masjid);
        }
        return $donasi->get();
    }

    public function detail($id)
    {
        $donasi = DB::table('donasi')
            ->where('donasi.id', $id)
            ->leftjoin('jenis_zis', 'donasi.jenis_zis', '=', 'jenis_zis.id')
            ->leftjoin('masjid', 'donasi.id_masjid', '=', 'masjid.id')
            ->leftjoin('jenis_transaksi', 'donasi.jenis_transaksi', '=', 'jenis_transaksi.id')
            ->leftjoin('user_transaksi as u1', 'donasi.id_donatur', '=', 'u1.id')
            ->leftjoin('users as u2', 'donasi.id_muzakki', '=', 'u2.id')
            ->select('donasi.*', 'jenis_transaksi.nama as jenisTransaksi', 'u1.npwz', 'u1.npwp', 'u1.nama as namaDonatur', 'u1.email as emailDonatur', 'u2.nama as namaMuzaki', 'u2.phone', 'u2.email', 'u2.alamat', 'jenis_zis.nama as jenisZis', 'masjid.nama as namaMasjid');

        return response()->json($donasi->first(), 200);
    }

    public function store(Request $request)
    {
        $id_muzakki = $request->id_muzakki;
        $id_masjid = $request->id_masjid;
        if (auth()->user()->role == 4 || auth()->user()->role == 5 || auth()->user()->role == 6) {
            $id_muzakki = auth()->user()->id;
            $id_masjid = auth()->user()->id_masjid;
        } elseif (auth()->user()->role == 7) {
            return response()->json('Not Authorized', 403);
        }

        $dataInsert = [
            'id_donatur' => $request->id_donatur,
            'id_muzakki' => $id_muzakki,
            'id_masjid' => $id_masjid,
            'jenis_zis' => $request->jenis_zis,
            'jenis_transaksi' => $request->jenis_transaksi,
            'keterangan' => $request->keterangan,
            'amount' => $request->amount,
            'beras' => $request->beras,
            'keterangan' => $request->keterangan,
            'tanggal' => $request->tanggal,
        ];

        $donasi = DB::table('donasi');

        try {
            $donasi->insert($dataInsert);
            return response()->json($dataInsert, 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function upload(Request $request)
    {
        $dataInsert = $request->all();
        // foreach ($dataInsert as $key => $value) {
        //     if (
        //         DB::table('donasi')
        //             ->where('nama', '=', $value['nama'])
        //             ->first()
        //     ) {
        //         unset($dataInsert[$key]);
        //     }
        // }

        // return response()->json(['data1' => $dataInsert, 'data2' => $data], 400);
        try {
            $donasi = DB::table('donasi')->insert($dataInsert);
            return response()->json($dataInsert, 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request)
    {
        $id_muzakki = $request->id_muzakki;
        $id_masjid = $request->id_masjid;
        if (auth()->user()->role == 4 || auth()->user()->role == 5 || auth()->user()->role == 6) {
            // $id_muzakki = auth()->user()->id;
            $id_masjid = auth()->user()->id_masjid;
        } elseif (auth()->user()->role == 7) {
            return response()->json('Not Authorized', 403);
        }

        $dataUpdate = [
            'id_donatur' => $request->id_donatur,
            'id_muzakki' => $id_muzakki,
            'id_masjid' => $id_masjid,
            'jenis_zis' => $request->jenis_zis,
            'jenis_transaksi' => $request->jenis_transaksi,
            'keterangan' => $request->keterangan,
            'amount' => $request->amount,
            'beras' => $request->beras,
            'keterangan' => $request->keterangan,
            'tanggal' => $request->tanggal,
        ];

        try {
            DB::table('donasi')
                ->where('id', $request->id)
                ->update($dataUpdate);
            return response()->json($dataUpdate, 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function aktivasi(Request $request)
    {
        $donasi = DB::table('donasi')
            ->where('id', $id)
            ->first();

        if ($donasi->status == 1) {
            $status = 0;
        } else {
            $status = 1;
        }

        $updateData = [
            'status' => $status,
        ];

        try {
            $donasi = DB::table('donasi')->where('id', $id);
            $donasi->update($updateData);
            return response()->json(['Aktivasi Sucess', 200, 'data' => $donasi->first()]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $donasi = DB::table('donasi')->where('id', $id);

            if (auth()->user()->role == 1 || auth()->user()->role == 99) {
                if ($donasi->delete()) {
                    return response()->json(['status' => 'success', 'message' => 'Donasi deleted successfully', 'data' => $donasi]);
                }
            } else {
                return response()->json(['status' => 'error', 'message' => 'You Not Authorize to Delete this Data']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
