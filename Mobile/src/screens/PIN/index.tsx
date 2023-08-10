import {
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import Gap from '../../components/Gap';
import Button from '../../components/Button';
import {navigationRef} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showToast} from '../../utils/toast';

export default function PIN() {
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);

  const {width} = useWindowDimensions();

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

  const onLanjut = () => {
    if (otp.length < 6) {
      return showToast('Masukkan PIN');
    }
    navigationRef.navigate('MyTabs');
  };

  return (
    <DefaultView>
      <ScrollView>
        <View className="px-5 py-3">
          <Gap height={15} />
          <DefaultText
            title="Masukkan PIN Deposito Syariah"
            titleClassName="font-inter-bold text-lg"
          />
          <Gap height={20} />
          <DefaultText
            title="Buat 6 digit PIN kamu"
            titleClassName="font-inter-medium text-center"
          />
          <Gap height={15} />
          <View className="flex-row justify-center">
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
    </DefaultView>
  );
}
