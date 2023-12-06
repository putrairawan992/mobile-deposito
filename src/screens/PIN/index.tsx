import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import Gap from '../../components/Gap';
import Button from '../../components/Button';
import { navigationRef } from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showToast } from '../../utils/toast';
import { registerPasswordPin } from '../../services/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { useFocusEffect } from '@react-navigation/native';

export default function PIN() {
  const [pin, setPin] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const { registerPasswordPinLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
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

  const handleBackPress = (): boolean => {
    ToastAndroid.show('Tidak Bisa Kembali Selesaikan Isi PIN', ToastAndroid.SHORT);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress])
  );

  const onLanjut = () => {
    if (pin.length < 6) {
      return showToast('Masukkan PIN');
    }
    dispatch(registerPasswordPin({ pin: pin }, 'MyTabs', false));
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
                title={pin.charAt(0)}
                titleClassName="font-inter-bold text-lg"
              />
            </View>
            <Gap width={10} />
            <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
              <DefaultText
                title={pin.charAt(1)}
                titleClassName="font-inter-bold text-lg"
              />
            </View>
            <Gap width={10} />
            <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
              <DefaultText
                title={pin.charAt(2)}
                titleClassName="font-inter-bold text-lg"
              />
            </View>
            <Gap width={10} />
            <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
              <DefaultText
                title={pin.charAt(3)}
                titleClassName="font-inter-bold text-lg"
              />
            </View>
            <Gap width={10} />
            <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
              <DefaultText
                title={pin.charAt(4)}
                titleClassName="font-inter-bold text-lg"
              />
            </View>
            <Gap width={10} />
            <View className="border-b-[2px] border-b-black w-5 h-8 justify-center items-center">
              <DefaultText
                title={pin.charAt(5)}
                titleClassName="font-inter-bold text-lg"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row flex-wrap justify-end">
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}1`)}>
          <DefaultText
            title="1"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}2`)}>
          <DefaultText
            title="2"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}3`)}>
          <DefaultText
            title="3"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}4`)}>
          <DefaultText
            title="4"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}5`)}>
          <DefaultText
            title="5"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}6`)}>
          <DefaultText
            title="6"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}7`)}>
          <DefaultText
            title="7"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}8`)}>
          <DefaultText
            title="8"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}9`)}>
          <DefaultText
            title="9"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5"
          style={{ width: width / 3 }}
          onPress={() => pin.length < 6 && setPin(`${pin}0`)}>
          <DefaultText
            title="0"
            titleClassName="font-inter-bold text-2xl text-center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-5 items-center"
          style={{ width: width / 3 }}
          onPress={() => pin.length > 0 && setPin(pin.slice(0, -1))}>
          <Icon name="backspace-outline" size={30} />
        </TouchableOpacity>
      </View>
      {registerPasswordPinLoading ? <ActivityIndicator size={"large"} /> : <Button
        title="Lanjut"
        disabled={pin?.length < 6}
        className="bg-primary mx-3 mb-7 self-center"
        titleClassName="text-white"
        onPress={onLanjut}
      />}
    </DefaultView>
  );
}
