<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DonaturController extends Controller
{
    public function index()
    {
        $donatur = DB::table('user_transaksi')
            ->where('role', 0)
            ->orderBy('nama', 'ASC');
        return $donatur->get();
    }

    public function detail($id)
    {
        $donatur = DB::table('user_transaksi')
            ->where('id', $id)
            ->where('role', 0)
            ->first();
        return response()->json($donatur, 200);
    }

    public function store(Request $request)
    {
        $dataInsert = [
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'phone' => $request->phone,
            'email' => $request->email,
            'id_masjid' => auth()->user()->id_masjid,
        ];

        $donatur = DB::table('user_transaksi');

        try {
            $donatur->insert($dataInsert);
            return response()->json($dataInsert, 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function upload(Request $request)
    {
        $dataInsert = $request->all();
        foreach ($dataInsert as $key => $value) {
            if (array_key_exists('phone', $value)) {
                if (
                    DB::table('user_transaksi')
                        ->where('phone', '=', $value['phone'])
                        ->first()
                ) {
                    unset($dataInsert[$key]);
                }

                $value['id_masjid'] = auth()->user()->id_masjid;
            }
        }
        // return response()->json(['data1' => $dataInsert], 400);
        try {
            $donatur = DB::table('user_transaksi')->insert($dataInsert);
            return response()->json($dataInsert, 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request)
    {
        $dataUpdate = [
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'phone' => $request->phone,
            'email' => $request->email,
        ];

        try {
            DB::table('user_transaksi')
                ->where('id', $request->id)
                ->update($dataUpdate);
            return response()->json($dataUpdate, 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function aktivasi(Request $request)
    {
        $donatur = DB::table('user_transaksi')
            ->where('id', $id)
            ->first();

        if ($donatur->status == 1) {
            $status = 0;
        } else {
            $status = 1;
        }

        $updateData = [
            'status' => $status,
        ];

        try {
            $donatur = DB::table('user_transaksi')->where('id', $id);
            $donatur->update($updateData);
            return response()->json(['Aktivasi Sucess', 200, 'data' => $donatur->first()]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $donasi = DB::table('user_transaksi')
                ->where('id', $id)
                ->where('role', 0);

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
