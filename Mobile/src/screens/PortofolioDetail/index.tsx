import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/colors';
import ModalAlert from '../../components/ModalAlert';
import {navigationRef} from '../../navigations/RootNavigation';

export default function PortofolioDetail() {
  const [perpanjang, setPerpanjang] = useState<boolean>(true);
  const [showModalBatal, setShowModalBatal] = useState<boolean>(false);

  return (
    <DefaultView>
      <DefaultHeader title="Detail Portofolio" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-8">
          <Gap height={15} />
          <DefaultText
            title="Detail Portofolio"
            titleClassName="font-inter-semibold"
          />
          <View className="w-full h-[1px] bg-neutral-300 my-3" />
          <DefaultText
            title="BPR Kencana Abadi"
            titleClassName="text-base font-inter-semibold"
          />
          <View className="w-full h-[1px] bg-neutral-300 my-3" />
          <View className="flex-row">
            <DefaultText
              title={'Pilihan Tenor\n3 Bulan'}
              titleClassName="flex-1"
            />
            <DefaultText title={'Bagi Hasil\n6%'} />
          </View>
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
          <View className="w-full h-[1px] bg-neutral-300 my-3" />
          <View className="flex-row">
            <DefaultText title="Pengajuan Deposito" titleClassName="flex-1" />
            <DefaultText title="Rp 10.000.000" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Estimasi Bagi Hasil" titleClassName="flex-1" />
            <DefaultText title="Rp 125.000" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText
              title="Estimasi Total Pengembalian"
              titleClassName="flex-1"
            />
            <DefaultText title="Rp 10.125.000" />
          </View>
          <Gap height={20} />
          <View className="flex-row">
            <DefaultText title="Nama Bank" titleClassName="flex-1" />
            <DefaultText title="Bank Mandiri" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nama Pemilik" titleClassName="flex-1" />
            <DefaultText title="Heru Ahmad" />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Nomor Rekening" titleClassName="flex-1" />
            <DefaultText title="123456789" />
          </View>
          <View className="w-full h-[1px] bg-neutral-300 mb-3 mt-1" />
          <View className="flex-row items-center">
            <Icon name="check-circle" size={26} color={colors.primary} />
            <DefaultText
              title="Pengajuan Dibuat"
              titleClassName="flex-1 ml-1"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row items-center">
            <Icon name="check-circle" size={26} color={colors.primary} />
            <DefaultText
              title="Dokumen telah ditandatangani"
              titleClassName="flex-1 ml-1"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row items-center">
            <Icon name="check-circle" size={26} color={colors.primary} />
            <DefaultText
              title="Pengajuan Disetujui BPR"
              titleClassName="flex-1 ml-1"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row items-center">
            <Icon name="check-circle" size={26} color={colors.primary} />
            <DefaultText
              title="Pembayaran Berhasil"
              titleClassName="flex-1 ml-1"
            />
          </View>
          <Gap height={10} />
          <View className="flex-row items-center">
            <Icon name="check-circle" size={26} color={colors.primary} />
            <DefaultText title="Deposito Aktif" titleClassName="flex-1 ml-1" />
          </View>
          <Gap height={10} />
          <View className="flex-row items-center">
            <Icon name="check-circle" size={26} color={'#dbd4c8'} />
            <DefaultText title="Pelunasan" titleClassName="flex-1 ml-1" />
          </View>
          <Gap height={30} />
          <View className="flex-row justify-center">
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              className="self-center bg-primary px-3 py-2 rounded-md">
              <DefaultText title="Tanya produk" titleClassName="text-white" />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              onPress={() => setShowModalBatal(true)}
              activeOpacity={0.7}
              className="self-center bg-primary px-3 py-2 rounded-md">
              <DefaultText title="Pembatalan" titleClassName="text-white" />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              className="self-center bg-primary px-3 py-2 rounded-md">
              <DefaultText title="Tutup" titleClassName="text-white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ModalAlert
        show={showModalBatal}
        hide={() => setShowModalBatal(false)}
        title={
          'Anda akan membatalkan transaksi ini ?\nPengajuan anda akan kami validasi terlebih dahulu dalam waktu maksimal 2x24jam'
        }
        onConfirm={() => {
          setShowModalBatal(false);
          setTimeout(() => navigationRef.goBack(), 1000);
        }}
        type="warning"
      />
    </DefaultView>
  );
}
