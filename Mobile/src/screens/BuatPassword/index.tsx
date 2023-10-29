import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import Button from '../../components/Button';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showToast } from '../../utils/toast';
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { registerPasswordPin } from '../../services/user';
import { RootStackScreenProps } from '../../navigation/interface';

export default function BuatPassword({
  route,
}: RootStackScreenProps<'BuatPassword'>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const dispatch = useDispatch<RootDispatch>();
  const { registerPasswordPinLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  
  const onLanjut = () => {
    if (password.trim().length === 0 || confirmPassword.trim().length === 0) {
      return showToast('Masukkan password');
    }

    if (password !== confirmPassword) {
      return showToast('Password tidak cocok');
    }

    dispatch(registerPasswordPin({ password: confirmPassword }));
  };

  return (
    <DefaultView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <DefaultText
            title="Buat Password"
            titleClassName="font-inter-bold text-lg"
          />
          <Gap height={10} />
          <Input
            title="Buat Password kamu"
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
          <Input
            title="Konfirmasi password kamu"
            titleClassName="text-center"
            textInputProps={{
              secureTextEntry: !showConfirmPassword,
            }}
            ComponentRight={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.7}
                className="ml-1">
                <Icon
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                />
              </TouchableOpacity>
            }
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)}
          />
        </View>
      </ScrollView>
      {registerPasswordPinLoading ? <ActivityIndicator size={"large"} /> : <Button
        title="LANJUT"
        className="bg-primary mx-10 my-5"
        titleClassName="text-white"
        onPress={onLanjut}
      />}
    </DefaultView>
  );
}
