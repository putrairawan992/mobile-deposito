import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { navigationRef } from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAlert from '../../components/ModalAlert';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { showToast } from '../../utils/toast';
import { RootStackScreenProps } from '../../navigation/interface';
import { RootDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { updateNasabah } from '../../services/user';
import { penghasilanValidation, statusNikahValidation } from '../../utils/constant';
import ModalStatusPernikahan from '../../components/ModalStatusPernikahan';
import ModalPenghasilan from '../../components/ModalPenghasilan';

export default function DetailPribadiEdit({ route }: RootStackScreenProps<'DetailPribadiEdit'>) {
  const detailPribadi = route.params?.detailNasabah as any;
  const [ktp, setKtp] = useState<string>(detailPribadi?.ktp);
  const [tempatLahir, setTempatLahir] = useState<string>(detailPribadi?.tmpt_lahir);
  const [tanggalLahir, setTanggalLahir] = useState<any>(detailPribadi?.tgl_lahir);
  const [ibu, setIbu] = useState<string>(detailPribadi?.ibu_kandung);
  const [statusNikah, setStatusNikah] = useState<string>(detailPribadi?.status_pernikahan);
  const [profesi, setProfesi] = useState<string>(detailPribadi?.jenis_pekerjaan);
  const [perusahaan, setPerusahaan] = useState<string>(detailPribadi?.nama_perusahaan);
  const [alamatPerusahaan, setAlamatPerusahaan] = useState<string>(detailPribadi?.alamat_kerja);
  const [penghasilan, setPenghasilan] = useState<string>(detailPribadi?.penghasilan);
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showPenghasilan, setShowPenghasilan] = useState<boolean>(false);
  const [showStatusPernikahan, setShowStatusPernikahan] =
  useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  const onSave = () => {
    if (
      ktp.trim().length === 0 ||
      tempatLahir.trim().length === 0 ||
      !tanggalLahir ||
      ibu.trim().length === 0 ||
      statusNikah.trim().length === 0 ||
      profesi.trim().length === 0 ||
      perusahaan.trim().length === 0 ||
      alamatPerusahaan.trim().length === 0 ||
      penghasilan.trim().length === 0
    ) {
      return showToast('Data belum lengkap');
    }

    if (ktp.trim().length !== 16) {
      return showToast('No KTP tidak valid');
    }

    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN kamu');
    }

    let formdata = new FormData();
    formdata.append('ktp', ktp);
    formdata.append('tmpt_lahir', tempatLahir);
    formdata.append('tgl_lahir', tanggalLahir);
    formdata.append('ibu_kandung', ibu);
    formdata.append('status_pernikahan', statusNikah);
    formdata.append('jenis_pekerjaan', profesi);
    formdata.append('nama_perusahaan', perusahaan);
    formdata.append('alamat_kerja', alamatPerusahaan);
    formdata.append('penghasilan', penghasilan);
    formdata.append('pin',pin);
    dispatch(updateNasabah(formdata, setShowModalSuccess));
  };

  return (
    <DefaultView>
      <DefaultHeader title="Edit Detail Pribadi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row items-center">
            <DefaultText title="No KTP" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
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
            <DefaultText title="Tempat Lahir" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={tempatLahir}
                onChangeText={value => setTempatLahir(value)}
              />
            </View>
          </View>
          <Gap height={5} />
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center"
            onPress={() => setShowDate(true)}>
            <DefaultText title="Tanggal Lahir" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                editable={false}
                className="m-0 p-0 font-inter-regular text-black"
                value={tanggalLahir}
                onPressIn={() => setShowDate(true)}
              />
            </View>
          </TouchableOpacity>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama Ibu Kandung" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={ibu}
                onChangeText={value => setIbu(value)}
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Status Pernikahan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={statusNikahValidation(statusNikah)}
                onPressIn={() => setShowStatusPernikahan(true)}
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Profesi/Pekerjaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={profesi}
                onChangeText={value => setProfesi(value)}
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama Perusahaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={perusahaan}
                onChangeText={value => setPerusahaan(value)}
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Alamat Perusahaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={alamatPerusahaan}
                onChangeText={value => setAlamatPerusahaan(value)}
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Penghasilan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={penghasilanValidation(penghasilan)}
                onPressIn={() => setShowPenghasilan(true)}
                keyboardType="number-pad"
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
          <Gap height={25} />
          <View className="bg-cyan-200 rounded-lg p-3">
            <DefaultText
              title="Edit detail pribadi"
              titleClassName="font-inter-semibold"
            />
            <Gap height={10} />
            <DefaultText title="Setelah Edit, kamu akan merubah data diakun Deposito syariah, apakah kamu yakin ingin mengedit detail pribadi ini?" />
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

      <ModalPenghasilan
          show={showPenghasilan}
          hide={() => setShowPenghasilan(false)}
          onConfirm={value => {
            setShowPenghasilan(false);
            setPenghasilan(value);
          }}
        />

      <ModalStatusPernikahan
          show={showStatusPernikahan}
          hide={() => setShowStatusPernikahan(false)}
          onConfirm={value => {
            setShowStatusPernikahan(false);
            setStatusNikah(value);
          }}
        />

      <ModalAlert
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        title={'Selamat, proses pergantian detail pribadi\nanda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigationRef.goBack();
        }}
      />

      <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        maximumDate={new Date()}
        onConfirm={e => {
          setTanggalLahir(e);
          setShowDate(false);
        }}
        onCancel={() => setShowDate(false)}
      />
    </DefaultView>
  );
}
