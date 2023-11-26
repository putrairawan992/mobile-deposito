import { ActivityIndicator, AppState, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { checkLogin, getDetailNasabah, logout } from '../../services/user';
import { addStorage, getExitTime, getStorage, saveExitTime } from '../../utils/storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ModalAlert from '../../components/ModalAlert';

export default function Profile() {
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();
  const { checkLoginLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [isShowAlertAuth, setIsShowAlertAuth] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDetailNasabah());
  }, [useIsFocused]);

  function maskEmail(email: string) {
    let skipFirstChars = 3;
    let firstThreeChar = email?.slice(0, skipFirstChars);

    let domainIndexStart = email?.lastIndexOf("@");
    let maskedEmail = email?.slice(skipFirstChars, domainIndexStart)
    maskedEmail = maskedEmail?.replace(/./g, '*')
    let domain = email?.slice(domainIndexStart, email?.length);

    return firstThreeChar.concat(maskedEmail).concat(domain);
  }

  function maskPhoneNumber(phoneNumber: string) {
    const maskedNumber = phoneNumber?.substring(0, 4);
    return maskedNumber + '****' + phoneNumber?.substring(8, 20);
  }


  const useNasabah = useCallback(async () => {
    const exitTime = await getExitTime();
    const currentTime = new Date().getTime();
    if (exitTime && await getStorage("phone-email")) {
      const elapsedTime = (currentTime - exitTime) / 1000;
      if (elapsedTime > 30) {
       setIsShowAlertAuth(true);
      }
    }
  }, [useIsFocused]);

  useFocusEffect(useCallback(() => {
    useNasabah();
  }, [useIsFocused]));



  const handleExit = async () => {
    await saveExitTime();
  };


  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'background') {
        await handleExit();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [useIsFocused]);




  return (checkLoginLoading ? <ActivityIndicator size="large" style={{ position: 'absolute', top: 150, left: 0, right: 0 }} /> :
    <DefaultView>
      <DefaultHeader
        title="Profil"
        titleClassName="text-black"
        iconColor={colors.black}
      />
      <View className="pb-3 ml-4 flex-row items-center">
        {/* <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
            }}
            resizeMode="cover"
            className="bg-neutral-300 w-[80] h-[80] rounded-full"
          /> */}
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText
            title={detailNasabah?.nama}
            titleClassName="text-lg font-inter-bold"
          />
          <Gap height={5} />
          <DefaultText
            title={detailNasabah?.email && maskEmail(detailNasabah?.email)}
          />
          <Gap height={5} />
          <DefaultText title={detailNasabah?.phone && maskPhoneNumber(detailNasabah?.phone)} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-neutral-300  px-3 py-1">
          <DefaultText title="Akun Saya" titleClassName="ml-4 font-inter-bold" />
        </View>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('KeamananAkun')}
          activeOpacity={0.7}
          className="px-3 flex-row items-center">
          <DefaultText
            title="Keamanan Akun"
            titleClassName="font-inter-bold ml-4 flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <View className="w-full h-[1] bg-neutral-300 my-3" />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('DetailPribadi')}
          activeOpacity={0.7}
          className="px-3 ml-4  flex-row items-center">
          <DefaultText
            title="Detail Pribadi"
            titleClassName="font-inter-bold flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <View className="w-full h-[1] bg-neutral-300 my-3" />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('AhliWaris')}
          activeOpacity={0.7}
          className="px-3 flex-row items-center">
          <DefaultText
            title="Info Ahli Waris"
            titleClassName="font-inter-bold ml-4  flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <View className="w-full h-[1] bg-neutral-300 my-3" />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('RekeningSaya', { isUserBank: false })}
          activeOpacity={0.7}
          className="px-3 flex-row items-center">
          <DefaultText
            title="Rekening Saya"
            titleClassName="font-inter-bold ml-4 flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={10} />
        <View className="bg-neutral-300 px-3 py-1">
          <DefaultText
            title="Bantuan & Saran"
            titleClassName="font-inter-bold ml-4"
          />
        </View>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('FAQ')}
          activeOpacity={0.7}
          className="px-3 flex-row ml-4 items-center">
          <DefaultText title="FAQ" titleClassName="font-inter-bold flex-1" />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <View className="w-full h-[1] bg-neutral-300 my-3" />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('Fanpage')}
          activeOpacity={0.7}
          className="px-3 flex-row items-center">
          <DefaultText
            title="Ikuti fanpage kami"
            titleClassName="font-inter-bold ml-4 flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <View className="w-full h-[1] bg-neutral-300 my-3" />
        <TouchableOpacity
          onPress={() => Linking.openURL('https://play.google.com/store/apps')}
          activeOpacity={0.7}
          className=" ml-4
          px-3 flex-row 
          items-center">
          <DefaultText
            title="Nilai Kami"
            titleClassName="font-inter-bold flex-1"
          />
          <DefaultText title="versi 0.1" titleClassName="text-xs mr-2" />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <View className="w-full h-[1] bg-neutral-300 my-3" />
        <Gap height={30} />
        <TouchableOpacity
          activeOpacity={0.7}
          className="self-center bg-primary py-2 px-4 rounded-full"
          onPress={() => dispatch(logout())}>
          <DefaultText
            title="Keluar Akun"
            titleClassName="font-inter-medium text-white"
          />
        </TouchableOpacity>
        <Gap height={30} />
      </ScrollView>
      <ModalAlert
        type='warning'
        buttonOne={false}
        show={isShowAlertAuth}
        hide={async () => {
          setIsShowAlertAuth(false);
          addStorage("detected-exitTime", "okeTrue");
          dispatch(checkLogin(await getStorage("phone-email")))
        }}
        title={'Sesi Anda telah berakhir, silahkan login kembali'}
        onConfirm={async () => {
          setIsShowAlertAuth(false);
          addStorage("detected-exitTime", "okeTrue");
          dispatch(checkLogin(await getStorage("phone-email")))
        }}
      />
    </DefaultView>
  );
}
