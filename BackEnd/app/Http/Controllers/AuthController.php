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

class AuthController extends Controller
{
    public function index()
    {
        $alluser = User::all();
        foreach ($alluser as $key => $value) {
            $kriptorone = $value->kriptorone;
            $kriptortwo = $value->kriptortwo;
            if ($value->email != null) {
                $value->email = dekripsina($value->email, $kriptorone, $kriptortwo);
            }
            if ($value->username != null) {
                $value->username = dekripsina($value->username, $kriptorone, $kriptortwo);
            }
            if ($value->phone != null) {
                $value->phone = dekripsina($value->phone, $kriptorone, $kriptortwo);
            }
            if ($value->store_token != null) {
                $value->store_token = dekripsina($value->store_token, $kriptorone, $kriptortwo);
            }
            if ($value->reset_token != null) {
                $value->reset_token = dekripsina($value->reset_token, $kriptorone, $kriptortwo);
            }
        }

        return response()->json($alluser, 200);
    }

    public function nasabah()
    {
        $alluser = DB::table('users')
            ->wherein('role', [0, 10])
            ->leftjoin('nasabah', 'users.id', 'nasabah.id_user')
            ->get();
        foreach ($alluser as $key => $value) {
            $kriptorone = $value->kriptorone;
            $kriptortwo = $value->kriptortwo;
            if ($value->email != null) {
                $value->email = dekripsina($value->email, $kriptorone, $kriptortwo);
            }
            if ($value->username != null) {
                $value->username = dekripsina($value->username, $kriptorone, $kriptortwo);
            }
            if ($value->phone != null) {
                $value->phone = dekripsina($value->phone, $kriptorone, $kriptortwo);
            }
            if ($value->store_token != null) {
                $value->store_token = dekripsina($value->store_token, $kriptorone, $kriptortwo);
            }
            if ($value->reset_token != null) {
                $value->reset_token = dekripsina($value->reset_token, $kriptorone, $kriptortwo);
            }
            if ($value->nama != null) {
                $value->nama = dekripsina($value->nama, $kriptorone, $kriptortwo);
            }
            if ($value->ktp != null) {
                $value->ktp = dekripsina($value->ktp, $kriptorone, $kriptortwo);
            }
            if ($value->tmpt_lahir != null) {
                $value->tmpt_lahir = dekripsina($value->tmpt_lahir, $kriptorone, $kriptortwo);
            }
            if ($value->tgl_lahir != null) {
                $value->tgl_lahir = dekripsina($value->tgl_lahir, $kriptorone, $kriptortwo);
            }
            if ($value->ibu_kandung != null) {
                $value->ibu_kandung = dekripsina($value->ibu_kandung, $kriptorone, $kriptortwo);
            }
            if ($value->norek != null) {
                $value->norek = dekripsina($value->norek, $kriptorone, $kriptortwo);
            }
            if ($value->alamat != null) {
                $value->alamat = dekripsina($value->alamat, $kriptorone, $kriptortwo);
            }
            if ($value->alamat_kerja != null) {
                $value->alamat_kerja = dekripsina($value->alamat_kerja, $kriptorone, $kriptortwo);
            }
            if ($value->nama_ahli_waris != null) {
                $value->nama_ahli_waris = dekripsina($value->nama_ahli_waris, $kriptorone, $kriptortwo);
            }
            if ($value->ktp_ahli_waris != null) {
                $value->ktp_ahli_waris = dekripsina($value->ktp_ahli_waris, $kriptorone, $kriptortwo);
            }
            if ($value->phone_ahli_waris != null) {
                $value->phone_ahli_waris = dekripsina($value->phone_ahli_waris, $kriptorone, $kriptortwo);
            }
        }

        return response()->json($alluser, 200);
    }

