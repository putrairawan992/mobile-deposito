<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\helpers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Config;

class MitraController extends Controller
{
    public function store(Request $request)
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
        // $db_name = 'ds_transaksi_' . $kode_bank;
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
            return response()->json('Password Kurang Dari 8 Digit', 400);
        }

        // Check if username, email, phone already exist
        $cekData = DB::table('users')->get();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            $dekripUsername = null;
            $dekripPhone = null;
            if (!empty($value->email)) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }
            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if (!empty($value->username)) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            }
            if ($username == $dekripUsername) {
                return response()->json('Username sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if (!empty($value->phone)) {
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

        if (!empty($kode_bank)) {
            $kode_bank = newenkripsina($kode_bank, $kriptorone, $kriptortwo);
        }
        if (!empty($no_npwp)) {
            $no_npwp = newenkripsina($no_npwp, $kriptorone, $kriptortwo);
        }
        if (!empty($no_akta_pendirian)) {
            $no_akta_pendirian = newenkripsina($no_akta_pendirian, $kriptorone, $kriptortwo);
        }
        if (!empty($no_pengesahan_akta)) {
            $no_pengesahan_akta = newenkripsina($no_pengesahan_akta, $kriptorone, $kriptortwo);
        }
        if (!empty($website)) {
            $website = newenkripsina($website, $kriptorone, $kriptortwo);
        }
        if (!empty($phone_pengurus)) {
            $phone_pengurus = newenkripsina($phone_pengurus, $kriptorone, $kriptortwo);
        }
        if (!empty($id_privy)) {
            $id_privy = newenkripsina($id_privy, $kriptorone, $kriptortwo);
        }
        if (!empty($db_name)) {
            $db_name = newenkripsina($db_name, $kriptorone, $kriptortwo);
        }
        if (!empty($norek_bank)) {
            $norek_bank = newenkripsina($norek_bank, $kriptorone, $kriptortwo);
        }
        if (!empty($nama_notaris)) {
            $nama_notaris = newenkripsina($nama_notaris, $kriptorone, $kriptortwo);
        }
        if (!empty($lokasi_notaris)) {
            $lokasi_notaris = newenkripsina($lokasi_notaris, $kriptorone, $kriptortwo);
        }
        if (!empty($no_ijin)) {
            $no_ijin = newenkripsina($no_ijin, $kriptorone, $kriptortwo);
        }
        if (!empty($alamat)) {
            $alamat = newenkripsina($alamat, $kriptorone, $kriptortwo);
        }
        if (!empty($npwp_provinsi)) {
            $npwp_provinsi = newenkripsina($npwp_provinsi, $kriptorone, $kriptortwo);
        }
        if (!empty($npwp_kota)) {
            $npwp_kota = newenkripsina($npwp_kota, $kriptorone, $kriptortwo);
        }
        if (!empty($npwp_alamat)) {
            $npwp_alamat = newenkripsina($npwp_alamat, $kriptorone, $kriptortwo);
        }
        if (!empty($nama_pengurus)) {
            $nama_pengurus = newenkripsina($nama_pengurus, $kriptorone, $kriptortwo);
        }
        if (!empty($jabatan_pengurus)) {
            $jabatan_pengurus = newenkripsina($jabatan_pengurus, $kriptorone, $kriptortwo);
        }
        if (!empty($keterangan)) {
            $keterangan = newenkripsina($keterangan, $kriptorone, $kriptortwo);
        }

        $insertDataUsers = [
            'username' => $username,
            'email' => $email,
            'password' => $password,
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

        DB::beginTransaction();
        try {
            DB::table('users')->insert([$insertDataUsers]);
            $getId = DB::table('users')
                ->where('email', $email)
                ->first();
            $insertDataMitra['id_user'] = $getId->id;
            DB::table('mitra')->insert([$insertDataMitra]);

            DB::commit();
            return response()->json('Register Mitra Succesfully', 200);
        } catch (\Exception $e) {
            DB::rollback();
            return $e->getMessage();
        }
    }

    public function update(Request $request)
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
            if (!empty($value->email)) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }
            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if (!empty($value->username)) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            }
            if ($username == $dekripUsername) {
                return response()->json('Username sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if (!empty($value->phone)) {
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

        if (!empty($username)) {
            $username = oldenkripsina($username, $kriptorone, $kriptortwo);
        }
        if (!empty($email)) {
            $email = oldenkripsina($email, $kriptorone, $kriptortwo);
        }
        if (!empty($phone)) {
            $phone = oldenkripsina($phone, $kriptorone, $kriptortwo);
        }
        if (!empty($nama)) {
            $nama = oldenkripsina($nama, $kriptorone, $kriptortwo);
        }
        if (!empty($kode_bank)) {
            $kode_bank = oldenkripsina($kode_bank, $kriptorone, $kriptortwo);
        }
        if (!empty($no_npwp)) {
            $no_npwp = oldenkripsina($no_npwp, $kriptorone, $kriptortwo);
        }
        if (!empty($no_akta_pendirian)) {
            $no_akta_pendirian = oldenkripsina($no_akta_pendirian, $kriptorone, $kriptortwo);
        }
        if (!empty($no_pengesahan_akta)) {
            $no_pengesahan_akta = oldenkripsina($no_pengesahan_akta, $kriptorone, $kriptortwo);
        }
        if (!empty($website)) {
            $website = oldenkripsina($website, $kriptorone, $kriptortwo);
        }
        if (!empty($phone_pengurus)) {
            $phone_pengurus = oldenkripsina($phone_pengurus, $kriptorone, $kriptortwo);
        }
        if (!empty($id_privy)) {
            $id_privy = oldenkripsina($id_privy, $kriptorone, $kriptortwo);
        }
        if (!empty($norek_bank)) {
            $norek_bank = oldenkripsina($norek_bank, $kriptorone, $kriptortwo);
        }
        if (!empty($nama_notaris)) {
            $nama_notaris = oldenkripsina($nama_notaris, $kriptorone, $kriptortwo);
        }
        if (!empty($lokasi_notaris)) {
            $lokasi_notaris = oldenkripsina($lokasi_notaris, $kriptorone, $kriptortwo);
        }
        if (!empty($no_ijin)) {
            $no_ijin = oldenkripsina($no_ijin, $kriptorone, $kriptortwo);
        }
        if (!empty($alamat)) {
            $alamat = oldenkripsina($alamat, $kriptorone, $kriptortwo);
        }
        if (!empty($npwp_provinsi)) {
            $npwp_provinsi = oldenkripsina($npwp_provinsi, $kriptorone, $kriptortwo);
        }
        if (!empty($npwp_kota)) {
            $npwp_kota = oldenkripsina($npwp_kota, $kriptorone, $kriptortwo);
        }
        if (!empty($npwp_alamat)) {
            $npwp_alamat = oldenkripsina($npwp_alamat, $kriptorone, $kriptortwo);
        }
        if (!empty($nama_pengurus)) {
            $nama_pengurus = oldenkripsina($nama_pengurus, $kriptorone, $kriptortwo);
        }
        if (!empty($jabatan_pengurus)) {
            $jabatan_pengurus = oldenkripsina($jabatan_pengurus, $kriptorone, $kriptortwo);
        }
        if (!empty($keterangan)) {
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
            return response()->json('Update Mitra Succesfully', 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function aktivasi($id)
    {
        $user = DB::table('users')
            ->where('id', $id)
            ->where('role', 2);
        if (empty($user->first())) {
            return response()->json('User tidak ditemukan', 400);
        }

        $status = 1;
        $res = 'Aktivasi Berhasil';
        if ($user->first()->status == 1) {
            $status = 0;
            $res = 'Deaktivasi Berhasil';
        }

        try {
            $user->update(['status' => $status]);
            return response()->json($res, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function storeneraca(Request $request)
    {
    }

    public function updateneraca(Request $request)
    {
    }

    public function validasi(Request $request)
    {
        $dbName = null;
        $res = [];
        $validasi = $request->validasi;
        $mitra = DB::table('mitra')->where('id', $request->id);
        $getMitra = $mitra->first();
        $idMitra = $getMitra->id;
        if (empty($mitra->first())) {
            return response()->json('Mitra tidak ditemukan', 400);
        }

        $getKriptor = DB::table('users')
            ->where('id', $getMitra->id_user)
            ->first();
        $kriptorone = $getKriptor->kriptorone;
        $kriptortwo = $getKriptor->kriptortwo;

        $dbName = dekripsina($getMitra->db_name, $kriptorone, $kriptortwo);
        if (empty($getMitra->db_name)) {
            $idMitra < 100 ? ($lastNameDB = 'M0' . $idMitra) : null;
            $idMitra < 10 ? ($lastNameDB = 'M00' . $idMitra) : null;
            $dbName = 'ds_tx_' . $lastNameDB;
            $updateData['db_name'] = oldenkripsina($dbName, $kriptorone, $kriptortwo);
        }

        $updateData['validasi'] = $validasi;
        $updateData['id_validator'] = auth()->user()->id;
        $updateData['updated_at'] = date('Y-m-d H:i:s');
        $updateData['user_updated'] = auth()->user()->id;

        switch ($validasi) {
            case 0:
                $res['validasi'] = 'Data Belum Lengkap';
                break;
            case 1:
                $res['validasi'] = 'Status Mitra Valid';
                break;
            case 2:
                $res['validasi'] = 'Status Mitra Belum Valid';
                break;
            case 3:
                $res['validasi'] = 'Status Mitra Dinonaktifkan';
                break;
            default:
                return response()->json('Error Validasi', 400);
                break;
        }

        try {
            DB::table('mitra')
                ->where('id', $request->id)
                ->update($updateData);

            !$this->checkDatabaseName($dbName) && $validasi == 1 ? ($res['genDB'] = $this->generateDb($dbName)) : null;
            return response()->json($res, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function restore($id)
    {
        $mitra = DB::table('mitra')->where('id_mitra', $id);
        if (empty($mitra->first())) {
            return response()->json('Mitra tidak ditemukan', 400);
        }

        try {
            $mitra->update([
                'validasi' => 3,
                'user_deleted' => auth()->user()->id,
                'deleted_at' => date('Y-m-d H:i:s'),
            ]);
            return response()->json('Restore Berhasil', 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function delete($id)
    {
        $mitra = DB::table('mitra')->where('id_mitra', $id);
        if (empty($mitra->first())) {
            return response()->json('Mitra tidak ditemukan', 400);
        }

        try {
            $mitra->update([
                'validasi' => 4,
                'user_deleted' => auth()->user()->id,
                'deleted_at' => date('Y-m-d H:i:s'),
            ]);
            return response()->json('Hapus Berhasil', 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    // Generate DB
    protected function createDbTransaksi($dbname)
    {
        $connection = 'db2';
        $query = "CREATE DATABASE $dbname";
        try {
            DB::connection($connection)->statement($query);
            // Switch to the new database
            config(["database.connections.{$connection}.database" => $dbname]);
            DB::purge($connection);
            return true;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    protected function createTbTransaksi($dbname)
    {
        try {
            Schema::create('transaksi', function (Blueprint $table) {
                $table->increments('id');
                // $table->integer('id_coa');
                $table->integer('id_coa')->nullable();
                $table->integer('id_nasabah');
                $table->integer('id_mitra');
                $table->integer('id_produk');
                $table->integer('predecessor')->default(0);
                $table->string('no_transaksi');
                $table->string('amount');
                $table->string('bagi_hasil')->nullable();
                $table->string('bukti_transfer')->nullable();
                $table->string('tenor')->nullable();
                $table->integer('aro')->nullable();
                $table->datetime('tgl_approve')->nullable();
                $table->integer('jenis')->default(0);
                $table->integer('status')->default(0);
                $table->string('kriptorone');
                $table->string('kriptortwo');
                $table->datetime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            });
            Schema::create('rekap', function (Blueprint $table) {
                $table->increments('id');
                // $table->integer('id_coa');
                $table->integer('id_coa')->nullable();
                $table->integer('id_produk');
                $table->integer('tahun');
                $table->integer('bulan');
                $table->integer('jenis')->default(0);
                $table->string('kriptorone');
                $table->string('kriptortwo');
                $table->datetime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            });
            Schema::create('log_transaksi', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('id_user');
                $table->text('keterangan');
                $table->integer('notifikasi');
                $table->string('kriptorone');
                $table->string('kriptortwo');
                $table->datetime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            });
            return true;
        } catch (\Throwable $th) {
            return false;
            // return [$dbname, $th->getMessage()];
        }
    }

    protected function generateDb($dbname)
    {
        $createDbTransaksi = $this->createDbTransaksi($dbname);
        DB::reconnect();
        $createTbTransaksi = $this->createTbTransaksi($dbname);

        if ($createDbTransaksi) {
            if ($createTbTransaksi) {
                return 'Generate Succesfully';
            } else {
                return ['Generate DB Successfully, TB Failed', $createDbTransaksi];
            }
        } else {
            return ['Generate DB Failed', $createDbTransaksi];
        }
    }

    protected function checkDatabaseName($dbname)
    {
        // Get all database names on the current connection
        $databaseNames = DB::connection()->select('SELECT name FROM sys.databases');

        $result = [];
        foreach ($databaseNames as $database) {
            $result[] = $database->name;
        }

        return array_search($dbname, $result);
    }
}
