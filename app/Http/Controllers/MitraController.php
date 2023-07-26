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

class MitraController extends Controller
{
    public function regmitra(Request $request)
    {
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;
        $phone = $request->phone;
        $nama = $request->nama;

        $kode_bank = $request->kode_bank;
        $no_npwp = $request->no_npwp;
        $no_akta_pendirian = $request->no_akta_pendirian;
        $no_pengesahan_akta = $request->no_pengesahan_akta;
        $website = $request->website;
        $phone_pengurus = $request->phone_pengurus;
        $id_privy = $request->id_privy;
        $db_name = 'ds_transaksi_' . $kode_bank;
        $norek_bank = $request->norek_bank;
        $dbname = $db_name;

        $nama_notaris = $request->nama_notaris;
        $lokasi_notaris = $request->lokasi_notaris;
        $no_ijin = $request->no_ijin;
        $kota = $request->kota;
        $alamat = $request->alamat;
        $npwp_provinsi = $request->npwp_provinsi;
        $npwp_kota = $request->npwp_kota;
        $npwp_alamat = $request->npwp_alamat;
        $nama_pengurus = $request->nama_pengurus;
        $jabatan_pengurus = $request->jabatan_pengurus;
        $keterangan = $request->keterangan;

        $mulai_beroperasi = $request->mulai_beroperasi;
        $tgl_pendirian = $request->tgl_pendirian;
        $tgl_pengesahan_akta = $request->tgl_pengesahan_akta;
        $tgl_ijin = $request->tgl_ijin;
        $id_bank = $request->id_bank;
        $logo = $request->logo;
        $validasi = $request->validasi;
        $id_validator = auth()->user()->id;

        // Check if field is empty
        if (empty($email) or empty($username) or empty($password) or empty($phone)) {
            return response()->json('Semua Kolom harus terisi', 400);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json('Email tidak Valid', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($password) < 8) {
            return response()->json('Password Kurang Dari 6 Digit', 400);
        }

        // Check if username, email, phone already exist
        $cekData = DB::table('users')->get();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            $dekripUsername = null;
            $dekripPhone = null;
            if ($value->email != null) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }
            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($value->username != null) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            }
            if ($username == $dekripUsername) {
                return response()->json('Username sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($value->phone != null) {
                $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
            }

            if ($phone == $dekripPhone) {
                return response()->json('No Telepon sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        // Check mitra already exist
        $cekMitra = DB::table('users')
            ->where('role', 2)
            ->leftjoin('mitra', 'users.id', 'mitra.id_user')
            ->get();
        foreach ($cekMitra as $key => $value) {
            $dekripnama = null;
            $dekripkode_bank = null;
            $dekripno_npwp = null;
            $dekripno_akta_pendirian = null;
            $dekripno_pengesahan_akta = null;
            $dekripwebsite = null;
            $dekripphone_pengurus = null;
            $dekripid_privy = null;
            $dekripdb_name = null;
            $dekripnorek_bank = null;

            $kriptorone = $value->kriptorone;
            $kriptortwo = $value->kriptortwo;

            if (!empty($value->nama)) {
                $dekripnama = dekripsina($value->nama, $kriptorone, $kriptortwo);
                if ($nama == $dekripnama) {
                    return response()->json('Nama Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->kode_bank)) {
                $dekripkode_bank = dekripsina($value->kode_bank, $kriptorone, $kriptortwo);
                if ($kode_bank == $dekripkode_bank) {
                    return response()->json('Kode Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->no_npwp)) {
                $dekripno_npwp = dekripsina($value->no_npwp, $kriptorone, $kriptortwo);
                if ($no_npwp == $dekripno_npwp) {
                    return response()->json('NPWP Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }
            return response()->json('npwp ga deteksi', 400);
            if (!empty($value->no_akta_pendirian)) {
                $dekripno_akta_pendirian = dekripsina($value->no_akta_pendirian, $kriptorone, $kriptortwo);
                if ($no_akta_pendirian == $dekripno_akta_pendirian) {
                    return response()->json('No Akta Pendirian sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->no_pengesahan_akta)) {
                $dekripno_pengesahan_akta = dekripsina($value->no_pengesahan_akta, $kriptorone, $kriptortwo);
                if ($no_pengesahan_akta == $dekripno_pengesahan_akta) {
                    return response()->json('No Pengesahan Akta sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->website)) {
                $dekripwebsite = dekripsina($value->website, $kriptorone, $kriptortwo);
                if ($website == $dekripwebsite) {
                    return response()->json('Website sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->phone_pengurus)) {
                $dekripphone_pengurus = dekripsina($value->phone_pengurus, $kriptorone, $kriptortwo);
                if ($phone_pengurus == $dekripphone_pengurus) {
                    return response()->json('No Telp Pengurus sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->id_privy)) {
                $dekripid_privy = dekripsina($value->id_privy, $kriptorone, $kriptortwo);
                if ($id_privy == $dekripid_privy) {
                    return response()->json('ID PrivyID sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->db_name)) {
                $dekripdb_name = dekripsina($value->db_name, $kriptorone, $kriptortwo);
                if ($db_name == $dekripdb_name) {
                    return response()->json('DB sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->norek_bank)) {
                $dekripnorek_bank = dekripsina($value->norek_bank, $kriptorone, $kriptortwo);
                if ($id_bank . $norek_bank == $id_bank . $dekripnorek_bank) {
                    return response()->json('Norek Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }
        }

        // Create new enkripsi Mitra
        $kriptor = generatekriptor();
        $kriptorone = $kriptor['randnum'];
        $kriptortwo = $kriptor['randomBytes'];
        $username = newenkripsina($username, $kriptorone, $kriptortwo);
        $email = newenkripsina($email, $kriptorone, $kriptortwo);
        $phone = newenkripsina($phone, $kriptorone, $kriptortwo);
        $nama = newenkripsina($nama, $kriptorone, $kriptortwo);
        $password = app('hash')->make($password);

        if ($kode_bank != null) {
            $kode_bank = newenkripsina($kode_bank, $kriptorone, $kriptortwo);
        }
        if ($no_npwp != null) {
            $no_npwp = newenkripsina($no_npwp, $kriptorone, $kriptortwo);
        }
        if ($no_akta_pendirian != null) {
            $no_akta_pendirian = newenkripsina($no_akta_pendirian, $kriptorone, $kriptortwo);
        }
        if ($no_pengesahan_akta != null) {
            $no_pengesahan_akta = newenkripsina($no_pengesahan_akta, $kriptorone, $kriptortwo);
        }
        if ($website != null) {
            $website = newenkripsina($website, $kriptorone, $kriptortwo);
        }
        if ($phone_pengurus != null) {
            $phone_pengurus = newenkripsina($phone_pengurus, $kriptorone, $kriptortwo);
        }
        if ($id_privy != null) {
            $id_privy = newenkripsina($id_privy, $kriptorone, $kriptortwo);
        }
        if ($db_name != null) {
            $db_name = newenkripsina($db_name, $kriptorone, $kriptortwo);
        }
        if ($norek_bank != null) {
            $norek_bank = newenkripsina($norek_bank, $kriptorone, $kriptortwo);
        }
        if ($nama_notaris != null) {
            $nama_notaris = newenkripsina($nama_notaris, $kriptorone, $kriptortwo);
        }
        if ($lokasi_notaris != null) {
            $lokasi_notaris = newenkripsina($lokasi_notaris, $kriptorone, $kriptortwo);
        }
        if ($no_ijin != null) {
            $no_ijin = newenkripsina($no_ijin, $kriptorone, $kriptortwo);
        }
        if ($alamat != null) {
            $alamat = newenkripsina($alamat, $kriptorone, $kriptortwo);
        }
        if ($npwp_provinsi != null) {
            $npwp_provinsi = newenkripsina($npwp_provinsi, $kriptorone, $kriptortwo);
        }
        if ($npwp_kota != null) {
            $npwp_kota = newenkripsina($npwp_kota, $kriptorone, $kriptortwo);
        }
        if ($npwp_alamat != null) {
            $npwp_alamat = newenkripsina($npwp_alamat, $kriptorone, $kriptortwo);
        }
        if ($nama_pengurus != null) {
            $nama_pengurus = newenkripsina($nama_pengurus, $kriptorone, $kriptortwo);
        }
        if ($jabatan_pengurus != null) {
            $jabatan_pengurus = newenkripsina($jabatan_pengurus, $kriptorone, $kriptortwo);
        }
        if ($keterangan != null) {
            $keterangan = newenkripsina($keterangan, $kriptorone, $kriptortwo);
        }

        $insertDataUsers = [
            'username' => $username,
            'email' => $email,
            'password' => app('hash')->make($password),
            'phone' => $phone,
            'role' => 2,
            'kriptorone' => $kriptor['kriptorone'],
            'kriptortwo' => $kriptor['kriptortwo'],
        ];

        $insertDataMitra = [
            'nama' => $nama,
            'kode_bank' => $kode_bank,
            'no_npwp' => $no_npwp,
            'no_akta_pendirian' => $no_akta_pendirian,
            'no_pengesahan_akta' => $no_pengesahan_akta,
            'website' => $website,
            'phone_pengurus' => $phone_pengurus,
            'id_privy' => $id_privy,
            'db_name' => $db_name,
            'norek_bank' => $norek_bank,

            'nama_notaris' => $nama_notaris,
            'lokasi_notaris' => $lokasi_notaris,
            'no_ijin' => $no_ijin,
            'kota' => $kota,
            'alamat' => $alamat,
            'npwp_provinsi' => $npwp_provinsi,
            'npwp_kota' => $npwp_kota,
            'npwp_alamat' => $npwp_alamat,
            'nama_pengurus' => $nama_pengurus,
            'jabatan_pengurus' => $jabatan_pengurus,
            'keterangan' => $keterangan,

            'mulai_beroperasi' => $mulai_beroperasi,
            'tgl_pendirian' => $tgl_pendirian,
            'tgl_pengesahan_akta' => $tgl_pengesahan_akta,
            'tgl_ijin' => $tgl_ijin,
            'id_bank' => $id_bank,
            'logo' => $logo,
            'validasi' => $validasi,
            'id_validator' => $id_validator,
        ];

        try {
            DB::table('users')->insert([$insertDataUsers]);
            $getId = DB::table('users')
                ->where('email', $email)
                ->first();
            $insertDataMitra['id_user'] = $getId->id;
            DB::table('mitra')->insert([$insertDataMitra]);
            return response()->json('Register Mitra Succesfully', 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function updatemitra(Request $request)
    {
        $idUser = $request->id;
        $username = $request->username;
        $email = $request->email;
        $phone = $request->phone;
        $nama = $request->nama;

        $kode_bank = $request->kode_bank;
        $no_npwp = $request->no_npwp;
        $no_akta_pendirian = $request->no_akta_pendirian;
        $no_pengesahan_akta = $request->no_pengesahan_akta;
        $website = $request->website;
        $phone_pengurus = $request->phone_pengurus;
        $id_privy = $request->id_privy;
        $norek_bank = $request->norek_bank;

        $nama_notaris = $request->nama_notaris;
        $lokasi_notaris = $request->lokasi_notaris;
        $no_ijin = $request->no_ijin;
        $kota = $request->kota;
        $alamat = $request->alamat;
        $npwp_provinsi = $request->npwp_provinsi;
        $npwp_kota = $request->npwp_kota;
        $npwp_alamat = $request->npwp_alamat;
        $nama_pengurus = $request->nama_pengurus;
        $jabatan_pengurus = $request->jabatan_pengurus;
        $keterangan = $request->keterangan;

        $mulai_beroperasi = $request->mulai_beroperasi;
        $tgl_pendirian = $request->tgl_pendirian;
        $tgl_pengesahan_akta = $request->tgl_pengesahan_akta;
        $tgl_ijin = $request->tgl_ijin;
        $id_bank = $request->id_bank;
        $logo = $request->logo;
        $validasi = $request->validasi;
        $id_validator = auth()->user()->id;

        // Check if username, email, phone already exist
        $cekData = DB::table('users')
            ->where('id', '!=', $idUser)
            ->get();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            $dekripUsername = null;
            $dekripPhone = null;
            if ($value->email != null) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }
            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($value->username != null) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            }
            if ($username == $dekripUsername) {
                return response()->json('Username sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($value->phone != null) {
                $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
            }

            if ($phone == $dekripPhone) {
                return response()->json('No Telepon sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        // Check mitra already exist
        $cekMitra = DB::table('users')
            ->where('users.id', '!=', $idUser)
            ->where('role', 2)
            ->leftjoin('mitra', 'users.id', 'mitra.id_user')
            ->get();
        foreach ($cekMitra as $key => $value) {
            $dekripnama = null;
            $dekripkode_bank = null;
            $dekripno_npwp = null;
            $dekripno_akta_pendirian = null;
            $dekripno_pengesahan_akta = null;
            $dekripwebsite = null;
            $dekripphone_pengurus = null;
            $dekripid_privy = null;
            $dekripdb_name = null;
            $dekripnorek_bank = null;

            $kriptorone = $value->kriptorone;
            $kriptortwo = $value->kriptortwo;

            if (!empty($value->nama)) {
                $dekripnama = dekripsina($value->nama, $kriptorone, $kriptortwo);
                if ($nama == $dekripnama) {
                    return response()->json('Nama Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->kode_bank)) {
                $dekripkode_bank = dekripsina($value->kode_bank, $kriptorone, $kriptortwo);
                if ($kode_bank == $dekripkode_bank) {
                    return response()->json('Kode Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->no_npwp)) {
                $dekripno_npwp = dekripsina($value->no_npwp, $kriptorone, $kriptortwo);
                if ($no_npwp == $dekripno_npwp) {
                    return response()->json('NPWP Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->no_akta_pendirian)) {
                $dekripno_akta_pendirian = dekripsina($value->no_akta_pendirian, $kriptorone, $kriptortwo);
                if ($no_akta_pendirian == $dekripno_akta_pendirian) {
                    return response()->json('No Akta Pendirian sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->no_pengesahan_akta)) {
                $dekripno_pengesahan_akta = dekripsina($value->no_pengesahan_akta, $kriptorone, $kriptortwo);
                if ($no_pengesahan_akta == $dekripno_pengesahan_akta) {
                    return response()->json('No Pengesahan Akta sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->website)) {
                $dekripwebsite = dekripsina($value->website, $kriptorone, $kriptortwo);
                if ($website == $dekripwebsite) {
                    return response()->json('Website sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->phone_pengurus)) {
                $dekripphone_pengurus = dekripsina($value->phone_pengurus, $kriptorone, $kriptortwo);
                if ($phone_pengurus == $dekripphone_pengurus) {
                    return response()->json('No Telp Pengurus sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->id_privy)) {
                $dekripid_privy = dekripsina($value->id_privy, $kriptorone, $kriptortwo);
                if ($id_privy == $dekripid_privy) {
                    return response()->json('ID PrivyID sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }

            if (!empty($value->norek_bank)) {
                $dekripnorek_bank = dekripsina($value->norek_bank, $kriptorone, $kriptortwo);
                if ($id_bank . $norek_bank == $id_bank . $dekripnorek_bank) {
                    return response()->json('Norek Bank sudah digunakan, Silahkan gunakan yang lain', 404);
                    break;
                }
            }
        }

        // Create new enkripsi Mitra
        $getKriptor = DB::table('users')
            ->where('id', $idUser)
            ->first();
        $kriptorone = $getKriptor->kriptorone;
        $kriptortwo = $getKriptor->kriptortwo;

        if ($username != null) {
            $username = oldenkripsina($username, $kriptorone, $kriptortwo);
        }
        if ($email != null) {
            $email = oldenkripsina($email, $kriptorone, $kriptortwo);
        }
        if ($phone != null) {
            $phone = oldenkripsina($phone, $kriptorone, $kriptortwo);
        }
        if ($nama != null) {
            $nama = oldenkripsina($nama, $kriptorone, $kriptortwo);
        }
        if ($kode_bank != null) {
            $kode_bank = oldenkripsina($kode_bank, $kriptorone, $kriptortwo);
        }
        if ($no_npwp != null) {
            $no_npwp = oldenkripsina($no_npwp, $kriptorone, $kriptortwo);
        }
        if ($no_akta_pendirian != null) {
            $no_akta_pendirian = oldenkripsina($no_akta_pendirian, $kriptorone, $kriptortwo);
        }
        if ($no_pengesahan_akta != null) {
            $no_pengesahan_akta = oldenkripsina($no_pengesahan_akta, $kriptorone, $kriptortwo);
        }
        if ($website != null) {
            $website = oldenkripsina($website, $kriptorone, $kriptortwo);
        }
        if ($phone_pengurus != null) {
            $phone_pengurus = oldenkripsina($phone_pengurus, $kriptorone, $kriptortwo);
        }
        if ($id_privy != null) {
            $id_privy = oldenkripsina($id_privy, $kriptorone, $kriptortwo);
        }
        if ($norek_bank != null) {
            $norek_bank = oldenkripsina($norek_bank, $kriptorone, $kriptortwo);
        }
        if ($nama_notaris != null) {
            $nama_notaris = oldenkripsina($nama_notaris, $kriptorone, $kriptortwo);
        }
        if ($lokasi_notaris != null) {
            $lokasi_notaris = oldenkripsina($lokasi_notaris, $kriptorone, $kriptortwo);
        }
        if ($no_ijin != null) {
            $no_ijin = oldenkripsina($no_ijin, $kriptorone, $kriptortwo);
        }
        if ($alamat != null) {
            $alamat = oldenkripsina($alamat, $kriptorone, $kriptortwo);
        }
        if ($npwp_provinsi != null) {
            $npwp_provinsi = oldenkripsina($npwp_provinsi, $kriptorone, $kriptortwo);
        }
        if ($npwp_kota != null) {
            $npwp_kota = oldenkripsina($npwp_kota, $kriptorone, $kriptortwo);
        }
        if ($npwp_alamat != null) {
            $npwp_alamat = oldenkripsina($npwp_alamat, $kriptorone, $kriptortwo);
        }
        if ($nama_pengurus != null) {
            $nama_pengurus = oldenkripsina($nama_pengurus, $kriptorone, $kriptortwo);
        }
        if ($jabatan_pengurus != null) {
            $jabatan_pengurus = oldenkripsina($jabatan_pengurus, $kriptorone, $kriptortwo);
        }
        if ($keterangan != null) {
            $keterangan = oldenkripsina($keterangan, $kriptorone, $kriptortwo);
        }

        $updateDataUsers = [
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
        ];

        $updateDataMitra = [
            'nama' => $nama,
            'kode_bank' => $kode_bank,
            'no_npwp' => $no_npwp,
            'no_akta_pendirian' => $no_akta_pendirian,
            'no_pengesahan_akta' => $no_pengesahan_akta,
            'website' => $website,
            'phone_pengurus' => $phone_pengurus,
            'id_privy' => $id_privy,
            'norek_bank' => $norek_bank,

            'nama_notaris' => $nama_notaris,
            'lokasi_notaris' => $lokasi_notaris,
            'no_ijin' => $no_ijin,
            'kota' => $kota,
            'alamat' => $alamat,
            'npwp_provinsi' => $npwp_provinsi,
            'npwp_kota' => $npwp_kota,
            'npwp_alamat' => $npwp_alamat,
            'nama_pengurus' => $nama_pengurus,
            'jabatan_pengurus' => $jabatan_pengurus,
            'keterangan' => $keterangan,

            'mulai_beroperasi' => $mulai_beroperasi,
            'tgl_pendirian' => $tgl_pendirian,
            'tgl_pengesahan_akta' => $tgl_pengesahan_akta,
            'tgl_ijin' => $tgl_ijin,
            'id_bank' => $id_bank,
            'logo' => $logo,
            'validasi' => $validasi,
            'id_validator' => $id_validator,
        ];

        try {
            DB::table('users')
                ->where('id', $idUser)
                ->update($updateDataUsers);
            DB::table('mitra')
                ->where('id_user', $idUser)
                ->update($updateDataMitra);
            // $createDB = createDB($dbname);
            return response()->json('Register Mitra Succesfully', 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function neraca(Request $request)
    {
    }

    public function validasimitra(Request $request)
    {
    }

    public function deletemitra(Request $request)
    {
    }
}