    public function mitra()
    {
        $alluser = DB::table('users')
            ->where('role', 2)
            ->leftjoin('mitra', 'users.id', 'mitra.id_user')
            ->get();
        foreach ($alluser as $key => $value) {
            $kriptorone = $value->kriptorone;
            $kriptortwo = $value->kriptortwo;
            if ($value->email != null) {
                $value->email = dekripsina($value->email, $kriptorone, $kriptortwo);
            }
            if ($value->username != null) {
                $value->username = dekripsina($value->username, $kriptorone, $kriptortwo);
            }
            if ($value->phone != null) {
                $value->phone = dekripsina($value->phone, $kriptorone, $kriptortwo);
            }
            if ($value->store_token != null) {
                $value->store_token = dekripsina($value->store_token, $kriptorone, $kriptortwo);
            }
            if ($value->reset_token != null) {
                $value->reset_token = dekripsina($value->reset_token, $kriptorone, $kriptortwo);
            }
            if (!empty($value->nama)) {
                $value->nama = dekripsina($value->nama, $kriptorone, $kriptortwo);
            }
            if (!empty($value->kode_bank)) {
                $value->kode_bank = dekripsina($value->kode_bank, $kriptorone, $kriptortwo);
            }
            if (!empty($value->no_npwp)) {
                $value->no_npwp = dekripsina($value->no_npwp, $kriptorone, $kriptortwo);
            }
            if (!empty($value->no_akta_pendirian)) {
                $value->no_akta_pendirian = dekripsina($value->no_akta_pendirian, $kriptorone, $kriptortwo);
            }
            if (!empty($value->no_pengesahan_akta)) {
                $value->no_pengesahan_akta = dekripsina($value->no_pengesahan_akta, $kriptorone, $kriptortwo);
            }
            if (!empty($value->website)) {
                $value->website = dekripsina($value->website, $kriptorone, $kriptortwo);
            }
            if (!empty($value->phone_pengurus)) {
                $value->phone_pengurus = dekripsina($value->phone_pengurus, $kriptorone, $kriptortwo);
            }
            if (!empty($value->id_privy)) {
                $value->id_privy = dekripsina($value->id_privy, $kriptorone, $kriptortwo);
            }
            if (!empty($value->db_name)) {
                $value->db_name = dekripsina($value->db_name, $kriptorone, $kriptortwo);
            }
            if (!empty($value->norek_bank)) {
                $value->norek_bank = dekripsina($value->norek_bank, $kriptorone, $kriptortwo);
            }
        }

        return response()->json($alluser, 200);
    }

