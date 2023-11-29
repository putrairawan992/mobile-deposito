import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { navigationRef } from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import ModalAlert from '../../components/ModalAlert';
import { showToast } from '../../utils/toast';
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, forgotPasswordPin, getDetailNasabah, getReqOtp, registerPasswordPin } from '../../services/user';
import { validatePassword, validatePasswordSekarang } from '../../utils/function';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { getStorage } from '../../utils/storage';

export default function GantiKataSandi() {
  const [showPasswordBaru, setShowPasswordBaru] = useState<boolean>(false);
  const [showPasswordSekarang, setShowPasswordSekarang] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [isValid, setIsValid] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordBaru, setPasswordBaru] = useState<string>('');
  const [passwordSekarang, setPasswordSekarang] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const dispatch = useDispatch<RootDispatch>();
  const { registerPasswordPinLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (timer === 0) {
        clearInterval(intervalID);
      } else {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, [timer]);

  const resendOtp = () => {
    setTimer(60);
    dispatch(getReqOtp());
  }

  const onSave = () => {
    if (
      passwordBaru.trim().length === 0 ||
      passwordConfirm.trim().length === 0
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'Data belum lengkap',
      });
    }
    if (!isValid) {
      return;
    }
    if (!isValidPassword) {
      return;
    }
    if (passwordBaru !== passwordConfirm) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'Kata Sandi tidak cocok',
      });
    }
    if (otp.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'Masukkan kode OTP',
      });
    }
    dispatch(registerPasswordPin({ password: passwordConfirm, otp: otp }, 'Profile', false))
  };


  return (
    <DefaultView>
      <DefaultHeader title="Ganti Kata Sandi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              {/* <DefaultText
                title="Kata sandi sekarang"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              /> */}
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Kata sandi sekarang"
                value={passwordSekarang}
                onChangeText={async (value) => {
                  setPasswordSekarang(value);
                  setIsValidPassword(await validatePasswordSekarang(value))
                }}
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
          <Gap height={5} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () =>
              dispatch(
                forgotPasswordPin({ username: await getStorage("phone-email") }, await getStorage("phone-email")),
              )
            }
            className="border-b-[1px] ml-2 border-b-blue-400 self-start">
            <DefaultText
              title="Lupa Kata Sandi ?"
              titleClassName="text-blue-400"
            />
          </TouchableOpacity>

          {!isValidPassword && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Kata Sandi lama salah
              </Text>
            </View>
          )}
          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Kata sandi baru"
                maxLength={20}
                value={passwordBaru}
                onChangeText={value => {
                  setPasswordBaru(value);
                  setIsValid(validatePassword(value));
                }}
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
          {!isValid && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Kata Sandi harus terdiri dari minimal 8 karakter, memiliki minimal 1 huruf kecil,
                1 huruf besar, 1 angka, dan 1 tanda baca.
              </Text>
            </View>
          )}
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
          <Gap height={15} />

          {/* <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
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
                maxLength={6}
                keyboardType='numeric'
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
          </View> */}
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        {registerPasswordPinLoading ? <ActivityIndicator size={"large"} /> : <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-full  self-center">
          <DefaultText title="Simpan" titleClassName="text-white" />
        </TouchableOpacity>}
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

const styles = StyleSheet.create({
  invalidInput: {
    borderColor: 'red',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorText: {
    marginLeft: 5,
    color: 'red',
  },
});
