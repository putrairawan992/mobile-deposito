import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah, logout } from '../../services/user';

export default function Profile() {
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();


  useEffect(() => {
    dispatch(getDetailNasabah());
  }, [dispatch]);

  return (
    <DefaultView>
        <DefaultHeader
          title="Profil"
          titleClassName="text-black"
          iconColor={colors.black}
        />
        <View className="px-5 pb-3 flex-row items-center">
          {/* <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
            }}
            resizeMode="cover"
            className="bg-neutral-300 w-[80] h-[80] rounded-full"
          /> */}
          <Gap width={15} />
          <View className="flex-1">
            <DefaultText
              title={detailNasabah?.nama}
              titleClassName="text-lg font-inter-bold"
            />
            <Gap height={5} />
            <DefaultText
              title={detailNasabah?.email}
            />
            <Gap height={5} />
            <DefaultText title={detailNasabah?.phone} />
          </View>
        </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-neutral-300 px-3 py-1">
          <DefaultText title="Akun Saya" titleClassName="font-inter-bold" />
        </View>
        <Gap height={20} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('KeamananAkun')}
          activeOpacity={0.7}
          className="px-3 py-2 flex-row items-center">
          <DefaultText
            title="Keamanan Akun"
            titleClassName="font-inter-bold flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('DetailPribadi')}
          activeOpacity={0.7}
          className="px-3 py-2 flex-row items-center">
          <DefaultText
            title="Detail Pribadi"
            titleClassName="font-inter-bold flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('AhliWaris')}
          activeOpacity={0.7}
          className="px-3 py-2 flex-row items-center">
          <DefaultText
            title="Info Ahli Waris"
            titleClassName="font-inter-bold flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('RekeningSaya')}
          activeOpacity={0.7}
          className="px-3 py-2 flex-row items-center">
          <DefaultText
            title="Rekening Saya"
            titleClassName="font-inter-bold flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={20} />
        <View className="bg-neutral-300 px-3 py-1">
          <DefaultText
            title="Bantuan & Saran"
            titleClassName="font-inter-bold"
          />
        </View>
        <Gap height={20} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('FAQ')}
          activeOpacity={0.7}
          className="px-3 py-2 flex-row items-center">
          <DefaultText title="FAQ" titleClassName="font-inter-bold flex-1" />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => navigationRef.navigate('Fanpage')}
          activeOpacity={0.7}
          className="px-3 py-2 flex-row items-center">
          <DefaultText
            title="Ikuti fanpage kami"
            titleClassName="font-inter-bold flex-1"
          />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => Linking.openURL('https://play.google.com/store/apps')}
          activeOpacity={0.7}
          className=" 
          px-3 py-2 flex-row 
          items-center">
          <DefaultText
            title="Nilai Kami"
            titleClassName="font-inter-bold flex-1"
          />
          <DefaultText title="versi 0.1" titleClassName="text-xs mr-2" />
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <Gap height={30} />
        <TouchableOpacity
          activeOpacity={0.7}
          className="self-center bg-primary py-2 px-4 rounded-md"
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
