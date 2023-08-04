import {Image, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import {images} from '../../utils/images';
import DefaultText from '../../components/DefaultText';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {navigationRef} from '../../navigations/RootNavigation';
import {showToast} from '../../utils/toast';

export default function Login() {
  const [phone, setPhone] = useState<string>('');

  const onLogin = () => {
    if (phone.trim().length === 0) {
      return showToast('Masukkan Nomor HP');
    }
    navigationRef.navigate('OTP', {
      phone,
    });
  };

  return (
    <DefaultView>
      <ScrollView>
        <View className="px-5 py-3">
          <Image
            className="w-[200] h-[100] self-center"
            source={images.logo}
            resizeMode="contain"
          />
          <Gap height={15} />
          <DefaultText title="Masuk" titleClassName="font-inter-bold text-xl" />
          <Gap height={10} />
          <DefaultText
            title="Silahkan Masukan Nomor HP Anda"
            titleClassName=""
          />
          <Gap height={10} />
          <Input
            title="Nomor HP"
            value={phone}
            onChangeText={value => setPhone(value)}
            textInputProps={{
              keyboardType: 'phone-pad',
            }}
          />
        </View>
      </ScrollView>
      <View className="px-10 py-5">
        <Button
          title="LANJUT"
          className="bg-primary"
          titleClassName="text-white"
          onPress={onLogin}
        />
      </View>
    </DefaultView>
  );
}
