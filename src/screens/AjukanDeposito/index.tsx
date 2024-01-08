import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import ModalAlert from '../../components/ModalAlert';
import { navigationRef } from '../../navigation/RootNavigation';
import { formatNominal, formatRupiah } from '../../utils/function';
import { showToast } from '../../utils/toast';
import { RootStackScreenProps } from '../../navigation/interface';
import { useDispatch, useSelector } from 'react-redux';
import { estimasiAjukanDeposito, postAjukanDeposito } from '../../services/product';
import { RootDispatch, RootState } from '../../store';
import { debounce } from '../../utils/debounce';
import { getShowBankList, getShowBankListProduk } from '../../services/dasbhoard';
import ModalSkPengajuan from '../../components/ModalSyaratKetentuan';

export default function AjukanDeposito({ route }: RootStackScreenProps<"AjukanDeposito">) {
  const [skKonfirm, setSkKonfirm] = useState<boolean>(false);
  const showProductDetail = route.params?.showProductDetail as any;
  const [perpanjang, setPerpanjang] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nominal, setNominal] = useState<string>('');
  const [tujuanDeposito,setTujuanDeposito] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [loadings, setLoadings] = useState<boolean>(false);
  const { showBankListProduct } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const dispatch = useDispatch<RootDispatch>();
  const [dataBank, setDataBank] = useState<any>();

  useEffect(() => {
    dispatch(getShowBankListProduk());
  }, [dispatch])

  useEffect(() => {
    const bankDefault = showBankListProduct?.find((li: any) => li?.default === "1");
    setDataBank(bankDefault);
  }, [showBankListProduct])

  const onLanjut = () => {
    if (nominal.trim().length === 0) {
      return showToast('Masukkan nominal');
    }
    if (!agree) {
      return showToast('Centang persetujuan syarat dan ketentuan');
    }
    const payload = {
      id_norek: dataBank?.id,
      aro: perpanjang ? 1 : 0,
      tujuan:tujuanDeposito,
      amount: nominal?.replace(/\./g, ""),
      bagi_hasil: data?.estimasi_akhir?.toString(),
      tenor: showProductDetail?.tenor,
      id_produk: showProductDetail?.no_produk,
    }
    dispatch(postAjukanDeposito(payload, setShowModal, setLoadings))
  };

  const payload = {
    amount: nominal?.replace(/\./g, ""),
    bagi_hasil: showProductDetail?.bagi_hasil,
    tenor: showProductDetail?.tenor,
    pajak: showProductDetail?.pajak
  }

  const handleDebouncedSearch = () => {
    dispatch(estimasiAjukanDeposito(payload, setData, setLoadings));
  };

  function tambahkanNominal(nominal: any, hasil: any): any {
    return parseInt(nominal) + hasil;
  }


  const total: number = tambahkanNominal(nominal?.replace(/\./g, ""), data?.estimasi_akhir);


  return (
    <DefaultView>
      <DefaultHeader title="Ajukan Deposito" />
      <ScrollView style={{padding:15}} showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <Gap height={15} />
          <DefaultText
            title={showProductDetail?.nama}
            titleClassName="text-base font-inter-semibold"
          />
          <Gap height={15} />
          <DefaultText
            title="Detail Produk"
            titleClassName="font-inter-semibold"
          />
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Tenor" titleClassName="flex-1" />
            <DefaultText title={`${showProductDetail?.tenor} Bulan`} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nisbah" titleClassName="flex-1" />
            <DefaultText title={`${showProductDetail?.nisbah}`} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Bagi Hasil" titleClassName="flex-1" />
            <DefaultText title={`${showProductDetail?.bagi_hasil}% / Tahun`} />
          </View>
        </View>

        <View className="w-full h-[1px] bg-black my-3" />

        <View className="px-5">
          <Gap height={10} />
          <DefaultText title="Masukkan Nominal Deposito Anda" />
          <Gap height={10} />
          <View className="border-[1px] border-primary rounded-md px-2 py-2">
            <TextInput
              className="m-0 p-0 font-inter-regular"
              placeholder="Masukkan nominal"
              value={nominal}
              onChangeText={value => {
                setNominal(formatRupiah(value));
              }}
              keyboardType="number-pad"
            />
          </View>
          {loadings ? <ActivityIndicator size={"large"} /> :
           parseInt(nominal) > 0 &&  <TouchableOpacity
              onPress={() => handleDebouncedSearch()}
              activeOpacity={0.7}
              className="self-center px-5 mt-1 bg-primary py-2 rounded-full">
              <DefaultText title="Simulasikan Deposito" titleClassName="text-white" />
            </TouchableOpacity>}
            <Gap height={20} />
          <View className="border-[1px] border-primary rounded-md px-2 py-2">
            <TextInput
              className="m-0 p-0 font-inter-regular"
              placeholder="Tujuan Deposito"
              value={tujuanDeposito}
              onChangeText={value => {
                setTujuanDeposito(value);
              }}
            />
          </View>
          <Gap height={20} />

          <DefaultText
            title="Estimasi Perhitungan Bagi Hasil"
            titleClassName="font-inter-semibold"
          />
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Penempatan Dana" titleClassName="flex-1" />
            <DefaultText title={formatRupiah(nominal)} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Bagi Hasil" titleClassName="flex-1" />
            <DefaultText title={formatNominal(data?.estimasi_akhir || 0)} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText
              title="Estimasi Total Pengembalian"
              titleClassName="flex-1"
            />
            <DefaultText title={formatRupiah(total.toString()) || 0} />
          </View>
          <Gap height={20} />
          <DefaultText
            title="Detail Bank Anda"
            titleClassName="font-inter-semibold"
          />
          <Gap height={10} />
          <View className="flex-row items-center">
            <Icon name="alert-circle-outline" size={30} color={'#f24c05'} />
            <View className="bg-yellow-100 px-1 py-2 rounded-md flex-1">
              <DefaultText
                title="Total pengembalian dana akan ditransfer kerekening:"
                titleClassName="text-xs"
              />
            </View>
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nama Bank" titleClassName="flex-1" />
            <DefaultText title={dataBank?.nama} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText
              title="Nama Pemilik Rekening"
              titleClassName="flex-1"
            />
            <DefaultText title={dataBank?.atas_nama} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nomor Rekening" titleClassName="flex-1" />
            <DefaultText title={dataBank?.norek} />
          </View>
          <Gap height={10} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigationRef.navigate('RekeningSaya', { isUserBank: true })}
            className="self-end bg-primary px-1 py-2 rounded-md">
            <DefaultText title="Ganti Akun Bank" titleClassName="text-white" />
          </TouchableOpacity>
          <Gap height={10} />
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setPerpanjang(!perpanjang)}
              activeOpacity={0.7}
              className="w-[16] h-[16] border-[1px] border-black justify-center items-center rounded-sm">
              {perpanjang && (
                <Icon name="check" size={14} color={colors.black} />
              )}
            </TouchableOpacity>
            <Gap width={10} />
            <DefaultText
              title="Apakah Anda ingin perpanjang transaksi otomatis."
              titleClassName="flex-1 text-xs"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setAgree(!agree)}
              activeOpacity={0.7}
              className="w-[16] h-[16] border-[1px] border-black justify-center items-center rounded-sm">
              {agree && <Icon name="check" size={14} color={colors.black} />}
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              onPress={() => setSkKonfirm(true)}
              activeOpacity={0.7}
              className="self-center">
              <DefaultText
                title="Anda menyetujui"
                titleClassName="flex-1 text-xs"
                subtitle="Syarat & Ketentuan."
                subtitleClassName="text-primary"
              />
            </TouchableOpacity>
          </View>
          <Gap height={10} />
          <TouchableOpacity
            onPress={onLanjut}
            activeOpacity={0.7}
            className="self-center bg-primary px-5 py-2 rounded-full">
            <DefaultText title="Submit" titleClassName="text-white" />
          </TouchableOpacity>
          <Gap height={30} />
        </View>
      </ScrollView>

      <ModalSkPengajuan
        show={skKonfirm}
        hide={() => setSkKonfirm(false)}
        onConfirm={() => setSkKonfirm(false)}
      />

      <ModalAlert
        show={showModal}
        hide={() => setShowModal(false)}
        title={
          'Selamat, proses pengajuan deposito Anda berhasil\n\nKami mengirimkan dokumen yang harus ditandatangani, melalui tautan yang kami kirimkan ke email Anda'
        }
        onConfirm={() => {
          setShowModal(false);
          setTimeout(() => navigationRef.goBack(), 1000);
        }}
      />
    </DefaultView>
  );
}
