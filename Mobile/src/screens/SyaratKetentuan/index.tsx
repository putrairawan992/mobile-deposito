import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import {colors} from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import {navigationRef} from '../../navigations/RootNavigation';
import {showToast} from '../../utils/toast';

export default function SyaratKetentuan() {
  const [agree, setAgree] = useState<boolean>(false);

  const onLanjut = () => {
    if (!agree) {
      return showToast('Centang syarat dan ketentuan.');
    }
    navigationRef.navigate('Register');
  };

  return (
    <DefaultView
      statusBarColor={colors.primary}
      containerClassName="bg-primary">
      <View className="px-5 py-5">
        <DefaultText
          title="Syarat dan Ketentuan"
          titleClassName="text-white font-inter-bold text-xl"
        />
        <Gap height={10} />
        <DefaultText
          title="Sebelum memulai, baca dan setujui Syarat & Ketentuan dibawah dulu ya."
          titleClassName="text-white"
        />
      </View>
      <View className="px-5 py-4 bg-white flex-1 rounded-t-2xl">
        <ScrollView showsVerticalScrollIndicator={false}>
          <DefaultText
            title="SYARAT & KETENTUAN DEPOSITO SYARIAH"
            titleClassName="font-inter-semibold text-center"
          />
          <Gap height={10} />
          <DefaultText
            title="Syarat dan Ketentuan ini telah disesuaikan dengan ketentuan peraturan perundang-undangan termasuk ketentutan Peraturan Otoritas Jasa Keuangan (OJK). Dengan mengakses atau menggunakan Layanan Deposito Syariah. Nasabah mengakui dan menyetujui untuk mengikatkan diri dan mematuhi seluruh syarat dan ketentuan ini."
            titleClassName="text-center leading-5"
          />
          <DefaultText title=" A. Definisi" titleClassName="text-left mt-5" />
          <DefaultText
            title="1.	m-DepositoSyariah (Mobile Banking) adalah layanan produk perbankan PT Bank Harta Insan Karimah (“HIK”) yang dapat diakses secara langsung oleh Nasabah melalui telepon seluler/handphone, baik dengan menggunakan menu yang sudah tersedia di Subscriber Identification Module (SIM) Card, dengan menggunakan media SMS atau menggunakan menu pada HIK mobile dengan menggunakan media jaringan internet pada handphone dikombinasikan dengan media SMS sesuai ketentuan yang berlaku di HIK."
            titleClassName="text-left text-justify mt-5"
          />
          <DefaultText
            title="2.	HIK mobile adalah aplikasi yang dapat di-download dari website resmi HIK maupun media distribusi aplikasi/software resmi yang ditunjuk HIK yang dimiliki oleh mobile operating system yang terdapat di handphone nasabah untuk melakukan transaksi melalui m-DepositoSyariah dan KlikHIK atau untuk memperoleh Info HIK."
            titleClassName="text-left text-justify mt-5"
          />
          <DefaultText
            title="3.	PIN (Personal Identification Number) m-DepositoSyariah adalah nomor identifikasi pribadi bagi Nasabah yang menggunakan m-DepositoSyariah."
            titleClassName="text-left text-justify mt-5"
          />
          <DefaultText
            title="4. Kode Akses adalah kode pribadi bagi Nasabah yang menggunakan m-DepositoSyariah pada HIK mobile."
            titleClassName="text-left text-justify mt-5"
          />
          <DefaultText
            title="5.	Kode Transaksi adalah suatu kode yang dihasilkan oleh m-DepositoSyariah pada HIK mobile untuk melakukan transaksi tarik tunai, setor tunai di ATM HIK, atau transaksi di kantor cabang HIK tanpa menggunakan Kartu ATM HIK."
            titleClassName="text-left text-justify mt-5"
          />
          <DefaultText
            title="6.	Info HIK adalah layanan informasi mengenai produk dan layanan HIK berikut program promosinya, lokasi kantor cabang HIK dan informasi lainnya terkait dengan HIK."
            titleClassName="text-left text-justify mt-5"
          />
        </ScrollView>
        <View className="pb-10">
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setAgree(!agree)}
              activeOpacity={0.7}
              className="w-[20] h-[20] border-[1px] border-black justify-center items-center rounded-sm">
              {agree && <Icon name="check" size={18} color={colors.black} />}
            </TouchableOpacity>
            <Gap width={10} />
            <DefaultText
              title="Saya setuju dengan syarat dan ketentuan yang berlaku"
              titleClassName="flex-1"
            />
          </View>
          <Gap height={20} />
          <Button
            title="LANJUT"
            className="bg-primary mx-10"
            titleClassName="text-white"
            onPress={onLanjut}
          />
        </View>
      </View>
    </DefaultView>
  );
}
