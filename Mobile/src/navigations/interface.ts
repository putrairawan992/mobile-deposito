import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: {
    phone: string;
  };
  AhliWaris: undefined;
  AhliWarisEdit: undefined;
  AjukanDeposito: undefined;
  Beranda: undefined;
  Chat: undefined;
  ChatRegistrasi: undefined;
  ChatTransaksi: undefined;
  DetailPribadi: undefined;
  DetailPribadiEdit: undefined;
  Fanpage: undefined;
  GantiEmail: undefined;
  GantiKataSandi: undefined;
  GantiPIN: undefined;
  KeamananAkun: undefined;
  Notifikasi: undefined;
  PIN: undefined;
  Portofolio: undefined;
  PortofolioDetail: undefined;
  Produk: undefined;
  ProdukDetail: undefined;
  Profile: undefined;
  Register: undefined;
  RekeningSaya: undefined;
  RekeningSayaDetail: undefined;
  RekeningSayaTambah: undefined;
  SemuaBlog: undefined;
  SemuaPromo: undefined;
  SplashLogin: undefined;
  SyaratKetentuan: undefined;
  FAQ: undefined;
  MyTabs: undefined;
  BuatPassword: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
