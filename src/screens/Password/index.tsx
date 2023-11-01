import {
  ActivityIndicator,
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

export default function Password({ route }: RootStackScreenProps<'Password'>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const emailOrPhone = route.params.emailOrPhone;
  const { forgotLoading } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<RootDispatch>();


  const onLanjut = () => {
    if (password.trim().length === 0) {
      return showToast('Masukkan password');
    }
    dispatch(login(emailOrPhone, password));
  };

  return (
    <DefaultView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <DefaultText
            title="Masukkan Password"
            titleClassName="font-inter-bold text-lg"
          />
          <Gap height={10} />
          <Input
            title="Password kamu"
            titleClassName="text-center"
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
              title="Lupa Password ?"
              titleClassName="text-blue-400"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {forgotLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="LANJUT"
          className="bg-primary mx-10 my-5"
          titleClassName="text-white"
          onPress={onLanjut}
        />
      )}
    </DefaultView>
  );
}
