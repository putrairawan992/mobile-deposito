import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  MyTabs: undefined;
  AlamatSaya: undefined;
  CheckoutDetail: undefined;
  MetodePembayaran: undefined;
  PembayaranBerhasil: undefined;
  PengaturanProfile: undefined;
  PesananDetail: undefined;
  PesananSaya: undefined;
  ProductDetail: undefined;
  TambahAlamat: undefined;
  UbahAlamat: undefined;
  UlasanProduk: undefined;
  VerifikasiOTP: {
    type: 'phone' | 'rekening';
  };
  PesananSayaDetail: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  DataPenjualan: undefined;
  ListOrderan: undefined;
  ProdukSaya: undefined;
  TambahProduk: undefined;
  EditProduk: {
    type: 'edit' | 'upload ulang';
  };
  ProductDetailPengecekan: {
    type: 'Tidak Lolos Pengecekan' | 'Pemberhentian Produk';
  };
  PengaturanToko: undefined;
  UbahAlamatToko: undefined;
  TambahRekeningToko: undefined;
  DetailOrderan: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
