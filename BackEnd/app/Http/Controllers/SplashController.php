<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\helpers;

class SplashController extends Controller
{
    public function index()
    {
        $splash = DB::table('splash_screen')->get();

        foreach ($splash as $value) {
            !empty($value->deskripsi) ? ($value->deskripsi = dekripsina($value->deskripsi, $value->kriptorone, $value->kriptortwo)) : null;
            !empty($value->image) ? ($value->showImage = dekripsinaFile($value->image, $value->kriptorone, $value->kriptortwo, 'upload/splash/show/')) : null;
        }

        return $splash;
    }

    public function show()
    {
        $splash = DB::table('splash_screen')
            ->where('status', 1)
            ->orderby('id', 'desc')
            ->get();

        foreach ($splash as $value) {
            !empty($value->deskripsi) ? ($value->deskripsi = dekripsina($value->deskripsi, $value->kriptorone, $value->kriptortwo)) : null;
            !empty($value->image) ? ($value->showImage = dekripsinaFile($value->image, $value->kriptorone, $value->kriptortwo, splashPath() . 'show/')) : null;
        }

        return $splash;
    }

    public function detail($id)
    {
        $splashDetail = DB::table('splash_screen')
            ->where('id', $id)
            ->first();
        if ($splashDetail) {
            !empty($splashDetail->deskripsi) ? ($splashDetail->deskripsi = dekripsina($splashDetail->deskripsi, $splashDetail->kriptorone, $splashDetail->kriptortwo)) : null;
            !empty($splashDetail->image) ? ($splashDetail->showImage = dekripsinaFile($splashDetail->image, $splashDetail->kriptorone, $splashDetail->kriptortwo, splashPath() . 'show/')) : null;
        } else {
            return response()->json('Data tidak Ada', 400);
        }

        return $splashDetail;
    }

    public function store(Request $request)
    {
        $kriptor = generatekriptor();
        $deskripsi = newenkripsina($request->deskripsi, $kriptor['randnum'], $kriptor['randomBytes']);

        // Upload File Function
        $uploadFilename = newenkripsinaFile($request->file('image'), $kriptor['randnum'], $kriptor['randomBytes'], splashPath());

        $insertData = [
            'id_admin' => auth()->user()->id,
            'image' => $uploadFilename,
            'deskripsi' => $deskripsi,
            'user_created' => auth()->user()->id,
            'kriptorone' => $kriptor['kriptorone'],
            'kriptortwo' => $kriptor['kriptortwo'],
        ];

        try {
            DB::table('splash_screen')->insert([$insertData]);
            return response()->json($insertData, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function update(Request $request)
    {
        $deskirpsi = $request->deskripsi;
        $uploadedFile = $request->file('image');

        // Create new enkripsi Mitra
        $getSplash = DB::table('splash_screen')
            ->where('id', $request->id)
            ->first();
        if (empty($getSplash)) {
            return response()->json('Data tidak ditemukan', 400);
        }
        $kriptorone = $getSplash->kriptorone;
        $kriptortwo = $getSplash->kriptortwo;

        !empty($deskirpsi) ? ($updateData['deskripsi'] = oldenkripsina($deskirpsi, $kriptorone, $kriptortwo)) : null;
        if ($uploadedFile) {
            $updateData['image'] = oldenkripsinaFile($uploadedFile, $kriptorone, $kriptortwo, splashPath(), $getSplash->image);
        }

        $updateData['updated_at'] = date('Y-m-d H:i:s');
        $updateData['user_updated'] = auth()->user()->id;

        try {
            DB::table('splash_screen')
                ->where('id', $request->id)
                ->update($updateData);
            return response()->json($updateData, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function aktivasi($id)
    {
        $splashNa = DB::table('splash_screen')->where('id', $id);
        if (empty($splashNa->wherein('status', [0, 1])->first())) {
            return response()->json('Data tidak ditemukan', 400);
        }

        $status = 0;
        $msg = 'Deaktivasi Berhasil';
        if ($splashNa->first()->status == 0) {
            $status = 1;
            $msg = 'Aktivasi Berhasil';
        }

        try {
            $splashNa->update([
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
        $splashNa = DB::table('splash_screen')->where('id', $id);
        if (empty($splashNa->first())) {
            return response()->json('Data tidak ditemukan', 400);
        }

        try {
            $splashNa->update([
                'status' => 0,
                'user_updated' => auth()->user()->id,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
            return response()->json('Restore Berhasil', 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function delete($id)
    {
        $splashNa = DB::table('splash_screen')->where('id', $id);
        if (empty($splashNa->first())) {
            return response()->json('Data tidak ditemukan', 400);
        }

        try {
            $splashNa->update([
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
