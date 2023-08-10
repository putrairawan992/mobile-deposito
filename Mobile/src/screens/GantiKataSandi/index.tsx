import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {navigationRef} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import ModalAlert from '../../components/ModalAlert';
import {showToast} from '../../utils/toast';

export default function GantiKataSandi() {
  const [showPasswordSekarang, setShowPasswordSekarang] =
    useState<boolean>(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  const [passwordSekarang, setPasswordSekarang] = useState<string>('');
  const [passwordBaru, setPasswordBaru] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [pin, setPin] = useState<string>('');

  const onSave = () => {
    if (
      passwordSekarang.trim().length === 0 ||
      passwordBaru.trim().length === 0 ||
      passwordConfirm.trim().length === 0
    ) {
      return showToast('Data belum lengkap');
    }

    if (passwordBaru !== passwordConfirm) {
      return showToast('Password tidak cocok');
    }

    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN anda');
    }

    setShowModalSuccess(true);
  };

  return (
    <DefaultView>
      <DefaultHeader title="Ganti Kata  Sandi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Kata sandi sekarang"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Kata sandi sekarang"
                value={passwordSekarang}
                onChangeText={value => setPasswordSekarang(value)}
                secureTextEntry={!showPasswordSekarang}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPasswordSekarang(!showPasswordSekarang)}>
              <Icon name={showPasswordSekarang ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Kata sandi baru"
                value={passwordBaru}
                onChangeText={value => setPasswordBaru(value)}
                secureTextEntry={!showPasswordBaru}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPasswordBaru(!showPasswordBaru)}>
              <Icon name={showPasswordBaru ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Konfirmasi kata sandi baru"
                value={passwordConfirm}
                onChangeText={value => setPasswordConfirm(value)}
                secureTextEntry={!showPasswordConfirm}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}>
              <Icon name={showPasswordConfirm ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
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
        title={'Selamat, proses pergantian kata sandi\nAnda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigationRef.goBack();
        }}
      />
    </DefaultView>
  );
}
