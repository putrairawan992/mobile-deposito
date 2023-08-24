import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {navigationRef} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import { getDetailNasabah } from '../../services/user';
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function KeamananAkun() {
  const {detailNasabah} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();
  useEffect(()=>{
    dispatch(getDetailNasabah())
  },[dispatch])
  
  return (
    <DefaultView>
      <DefaultHeader title="Keamanan Akun" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.7}
            className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Nama"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <DefaultText
                title={detailNasabah?.nama}
                titleClassName="font-inter-bold"
              />
            </View>
          </TouchableOpacity>
          <Gap height={15} />
          <TouchableOpacity
            onPress={() => navigationRef.navigate('GantiEmail')}
            activeOpacity={0.7}
            className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Email"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <DefaultText
                title={detailNasabah?.email}
                titleClassName="font-inter-bold"
              />
            </View>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
          <Gap height={15} />
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.7}
            className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="No. Telepon"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <DefaultText
                title="089694624299"
                titleClassName="font-inter-bold"
              />
            </View>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
          <Gap height={15} />
          <TouchableOpacity
            onPress={() => navigationRef.navigate('GantiKataSandi')}
            activeOpacity={0.7}
            className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Kata Sandi"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <DefaultText
                title="**********"
                titleClassName="font-inter-bold"
              />
            </View>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
          <Gap height={15} />
          <TouchableOpacity
            onPress={() => navigationRef.navigate('GantiPIN')}
            activeOpacity={0.7}
            className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="PIN"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <DefaultText
                title="**********"
                titleClassName="font-inter-bold"
              />
            </View>
            <Icon name="chevron-right" size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DefaultView>
  );
}
