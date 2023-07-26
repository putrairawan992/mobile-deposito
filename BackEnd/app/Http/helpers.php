<?php

function promoPath()
{
    return 'upload/promo/';
}

function splashPath()
{
    return 'upload/splash/';
}

function keyNa()
{
    return 'superbwx';
}

function formatDate($date, $format = 'Y-m-d')
{
    return date($format, strtotime($date));
}

function limitDatetimeOTP($time)
{
    return date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s') . ' ' . $time . ' minutes'));
}

function convertToAscii($data, $kode)
{
    $ascii = '';
    for ($i = 0; $i < strlen($data); $i++) {
        $kalkulasi = 0;
        foreach ($kode as $key => $kodena) {
            if ($key % 2 == 0) {
                $kalkulasi -= $kodena; // edit konfersinya
            } else {
                $kalkulasi += $kodena; // edit konfersinya
            }
        }
        $ascii .= ord($data[$i]) + $kalkulasi . ' ';
    }
    return trim($ascii);
}

function convertFromAscii($ascii, $kode)
{
    $chars = explode(' ', $ascii);
    $data = '';
    foreach ($chars as $char) {
        if (!empty($char)) {
            $kalkulasi = 0;
            foreach ($kode as $key => $kodena) {
                if ($key % 2 == 0) {
                    $kalkulasi -= $kodena; // edit konfersinya
                } else {
                    $kalkulasi += $kodena; // edit konfersinya
                }
            }
            $data .= chr($char - $kalkulasi);
        }
    }
    return $data;
}

function convertToOpensll($data, $kode)
{
    $encrypted = openssl_encrypt($data, 'AES-256-CBC', keyNa(), 0, $kode);
    return base64_encode($encrypted);
}

function convertFromOpensll($data, $kode)
{
    $data = base64_decode($data);
    return openssl_decrypt($data, 'AES-256-CBC', keyNa(), 0, $kode);
}

function generatekriptor()
{
    $randomBytes = random_bytes(16);
    $randnum = rand(100, 9999);
    return [
        'randomBytes' => $randomBytes,
        'randnum' => $randnum,
        'kriptorone' => convertToOpensll($randnum, $randomBytes),
        'kriptortwo' => bin2hex($randomBytes),
    ];
}

function newenkripsina($data, $randnum, $randomBytes)
{
    $DataToAscii = convertToAscii($data, str_split($randnum));
    return convertToOpensll($DataToAscii, $randomBytes);
}

function oldenkripsina($data, $kriptorone, $kriptortwo)
{
    $randomBytes = hex2bin($kriptortwo);
    $kriptorone = str_split(convertFromOpensll($kriptorone, $randomBytes));
    $DataToAscii = convertToAscii($data, $kriptorone);
    return convertToOpensll($DataToAscii, $randomBytes);
}

function dekripsina($data, $kriptorone, $kriptortwo)
{
    $randomBytes = hex2bin($kriptortwo);
    $randnum = str_split(convertFromOpensll($kriptorone, $randomBytes));
    $fromOpenssl = convertFromOpensll($data, $randomBytes);
    $fromAscii = convertFromAscii($fromOpenssl, $randnum);
    return $fromAscii;
}

function dekripsinaFile($filePath, $kriptorone, $kriptortwo, $pathNa)
{
    $randomBytes = hex2bin($kriptortwo);
    $randnum = str_split(convertFromOpensll($kriptorone, $randomBytes));
    // $fileOpenssl = convertFromOpensllFile($filePath, $randomBytes);
    // $fromAscii = fileFromAscii($fileOpenssl, $randnum);
    // return $fromAscii;
    $fromAscii = fileFromAscii($filePath, $randnum, $pathNa);
    return convertFromOpensllFile($fromAscii, $randomBytes, $pathNa);
    // return $fromOpenssl;
}

function newenkripsinaFile($uploadedFile, $randnum, $randomBytes, $pathNa)
{
    // $asciiFile = fileToAscii($uploadedFile, $randnum);
    // return convertToOpensllFile($asciiFile, $randomBytes);
    $opensslFile = convertToOpensllFile($uploadedFile, $randomBytes, $pathNa);
    return fileToAscii($opensslFile, $randnum, $pathNa);
    // return convertToOpensllFile($uploadedFile, $randomBytes);
    // return $asciiFile;
}

