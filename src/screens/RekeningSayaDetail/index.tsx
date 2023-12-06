import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { navigationRef } from '../../navigation/RootNavigation';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAlert from '../../components/ModalAlert';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah } from '../../services/user';
import { deleteBankDetailList, getBankDetailList, getShowBankList } from '../../services/dasbhoard';
import { RootStackScreenProps } from '../../navigation/interface';

export default function RekeningSayaDetail({ route }: RootStackScreenProps<'RekeningSayaDetail'>) {
  const [pin, setPin] = useState<string>('');
  const idParams = route.params?.id;
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { showBankDetails } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getBankDetailList(idParams))
  }, [dispatch])

  return (
    <DefaultView>
      <DefaultHeader title="Detail Akun Bank" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <DefaultText title="Nama Bank" />
          <Gap height={5} />
          <View className="bg-green-200 border-[1px] border-primary p-3 rounded-md">
            <DefaultText title={showBankDetails?.nama} />
          </View>

          <Gap height={10} />

          <DefaultText title="Nomor Rekening Bank" />
          <Gap height={5} />
          <View className="bg-green-200 border-[1px] border-primary p-3 rounded-md">
            <DefaultText title={showBankDetails?.norek} />
          </View>

          <Gap height={10} />

          <DefaultText title="Nama Akun Bank" />
          <Gap height={5} />
          <View className="bg-green-200 border-[1px] border-primary p-3 rounded-md">
            <DefaultText title={showBankDetails?.atas_nama} />
          </View>

          {isDelete && (
            <>
              <Gap height={30} />
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
              <Gap height={30} />
              <View className="bg-cyan-200 rounded-lg p-3">
                <DefaultText
                  title="Hapus akun bank"
                  titleClassName="font-inter-semibold"
                />
                <Gap height={10} />
                <DefaultText title="Setelah dihapus, kamu akan menutup akses transaksi terhadap akun Deposito syariah, apakah kmu yakin ingin menghapus akun bank ini?" />
              </View>
            </>
          )}
        </View>
        <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={() => {
            if (isDelete) {
              dispatch(deleteBankDetailList(idParams, setShowModalSuccess, { pin: pin }))
            } else {
              setIsDelete(true);
            }
          }}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-full self-center">
          <DefaultText title="Hapus akun bank" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
      </ScrollView>

  

      <ModalAlert
        show={showModalSuccess}
        hide={() => setShowModalSuccess(false)}
        title={'Selamat, proses hapus akun bank\nanda berhasil'}
        onConfirm={() => {
          setShowModalSuccess(false);
          dispatch(getShowBankList());
          navigationRef.goBack();
        }}
      />
    </DefaultView>
  );
}
