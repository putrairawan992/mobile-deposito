import {View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {colors} from '../../utils/colors';
import Button from '../../components/Button';
import Gap from '../../components/Gap';
import {navigationRef} from '../../navigation/RootNavigation';

export default function Chat() {
  return (
    <DefaultView
      statusBarColor={colors.primaryLight}
      containerClassName="bg-primary-light">
      <DefaultHeader title="Chat" />
      <View className="bg-white flex-1 mx-10 my-8 rounded-lg">
        <DefaultText
          title="Chat with us"
          titleClassName="text-base font-inter-semibold mx-5 my-3"
        />
        <Button
          title="Bantuan Registrasi"
          className="bg-primary rounded-lg"
          titleClassName="text-white font-inter-regular text-base"
          onPress={() => navigationRef.navigate('ChatRegistrasi')}
        />
        <Gap height={5} />
        <Button
          title="Bantuan Transaksi"
          className="bg-primary rounded-lg"
          titleClassName="text-white font-inter-regular text-base"
          onPress={() => navigationRef.navigate('ChatTransaksi')}
        />
      </View>
    </DefaultView>
  );
}
