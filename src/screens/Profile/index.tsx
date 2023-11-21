import { AppState, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import {  getDetailNasabah, logout } from '../../services/user';

export default function Profile() {
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();


  useEffect(() => {
    dispatch(getDetailNasabah());
  }, [dispatch]);

  function maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername = username.substring(0, 3) + '*'.repeat(username.length - 3);
    const maskedDomain = domain.substring(0, 2) + '*'.repeat(domain.length - 2);
    return `${maskedUsername}@${maskedDomain}.com`;
  }
  
  function maskPhoneNumber(phoneNumber: string): string {
    const maskedNumber = phoneNumber.substring(0, 2) + '*'.repeat(phoneNumber.length - 6) + phoneNumber.substring(phoneNumber.length - 4);
    return maskedNumber;
  }


  return (
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
            title={maskEmail(detailNasabah?.email)}
          />
          <Gap height={5} />
          <DefaultText title={maskPhoneNumber(detailNasabah?.phone)} />
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
    </DefaultView>
  );
}