function oldenkripsinaFile($uploadedFile, $kriptorone, $kriptortwo, $pathNa, $oldFilePath)
{
    $randomBytes = hex2bin($kriptortwo);
    $randnum = convertFromOpensll($kriptorone, $randomBytes);
    // $asciiFile = fileToAscii($uploadedFile, $kode);
    // return convertToOpensllFile($asciiFile, $randomBytes);
    // return [$randnum, $kriptortwo];
    $opensslFile = convertToOpensllFile($uploadedFile, $randomBytes, $pathNa);
    $fileAscii = fileToAscii($opensslFile, $randnum, $pathNa);
    unlink($oldFilePath);
    return $fileAscii;
}

function fileToAscii($uploadedFile, $kode, $pathNa)
{
    // Read the file content
    $fileContent = file_get_contents($uploadedFile);

    // Convert the file content to ASCII
    $ascii = '';
    for ($i = 0; $i < strlen($fileContent); $i++) {
        $kalkulasi = 0;
        foreach (str_split($kode) as $key => $kodena) {
            if ($key % 2 == 0) {
                $kalkulasi -= $kodena; // edit konfersinya
            } else {
                $kalkulasi += $kodena; // edit konfersinya
            }
        }
        $ascii .= ord($fileContent[$i]) + $kalkulasi . ' ';
    }
    $ascii = base64_encode($ascii);

    // Generate a unique filename for the encrypted file
    $encryptedFilename = uniqid() . '.' . pathinfo($uploadedFile, PATHINFO_EXTENSION);

    // Specify the destination path for the encrypted file
    $destinationPath = $pathNa . $encryptedFilename;

    // Store the encrypted file
    file_put_contents($destinationPath, trim($ascii));

    // Delete the uploaded file
    unlink($uploadedFile);

    // Return the encrypted file path or do something with it
    return $destinationPath;
}

function fileFromAscii($filePath, $kode, $pathNa)
{
    // Read the file content
    $fileContent = file_get_contents($filePath);
    // $extension = pathinfo($filePath, PATHINFO_EXTENSION);

    // Generate a unique filename for the encrypted file
    $decryptedFilename = uniqid() . '.' . pathinfo($filePath, PATHINFO_EXTENSION);

    $fileContentNa = base64_decode($fileContent);
    // Convert the ASCII values back to characters
    $chars = explode(' ', $fileContentNa);
    $data = '';
    foreach ($chars as $char) {
        if (!empty($char)) {
            $kalkulasi = 0;
            foreach ($kode as $key => $kodena) {
                if ($key % 2 == 0) {
                    $kalkulasi -= $kodena; // edit konfersinya
                } else {
                    $kalkulasi += $kodena; // edit konfersinya
                }
            }
            $data .= chr($char - $kalkulasi);
        }
    }

    // Specify the destination path for the encrypted file
    $destinationPath = $pathNa . $decryptedFilename;

    // Store the encrypted file
    file_put_contents($destinationPath, $data);

    // Delete the uploaded file
    // unlink($filePath);

    // Return the decrypted content
    return $destinationPath;
}

function convertToOpensllFile($uploadedFile, $randomBytes, $pathNa)
{
    // Read the file content
    $fileContent = file_get_contents($uploadedFile);

    // Encrypt the file content using openssl_encrypt
    $encryptedContent = openssl_encrypt($fileContent, 'AES-256-CBC', keyNa(), 0, $randomBytes);

    // Generate a unique filename for the encrypted file
    $encryptedFilename = uniqid() . '.' . $uploadedFile->getClientOriginalExtension();

    // Specify the destination path for the encrypted file
    $destinationPath = $pathNa . $encryptedFilename;

    // Store the encrypted file
    file_put_contents($destinationPath, $encryptedContent);

    // Delete the uploaded file
    // unlink($uploadedFile);

    // Return the encrypted file path or do something with it
    return $destinationPath;
}

function convertFromOpensllFile($filePath, $randomBytes, $pathNa)
{
    // Read the file content
    $fileContent = file_get_contents($filePath);
    $extension = pathinfo($filePath, PATHINFO_EXTENSION);

    // Generate a unique filename for the encrypted file
    $decryptedFilename = uniqid() . '.' . $extension;

    // Decrypt Open SSL
    $decryptedContent = openssl_decrypt($fileContent, 'AES-256-CBC', keyNa(), 0, $randomBytes);

    // Specify the destination path for the encrypted file
    $destinationPath = $pathNa . $decryptedFilename;

    // Store the encrypted file
    file_put_contents($destinationPath, $decryptedContent);

    // Delete the uploaded file
    unlink($filePath);

    // Return the decrypted content
    return $destinationPath;
}

