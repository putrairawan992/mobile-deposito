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
import { isEmail } from '../../utils/function';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah, updateNasabah, updateNasabahV2 } from '../../services/user';

export default function ChangePhoneNumber() {
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [phoneBaru, setPhoneBaru] = useState<string>('');
  const [phoneConfirm, setPhoneBaruConfirm] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getDetailNasabah())
  }, [dispatch])

  const onSave = () => {
    if (
      phoneBaru.trim().length === 0 ||
      phoneConfirm.trim().length === 0
    ) {
      return showToast('Data belum lengkap');
    }

    if (phoneBaru !== phoneConfirm) {
      return showToast('No Telepon tidak cocok');
    }

    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN anda');
    }
    let formdata = new FormData();
    formdata.append('phone', phoneConfirm);
    formdata.append('pin', pin);
    dispatch(updateNasabah(formdata, setShowModalSuccess));
  };

  return (
    <DefaultView>
      <DefaultHeader title="Ganti Telepon Baru" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Telepon sekarang"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <DefaultText  titleClassName="p-0 m-0 font-inter-bold" title={detailNasabah?.phone} />
            </View>
          </View>
          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Telepon baru"
                value={phoneBaru}
                onChangeText={value => setPhoneBaru(value)}
              />
            </View>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-5 flex-row items-center">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold"
                placeholder="Konfirmasi telepon baru"
                value={phoneConfirm}
                onChangeText={value => setPhoneBaruConfirm(value)}
              />
            </View>
          </View>

          <Gap height={15} />

          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              {/* <DefaultText
                title="Masukkan PIN kamu"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              /> */}
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
          </View>
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-full  self-center">
          <DefaultText title="Simpan" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
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
