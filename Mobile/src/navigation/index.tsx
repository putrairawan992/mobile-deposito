import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';

import { RootStackParamList } from './interface';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import OTP from '../screens/OTP';
import SplashLogin from '../screens/SplashLogin';
import AhliWaris from '../screens/AhliWaris';
import AhliWarisEdit from '../screens/AhliWarisEdit';
import AjukanDeposito from '../screens/AjukanDeposito';
import Beranda from '../screens/Beranda';
import Chat from '../screens/Chat';
import ChatRegistrasi from '../screens/ChatRegistrasi';
import ChatTransaksi from '../screens/ChatTransaksi';
import DetailPribadi from '../screens/DetailPribadi';
import DetailPribadiEdit from '../screens/DetailPribadiEdit';
import Fanpage from '../screens/Fanpage';
import FAQ from '../screens/FAQ';
import GantiEmail from '../screens/GantiEmail';
import GantiKataSandi from '../screens/GantiKataSandi';
import GantiPIN from '../screens/GantiPIN';
import KeamananAkun from '../screens/KeamananAkun';
import Notifikasi from '../screens/Notifikasi';
import PIN from '../screens/PIN';
import Portofolio from '../screens/Portofolio';
import PortofolioDetail from '../screens/PortofolioDetail';
import Produk from '../screens/Produk';
import ProdukDetail from '../screens/ProdukDetail';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import RekeningSaya from '../screens/RekeningSaya';
import RekeningSayaDetail from '../screens/RekeningSayaDetail';
import RekeningSayaTambah from '../screens/RekeningSayaTambah';
import SemuaBlog from '../screens/SemuaBlog';
import SyaratKetentuan from '../screens/SyaratKetentuan';
import SemuaPromo from '../screens/SemuaPromo';
import BottomNavigator from '../components/BottomNavigator';
import BuatPassword from '../screens/BuatPassword';
import Password from '../screens/Password';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../store';
import { getUserProfile } from '../services/user';
import { getItem } from '../utils/storage';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => BottomNavigator({ ...props })}>
      <Tab.Screen component={Beranda} name="Beranda" />
      <Tab.Screen component={Produk} name="Produk" />
      <Tab.Screen component={Portofolio} name="Portofolio" />
      <Tab.Screen component={Profile} name="Profile" />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  const {  detailNasabah, detailNasabahDetailLoading } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<RootDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);


  useEffect(
    useCallback(() => {
      const useToken = async () => {
        if (await getItem("token-expired") &&  detailNasabah?.idUserNasabah) {
          setIsLoading(false);
          setIsShowContent(false);
        } else {
          setIsShowContent(true)
          setIsLoading(false);
        }
      }
      setTimeout(()=>{
        if (!detailNasabahDetailLoading) {
          useToken();
        }
      }, 3333 )
    }, [detailNasabah, detailNasabahDetailLoading, isShowContent]),
  );

  return (
    isLoading ? 
    <ActivityIndicator 
      style={{ position: 'absolute', top: 150, left: 0, right: 0 }}
      size={'large'} /> :
      <Stack.Navigator
        initialRouteName={!isShowContent  ?  "Splash" : "MyTabs" }
        screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
        <Stack.Screen component={Splash} name="Splash" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={OTP} name="OTP" />
        <Stack.Screen component={Register} name="Register" />
        <Stack.Screen component={MyTabs} name="MyTabs" />
        <Stack.Screen component={AhliWaris} name="AhliWaris" />
        <Stack.Screen component={AhliWarisEdit} name="AhliWarisEdit" />
        <Stack.Screen component={AjukanDeposito} name="AjukanDeposito" />
        <Stack.Screen component={Chat} name="Chat" />
        <Stack.Screen component={ChatRegistrasi} name="ChatRegistrasi" />
        <Stack.Screen component={ChatTransaksi} name="ChatTransaksi" />
        <Stack.Screen component={DetailPribadi} name="DetailPribadi" />
        <Stack.Screen component={DetailPribadiEdit} name="DetailPribadiEdit" />
        <Stack.Screen component={Fanpage} name="Fanpage" />
        <Stack.Screen component={FAQ} name="FAQ" />
        <Stack.Screen component={GantiPIN} name="GantiPIN" />
        <Stack.Screen component={GantiEmail} name="GantiEmail" />
        <Stack.Screen component={GantiKataSandi} name="GantiKataSandi" />
        <Stack.Screen component={Notifikasi} name="Notifikasi" />
        <Stack.Screen component={PIN} name="PIN" />
        <Stack.Screen component={PortofolioDetail} name="PortofolioDetail" />
        <Stack.Screen component={ProdukDetail} name="ProdukDetail" />

        <Stack.Screen component={RekeningSaya} name="RekeningSaya" />
        <Stack.Screen component={KeamananAkun} name="KeamananAkun" />
        <Stack.Screen component={RekeningSayaDetail} name="RekeningSayaDetail" />
        <Stack.Screen component={RekeningSayaTambah} name="RekeningSayaTambah" />
        <Stack.Screen component={SemuaBlog} name="SemuaBlog" />
        <Stack.Screen component={SemuaPromo} name="SemuaPromo" />
        <Stack.Screen component={SplashLogin} name="SplashLogin" />
        <Stack.Screen component={SyaratKetentuan} name="SyaratKetentuan" />
        <Stack.Screen component={BuatPassword} name="BuatPassword" />
        <Stack.Screen component={Password} name="Password" />
      </Stack.Navigator>
  );
}

export default function Router() {
  return <StackNavigator />;
}