    public function regadmin(Request $request)
    {
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;
        $phone = $request->phone;

        // Check if field is empty
        if (empty($email) or empty($username) or empty($password)) {
            return response()->json('Semua Kolom harus terisi', 400);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json('Email tidak Valid', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($password) < 6) {
            return response()->json('Password Kurang Dari 6 Digit', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($phone) < 10) {
            return response()->json('Password Kurang Dari 6 Digit', 400);
        }

        // Check if username, email, phone already exist
        $cekData = User::all();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            $dekripUsername = null;
            $dekripPhone = null;
            if ($value->email != null) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }

            if ($value->username != null) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            }

            if ($value->phone != null) {
                $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
            }

            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($username == $dekripUsername) {
                return response()->json('Username sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($phone == $dekripPhone) {
                return response()->json('No Telp sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        // Create new user
        $kriptor = generatekriptor();
        $kriptorone = $kriptor['randnum'];
        $kriptortwo = $kriptor['randomBytes'];
        $enkripUsername = newenkripsina($username, $kriptorone, $kriptortwo);
        $enkripEmail = newenkripsina($email, $kriptorone, $kriptortwo);
        $enkripPhone = newenkripsina($phone, $kriptorone, $kriptortwo);
        // return response()->json([$enkripUsername, $enkripEmail, $enkripPhone], 400);
        try {
            $user = new User();
            $user->username = $enkripUsername;
            $user->email = $enkripEmail;
            $user->phone = $enkripPhone;
            $user->password = app('hash')->make($password);
            $user->kriptorone = $kriptor['kriptorone'];
            $user->kriptortwo = $kriptor['kriptortwo'];
            $user->role = 1;
            $user->status = 1;
            $user->user_created = auth()->user()->id;

            if ($user->save()) {
                return response()->json('Register Admin Berhasil', 200);
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function update(Request $request)
    {
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;
        $phone = $request->phone;

        // Check if field is empty
        if (empty($email) or empty($username) or empty($password)) {
            return response()->json('Semua Kolom harus terisi', 400);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json('Email tidak Valid', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($password) < 6) {
            return response()->json('Password Kurang Dari 6 Digit', 400);
        }

        // Check if password is greater than 5 character
        if (strlen($phone) < 10) {
            return response()->json('Password Kurang Dari 6 Digit', 400);
        }

        // Check if username, email, phone already exist
        $cekData = User::where('id', '!=', auth()->user()->id)->all();
        foreach ($cekData as $key => $value) {
            $dekripEmail = null;
            $dekripUsername = null;
            $dekripPhone = null;
            if ($value->email != null) {
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            }

            if ($value->username != null) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            }

            if ($value->phone != null) {
                $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
            }

            if ($email == $dekripEmail) {
                return response()->json('Email sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($username == $dekripUsername) {
                return response()->json('Username sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }

            if ($phone == $dekripPhone) {
                return response()->json('No Telp sudah digunakan, Silahkan gunakan yang lain', 404);
                break;
            }
        }

        // Create new user
        $kriptor = generatekriptor();
        $kriptorone = $kriptor['randnum'];
        $kriptortwo = $kriptor['randomBytes'];
        $enkripUsername = newenkripsina($username, $kriptorone, $kriptortwo);
        $enkripEmail = newenkripsina($email, $kriptorone, $kriptortwo);
        $enkripPhone = newenkripsina($phone, $kriptorone, $kriptortwo);

        try {
            $user = User::where('id', $request->id);
            !empty($request->username) ? ($user->username = $enkripUsername) : null;
            !empty($request->email) ? ($user->email = $enkripEmail) : null;
            !empty($request->phone) ? ($user->phone = $enkripPhone) : null;
            !empty($request->password) ? ($user->password = app('hash')->make($password)) : null;
            $user->updated_at = auth()->user()->id;
            $user->user_updated = date('Y-m-d H:i:s');

            if ($user->save()) {
                return response()->json('Register Admin Berhasil', 200);
            }
        } catch (\Exception $e) {
            return response()->json($e, 400);
        }
    }

    public function aktivasi($id)
    {
        $user = DB::table('users')
            ->where('id', $id)
            ->where('role', 1);
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
            $user->update([
                'status' => $status,
                'updated_at' => date('Y-m-d H:i:s'),
                'user_updated' => auth()->user()->id,
            ]);
            return response()->json($res, 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function ceklogin(Request $request)
    {
        $username = $request->username;
        $loginField = $username;
        $cekRole = User::all();
        foreach ($cekRole as $key => $value) {
            $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
            $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            if ($username == $dekripPhone) {
                $this->createotp($value->phone);
                return response()->json('otp', 200);
                break;
            } elseif ($username == $dekripUsername || $username == $dekripEmail) {
                return response()->json('password', 200);
                break;
            }
        }

        $loginType = filter_var($loginField, FILTER_VALIDATE_EMAIL) ? 'email' : 'other';
        if ($loginType == 'other') {
            if (is_numeric($username)) {
                $this->regphone($username);
                return response()->json('otp', 200);
            }
        }
        return response()->json('User tidak terdaftar', 400);
    }

    public function cekloginmobile(Request $request)
    {
        $username = $request->username;
        $loginField = $username;
        $cekRole = User::all();
        foreach ($cekRole as $key => $value) {
            $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
            $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
            $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
            if ($username == $dekripPhone) {
                $this->createotp($value->phone);
                return response()->json('otp', 200);
                break;
            }
        }

        $loginType = filter_var($loginField, FILTER_VALIDATE_EMAIL) ? 'email' : 'other';
        if ($loginType == 'other') {
            if (is_numeric($username)) {
                $this->regphone($username);
                return response()->json('otp', 200);
            }
        }
        return response()->json('User tidak terdaftar', 400);
    }

    public function login(Request $request)
    {
        $username = $request->username;
        $password = $request->password;
        $credentials = null;
        $loginField = $username;

        // Check if field is empty
        if (empty($username)) {
            return response()->json(['status' => 'error', 'message' => 'You must fill all the fields']);
        } else {
            $cekRole = User::all();
            $loginType = filter_var($loginField, FILTER_VALIDATE_EMAIL) ? 'email' : 'other';
            if ($loginType == 'other') {
                if (is_numeric($username)) {
                    $loginType = 'phone';

                    // Cek Data
                    $oldToken = null;
                    $idNa = null;
                    foreach ($cekRole as $key => $value) {
                        $kriptorone = $value->kriptorone;
                        $kriptortwo = $value->kriptortwo;
                        $dekripPhone = dekripsina($value->phone, $kriptorone, $kriptortwo);
                        if ($username == $dekripPhone) {
                            $idNa = $value->id;
                            $enkripPhone = $value->phone;
                            $rolena = $value->role;
                            if ($value->store_token != null) {
                                $oldToken = dekripsina($value->store_token, $kriptorone, $kriptortwo);
                            }
                            break;
                        }
                    }

                    // Login OTP
                    if ($idNa != null) {
                        $dateTime = strtotime('-5 minutes', strtotime(date('Y-m-d H:i:s')));
                        $cekOtp = User::where('id', $idNa)->firstorfail();

                        if ($cekOtp) {
                            if ($cekOtp->created_otp > $dateTime) {
                                return response()->json('OTP anda Expire, Silahkan tekan kirim ulang OTP', 400);
                            }
                            if ($cekOtp->otp != $password) {
                                return response()->json('Kode OTP Anda Salah', 400);
                            }
                            $token = JWTAuth::fromUser($cekOtp);
                            if ($oldToken != null) {
                                $this->revoke($oldToken);
                            }

                            $this->storeToken($idNa, $token, $kriptorone, $kriptortwo);
                            return $this->respondWithToken($token);
                        }
                    } else {
                        return response()->json('User not found', 404);
                    }
                } else {
                    $loginType = 'username';
                }
            }
            // Cek Data
            $oldToken = null;
            $idNa = null;
            $enkripUsername = null;
            foreach ($cekRole as $value) {
                $dekripUsername = dekripsina($value->username, $value->kriptorone, $value->kriptortwo);
                $dekripEmail = dekripsina($value->email, $value->kriptorone, $value->kriptortwo);
                if ($username == $dekripUsername) {
                    $idNa = $value->id;
                    $enkripUsername = $value->username;
                    $rolena = $value->role;
                    $kriptorone = $value->kriptorone;
                    $kriptortwo = $value->kriptortwo;
                    if ($value->store_token != null) {
                        $oldToken = dekripsina($value->store_token, $kriptorone, $kriptortwo);
                    }
                    break;
                }
                if ($username == $dekripEmail) {
                    $idNa = $value->id;
                    $enkripUsername = $value->email;
                    $rolena = $value->role;
                    $kriptorone = $value->kriptorone;
                    $kriptortwo = $value->kriptortwo;
                    if ($value->store_token != null) {
                        $oldToken = dekripsina($value->store_token, $kriptorone, $kriptortwo);
                    }
                    break;
                }
            }

            if ($enkripUsername != null) {
                $loginField = $enkripUsername;
            }

            request()->merge([$loginType => $loginField]);
            $credentials = request([$loginType, 'password']);

            if (!($token = auth()->attempt($credentials))) {
                return response()->json(['status' => 'failed', 'message' => 'Username atau Password Salah']);
            }

            if (auth()->user()->role == 0) {
                return response()->json(['status' => 'error', 'message' => 'Akun Anda Belum Aktif, Pastikan data anda lengkap']);
            }

            if ($oldToken != null) {
                $this->revoke($oldToken);
            }

            $this->storeToken($idNa, $token, $kriptorone, $kriptortwo);
            return $this->respondWithToken($token);
        }
    }

    public function logout()
    {
        $id = auth()->user()->id;
        auth()->logout();
        $del = DB::table('users')
            ->where('id', $id)
            ->update(['store_token' => null]);
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        $user = DB::table('users')
            ->where('id', auth()->user()->id)
            ->first();
        $oldToken = dekripsina($user->store_token, $user->kriptorone, $user->kriptortwo);
        $newToken = auth()->refresh();
        $this->revoke($oldToken);
        $this->storeToken(auth()->user()->id, $newToken, $user->kriptorone, $user->kriptortwo);
        return response()->json($newToken, 200);
    }

    public function userprofile()
    {
        $detailUser = DB::table('users')
            ->where('id', auth()->user()->id)
            ->select('username', 'email', 'phone', 'role', 'status', 'kriptorone', 'kriptortwo')
            ->first();

        $kriptorone = $detailUser->kriptorone;
        $kriptortwo = $detailUser->kriptortwo;
        if ($detailUser->email != null) {
            $detailUser->email = dekripsina($detailUser->email, $kriptorone, $kriptortwo);
        }
        if ($detailUser->username != null) {
            $detailUser->username = dekripsina($detailUser->username, $kriptorone, $kriptortwo);
        }
        if ($detailUser->phone != null) {
            $detailUser->phone = dekripsina($detailUser->phone, $kriptorone, $kriptortwo);
        }
        unset($detailUser->kriptorone);
        unset($detailUser->kriptortwo);
        switch ($detailUser->role) {
            case 0:
                $detailUser->jabatan = 'Non Register Nasabah';
                break;
            case 1:
                $detailUser->jabatan = 'Admin Aplikasi';
                break;
            case 2:
                $detailUser->jabatan = 'Mitra BPR';
                break;
            case 3:
                $detailUser->jabatan = 'Owner';
                break;
            case 10:
                $detailUser->jabatan = 'Registered Nasabah';
                break;
                break;
            case 99:
                $detailUser->jabatan = 'SuperAdmin';
                break;
            default:
        }

        $userResponse = [
            'expire_in' =>
                auth()
                    ->factory()
                    ->getTTL() /
                    (60 * 24) .
                ' days',
            'userProfile' => $detailUser,
        ];

        return response()->json($userResponse);
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        auth()
            ->factory()
            ->setTTL(24 * 7);
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' =>
                auth()
                    ->factory()
                    ->getTTL() /
                (60 * 24),
        ]);
    }

    protected function regphone($phone)
    {
        $kriptor = generatekriptor();
        $phoneNa = newenkripsina($phone, $kriptor['randnum'], $kriptor['randomBytes']);

        $insertData = [
            'phone' => $phoneNa,
            'kriptorone' => $kriptor['kriptorone'],
            'kriptortwo' => $kriptor['kriptortwo'],
        ];

        try {
            DB::table('users')->insert($insertData);
            return $this->createotp($phoneNa);
        } catch (\Exception $e) {
            return response()->json($e->message, 404);
        }
    }

    protected function createotp($enkripPhone)
    {
        $updateOTP = [
            'otp' => rand(100000, 999999),
            'created_otp' => date('Y-m-d h:i:s'),
        ];

        try {
            DB::table('users')
                ->where('phone', $enkripPhone)
                ->update($updateOTP);
            return 'create otp done';
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 404);
        }
    }

    protected function storeToken($id, $token, $kriptorone, $kriptortwo)
    {
        $kriptortwo = hex2bin($kriptortwo);
        $kriptorone = convertFromOpensll($kriptorone, $kriptortwo);
        $storeToken = newenkripsina($token, $kriptorone, $kriptortwo);
        $store = DB::table('users')
            ->where('id', $id)
            ->update(['store_token' => $storeToken]);
        return false;
    }

    protected function revoke($tokenId)
    {
        // Revoke the token by ID
        $token = JWTAuth::setToken($tokenId);
        if ($token->invalidate()) {
            return true;
        }
        return false;
    }

    public function deleteall()
    {
        try {
            // DB::table('users')
            //     ->where('id', '>', 2)
            //     ->delete();
            // DB::table('nasabah')->delete();
            // DB::table('mitra')->delete();
            DB::table('promo')->delete();
        } catch (\Throwable $e) {
            return response()->json($e->getMessage(), 400);
        }
    }
}