// DB Load Balancing
function bestConnection()
{
    // Find the best database connection based on custom criteria
    $connections = ['db2', 'db1'];
    $bestConnection = findBestConnection($connections);
    if ($bestConnection == 'default') {
        $bestConnection = $connections[array_rand($connections)];
    }

    // Switch to the selected database connection
    DB::setDefaultConnection($bestConnection);

    // Delete DB Name
    if (($key = array_search($bestConnection, $connections)) !== false) {
        unset($connections[$key]);
    }

    return ['conn' => $bestConnection, 'listconn' => $connections];
}

function findBestConnection($connections)
{
    $availableConnections = [];
    foreach ($connections as $connection) {
        if (isConnectionAvailable($connection)) {
            $availableConnections[] = $connection;
        }
    }

    // If there are available connections, select the first one
    // You can implement a more sophisticated algorithm here based on your specific requirements
    if (!empty($availableConnections)) {
        return $availableConnections[0];
    }

    // If no available connections found, fallback to a default connection or handle the case as needed
    return 'default';
}

function isConnectionAvailable(string $connection)
{
    try {
        // Get the configuration for the specified connection
        $config = config("database.connections.$connection");

        // Create a new temporary connection to check availability
        $tempConnection = new \PDO("sqlsrv:Server={$config['host']},{$config['port']};Database={$config['database']};Encrypt=true;TrustServerCertificate=true;", $config['username'], $config['password']);

        // Set the timeout for the connection attempt (adjust as needed)
        $tempConnection->setAttribute(\PDO::ATTR_TIMEOUT, 1);

        // Attempt to establish the connection
        $tempConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $tempConnection->query('SELECT 1');

        // The connection was successful
        return true;
    } catch (\Throwable $e) {
        // An error occurred, indicating that the connection is not available
        return false;
    }
}
// end DB Load Balancing

function createDB($dbname)
{
    return true;
}

// Sync DB Manually
function syncTBUsers($dbname, $alluser)
{
    try {
        foreach ($dbname['listconn'] as $key => $value) {
            if (isConnectionAvailable($value)) {
                foreach ($alluser as $key => $user) {
                    DB::connection($value)
                        ->table('users')
                        ->updateOrInsert(
                            // ['id' => $user->id],
                            [
                                'username' => $user->username,
                                'email' => $user->email,
                                'phone' => $user->phone,
                                'password' => $user->password,
                                'kriptorone' => $user->kriptorone,
                                'kriptortwo' => $user->kriptortwo,
                                'status' => $user->status,
                                'role' => $user->role,
                                'otp' => $user->otp,
                                'store_token' => $user->store_token,
                                'reset_token' => $user->reset_token,
                                'created_at' => $user->created_at,
                                'updated_at' => $user->updated_at,
                            ],
                        );
                }
            }
        }
    } catch (\Exception $e) {
        return response()->json($e, 400);
    }
}

function syncTBNasabah($dbname, $allnasabah)
{
    foreach ($dbname['listconn'] as $key => $value) {
        if (isConnectionAvailable($value)) {
            try {
                foreach ($allnasabah as $key => $nasabah) {
                    DB::connection($value)
                        ->table('users')
                        ->updateOrInsert(
                            ['id' => $user->id],
                            [
                                'id_user' => $nasabah->id_user,
                                'id_validator' => $nasabah->id_validator,
                                'nama' => $nasabah->nama,
                                'ktp' => $nasabah->ktp,
                                'image_ktp' => $nasabah->image_ktp,
                                'image_selfie' => $nasabah->image_selfie,
                                'tmpt_lahir' => $nasabah->tmpt_lahir,
                                'tgl_lahir' => $nasabah->tgl_lahir,
                                'ibu_kandung' => $nasabah->ibu_kandung,
                                'id_privy' => $nasabah->id_privy,
                                'id_bank' => $nasabah->id_bank,
                                'norek' => $nasabah->norek,
                                'status_pernikahan' => $nasabah->status_pernikahan,
                                'jenis_pekerjaan' => $nasabah->jenis_pekerjaan,
                                'alamat' => $nasabah->alamat,
                                'alamat_kerja' => $nasabah->alamat_kerja,
                                'penghasilan' => $nasabah->penghasilan,
                                'nama_ahli_waris' => $nasabah->nama_ahli_waris,
                                'ktp_ahli_waris' => $nasabah->ktp_ahli_waris,
                                'image_ktp_ahli_waris' => $nasabah->image_ktp_ahli_waris,
                                'hub_ahli_waris' => $nasabah->hub_ahli_waris,
                                'phone_ahli_waris' => $nasabah->phone_ahli_waris,
                                'validasi' => $nasabah->validasi,
                                'created_at' => $nasabah->created_at,
                                'updated_at' => $nasabah->updated_at,
                            ],
                        );
                }
                return true;
            } catch (\Exception $e) {
                return response()->json($e, 400);
            }
        }
    }
}
