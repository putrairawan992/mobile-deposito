import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/colors';
import ModalAlert from '../../components/ModalAlert';
import {navigationRef} from '../../navigations/RootNavigation';
import {formatRupiah} from '../../utils/function';
import {showToast} from '../../utils/toast';

export default function AjukanDeposito() {
  const [perpanjang, setPerpanjang] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nominal, setNominal] = useState<string>('');

  const onLanjut = () => {
    if (nominal.trim().length === 0) {
      return showToast('Masukkan nominal');
    }

    if (!agree) {
      return showToast('Centang persetujuan syarat dan ketentuan');
    }

    setShowModal(true);
  };

  return (
    <DefaultView>
      <DefaultHeader title="Ajukan Deposito" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <Gap height={15} />
          <DefaultText
            title="BPR Kencana Abadi"
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
            <DefaultText title="3 Bulan" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nisbah" titleClassName="flex-1" />
            <DefaultText title="40 : 60" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Proyeksi Bagi Hasil" titleClassName="flex-1" />
            <DefaultText title="5% pertahun" />
          </View>
        </View>

        <View className="w-full h-[1px] bg-black my-3" />

        <View className="px-5">
          <DefaultText title="Masukkan Nominal Deposito Anda" />
          <Gap height={10} />
          <View className="border-[1px] border-primary rounded-md px-2 py-2">
            <TextInput
              className="m-0 p-0 font-inter-regular"
              placeholder="Masukkan nominal"
              value={nominal}
              onChangeText={value => setNominal(formatRupiah(value))}
              keyboardType="number-pad"
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
            <DefaultText title="Rp 10.000.000" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Bagi Hasil" titleClassName="flex-1" />
            <DefaultText title="Rp 41.666" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText
              title="Estimasi Total Pengembalian"
              titleClassName="flex-1"
            />
            <DefaultText title="Rp 10.041.666" />
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
            <DefaultText title="Bank Mandiri" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText
              title="Nama Pemilik Rekening"
              titleClassName="flex-1"
            />
            <DefaultText title="Heru Ahmad" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nomor Rekening" titleClassName="flex-1" />
            <DefaultText title="1569377058704" />
          </View>
          <Gap height={10} />
          <TouchableOpacity
            activeOpacity={0.7}
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
            <DefaultText
              title="Anda menyetujui"
              titleClassName="flex-1 text-xs"
              subtitle="Syarat & Ketentuan."
              subtitleClassName="text-primary"
            />
          </View>
          <Gap height={10} />
          <TouchableOpacity
            onPress={onLanjut}
            activeOpacity={0.7}
            className="self-center bg-primary px-5 py-2 rounded-md">
            <DefaultText title="Lanjut" titleClassName="text-white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

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
