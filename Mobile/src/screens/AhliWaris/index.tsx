import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import {navigationRef} from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah } from '../../services/user';

export default function AhliWaris() {
  const {detailNasabah} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(()=>{
    dispatch(getDetailNasabah())
  },[dispatch])

  return (
    <DefaultView>
      <DefaultHeader title="Ahli Waris" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row items-center">
            <DefaultText title="Nama Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title={detailNasabah?.nama_ahli_waris} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="No KTP Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title={detailNasabah?.ktp_ahli_waris}/>
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText
              title="No. Telepon Ahli Waris"
              titleClassName="flex-1"
            />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title={detailNasabah?.phone_ahli_waris} />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={() => navigationRef.navigate('AhliWarisEdit',{detailNasabah})}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-md self-center">
          <DefaultText title="Edit" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
    </DefaultView>
  );
}
