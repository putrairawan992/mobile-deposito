import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/colors';
import Gap from '../../components/Gap';

export default function Fanpage() {
  return (
    <DefaultView>
      <DefaultHeader title="Ikuti Fanpage Kami" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <TouchableOpacity
            onPress={() => Linking.openURL('https://instagram.com')}
            activeOpacity={0.7}
            className="flex-row items-center bg-green-200 p-3 rounded-md border-[1px] border-green-600">
            <View className="bg-primary rounded-full p-1">
              <Icon name="instagram" size={35} color={colors.white} />
            </View>
            <Gap width={10} />
            <DefaultText title="Instagram" titleClassName="text-base flex-1" />
          </TouchableOpacity>
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://facebook.com')}
            activeOpacity={0.7}
            className="flex-row items-center bg-green-200 p-3 rounded-md border-[1px] border-green-600">
            <View className="bg-primary rounded-full p-1">
              <Icon name="facebook" size={35} color={colors.white} />
            </View>
            <Gap width={10} />
            <DefaultText title="Facebook" titleClassName="text-base flex-1" />
          </TouchableOpacity>
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://twitter.com')}
            activeOpacity={0.7}
            className="flex-row items-center bg-green-200 p-3 rounded-md border-[1px] border-green-600">
            <View className="bg-primary rounded-full p-1">
              <Icon name="twitter" size={35} color={colors.white} />
            </View>
            <Gap width={10} />
            <DefaultText title="Twitter" titleClassName="text-base flex-1" />
          </TouchableOpacity>
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://youtube.com')}
            activeOpacity={0.7}
            className="flex-row items-center bg-green-200 p-3 rounded-md border-[1px] border-green-600">
            <View className="bg-primary rounded-full p-1">
              <Icon name="youtube" size={35} color={colors.white} />
            </View>
            <Gap width={10} />
            <DefaultText title="Youtube" titleClassName="text-base flex-1" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DefaultView>
  );
}
