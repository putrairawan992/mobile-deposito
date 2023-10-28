import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import { navigationRef } from '../../navigation/RootNavigation';
import { showToast } from '../../utils/toast';
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailNasabah } from '../../services/user';
import { getSkDashboard } from '../../services/dasbhoard';
import { addStorage } from '../../utils/storage';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function SyaratKetentuan() {
  const [agree, setAgree] = useState<boolean>(false);
  const { detailNasabah } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<RootDispatch>();
  const [dtNasabah, setDtNasabah] = useState<any>();
  const { showSkDashboard, showSkDashboardLoading } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );

  useEffect(() => {
    dispatch(getDetailNasabah());
    dispatch(getSkDashboard())
  }, [dispatch]);
console.log(detailNasabah?.idUserNasabah);

  useEffect(() => {
    setDtNasabah(detailNasabah);
  }, [detailNasabah])

  const onLanjut = () => {
    if (!agree) {
      return showToast('Centang syarat dan ketentuan.');
    }
    addStorage('skIsTrue', 'oke');
    navigationRef.navigate((dtNasabah?.idUserNasabah == "" || dtNasabah?.idUserNasabah == null) ? 'Register' : 'MyTabs');
  };

  const { width } = useWindowDimensions();
  const regex = /(<([^>]+)>)/;
  const source = {
    html: showSkDashboard?.data[0]?.syarat?.replace(regex, '')
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

          {showSkDashboardLoading ?
            <ActivityIndicator size={"large"} style={{ position: 'absolute', top: 22, left: 0, right: 0, zIndex: 10 }} /> :
            <ScrollView style={{ flex: 1 }}>
              <View>
                <RenderHTML contentWidth={width} source={source} />
              </View>
            </ScrollView>
          }
        </ScrollView>

        <View className="mt-10">
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
      </View>
    </DefaultView>
  );
}
