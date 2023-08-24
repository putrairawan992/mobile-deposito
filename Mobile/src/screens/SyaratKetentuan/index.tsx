import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import {colors} from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import {navigationRef} from '../../navigation/RootNavigation';
import {showToast} from '../../utils/toast';
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailNasabah } from '../../services/user';

export default function SyaratKetentuan() {
  const [agree, setAgree] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const { detailNasabah } = useSelector((state: RootState) => state.userReducer);
console.log(detailNasabah);

  useEffect(()=>{
    dispatch(getDetailNasabah())
  },[dispatch])

  const onLanjut = () => {
    if (!agree) {
      return showToast('Centang syarat dan ketentuan.');
    }
    navigationRef.navigate(detailNasabah?.validasi == "0" ?  'Register' : 'MyTabs');
  };

  return (
    <DefaultView
      statusBarColor={colors.primary}
      containerClassName="bg-primary">
      <View className="px-5 py-5">
        <DefaultText
          title="Syarat dan Ketentuan"
          titleClassName="text-white font-inter-bold text-xl"
        />
        <Gap height={10} />
        <DefaultText
          title="Sebelum memulai, baca dan setujui Syarat & Ketentuan dibawah dulu ya."
          titleClassName="text-white"
        />
      </View>
      <View className="px-5 py-4 bg-white flex-1 rounded-t-2xl">
        <ScrollView showsVerticalScrollIndicator={false}>
          <DefaultText
            title="SYARAT & KETENTUAN DEPOSITO SYARIAH"
            titleClassName="font-inter-semibold text-center"
          />
          <Gap height={10} />
          <DefaultText
            title=" A. Definisi"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <DefaultText
            title="1.	m-DepositoSyariah (Mobile Banking) adalah layanan produk perbankan PT Bank Harta Insan Karimah (“HIK”) yang dapat diakses secara langsung oleh Nasabah melalui telepon seluler/handphone, baik dengan menggunakan menu yang sudah tersedia di Subscriber Identification Module (SIM) Card, dengan menggunakan media SMS atau menggunakan menu pada HIK mobile dengan menggunakan media jaringan internet pada handphone dikombinasikan dengan media SMS sesuai ketentuan yang berlaku di HIK."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="2.	HIK mobile adalah aplikasi yang dapat di-download dari website resmi HIK maupun media distribusi aplikasi/software resmi yang ditunjuk HIK yang dimiliki oleh mobile operating system yang terdapat di handphone nasabah untuk melakukan transaksi melalui m-DepositoSyariah dan KlikHIK atau untuk memperoleh Info HIK."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="3.	PIN (Personal Identification Number) m-DepositoSyariah adalah nomor identifikasi pribadi bagi Nasabah yang menggunakan m-DepositoSyariah."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="4. Kode Akses adalah kode pribadi bagi Nasabah yang menggunakan m-DepositoSyariah pada HIK mobile."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="5.	Kode Transaksi adalah suatu kode yang dihasilkan oleh m-DepositoSyariah pada HIK mobile untuk melakukan transaksi tarik tunai, setor tunai di ATM HIK, atau transaksi di kantor cabang HIK tanpa menggunakan Kartu ATM HIK."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="6.	Info HIK adalah layanan informasi mengenai produk dan layanan HIK berikut program promosinya, lokasi kantor cabang HIK dan informasi lainnya terkait dengan HIK."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="7.	Operator Seluler adalah perusahaan yang menyediakan layanan jaringan telepon seluler."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="8.	Nomor Handphone e-Banking HIK adalah nomor handphone yang digunakan sebagai sarana otentikasi/otorisasi dalam bertransaksi pada e-Channel HIK."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="9.	SMS (Short Message Services) adalah layanan penyampaian pesan singkat dalam bentuk teks dan/atau angka yang dapat diterima dan/atau dikirimkan melalui handphone."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="10. OTP (One Time Password) adalah kode sandi yang bersifat unik dan rahasia yang dihasilkan oleh sistem HIK dan dikirimkan melalui SMS ke nomor handphone yang digunakan Nasabah untuk mengakses m-DepositoSyariah."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="11. Nasabah adalah pemilik rekening perorangan dalam bentuk Deposito di HIK."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="B.	REGISTRASI m-DepositoSyariah"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="1.	Untuk dapat menggunakan m-DepositoSyariah, Nasabah harus memiliki SIM Card Operator Seluler tertentu, meng-install HIK mobile serta memiliki PIN m-DepositoSyariah yang ditentukan sendiri oleh Nasabah pada saat melakukan registrasi di m-DepositoSyariah. Selanjutnya Nasabah dapat mengganti PIN m-DepositoSyariah pada menu Profile Ganti PIN."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="2.	HIK berhak untuk menentukan jumlah nomor handphone yang dapat digunakan Nasabah untuk melakukan registrasi m-DepositoSyariah, yang akan diberitahukan kepada Nasabah dalam bentuk dan melalui sarana apa pun sesuai ketentuan yang berlaku."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="3.	HIK berhak mendaftarkan nomor handphone yang digunakan Nasabah untuk melakukan aktivasi m-DepositoSyariah ke dalam database Nomor Handphone e-Banking HIK."
            titleClassName="text-left text-justify"
          />
          <DefaultText
            title="4.	Nasabah dapat menambah, mengubah, dan/atau menghapus Nomor Handphone e-Banking HIK melalui m-DepositoSyariah atau sarana lainnya yang ditentukan oleh HIK di kemudian hari."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="C.	KETENTUAN PENGGUNAAN"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="
1.	Nasabah dapat menggunakan m-DepositoSyariah untuk mendapatkan Info HIK dan/atau melakukan transaksi perbankan yang telah disediakan oleh HIK yang akan diberitahukan oleh HIK dalam bentuk dan melalui sarana apa pun sesuai dengan ketentuan hukum yang berlaku.
2.	Melalui m-DepositoSyariah, Nasabah dapat mengakses informasi rekening deposito.
3.	HIK berhak melakukan verifikasi terhadap Nasabah yang mengakses atau melakukan transaksi pada m-DepositoSyariah, antara lain dengan melakukan verifikasi data diri Nasabah dan/atau meminta Nasabah untuk memasukkan OTP saat melakukan transaksi tertentu pada m-DepositoSyariah.
4.	Atas persetujuan Nasabah, HIK berhak mengakses lokasi Nasabah pada saat Nasabah hendak melakukan pembukaan rekening online di m-DepositoSyariah, melakukan aktivasi HIK mobile dan pada saat melakukan penggantian handphone antara lain untuk kenyamanan dan keamanan Nasabah dalam bertransaksi.
5.	Perintah/instruksi yang diberikan oleh Nasabah melalui m-DepositoSyariah hanya dapat dilakukan dengan menggunakan nomor handphone Nasabah yang telah didaftarkan di HIK dan setelah Nasabah melakukan aktivasi m-DepositoSyariah pada handphone Nasabah.
6.	Nasabah wajib memastikan ketersediaan dana pada rekening Nasabah sebelum melakukan transaksi melalui m-DepositoSyariah. Nasabah harus mengisi semua data yang dibutuhkan untuk setiap transaksi secara benar dan lengkap.
7.	Sebagai tanda persetujuan, Nasabah wajib memasukkan PIN m-DepositoSyariah untuk melakukan transaksi finansial dan transaksi lainnya yang ditentukan oleh HIK.
8.	Setiap instruksi dari Nasabah yang tersimpan pada pusat data HIK merupakan data yang benar dan mengikat Nasabah, serta merupakan bukti yang sah atas instruksi dari Nasabah kepada HIK untuk melakukan transaksi yang dimaksud, kecuali Nasabah dapat membuktikan sebaliknya.
9.	HIK berhak menentukan limit atas transaksi yang dilakukan Nasabah melalui m-DepositoSyariah yang akan diberitahukan dalam bentuk dan melalui sarana apa pun sesuai ketentuan hukum yang berlaku.
10.	HIK menerima dan menjalankan setiap instruksi dari Nasabah sebagai instruksi yang sah berdasarkan penggunaan nomor handphone dan PIN m-DepositoSyariah dan/atau Kode Transaksi. HIK tidak mempunyai kewajiban untuk meneliti atau menyelidiki keaslian maupun keabsahan atau kewenangan pengguna nomor handphone dan PIN m-DepositoSyariah dan/atau Kode Transaksi atau menilai maupun membuktikan ketepatan maupun kelengkapan instruksi dimaksud, oleh karena itu instruksi tersebut adalah sah dan mengikat Nasabah secara hukum, kecuali Nasabah dapat membuktikan sebaliknya.
11.	Segala transaksi yang telah diinstruksikan oleh Nasabah kepada HIK tidak dapat dibatalkan dengan alasan apa pun. Menyimpang dari ketentuan tersebut, Nasabah dapat membatalkan link Transaksi BagiBagi yang dibuat oleh Nasabah melalui m-DepositoSyariah pada HIK mobile selama link Transaksi BagiBagi belum kedaluwarsa. Segala transaksi yang telah dilakukan dengan menggunakan link Transaksi tersebut sebelum adanya pembatalan link Transaksi menjadi tanggung jawab Nasabah sepenuhnya. Nasabah juga bertanggung jawab atas segala akibat yang timbul sehubungan dengan pembatalan link Transaksi dan membebaskan HIK dari segala macam tuntutan, gugatan, dan/atau tindakan hukum lainnya dalam bentuk apa pun dan dari pihak manapun.
12.	Nasabah wajib melakukan peningkatan versi (upgrade) aplikasi HIK mobile atas permintaan HIK.
13.	Kelalaian Nasabah dalam melakukan peningkatan versi (upgrade) HIK mobile mengakibatkan Nasabah tidak dapat menggunakan HIK mobile atau hanya dapat mengakses fitur tertentu di HIK mobile.
14.	HIK berhak untuk tidak melaksanakan instruksi dari Nasabah, jika saldo rekening Nasabah di HIK tidak mencukupi untuk melakukan transaksi yang bersangkutan atau rekening Nasabah diblokir.
15.	Nasabah wajib dan bertanggung jawab untuk memastikan ketepatan dan kelengkapan instruksi transaksi melalui m-DepositoSyariah yang dikirim kepada HIK. HIK tidak bertanggung jawab terhadap segala akibat apa pun yang timbul karena ketidaklengkapan, ketidakjelasan data, atau ketidaktepatan instruksi dari Nasabah.
16.	Nasabah menyetujui dan mengakui keabsahan, kebenaran, atau keaslian bukti instruksi dan komunikasi yang dikirim secara elektronik oleh HIK, termasuk dokumen dalam bentuk catatan komputer atau bukti transaksi yang dijalankan oleh HIK, tape/cartridge, hasil print out komputer, salinan atau bentuk penyimpanan informasi yang lain yang terdapat pada HIK. Semua sarana dan/atau dokumen tersebut merupakan satu-satunya alat bukti yang sah dan mengikat atas transaksi-transaksi perbankan yang dilakukan oleh Nasabah melalui m-DepositoSyariah, kecuali Nasabah dapat membuktikan sebaliknya.
17.	Dengan melakukan transaksi melalui m-DepositoSyariah, Nasabah mengakui semua komunikasi dan instruksi dari Nasabah yang diterima HIK akan diperlakukan sebagai alat bukti yang sah meskipun dokumen tidak dibuat secara tertulis dan/atau dokumen tidak ditandatangani oleh Nasabah dan HIK.
18.	Operator Seluler berhak mengenakan biaya kepada Nasabah untuk setiap transaksi, baik yang berhasil maupun yang tidak berhasil dilakukan.
19.	Data transaksi yang dapat dilihat pada menu notifikasi maksimal hanya 15 (lima belas) data transaksi dalam jangka waktu maksimal 7 (tujuh) hari terakhir.
20.	Nasabah setuju bahwa HIK berhak untuk menyimpan dan menggunakan data personal Nasabah dan data lainnya yang melekat pada telepon seluler (handphone) yang digunakan Nasabah untuk mengunduh HIK mobile antara lain untuk kenyamanan dan keamanan Nasabah dalam bertransaksi serta untuk kepentingan promosi produk perbankan HIK dan pihak lain yang bekerja sama dengan HIK.
21.	Nasabah dengan ini setuju bahwa HIK berhak untuk menginformasikan nama, nomor rekening, dan/atau data transaksi Nasabah yang dilakukan melalui m-DepositoSyariah kepada pihak lain yang terkait dengan transaksi yang dilakukan oleh Nasabah.
22.	HIK berhak menutup layanan m-DepositoSyariah antara lain apabila m-DepositoSyariah digunakan untuk melakukan suatu tindakan melanggar hukum."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="D.	PIN m-DepositoSyariah, OTP, KODE AKSES, KODE TRANSAKSI, DAN KEWAJIBAN NASABAH"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="
1.	PIN m-DepositoSyariah, Kode Akses dan Kode Transaksi hanya boleh digunakan oleh Nasabah yang bersangkutan.
2.	Nasabah wajib merahasiakan PIN m-DepositoSyariah, OTP, Kode Akses dan/atau Kode Transaksi dengan cara:
•	Tidak memberitahukan PIN m-DepositoSyariah, OTP, Kode Akses, dan/atau Kode Transaksi kepada orang lain termasuk kepada anggota keluarga atau orang terdekat Nasabah;
•	Tidak menyimpan PIN m-DepositoSyariah dan Kode Akses pada handphone, benda-benda lainnya atau sarana apa pun yang memungkinkan PIN m-DepositoSyariah dan Kode Akses diketahui oleh orang lain;
•	Berhati-hati dalam menggunakan PIN m-DepositoSyariah, Kode Akses, dan/atau Kode Transaksi agar tidak terlihat oleh orang lain;
•	Tidak menggunakan nomor handphone, PIN m-DepositoSyariah, dan Kode Akses yang ditentukan atau dipilihkan oleh orang lain atau yang mudah diterka seperti tanggal lahir atau kombinasinya dan nomor telepon.
3.	Segala penyalahgunaan PIN m-DepositoSyariah, OTP, Kode Akses dan/atau Kode Transaksi merupakan tanggung jawab Nasabah sepenuhnya. Nasabah dengan ini membebaskan HIK dari segala tuntutan yang timbul, baik dari pihak lain maupun Nasabah sendiri sebagai akibat penyalahgunaan PIN m-DepositoSyariah, Kode Akses, dan/atau Kode Transaksi.
4.	Penggunaan PIN m-DepositoSyariah, OTP, Kode Akses, dan/atau Kode Transaksi pada m-DepositoSyariah mempunyai kekuatan hukum yang sama dengan perintah tertulis yang ditandatangani oleh Nasabah.
5.	Nasabah setiap saat dapat mengubah PIN m-DepositoSyariah dan Kode Akses.
6.	Apabila SIM Card Operator Seluler atau handphone milik Nasabah kedaluwarsa/hilang/dicuri/dipindahtangankan kepada pihak lain, Nasabah harus memberitahukan hal tersebut kepada kantor cabang HIK terdekat atau Halo HIK untuk dilakukan pemblokiran/penutupan m-DepositoSyariah. Segala instruksi transaksi berdasarkan penggunaan nomor handphone, PIN m-DepositoSyariah, OTP, Kode Akses, dan/atau Kode Transaksi yang terjadi sebelum pejabat yang berwenang dari HIK menerima pemberitahuan tersebut dari Nasabah menjadi tanggung jawab Nasabah sepenuhnya.
7.	Nasabah wajib memastikan bahwa telepon seluler/handphone yang digunakan untuk bertransaksi menggunakan m-DepositoSyariah bebas dari virus, malware, dan/atau hal lainnya yang dapat merugikan Nasabah.
8.	Kode Akses dan PIN m-DepositoSyariah yang digunakan untuk bertransaksi dengan menggunakan m-DepositoSyariah yang digunakan pada HIK mobile."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="E.	PEMBLOKIRAN m-DepositoSyariah, HIK mobile (MENU m-DepositoSyariah) DAN KODE TRANSAKSI"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="
1.m-DepositoSyariah akan diblokir jika:
•	Nasabah salah memasukkan PIN m-DepositoSyariah atau OTP sebanyak 3 (tiga) kali berturut-turut;
•	Nasabah mengajukan permohonan pemblokiran m-DepositoSyariah karena SIM Card Operator Seluler hilang/dicuri
2.	HIK berhak memblokir m-DepositoSyariah Nasabah apabila:
•	Nasabah tidak melakukan transaksi apa pun (finansial maupun non-finansial) melalui m-DepositoSyariah selama 3 (tiga) bulan berturut-turut sejak tanggal transaksi terakhir;
•	Berdasarkan data yang diberikan oleh Operator Seluler kepada HIK, nomor handphone yang digunakan Nasabah untuk melakukan registrasi m-DepositoSyariah terindikasi sudah tidak digunakan lagi oleh Nasabah (recycled); atau
•	Berdasarkan penilaian/analisis HIK, Nasabah melakukan transaksi (finansial maupun non finansial) di luar batas penggunaan yang wajar.
3.	Kesalahan memasukkan Kode Akses sebanyak tiga kali berturut-turut atau penggantian SIM Card yang terpasang pada handphone dengan SIM Card lain dapat mengakibatkan menu m-DepositoSyariah pada HIK mobile tidak dapat diakses oleh Nasabah.
4.	Dalam hal m-DepositoSyariah terblokir atau Nasabah salah memasukkan Kode Transaksi sebanyak 3 (tiga) kali berturut-turut saat bertransaksi di ATM HIK atau di kantor cabang HIK, maka seluruh Kode Transaksi yang aktif, baik yang dihasilkan oleh m-DepositoSyariah pada HIK mobile atau kode transaksi yang dihasilkan oleh layanan produk perbankan HIK lainnya, tidak dapat digunakan oleh Nasabah.
5.	Nasabah dilarang untuk mengopi HIK mobile pada handphone lainnya. Hasil kopian HIK mobile tersebut tidak dapat digunakan oleh Nasabah.
6.	Nasabah harus meng-install ulang HIK mobile pada handphone apabila menu m-DepositoSyariah pada HIK mobile terblokir.
7.	Pemblokiran menu m-DepositoSyariah pada HIK mobile tidak berdampak pada layanan m-DepositoSyariah yang tersedia di SIM Card sehingga Nasabah tetap dapat melakukan transaksi dengan menggunakan menu m-DepositoSyariah yang sudah tersedia di SIM Card.
8.	Apabila terjadi pemblokiran m-DepositoSyariah Nasabah harus menghubungi HIK dan melakukan registrasi ulang m-DepositoSyariah di ATM HIK, mesin EDC HIK atau konter kantor cabang HIK."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="F. FORCE MAJEURE"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="Dalam hal HIK tidak dapat melaksanakan instruksi dari Nasabah, baik sebagian maupun seluruhnya karena kejadian-kejadian atau hal-hal di luar kekuasaan atau kemampuan HIK, termasuk namun tidak terbatas pada bencana alam, perang, huru-hara, peralatan/sistem/transmisi dalam keadaan tidak berfungsi, terjadinya gangguan listrik, gangguan telekomunikasi, adanya kebijakan pemerintah yang melarang HIK memberikan layanan m-DepositoSyariah, serta kejadian-kejadian atau hal-hal lain di luar kekuasaan atau kemampuan HIK, maka Nasabah dengan ini membebaskan HIK dari segala macam tuntutan dalam bentuk apa pun terkait dengan hal tersebut."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="G.	PENGAKHIRAN m-DepositoSyariah"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="
1.	m-DepositoSyariah akan berakhir jika:
a.	Nasabah mengajukan permohonan pengakhiran m-DepositoSyariah kepada HIK, dikarenakan antara lain:
•	Nasabah mengakhiri penggunaan m-DepositoSyariah; atau
•	Nasabah mengganti nomor handphone
b.	Nasabah menutup semua rekening yang terhubung dengan Kartu ATM HIK.
2.	HIK berhak mengakhiri pemberian m-DepositoSyariah kepada Nasabah antara lain apabila:
a.	Nasabah menggunakan m-DepositoSyariah atau mengizinkan m-DepositoSyariah dimanfaatkan oleh pihak lain untuk melakukan suatu tindakan yang melanggar hukum;
b.	Berdasarkan data yang diberikan oleh Operator Seluler kepada HIK, nomor handphone yang digunakan Nasabah untuk melakukan registrasi m-DepositoSyariah sudah tidak digunakan lagi oleh Nasabah (recycled);
c.	Berdasarkan penilaian HIK Nasabah menggunakan m-DepositoSyariah di luar batas penggunaan yang wajar;
d.	Nasabah tidak melakukan transaksi apa pun (finansial maupun non-finansial) melalui m-DepositoSyariah selama 5 (lima) tahun berturut-turut sejak tanggal transaksi terakhir; atau
e.	Jumlah nomor handphone yang digunakan Nasabah untuk melakukan registrasi m-DepositoSyariah melebihi jumlah nomor handphone yang ditentukan oleh HIK.
"
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="H.	LAIN-LAIN"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="
1.	Bukti transaksi yang dilakukan oleh Nasabah melalui m-DepositoSyariah adalah mutasi yang tercatat pada Bilyet (jika dicetak).
2.	Setiap keluhan terkait m-DepositoSyariah harus disampaikan oleh Nasabah kepada HIK dalam waktu selambat-lambatnya 3 (tiga) bulan sejak tanggal transaksi melalui m-DepositoSyariah dilakukan.
3.	Nasabah wajib segera melaporkan kepada HIK secara tertulis apabila terjadi perubahan data Nasabah.
4.	Nasabah dapat menghubungi Halo HIK atau kantor cabang HIK atas setiap permasalahan yang berkenaan dengan transaksi, pemblokiran, dan/atau penutupan m-DepositoSyariah.
5.	Nasabah harus menghubungi Operator Seluler yang bersangkutan untuk penanganan masalah yang berkaitan dengan SIM Card, jaringan Operator Seluler, jaringan internet pada handphone, tagihan penggunaan dari Operator Seluler, biaya SMS, dan value added service Operator Seluler.
6.	Nasabah dengan ini membebaskan HIK dari segala klaim, gugatan, tuntutan, dan/atau tindakan hukum lainnya dalam bentuk apa pun dan dari pihak manapun termasuk dari Nasabah sehubungan dengan pemblokiran m-DepositoSyariah atau pengakhiran pemberian m-DepositoSyariah kepada Nasabah berdasarkan data nomor handphone yang sudah tidak digunakan lagi oleh Nasabah (recycled) yang HIK terima dari Operator Seluler sebagaimana dimaksud dalam butir E.2.b dan butir G.2.b Ketentuan m-DepositoSyariah (Mobile Banking) PT Bank Harta Insan Karimah ini.
7.	HIK dapat mengubah Ketentuan m-DepositoSyariah (Mobile Banking) PT Bank Harta Insan Karimah ini yang akan diberitahukan oleh HIK kepada Nasabah dalam bentuk dan melalui sarana apa pun sesuai dengan ketentuan hukum yang berlaku.
8.	Nasabah dengan ini menyatakan tunduk pada Ketentuan m-DepositoSyariah (Mobile Banking) PT Bank Harta Insan Karimah serta seluruh ketentuan yang berlaku di HIK yang mengatur mengenai jasa, fasilitas, dan transaksi yang dapat dilakukan dengan menggunakan m-DepositoSyariah yang akan diberitahukan oleh HIK kepada Nasabah dalam bentuk dan melalui sarana apa pun sesuai dengan ketentuan hukum yang berlaku.
            "
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="I.	PENYELESAIAN PERSELISIHAN"
            titleClassName="text-left font-inter-semibold mt-5"
          />
          <Gap width={10} />
          <DefaultText
            title="
1.	Nasabah setuju bahwa setiap perselisihan atau perbedaan pendapat yang timbul dari dan/atau berkenaan dengan pelaksanaan Ketentuan m-DepositoSyariah (Mobile Banking) PT Bank Harta Insan Karimah ini antara Nasabah dengan HIK akan diselesaikan dengan cara musyawarah.
2.	Setiap perselisihan atau perbedaan pendapat yang tidak dapat diselesaikan secara musyawarah oleh Nasabah dengan HIK, akan diselesaikan melalui fasilitasi perbankan di Bank Indonesia atau Otoritas Jasa Keuangan atau mediasi yang dilakukan melalui Lembaga Alternatif Penyelesaian Sengketa yang tercantum dalam Daftar Lembaga Alternatif Penyelesaian Sengketa yang ditetapkan oleh Otoritas Jasa Keuangan.
3.	Setiap perselisihan atau perbedaan pendapat yang tidak dapat diselesaikan baik secara musyawarah, fasilitasi perbankan, dan/atau mediasi sebagaimana dimaksud dalam butir 2 di atas, akan diselesaikan melalui Pengadilan Negeri Jakarta Pusat, dengan tidak mengurangi hak HIK untuk mengajukan gugatan atau tuntutan melalui Pengadilan Negeri lainnya dalam wilayah Republik Indonesia.
"
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <DefaultText
            title="Ketentuan m-DepositoSyariah (Mobile Banking) PT Bank Harta Insan Karimah ini telah disesuaikan dengan ketentuan peraturan perundang-undangan termasuk ketentuan Peraturan Otoritas Jasa Keuangan."
            titleClassName="text-left text-justify"
          />
          <Gap width={10} />
          <View className="pb-10 mt-10">
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setAgree(!agree)}
                activeOpacity={0.7}
                className="w-[20] h-[20] border-[1px] border-black justify-center items-center rounded-sm">
                {agree && <Icon name="check" size={18} color={colors.black} />}
              </TouchableOpacity>
              <Gap width={10} />
              <DefaultText
                title="Saya setuju dengan syarat dan ketentuan yang berlaku"
                titleClassName="flex-1"
              />
            </View>
            <Gap height={20} />
            <Button
              title="LANJUT"
              className="bg-primary mx-10"
              titleClassName="text-white"
              onPress={onLanjut}
            />
          </View>
        </ScrollView>
      </View>
    </DefaultView>
  );
}
