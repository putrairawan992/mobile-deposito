CREATE TABLE qna (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pertanyaan varchar(255) not null,
  jawaban varchar(255) not null,
  id_predecessor int default 0,
  kategori varchar(255) default null, -- aplikasi / transaksi / biodata / norek
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT null
);

-- --------------------------------------------------------

CREATE TABLE komplain (
  id int AUTO_INCREMENT PRIMARY KEY,
  id_nasabah INT NOT NULL,
  id_admin_cs INT NOT NULL,
  id_transaksi INT default NULL,
  id_qna INT default NULL,
  jenis_komplain INT NOT NULL, -- 0=Registrasi Login Identitas, 1=Terkait Produk, 3=Terkait Pembelian/Pembayaran
  nasabah_rating int default null, -- 1-5
  cs_rating int default null, -- 1-5
  keterangan INT NOT NULL,
  predecessor_komplain INT NOT NULL,
  record_voice varchar(255) default null,
  kriptorone varchar(255) default NULL,
  kriptortwo varchar(255) default NULL,
  created_at datetime DEFAULT current_timestamp(),
  CONSTRAINT fk_komp_nasabah FOREIGN KEY (id_nasabah) REFERENCES db_main.users(id),
  CONSTRAINT fk_komp_admincs FOREIGN KEY (id_admin_cs) REFERENCES db_main.users(id),
  CONSTRAINT fk_komp_transaksi FOREIGN KEY (id_transaksi) REFERENCES db_transaksi.transaksi(id),
  CONSTRAINT fk_komp_qna FOREIGN KEY (id_qna) REFERENCES qna(id)
);

-- --------------------------------------------------------

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_sender INT NOT NULL,
  id_receiver INT NOT NULL,
  id_komplain INT NOT NULL,
  message TEXT NOT NULL,
  kriptorone varchar(255) default NULL,
  kriptortwo varchar(255) default NULL,
  created_at datetime DEFAULT current_timestamp(),
  CONSTRAINT fk_msg_usersender FOREIGN KEY (id_sender) REFERENCES db_main.users(id),
  CONSTRAINT fk_msg_userreceiver FOREIGN KEY (id_receiver) REFERENCES db_main.users(id),
  CONSTRAINT fk_msg_komplain FOREIGN KEY (id_komplain) REFERENCES komplain(id)
);

-- --------------------------------------------------------

CREATE TABLE log_cs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user int not null,
  id_komplain int not null,
  keterangan varchar(255) not null,
  data_change varchar(255) not null,
  notifikasi int default 0,
  kriptorone varchar(255) default NULL,
  kriptortwo varchar(255) default NULL,
  created_at datetime DEFAULT current_timestamp(),
  CONSTRAINT fk_logcs_user FOREIGN KEY (id_user) REFERENCES db_main.users(id),
  CONSTRAINT fk_logcs_komplain FOREIGN KEY (id_komplain) REFERENCES komplain(id)
);

-- --------------------------------------------------------

