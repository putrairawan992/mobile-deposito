import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { navigationRef } from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import ModalAlert from '../../components/ModalAlert';
import ModalBank from '../../components/ModalBank';
import { showToast } from '../../utils/toast';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../../store';
import { getShowBankList, postShowBankList } from '../../services/dasbhoard';
import ModalPemilikBank from '../../components/ModalPemilikBank';
import { getValidationBankListData, submitValidationBank } from '../../services/bank';
import { getStorage } from '../../utils/storage';

export default function RekeningSayaTambah() {
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showBank, setShowBank] = useState<boolean>(false);
  const [showBankPemilik, setShowBankPemilik] = useState<boolean>(false);
  const [namaBank, setNamaBank] = useState<any>();
  const [rekening, setRekening] = useState<string>('');
  const [namaRekening, setNamaRekening] = useState<string>('');
  const [pemilikBank, setPemilikBank] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [validateBank, setValidateBank] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const dispatch = useDispatch<RootDispatch>();



  const onTambahBank = () => {
    if (namaBank?.kode?.trim().length === 0 || rekening.trim().length === 0) {
      return showToast('Data belum lengkap');
    }

    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN kamu');
    }
    const payload = {
      nama: namaBank?.nama?.toLowerCase(),
      norek: rekening,
      pin: pin,
      default: 0,
      code: 114,
      jenis: pemilikBank,
      atas_nama: validateBank?.name_rek
    }
    if (!validateBank?.name_rek) {
      return showToast('Klik Cek Rekening Bank');
    }
    if (!validateBank?.success) {
      return;
    }
    dispatch(postShowBankList(payload, setShowModalSuccess));
  };

  const actionRekeningPemilik = (value: string) => {
    let text;
    if (value === '1') {
      text = 'Nasabah'
    }
    if (value === '2') {
      text = 'Ahli Waris Nasabah'
    }
    return text;
  }

  return (
    <DefaultView>
      <DefaultHeader title="Tambah Bank Tujuan" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <TouchableOpacity
            className="bg-green-200 rounded-lg px-3 py-3 flex-row items-center border-[1px] border-primary"
            onPress={() => setShowBank(true)}>
            <View className="flex-1">
              <TextInput
                editable={false}
                className="p-0 m-0 font-inter-bold text-black"
                placeholder="Nama Bank"
                value={namaBank?.nama?.toUpperCase()}
                onChangeText={value => setNamaBank(value)}
                onPressIn={() => setShowBank(true)}
              />
            </View>
          </TouchableOpacity>

          <Gap height={15} />

          <View className="bg-green-200 rounded-lg px-3 py-3 flex-row items-center border-[1px] border-primary">
            <View className="flex-1">
              <TextInput
                className="p-0 m-0 font-inter-bold text-black"
                placeholder="Nomor rekening bank"
                value={rekening}
                onChangeText={value => setRekening(value)}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <Gap height={15} />

          {validateBank?.success && validateBank?.name_rek && <View className="bg-green-200 rounded-lg px-3 py-3 flex-row items-center border-[1px] border-primary">
            <DefaultText title={validateBank?.name_rek} titleClassName='p-0 m-0 font-inter-bold text-black' />
            {/* <TextInput
                className="p-0 m-0 font-inter-bold text-black"
                placeholder="Atas Nama rekening bank"
                value={namaRekening}
                onChangeText={value => setNamaRekening(value)}
              /> */}
          </View>}
          {!validateBank?.success && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {validateBank?.message}
              </Text>
            </View>
          )}

          <Gap height={15} />

          <TouchableOpacity
            className="bg-green-200 rounded-lg px-3 py-3 flex-row items-center border-[1px] border-primary"
            onPress={() => setShowBankPemilik(true)}>
            <View className="flex-1">
              <TextInput
                editable={false}
                className="p-0 m-0 font-inter-bold text-black"
                placeholder="Jenis Pemilik Bank"
                value={actionRekeningPemilik(pemilikBank)}
                onChangeText={value => setPemilikBank(value)}
                onPressIn={() => setShowBankPemilik(true)}
              />
            </View>
          </TouchableOpacity>

          {isLoading ? <ActivityIndicator size={"large"} /> :
            <View className="pb-1 pt-3">
              <TouchableOpacity
                onPress={async () => 
                  dispatch(
                    getValidationBankListData(
                      { "code_bank": namaBank?.kode?.toLocaleLowerCase(), "no_rek": rekening },
                      setValidateBank, setIsLoading)
                  )}
                activeOpacity={0.7}
                className="bg-primary px-10 py-3 rounded-full self-center">
                <DefaultText title="Cek Rekening Bank" titleClassName="text-white" />
              </TouchableOpacity>
            </View>}

          <Gap height={20} />

          <View className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
            <View className="flex-1">
              <DefaultText
                title="Masukkan PIN kamu"
                titleClassName="font-inter-semibold text-neutral-500 text-xs"
              />
              <Gap height={5} />
              <TextInput
                className="p-0 m-0 font-inter-bold text-black"
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

        <View className="pb-10 pt-3">
          <TouchableOpacity
            onPress={onTambahBank}
            activeOpacity={0.7}
            className="bg-primary px-10 py-3 rounded-full self-center">
            <DefaultText title="Tambah Bank" titleClassName="text-white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalAlert
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        title={'Selamat, proses penambahan bank tujuan\nanda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigationRef.goBack();
          dispatch(getShowBankList());
        }}
      />

      <ModalPemilikBank
        show={showBankPemilik}
        hide={() => setShowBankPemilik(false)}
        onConfirm={value => {
          setShowBankPemilik(false);
          setPemilikBank(value);
        }}
      />

      <ModalBank
        show={showBank}
        hide={() => setShowBank(false)}
        onConfirm={value => {
          setShowBank(false);
          setNamaBank(value);
        }}
      />
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
    flexWrap: "wrap",
    marginBottom: 5
  },
  errorText: {
    color: 'red',
  },
});
