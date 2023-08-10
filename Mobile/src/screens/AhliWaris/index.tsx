import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import {navigationRef} from '../../navigation/RootNavigation';

export default function AhliWaris() {
  return (
    <DefaultView>
      <DefaultHeader title="Ahli Waris" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row items-center">
            <DefaultText title="Nama Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="Wahyu" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="No KTP Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="324578627573287" />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText
              title="No. Telepon Ahli Waris"
              titleClassName="flex-1"
            />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <DefaultText title="089694624299" />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={() => navigationRef.navigate('AhliWarisEdit')}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-md self-center">
          <DefaultText title="Edit" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
    </DefaultView>
  );
}
