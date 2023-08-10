import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {navigationRef} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import ModalAlert from '../../components/ModalAlert';
import Button from '../../components/Button';
import {showToast} from '../../utils/toast';

export default function GantiPIN() {
  const [showPINSekarang, setShowPINSekarang] = useState<boolean>(false);
  const [showPINBaru, setShowPINBaru] = useState<boolean>(false);
  const [showPINConfirm, setShowPINConfirm] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const [PINSekarang, setPINSekarang] = useState<string>('');
  const [PINBaru, setPINBaru] = useState<string>('');
  const [PINConfirm, setPINConfirm] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);

  const {width} = useWindowDimensions();

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
      PINSekarang.trim().length === 0 ||
      PINBaru.trim().length === 0 ||
      PINConfirm.trim().length === 0
    ) {
      return showToast('Data belum lengkap');
    }

    if (PINBaru !== PINConfirm) {
      return showToast('PIN tidak cocok');
    }

    setShowOtp(true);
    setTimer(60);
  };

  const onLanjut = () => {
    if (otp.length < 6) {
      return showToast('Masukkan OTP');
    }

    setShowModalSuccess(true);
  };

  return (
    <DefaultView>
      <DefaultHeader title="Ganti PIN" />
      {showOtp ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-5 py-3">
              <DefaultText
                title="Masukkan Kode OTP"
                titleClassName="font-inter-bold text-lg"
              />
              <Gap height={10} />
              <DefaultText
                title={
                  'Kami sudah mengirim kode OTP ke nomor HP kamu yang terdaftar: 089694624299'
                }
              />
              <Gap height={10} />
              <DefaultText title="OTP" titleClassName="font-inter-semibold" />
              <Gap height={5} />
              <View className="flex-row items-center">
                <View className="flex-row flex-1">
                  <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
                    <DefaultText
                      title={otp.charAt(0)}
                      titleClassName="font-inter-bold text-lg"
                    />
                  </View>
                  <Gap width={10} />
                  <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
                    <DefaultText
                      title={otp.charAt(1)}
                      titleClassName="font-inter-bold text-lg"
                    />
                  </View>
                  <Gap width={10} />
                  <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
                    <DefaultText
                      title={otp.charAt(2)}
                      titleClassName="font-inter-bold text-lg"
                    />
                  </View>
                  <Gap width={10} />
                  <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
                    <DefaultText
                      title={otp.charAt(3)}
                      titleClassName="font-inter-bold text-lg"
                    />
                  </View>
                  <Gap width={10} />
                  <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
                    <DefaultText
                      title={otp.charAt(4)}
                      titleClassName="font-inter-bold text-lg"
                    />
                  </View>
                  <Gap width={10} />
                  <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
                    <DefaultText
                      title={otp.charAt(5)}
                      titleClassName="font-inter-bold text-lg"
                    />
                  </View>
                </View>
                {timer > 0 && (
                  <DefaultText
                    title={`00:${timer}`}
                    titleClassName="font-inter-semibold"
                  />
                )}
              </View>

              <Gap height={15} />
              <TouchableOpacity
                activeOpacity={0.7}
                className="border-b-[1px] border-b-blue-400 self-start">
                <DefaultText
                  title="Kirim ulang OTP"
                  titleClassName="text-blue-400"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View className="flex-row flex-wrap justify-end">
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}1`)}>
              <DefaultText
                title="1"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}2`)}>
              <DefaultText
                title="2"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}3`)}>
              <DefaultText
                title="3"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}4`)}>
              <DefaultText
                title="4"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}5`)}>
              <DefaultText
                title="5"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}6`)}>
              <DefaultText
                title="6"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}7`)}>
              <DefaultText
                title="7"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}8`)}>
              <DefaultText
                title="8"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}9`)}>
              <DefaultText
                title="9"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5"
              style={{width: width / 3}}
              onPress={() => otp.length < 6 && setOtp(`${otp}0`)}>
              <DefaultText
                title="0"
                titleClassName="font-inter-bold text-2xl text-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-5 items-center"
              style={{width: width / 3}}
              onPress={() => otp.length > 0 && setOtp(otp.slice(0, -1))}>
              <Icon name="backspace-outline" size={30} />
            </TouchableOpacity>
          </View>
          <Button
            title="LANJUT"
            className="bg-primary mx-3 mb-7 self-center"
            titleClassName="text-white"
            onPress={onLanjut}
          />
        </>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-5 py-3">
              <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
                <View className="flex-1">
                  <DefaultText
                    title="PIN sekarang"
                    titleClassName="font-inter-semibold text-neutral-500 text-xs"
                  />
                  <Gap height={5} />
                  <TextInput
                    className="p-0 m-0 font-inter-bold"
                    placeholder="PIN sekarang"
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

              <Gap height={15} />

              <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
                <View className="flex-1">
                  <TextInput
                    className="p-0 m-0 font-inter-bold"
                    placeholder="Masukkan PIN baru"
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
        </>
      )}

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
