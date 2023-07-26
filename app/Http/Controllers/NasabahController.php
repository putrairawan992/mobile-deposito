<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\helpers;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;

class NasabahController extends Controller
{
    public function regnasabah(Request $request)
    {
        $dbname = bestConnection();

        $email = $request->email;
        $id_user = auth()->user()->id;
        $nama = $request->nama;
        $ktp = $request->ktp;
        $image_ktp = $request->image_ktp;
        $image_selfie = $request->image_selfie;
        $tmpt_lahir = $request->tmpt_lahir;
        $tgl_lahir = $request->tgl_lahir;
        $ibu_kandung = $request->ibu_kandung;
        $id_privy = $request->id_privy;
        $id_bank = $request->id_bank;
        $norek = $request->norek;
        $status_pernikahan = $request->status_pernikahan;
        $jenis_pekerjaan = $request->jenis_pekerjaan;
        $alamat = $request->alamat;
        $alamat_kerja = $request->alamat_kerja;
        $penghasilan = $request->penghasilan;
        $nama_ahli_waris = $request->nama_ahli_waris;
        $ktp_ahli_waris = $request->ktp_ahli_waris;
        $image_ktp_ahli_waris = $request->image_ktp_ahli_waris;
        $hub_ahli_waris = $request->hub_ahli_waris;
        $phone_ahli_waris = $request->phone_ahli_waris;

        // Check if field is empty
        if (empty($email) or empty($nama) or empty($ktp)) {
            return response()->json('Email, Nama, KTP harus terisi', 400);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json('Email tidak Valid', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($ktp) < 12) {
            return response()->json('No KTP anda belum lengkap', 400);
        }

        // Check if username, email, phone already exist
        $cekData = User::all();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            if ($value->email != null) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }

            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        $cekNasabah = DB::table('nasabah')->get();
        foreach ($cekNasabah as $key => $value) {
            $dekripKTP = null;
            if ($value->ktp != null) {
                $dekripKTP = dekripsina($value->ktp, $value->kriptorone, $value->kriptortwo);
            }

            if ($ktp == $dekripKTP) {
                return response()->json('No KTP sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        // Start Enkrip Data
        $getNasabah = DB::table('users')
            ->where('id', $id_user)
            ->first();
        $kriptorone = $getNasabah->kriptorone;
        $kriptortwo = $getNasabah->kriptortwo;

        if ($email != null) {
            $email = oldenkripsina($email, $kriptorone, $kriptortwo);
        }
        if ($nama != null) {
            $nama = oldenkripsina($nama, $kriptorone, $kriptortwo);
        }
        if ($ktp != null) {
            $ktp = oldenkripsina($ktp, $kriptorone, $kriptortwo);
        }
        if ($tmpt_lahir != null) {
            $tmpt_lahir = oldenkripsina($tmpt_lahir, $kriptorone, $kriptortwo);
        }
        if ($tgl_lahir != null) {
            $tgl_lahir = oldenkripsina($tgl_lahir, $kriptorone, $kriptortwo);
        }
        if ($ibu_kandung != null) {
            $ibu_kandung = oldenkripsina($ibu_kandung, $kriptorone, $kriptortwo);
        }
        if ($norek != null) {
            $norek = oldenkripsina($norek, $kriptorone, $kriptortwo);
        }
        if ($alamat != null) {
            $alamat = oldenkripsina($alamat, $kriptorone, $kriptortwo);
        }
        if ($alamat_kerja != null) {
            $alamat_kerja = oldenkripsina($alamat_kerja, $kriptorone, $kriptortwo);
        }
        if ($nama_ahli_waris != null) {
            $nama_ahli_waris = oldenkripsina($nama_ahli_waris, $kriptorone, $kriptortwo);
        }
        if ($ktp_ahli_waris != null) {
            $ktp_ahli_waris = oldenkripsina($ktp_ahli_waris, $kriptorone, $kriptortwo);
        }
        if ($phone_ahli_waris != null) {
            $phone_ahli_waris = oldenkripsina($phone_ahli_waris, $kriptorone, $kriptortwo);
        }

        $insertData = [
            'id_user' => $id_user,
            'nama' => $nama,
            'ktp' => $ktp,
            'tmpt_lahir' => $tmpt_lahir,
            'tgl_lahir' => $tgl_lahir,
            'ibu_kandung' => $ibu_kandung,
            'norek' => $norek,
            'alamat' => $alamat,
            'alamat_kerja' => $alamat_kerja,
            'nama_ahli_waris' => $nama_ahli_waris,
            'ktp_ahli_waris' => $ktp_ahli_waris,
            'phone_ahli_waris' => $phone_ahli_waris,
            'image_ktp' => $image_ktp,
            'image_selfie' => $image_selfie,
            'image_ktp_ahli_waris' => $image_ktp_ahli_waris,
            'id_privy' => $id_privy,
            'id_bank' => $id_bank,
            'status_pernikahan' => $status_pernikahan,
            'jenis_pekerjaan' => $jenis_pekerjaan,
            'penghasilan' => $penghasilan,
            'hub_ahli_waris' => $hub_ahli_waris,
        ];

        try {
            DB::table('users')
                ->where('id', $id_user)
                ->update(['email' => $email, 'role' => 10, 'updated_at' => date('Y-m-d h:i:s')]);
            DB::table('nasabah')->insert($insertData);
            return response()->json('Register Succesfully', 200);
        } catch (\Exception $e) {
            return response()->json([$e->getMessage(), $insertData], 400);
        }
    }

    public function updatenasabah(Request $request)
    {
        $dbname = bestConnection();

        $email = $request->email;
        $id_user = auth()->user()->id;
        $nama = $request->nama;
        $ktp = $request->ktp;
        $image_ktp = $request->image_ktp;
        $image_selfie = $request->image_selfie;
        $tmpt_lahir = $request->tmpt_lahir;
        $tgl_lahir = $request->tgl_lahir;
        $ibu_kandung = $request->ibu_kandung;
        $id_privy = $request->id_privy;
        $id_bank = $request->id_bank;
        $norek = $request->norek;
        $status_pernikahan = $request->status_pernikahan;
        $jenis_pekerjaan = $request->jenis_pekerjaan;
        $alamat = $request->alamat;
        $alamat_kerja = $request->alamat_kerja;
        $penghasilan = $request->penghasilan;
        $nama_ahli_waris = $request->nama_ahli_waris;
        $ktp_ahli_waris = $request->ktp_ahli_waris;
        $image_ktp_ahli_waris = $request->image_ktp_ahli_waris;
        $hub_ahli_waris = $request->hub_ahli_waris;
        $phone_ahli_waris = $request->phone_ahli_waris;

        // Check if field is empty
        if (empty($email) or empty($nama) or empty($ktp)) {
            return response()->json('Email, Nama, KTP harus terisi', 400);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json('Email tidak Valid', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($ktp) < 12) {
            return response()->json('No KTP anda belum lengkap', 400);
        }

        // Check if username, email, phone already exist
        $cekData = DB::table('users')
            ->where('id', '!=', $id_user)
            ->get();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            if ($value->email != null) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }

            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        $cekNasabah = DB::table('nasabah')
            ->where('id_user', '!=', $id_user)
            ->get();
        foreach ($cekNasabah as $key => $value) {
            $dekripKTP = null;
            if ($value->ktp != null) {
                $dekripKTP = dekripsina($value->ktp, $value->kriptorone, $value->kriptortwo);
            }

            if ($ktp == $dekripKTP) {
                return response()->json('No KTP sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        // Start Enkrip Data
        $getNasabah = DB::table('users')
            ->where('id', $id_user)
            ->first();
        $kriptorone = $getNasabah->kriptorone;
        $kriptortwo = $getNasabah->kriptortwo;
        $kriptortwo = hex2bin($kriptortwo);
        $kriptorone = convertFromOpensll($kriptorone, $kriptortwo);

        if ($email != null) {
            $email = oldenkripsina($email, $kriptorone, $kriptortwo);
        }
        if ($nama != null) {
            $nama = oldenkripsina($nama, $kriptorone, $kriptortwo);
        }
        if ($ktp != null) {
            $ktp = oldenkripsina($ktp, $kriptorone, $kriptortwo);
        }
        if ($tmpt_lahir != null) {
            $tmpt_lahir = oldenkripsina($tmpt_lahir, $kriptorone, $kriptortwo);
        }
        if ($tgl_lahir != null) {
            $tgl_lahir = oldenkripsina($tgl_lahir, $kriptorone, $kriptortwo);
        }
        if ($ibu_kandung != null) {
            $ibu_kandung = oldenkripsina($ibu_kandung, $kriptorone, $kriptortwo);
        }
        if ($norek != null) {
            $norek = oldenkripsina($norek, $kriptorone, $kriptortwo);
        }
        if ($alamat != null) {
            $alamat = oldenkripsina($alamat, $kriptorone, $kriptortwo);
        }
        if ($alamat_kerja != null) {
            $alamat_kerja = oldenkripsina($alamat_kerja, $kriptorone, $kriptortwo);
        }
        if ($nama_ahli_waris != null) {
            $nama_ahli_waris = oldenkripsina($nama_ahli_waris, $kriptorone, $kriptortwo);
        }
        if ($ktp_ahli_waris != null) {
            $ktp_ahli_waris = oldenkripsina($ktp_ahli_waris, $kriptorone, $kriptortwo);
        }
        if ($phone_ahli_waris != null) {
            $phone_ahli_waris = oldenkripsina($phone_ahli_waris, $kriptorone, $kriptortwo);
        }

        $updateData = [
            'nama' => $nama,
            'ktp' => $ktp,
            'tmpt_lahir' => $tmpt_lahir,
            'tgl_lahir' => $tgl_lahir,
            'ibu_kandung' => $ibu_kandung,
            'norek' => $norek,
            'alamat' => $alamat,
            'alamat_kerja' => $alamat_kerja,
            'nama_ahli_waris' => $nama_ahli_waris,
            'ktp_ahli_waris' => $ktp_ahli_waris,
            'phone_ahli_waris' => $phone_ahli_waris,
            'image_ktp' => $image_ktp,
            'image_selfie' => $image_selfie,
            'image_ktp_ahli_waris' => $image_ktp_ahli_waris,
            'id_privy' => $id_privy,
            'id_bank' => $id_bank,
            'status_pernikahan' => $status_pernikahan,
            'jenis_pekerjaan' => $jenis_pekerjaan,
            'penghasilan' => $penghasilan,
            'hub_ahli_waris' => $hub_ahli_waris,
            'updated_at' => date('Y-m-d h:i:s'),
        ];

        try {
            DB::table('users')
                ->where('id', $id_user)
                ->update(['email' => $email, 'updated_at' => date('Y-m-d h:i:s')]);
            DB::table('nasabah')
                ->where('id_user', $id_user)
                ->update($updateData);
            return response()->json('Update Succesfully', 200);
        } catch (\Exception $e) {
            return response()->json([$e->getMessage(), $insertData], 400);
        }
    }

    public function validasinasabah(Request $request)
    {
    }

    public function deletenasabah(Request $request)
    {
    }
}
