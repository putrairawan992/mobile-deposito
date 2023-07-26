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
        $dbname = bestConnection();
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
        $dbname = bestConnection();
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
        $dbname = bestConnection();
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

    public function ceklogin(Request $request)
    {
        $dbname = bestConnection();
        $username = $request->username;
        $loginType = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'other';
        if ($loginType == 'other') {
            $pattern = '/^\d{10,}$/';
            if (filter_var($username, FILTER_VALIDATE_REGEXP, ['options' => ['regexp' => $pattern]])) {
                $regphone = null;
                $createotp = null;
                $enkripPhone = null;
                $rolena = null;
                $cekRole = User::all();
                foreach ($cekRole as $key => $value) {
                    $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
                    if ($username == $dekripPhone) {
                        $enkripPhone = $value->phone;
                        $rolena = $value->role;
                        break;
                    }
                }

                if ($rolena == 10 || $rolena == 0) {
                    $createotp = $this->createotp($enkripPhone, $dbname);
                }

                if ($enkripPhone == null) {
                    $regphone = $this->regphone($username, $dbname);
                }

                if ($regphone == 'create otp done') {
                    return response()->json('phone', 200);
                }
                if ($createotp == 'create otp done') {
                    return response()->json('phone', 200);
                }

                return response()->json('Register or CreateOTP Failed', 404);
            } else {
                $cekRole = DB::table('users')
                    ->where('username', $username)
                    ->first();
                if ($cekRole) {
                    if ($cekRole->role > 9) {
                        return response()->json('phone', 200);
                    } else {
                        return response()->json('username', 200);
                    }
                }
                return response()->json('User Tidak Terdaftar', 404);
            }
        } else {
            $cekRole = DB::table('users')
                ->where('email', $username)
                ->first();
            if ($cekRole) {
                if ($cekRole->role > 9) {
                    return response()->json('phone', 200);
                } else {
                    return response()->json('email', 200);
                }
            }
            return response()->json('Email Tidak Terdaftar', 404);
        }
    }

    public function login(Request $request)
    {
        $dbname = bestConnection();
        $username = $request->username;
        $password = $request->password;
        $otp = $request->password;
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
                        $dekripPhone = dekripsina($value->phone, $value->kriptorone, $value->kriptortwo);
                        if ($username == $dekripPhone) {
                            $idNa = $value->id;
                            $enkripPhone = $value->phone;
                            $rolena = $value->role;
                            $kriptorone = $value->kriptorone;
                            $kriptortwo = $value->kriptortwo;
                            if ($value->store_token != null) {
                                $oldToken = dekripsina($value->store_token, $kriptorone, $kriptortwo);
                            }
                            break;
                        }
                    }

                    // Login OTP
                    if ($idNa != null) {
                        $dateTime = strtotime('-5 minutes', strtotime(date('Y-m-d H:i:s')));
                        $cekOtp = User::where('id', $idNa)
                            ->where('otp', $password)
                            ->where('created_otp', '>', date('Y-m-d H:i:s', $dateTime))
                            ->firstOrFail();

                        if ($cekOtp) {
                            $token = JWTAuth::fromUser($cekOtp);
                            if ($oldToken != null) {
                                $this->revoke($oldToken);
                            }

                            $this->storeToken($idNa, $token, $kriptorone, $kriptortwo);
                            return $this->respondWithToken($token);
                        }
                    } else {
                        return response()->json(['error' => 'User not found'], 404);
                    }
                } else {
                    $loginType = 'username';
                }
            }
            // Cek Data
            $oldToken = null;
            $idNa = null;
            $enkripUsername = null;
            foreach ($cekRole as $key => $value) {
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
                return response()->json(['status' => 'error', 'message' => 'Akun Anda Belum Aktif, Hubungi Admin']);
            }

            if ($oldToken != null) {
                $this->revoke($oldToken);
            }

            $this->storeToken($idNa, $token, $kriptorone, $kriptortwo);
            return $this->respondWithToken($token);
        }
    }

    public function update(Request $request)
    {
        $updateDataUser = [
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'phone' => $request->phone,
        ];

        try {
            $user = DB::table('users');
            if (auth()->user()->role == 99 || auth()->user()->role == 1 || auth()->user()->role == 2 || auth()->user()->role == 3) {
                $user
                    ->where('id', $request->id)
                    ->whereNotIn('role', [1, 99, 2, 3])
                    ->get();
            } elseif (auth()->user()->role != 0) {
                $user
                    ->where('id', $request->id)
                    ->whereIn('role', [0, 4, 5, 6, 10])
                    ->get();
            } else {
                return response()->json('Not Authorized', 401);
            }
            $user->update($updateDataUser);
            return response()->json('Updating Successfully', 200);
        } catch (\Exception $e) {
            return response()->json('Bad Request', 400);
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
        return response()->json(auth()->refresh(), 200);
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
            // echo 'Your favorite color is neither red, blue, nor green!';
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

    protected function regphone($phone, $dbname)
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
            return $this->createotp($phoneNa, $dbname);
        } catch (\Exception $e) {
            return response()->json($e->message, 404);
        }
    }

    protected function createotp($phone, $dbname)
    {
        $updateOTP = [
            'otp' => rand(1000, 9999),
            'created_otp' => date('Y-m-d h:i:s'),
        ];

        try {
            DB::table('users')
                ->where('phone', $phone)
                ->update($updateOTP);

            $alluser = User::all();
            foreach ($dbname['listconn'] as $key => $value) {
                if (isConnectionAvailable($value)) {
                    foreach ($alluser as $key => $user) {
                        DB::connection($value)
                            ->table('users')
                            ->updateOrInsert(
                                ['id' => $user->id],
                                [
                                    'otp' => $user->otp,
                                    'created_otp' => $user->created_otp,
                                ],
                            );
                    }
                }
            }

            return 'create otp done';
        } catch (\Exception $e) {
            return response()->json($e->message, 404);
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
}
