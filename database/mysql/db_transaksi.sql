CREATE TABLE tenor (
  id int AUTO_INCREMENT PRIMARY KEY,
  nama varchar(255) NOT NULL,
  durasi varchar(255) Default NULL,
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT NULL ON UPDATE current_timestamp()
);

-- CREATE TABLE pinalti (
--   id int AUTO_INCREMENT PRIMARY KEY,
--   int NOT NULL,
--   deskripsi varchar(255) Default NULL,
--   created_at datetime DEFAULT current_timestamp(),
--   updated_at datetime DEFAULT NULL ON UPDATE current_timestamp()
-- );

CREATE TABLE transaksi (
  id int AUTO_INCREMENT PRIMARY KEY,
  id_coa INT NOT NULL,
  id_validator INT NOT NULL,
  id_nasabah INT NOT NULL,
  amount INT DEFAULT 0,
  bukti_transfer varchar(255) NULL,
  durasi INT NULL,
  auto_perpanjang INT NULL,
  pinalti int default NULL,
  tgl_approve datetime NULL,
  jenis int default 0, -- 0=bagihasil, 1=pengembalian, 2=penarikan, 3=pembelian
  status int default 0, -- 1=pengajuan, 2=disetujui, 3=transfer, 4=done
  kriptorone varchar(255) default NULL,
  kriptortwo varchar(255) default NULL,
  created_at datetime DEFAULT current_timestamp(),
  CONSTRAINT fk_trans_nasabah FOREIGN KEY (id_nasabah) REFERENCES db_main.users(id),
  CONSTRAINT fk_trans_validator FOREIGN KEY (id_validator) REFERENCES db_main.users(id)
);

-- Generate Rekap Perbulan Berdasarkan COA
CREATE TABLE rekap (
  id int AUTO_INCREMENT PRIMARY KEY,
  tahun INT NOT NULL,
  bulan INT NOT NULL,
  id_coa INT NOT NULL,
  jenis int default 0, -- 0=bagihasil, 1=pengembalian, 2=penarikan, 3=pembelian
  kriptorone varchar(255) default NULL,
  kriptortwo varchar(255) default NULL,
  created_at datetime DEFAULT current_timestamp()
);

CREATE TABLE log_transaksi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user int not null,
  keterangan varchar(255) not null,
  notifikasi int default 0, --0=not send, 1=unread, 2=read
  kriptorone varchar(255) default NULL,
  kriptortwo varchar(255) default NULL,
  created_at datetime DEFAULT current_timestamp()
);
