<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\helpers;

class PromoController extends Controller
{
    public function index()
    {
        $promo = DB::table('promo')->get();

        foreach ($promo as $value) {
            !empty($value->deskripsi) ? ($value->deskripsi = dekripsina($value->deskripsi, $value->kriptorone, $value->kriptortwo)) : null;
            !empty($value->image) ? ($value->showImage = dekripsinaFile($value->image, $value->kriptorone, $value->kriptortwo, promoPath() . 'show/')) : null;
        }

        return $promo;
    }

    public function show()
    {
        $promo = DB::table('promo')
            ->where('status', 1)
            ->where('end_date', '>=', date('Y-m-d'))
            ->orderby('id', 'desc')
            ->get();

        foreach ($promo as $value) {
            !empty($value->deskripsi) ? ($value->deskripsi = dekripsina($value->deskripsi, $value->kriptorone, $value->kriptortwo)) : null;
            !empty($value->image) ? ($value->showImage = dekripsinaFile($value->image, $value->kriptorone, $value->kriptortwo, promoPath() . 'show/')) : null;
        }

        return $promo;
    }

    public function detail($id)
    {
        $promoDetail = DB::table('promo')
            ->where('id', $id)
            ->first();
        if ($promoDetail) {
            !empty($promoDetail->deskripsi) ? ($promoDetail->deskripsi = dekripsina($promoDetail->deskripsi, $promoDetail->kriptorone, $promoDetail->kriptortwo)) : null;
            !empty($promoDetail->image) ? ($promoDetail->showImage = dekripsinaFile($promoDetail->image, $promoDetail->kriptorone, $promoDetail->kriptortwo, promoPath() . 'show/')) : null;
        } else {
            return response()->json('Data tidak Ada', 400);
        }

        return $promoDetail;
    }

    public function store(Request $request)
    {
        $kriptor = generatekriptor();
        $deskripsi = newenkripsina($request->deskripsi, $kriptor['randnum'], $kriptor['randomBytes']);

        // Upload File Function
        $uploadFilename = newenkripsinaFile($request->file('image'), $kriptor['randnum'], $kriptor['randomBytes'], promoPath());

        $mitraId = DB::table('mitra')
            ->where('id_user', auth()->user()->id)
            ->first();

        $insertData = [
            'id_mitra' => $mitraId->id,
            'image' => $uploadFilename,
            'deskripsi' => $deskripsi,
            'end_date' => $request->end_date,
            'user_created' => auth()->user()->id,
            'kriptorone' => $kriptor['kriptorone'],
            'kriptortwo' => $kriptor['kriptortwo'],
        ];

        try {
            DB::table('promo')->insert([$insertData]);
            return response()->json($insertData, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function update(Request $request)
    {
        $deskirpsi = $request->deskripsi;
        $end_date = $request->end_date;
        $uploadedFile = $request->file('image');

        // Create new enkripsi Mitra
        $getPromo = DB::table('promo')
            ->where('id', $request->id)
            ->first();
        if (empty($getPromo)) {
            return response()->json('Data tidak ditemukan', 400);
        }
        $kriptorone = $getPromo->kriptorone;
        $kriptortwo = $getPromo->kriptortwo;

        !empty($deskirpsi) ? ($updateData['deskripsi'] = oldenkripsina($deskirpsi, $kriptorone, $kriptortwo)) : null;
        !empty($end_date) ? ($updateData['end_date'] = $end_date) : null;
        if ($uploadedFile) {
            $updateData['image'] = oldenkripsinaFile($uploadedFile, $kriptorone, $kriptortwo, promoPath(), $getPromo->image);
        }

        $updateData['updated_at'] = date('Y-m-d H:i:s');
        $updateData['user_updated'] = auth()->user()->id;

        try {
            DB::table('promo')
                ->where('id', $request->id)
                ->update($updateData);
            return response()->json($updateData, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function aktivasi($id)
    {
        $promoNa = DB::table('promo')->where('id', $id);
        if (empty($promoNa->wherein('status', [0, 1])->first())) {
            return response()->json('Data tidak ditemukan', 400);
        }

        $status = 0;
        $msg = 'Deaktivasi Berhasil';
        if ($promoNa->first()->status == 0) {
            $status = 1;
            $msg = 'Aktivasi Berhasil';
        }

        try {
            $promoNa->update([
                'status' => $status,
                'user_updated' => auth()->user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
            return response()->json($msg, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function restore($id)
    {
        $promoNa = DB::table('promo')->where('id', $id);
        if (empty($promoNa->first())) {
            return response()->json('Data tidak ditemukan', 400);
        }

        try {
            $promoNa->update([
                'status' => 0,
                'user_updated' => auth()->user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
                'user_deleted' => null,
                'deleted_at' => null,
            ]);
            return response()->json('Restore Berhasil', 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function delete($id)
    {
        $promoNa = DB::table('promo')->where('id', $id);
        if (empty($promoNa->first())) {
            return response()->json('Data tidak ditemukan', 400);
        }

        try {
            $promoNa->update([
                'status' => 3,
                'user_deleted' => auth()->user()->id,
                'deleted_at' => date('Y-m-d H:i:s'),
            ]);
            return response()->json('Hapus Berhasil', 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
