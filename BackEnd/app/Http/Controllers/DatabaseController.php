<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Config;

class DatabaseController extends Controller
{
    protected function createDbTransaksi($dbname)
    {
        $connection = 'db1';
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
                $table->integer('id_mitra');
                $table->integer('id_produk');
                $table->integer('amount')->default(0);
                $table->integer('bagi_hasil')->nullable();
                $table->string('bukti_transfer')->nullable();
                $table->integer('tenor')->nullable();
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

    public function generateDb($dbname)
    {
        $createDbTransaksi = $this->createDbTransaksi($dbname);
        DB::reconnect();
        $createTbTransaksi = $this->createTbTransaksi($dbname);
        return [$createDbTransaksi, $createTbTransaksi];

        if ($createDbTransaksi) {
            if ($createTbTransaksi) {
                return response()->json('Generate Succesfully', 200);
            } else {
                return response()->json(['Generate DB Successfully, TB Failed', $createDbTransaksi], 400);
            }
        } else {
            return response()->json(['Generate DB Failed', $createDbTransaksi], 400);
        }
    }

    public function checkDatabaseName($dbname)
    {
        // Get all database names on the current connection
        $databaseNames = DB::connection()->select('SELECT name FROM sys.databases');

        $result = [];
        foreach ($databaseNames as $database) {
            $result[] = $database->name;
        }

        return [$result, array_search($dbname, $result)];
    }
}
