import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import { images } from '../../utils/images';
import DefaultText from '../../components/DefaultText';
import Gap from '../../components/Gap';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps } from '../../navigation/interface';
import { showToast } from '../../utils/toast';
import { RootDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { checkLogin, login } from '../../services/user';

export default function OTP({ route }: RootStackScreenProps<'OTP'>) {
  const emailOrPhone = route.params.emailOrPhone;

  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch<RootDispatch>();

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
    dispatch(checkLogin(emailOrPhone));
  }

  const onLanjut = () => {
    if (otp.trim().length < 6) {
      return showToast('Masukkan OTP');
    }
    dispatch(login(emailOrPhone, otp));
  };

  return (
    <DefaultView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <Image
            className="w-[200] h-[100] self-center"
            source={images.logo}
            resizeMode="contain"
          />
          <Gap height={15} />
          <DefaultText
            title="Masukkan Kode OTP"
            titleClassName="font-inter-bold text-lg"
          />
          <Gap height={10} />
          <DefaultText
            title={`Kami sudah mengirim kode OTP ke nomor HP kamu yang terdaftar: ${emailOrPhone}`}
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
          {timer === 0 && <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => resendOtp()}
            className="border-b-[1px] border-b-blue-400 self-start">
            <DefaultText
              title="Kirim ulang OTP"
              titleClassName="text-blue-400"
            />
          </TouchableOpacity>}
        </View>
      </ScrollView>
      <View className="flex-row flex-wrap justify-end">
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}1`)}>
          <DefaultText
            title="1"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}2`)}>
          <DefaultText
            title="2"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}3`)}>
          <DefaultText
            title="3"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}4`)}>
          <DefaultText
            title="4"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}5`)}>
          <DefaultText
            title="5"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}6`)}>
          <DefaultText
            title="6"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}7`)}>
          <DefaultText
            title="7"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}8`)}>
          <DefaultText
            title="8"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}9`)}>
          <DefaultText
            title="9"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => otp.length < 6 && setOtp(`${otp}0`)}>
          <DefaultText
            title="0"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5 items-center"
          style={{ width: width / 3 }}
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
    </DefaultView>
  );
}
