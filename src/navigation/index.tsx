import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
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
import ListChatProduct from '../screens/Chat/ListChatProduct';
import BlogDetail from '../screens/BlogDetail';
import ChangePhoneNumber from '../screens/ChangePhoneNumber';
import Animated, { FadeInLeft, FadeInRight, Layout } from 'react-native-reanimated';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <Animated.View
        entering={FadeInLeft}
        exiting={FadeInRight}
      >
        {BottomNavigator({ ...props })}
      </Animated.View>}>
      <Tab.Screen  options={{
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }} component={Beranda} name="Beranda" />
      <Tab.Screen component={Produk} name="Produk" />
      <Tab.Screen component={Portofolio} name="Portofolio" />
      <Tab.Screen component={Profile} name="Profil" />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={"Splash"}
      screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={OTP} name="OTP" />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={BlogDetail} name="BlogDetail" />
      <Stack.Screen component={MyTabs} name="MyTabs" />
      <Stack.Screen component={AhliWaris} name="AhliWaris" />
      <Stack.Screen component={Splash} name="Splash" />
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
      <Stack.Screen component={ChangePhoneNumber} name="ChangePhoneNumber" />
      <Stack.Screen component={GantiKataSandi} name="GantiKataSandi" />
      <Stack.Screen component={Notifikasi} name="Notifikasi" />
      <Stack.Screen component={PIN} name="PIN" />
      <Stack.Screen component={PortofolioDetail} name="PortofolioDetail" />
      <Stack.Screen component={ProdukDetail} name="ProdukDetail" />
      <Stack.Screen component={ListChatProduct} name="ListChatProduct" />
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