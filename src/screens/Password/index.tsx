import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import Button from '../../components/Button';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showToast } from '../../utils/toast';
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordPin, login } from '../../services/user';
import { RootStackScreenProps } from '../../navigation/interface';
import { images } from '../../utils/images';
import { WIDTH } from '../../utils/constant';
import { getExitTime, getStorage } from '../../utils/storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function Password({ route }: RootStackScreenProps<'Password'>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const emailOrPhone = route.params.emailOrPhone;
  const { forgotLoading, loginLoading } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<RootDispatch>();


  const useNasabah = useCallback(async () => {
    const exitTime = await getExitTime();
    const currentTime = new Date().getTime();
    if (exitTime && await getStorage("phone-email")) {
      const elapsedTime = (currentTime - exitTime) / 1000;
      if (elapsedTime > 30) {
        setPassword('');
      }
    }
  }, [useIsFocused]);

  useFocusEffect(useCallback(() => {
    useNasabah();
  }, [useIsFocused]));

  const onLanjut = () => {
    if (password.trim().length === 0) {
      return showToast('Masukkan kata sandi');
    }
    dispatch(login(emailOrPhone, password, false));
  };

  return (
    <DefaultView>
      <View className="px-5 py-3">
        <Image
          className="w-[200] h-[100] self-center"
          source={images.logo}
          resizeMode="contain"
        />
        <Gap height={15} />
        <View style={{
          marginTop: WIDTH / 5
        }}>
          <DefaultText
            title="Masukkan Kata Sandi"
            titleClassName="font-inter-bold text-lg"
          />
          <Gap height={10} />
          <Input
            title="Kata Sandi kamu"
            titleClassName="text-left"
            textInputProps={{
              secureTextEntry: !showPassword,
            }}
            ComponentRight={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
                className="ml-1">
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
              </TouchableOpacity>
            }
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={10} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              dispatch(
                forgotPasswordPin({ username: emailOrPhone }, emailOrPhone),
              )
            }
            className="border-b-[1px] border-b-blue-400 self-start">
            <DefaultText
              title="Lupa Kata Sandi ?"
              titleClassName="text-blue-400"
            />
          </TouchableOpacity>
        </View>
      </View>

      {loginLoading || forgotLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Button
          title="Lanjut"
          className="bg-primary mx-10 my-5"
          titleClassName="text-white"
          onPress={onLanjut}
        />
      )}
    </DefaultView>
  );
}
