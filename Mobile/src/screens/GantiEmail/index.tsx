import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {navigationRef} from '../../navigations/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import ModalAlert from '../../components/ModalAlert';
import {showToast} from '../../utils/toast';
import {isEmail} from '../../utils/function';

export default function GantiEmail() {
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  const [emailSekarang, setEmailSekarang] = useState<string>(
    'heruahmad123@gmail.com',
  );
  const [emailBaru, setEmailBaru] = useState<string>('');
  const [emailConfirm, setEmailConfirm] = useState<string>('');
  const [pin, setPin] = useState<string>('');

  const onSave = () => {
    if (
      emailSekarang.trim().length === 0 ||
      emailBaru.trim().length === 0 ||
      emailConfirm.trim().length === 0
    ) {
      return showToast('Data belum lengkap');
    }

    if (!isEmail(emailSekarang)) {
      return showToast('Email sekarang tidak valid');
    }

    if (!isEmail(emailBaru)) {
      return showToast('Email baru tidak valid');
    }

    if (!isEmail(emailConfirm)) {
      return showToast('Konfirmasi email baru tidak valid');
    }

    if (emailBaru !== emailConfirm) {
      return showToast('Email tidak cocok');
    }

    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN anda');
    }

    setShowModalSuccess(true);
  };

  return (
    <DefaultView>
      <DefaultHeader title="Ganti Email" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Email sekarang"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Email sekarang"
                value={emailSekarang}
                onChangeText={value => setEmailSekarang(value)}
              />
            </View>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Email baru"
                value={emailBaru}
                onChangeText={value => setEmailBaru(value)}
              />
            </View>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Konfirmasi email baru"
                value={emailConfirm}
                onChangeText={value => setEmailConfirm(value)}
              />
            </View>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Masukkan PIN kamu"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Masukkan PIN kamu"
                value={pin}
                onChangeText={value => setPin(value)}
                secureTextEntry={!showPin}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPin(!showPin)}>
              <Icon name={showPin ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-md self-center">
          <DefaultText title="SIMPAN" titleClassName="text-white" />
        </TouchableOpacity>
      </View>

      <ModalAlert
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        title={'Selamat, proses pergantian email anda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigationRef.goBack();
        }}
      />
    </DefaultView>
  );
}
