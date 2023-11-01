import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: {
    emailOrPhone: string;
  };
  Password: {
    emailOrPhone: string;
  };
  AhliWaris: undefined;
  AhliWarisEdit?: {
    detailNasabah?: undefined;
  };
  AjukanDeposito?: {
    showProductDetail?: undefined;
  };
  Beranda?: { fromUrl?: undefined };
  Chat: undefined;
  ChatRegistrasi: {id?: undefined};
  ChatTransaksi: undefined;
  DetailPribadi: undefined;
  ListChatProduct: undefined;
  DetailPribadiEdit?: {
    detailNasabah?: undefined;
  }
  Fanpage: undefined;
  GantiEmail: undefined;
  GantiKataSandi: undefined;
  GantiPIN: undefined;
  KeamananAkun?: undefined;
  Notifikasi: undefined;
  PIN: undefined;
  Portofolio: undefined;
  PortofolioDetail?: { no_transaksi: undefined };
  Produk: undefined;
  ProdukDetail?: {
    noProduct?: undefined
  };
  Profile: undefined;
  Register: undefined;
  RekeningSaya: undefined;
  RekeningSayaDetail?: {id?:undefined};
  RekeningSayaTambah: undefined;
  SemuaBlog: undefined;
  SemuaPromo: undefined;
  SplashLogin: undefined;
  SyaratKetentuan: undefined;
  FAQ: undefined;
  MyTabs: undefined;
  BuatPassword?: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
