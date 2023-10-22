import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import {navigationRef} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAlert from '../../components/ModalAlert';
import {showToast} from '../../utils/toast';
import { RootDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { updateNasabah } from '../../services/user';
import { RootStackScreenProps } from '../../navigation/interface';

export default function AhliWarisEdit({ route }: RootStackScreenProps<"AhliWarisEdit">) {
  const detailNasabah =  route.params?.detailNasabah as any;
  const [nama, setNama] = useState<string>(detailNasabah?.nama_ahli_waris);
  const [ktp, setKtp] = useState<string>(detailNasabah?.ktp_ahli_waris);
  const [phone, setPhone] = useState<string>(detailNasabah?.phone_ahli_waris);
  const [hubunganAhliWaris, setHubunganAhliWaris] = useState<string>(detailNasabah?.hub_ahli_waris);
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  const onSave = () => {
    if (
      nama.trim().length === 0 ||
      ktp.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      return showToast('Data belum lengkap');
    }

    if (ktp.trim().length !== 16) {
      return showToast('No KTP tidak valid, 16 Angka');
    }

    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN kamu');
    }
    let formdata = new FormData();
    formdata.append('nama_ahli_waris', nama);
    formdata.append('ktp_ahli_waris', ktp);
    formdata.append('phone_ahli_waris', phone);
    formdata.append('hub_ahli_waris',hubunganAhliWaris);
    formdata.append('pin',pin);
    console.log("formEditAhli===>",formdata);
    
    dispatch(updateNasabah(formdata,setShowModalSuccess));
  };

  return (
    <DefaultView>
      <DefaultHeader title="Info Ahli Waris" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row items-center">
            <DefaultText title="Nama Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={nama}
                onChangeText={value => setNama(value)}
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="No KTP Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={ktp}
                onChangeText={value => setKtp(value)}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText
              title="No. Telepon Ahli Waris"
              titleClassName="flex-1"
            />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={phone}
                onChangeText={value => setPhone(value)}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText
              title="Hubungan Ahli Waris"
              titleClassName="flex-1"
            />
            <View className="border-[1px] border-primary rounded-md w-[150] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={hubunganAhliWaris}
                onChangeText={value => setHubunganAhliWaris(value)}
              />
            </View>
          </View>

          <Gap height={15} />
          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
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
          <Gap height={150} />
          <View className="bg-cyan-200 rounded-lg p-3">
            <DefaultText
              title="Edit ahli waris"
              titleClassName="font-inter-semibold"
            />
            <Gap height={10} />
            <DefaultText title="Setelah Edit, kamu akan merubah data diakun Deposito syariah, apakah kamu yakin ingin mengedit ahli waris ini?" />
          </View>
          <Gap height={20} />
          <TouchableOpacity
            onPress={onSave}
            activeOpacity={0.7}
            className="bg-primary px-10 py-3 rounded-md self-center">
            <DefaultText title="SIMPAN" titleClassName="text-white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalAlert
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        title={'Selamat, proses pergantian info ahli waris\nanda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigationRef.goBack();
        }}
      />
    </DefaultView>
  );
}
