import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { navigationRef } from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import ModalAlert from '../../components/ModalAlert';
import { showToast } from '../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getReqOtp, registerPasswordPin } from '../../services/user';
import Toast from 'react-native-toast-message';

export default function GantiPIN() {
  const [showPINSekarang, setShowPINSekarang] = useState<boolean>(false);
  const [showPINBaru, setShowPINBaru] = useState<boolean>(false);
  const [showPINConfirm, setShowPINConfirm] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [PINSekarang, setPINSekarang] = useState<string>('');
  const [PINBaru, setPINBaru] = useState<string>('');
  const [PINConfirm, setPINConfirm] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const dispatch = useDispatch<RootDispatch>();
  const { registerPasswordPinLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );

  useEffect(() => {
    if (timer > 0) {
      const intervalID = setInterval(() => {
        if (timer === 0) {
          clearInterval(intervalID);
        } else {
          setTimer(timer - 1);
        }
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [timer]);

  const onSave = () => {
    if (
      // PINSekarang.trim().length === 0 ||
      PINBaru.trim().length === 0 ||
      PINConfirm.trim().length === 0
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'Data belum lengkap',
      });
    }
    if (PINBaru.length < 6 || PINConfirm.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'PIN 6 angka',
      });
    }
    if (PINBaru !== PINConfirm) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'PIN tidak cocok',
      });
    }
    if (otp.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'Masukkan kode OTP',
      });
    }
    dispatch(registerPasswordPin({ otp: otp, pin: PINConfirm }, 'Profile', false))
  };

  const resendOtp = () => {
    setTimer(60);
    dispatch(getReqOtp());
  }

  return (
    <DefaultView>
      <DefaultHeader title="Ganti PIN" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          {/* <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="PIN sekarang"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="PIN sekarang"
                maxLength={6}
                keyboardType='name-phone-pad'
                value={PINSekarang}
                onChangeText={value => setPINSekarang(value)}
                secureTextEntry={!showPINSekarang}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPINSekarang(!showPINSekarang)}>
              <Icon name={showPINSekarang ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>

          <Gap height={15} /> */}

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Masukkan PIN baru"
                maxLength={6}
                keyboardType='numeric'
                value={PINBaru}
                onChangeText={value => setPINBaru(value)}
                secureTextEntry={!showPINBaru}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPINBaru(!showPINBaru)}>
              <Icon name={showPINBaru ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Konfirmasi PIN baru"
                maxLength={6}
                keyboardType='numeric'
                value={PINConfirm}
                onChangeText={value => setPINConfirm(value)}
                secureTextEntry={!showPINConfirm}
              />
            </View>
            <Gap width={5} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPINConfirm(!showPINConfirm)}>
              <Icon name={showPINConfirm ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>
          <Gap height={15} />
          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Masukkan kode OTP"
                maxLength={6}
                keyboardType='numeric'
                value={otp}
                onChangeText={value => setOtp(value)}
              />
            </View>
            <Gap height={5} />

            {timer > 0 && (
              <DefaultText
                title={`00:${timer}`}
                titleClassName="font-inter-semibold"
              />
            )}


            <Gap height={15} />
            {timer === 0 && <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => resendOtp()}
              className="border-b-[1px] border-b-blue-400 self-start">
              <DefaultText
                title="Kirim OTP"
                titleClassName="text-blue-400"
              />
            </TouchableOpacity>}
          </View>
          <DefaultText titleClassName='ml-2 mt-1 text-gray-600' title='Klik Kirim OTP untuk mendapatkan kode OTP' />

          {/* <Gap height={15} />
          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Passowrd"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Passowrd"
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
          </View> */}

        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        {registerPasswordPinLoading ? <ActivityIndicator size={"large"} /> : <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-full self-center">
          <DefaultText title="SIMPAN" titleClassName="text-white" />
        </TouchableOpacity>}
      </View>



      <ModalAlert
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        title={'Selamat, proses pergantian PIN Anda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigationRef.goBack();
        }}
      />
    </DefaultView>
  );
}
