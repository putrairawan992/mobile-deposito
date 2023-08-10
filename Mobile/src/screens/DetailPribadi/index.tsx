import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import {navigationRef} from '../../navigation/RootNavigation';

export default function DetailPribadi() {
  return (
    <DefaultView>
      <DefaultHeader title="Detail Pribadi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row items-center">
            <DefaultText title="No KTP" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Tempat Lahir" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Tanggal Lahir" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama Ibu Kandung" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Status Pernikahan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Profesi/Pekerjaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama Perusahaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Alamat Perusahaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Penghasilan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="" />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={() => navigationRef.navigate('DetailPribadiEdit')}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-md self-center">
          <DefaultText title="Edit" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
    </DefaultView>
  );
}
