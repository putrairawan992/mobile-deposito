import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import ModalAlert from '../../components/ModalAlert';
import { navigationRef } from '../../navigation/RootNavigation';
import { RootStackScreenProps } from '../../navigation/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowPortofolioDetail } from '../../services/portofolio';
import { formatRupiah } from '../../utils/currency';
import { MAX_FILE_SIZE } from '../../utils/constant';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import ModalImage from '../../components/ModalImage';
import { uploadBuktiPengajuan } from '../../services/user';

export default function PortofolioDetail({ route }: RootStackScreenProps<'PortofolioDetail'>) {
  const no_transaksi = route.params?.no_transaksi;
  const [perpanjang, setPerpanjang] = useState<boolean>(true);
  const [showModalBatal, setShowModalBatal] = useState<boolean>(false);
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [buktiTF, setBuktiTF] = useState<Asset | string>() as any;
  const { showPortofolioDetail, showPortofolioLoadingDetail } = useSelector((state: RootState) => state.portofolioReducer);
  const [upload_bukti_tf, setUpload_Bukti_Tf] = useState<string | Asset>(showPortofolioDetail?.data?.buktiTF ? `https://dev.depositosyariah.id/${showPortofolioDetail?.data?.buktiTF?.image}` : '') as any;
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowPortofolioDetail(no_transaksi))
  }, [no_transaksi]);

  useEffect(()=>{
    setUpload_Bukti_Tf(`https://dev.depositosyariah.id/${showPortofolioDetail?.data?.buktiTF?.image}`)
  },[showPortofolioDetail])

  const onOpeGallery = async (index: number) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      if (result?.assets[0]?.fileSize as any > MAX_FILE_SIZE) {
        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Max Upload 500kb',
        });
      } else {
        if (index === 0) {
          setBuktiTF(result.assets[0]);
          setUpload_Bukti_Tf(result?.assets[0]?.uri);
        }
      }
    }

  };
  const onSave = () => {
    let formdata = new FormData();
    formdata.append('image', {
      size: buktiTF?.fileSize,
      uri: buktiTF?.uri,
      name: buktiTF?.fileName,
      type: buktiTF?.type,
    } ?? '');
    dispatch(uploadBuktiPengajuan(formdata, showPortofolioDetail?.data?.no_transaksi as any));
  };

  console.log("showPortofolioDetail", showPortofolioDetail?.data);

  const totalPengem = parseInt(showPortofolioDetail?.data?.amount) + parseInt(showPortofolioDetail?.data?.bagi_hasil)
  return (
    <DefaultView>
      <DefaultHeader title="Detail Portofolio" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {showPortofolioLoadingDetail ? <ActivityIndicator /> : <View className="px-8">
          <Gap height={15} />
          <DefaultText
            title="Detail Portofolio"
            titleClassName="font-inter-semibold"
          />
          <View className="w-full h-[1px] bg-neutral-300 my-3" />
          <DefaultText
            title={showPortofolioDetail?.data?.namaMitra}
            titleClassName="text-base font-inter-semibold"
          />
          <View className="w-full h-[1px] bg-neutral-300 my-3" />
          <View className="flex-row">
            <DefaultText
              title={`Pilihan Tenor\n${showPortofolioDetail?.data?.tenor} Bulan`}
              titleClassName="flex-1"
            />
            <DefaultText title={`Bagi Hasil\n${showPortofolioDetail?.data?.bagi_hasil_setara}%`} />
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
            <DefaultText title={`${formatRupiah(String(showPortofolioDetail?.data?.amount), 'Rp')}`} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText title="Estimasi Bagi Hasil" titleClassName="flex-1" />
            <DefaultText title={`${formatRupiah(String(showPortofolioDetail?.data?.bagi_hasil), 'Rp')}`} />
          </View>
          <Gap height={10} />
          <View className="flex-row">
            <DefaultText
              title="Estimasi Total Pengembalian"
              titleClassName="flex-1"
            />
            <DefaultText title={`${formatRupiah(String(totalPengem), 'Rp')}`} />
          </View>
          <Gap height={20} />
          {showPortofolioDetail?.data?.norekMitra?.map((list: any) => {
            return <View style={{ marginTop: 22 }}>
              <View className="flex-row">
                <DefaultText title="Nama Bank" titleClassName="flex-1" />
                <DefaultText title={list?.nama} />
              </View>
              <Gap height={5} />
              <View className="flex-row">
                <DefaultText title="Nama Pemilik" titleClassName="flex-1" />
                <DefaultText title={list.atas_nama} />
              </View>
              <Gap height={5} />
              <View className="flex-row">
                <DefaultText title="Nomor Rekening" titleClassName="flex-1" />
                <DefaultText title={list.norek} />
              </View>
            </View>
          })}
          <View className="w-full h-[1px] bg-neutral-300 my-3" />
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Bukti Transfer" titleClassName="flex-1" />
            {upload_bukti_tf ?
              <Image source={{ uri: upload_bukti_tf }} style={{ height: 100, width: 130 }} /> :
              <TouchableOpacity
                className='border-[1px] border-primary rounded-md w-[200] px-2 py-2 flex-row items-center'
                onPress={() => onOpeGallery(0)}>
                <DefaultText
                  title={'Upload Image'}
                  titleClassName="m-0 p-0 font-inter-regular "
                  titleProps={{ numberOfLines: 1 }}
                />

                <Icon name="upload" style={{ marginLeft: 50 }} size={20} />
              </TouchableOpacity>}
            <Gap width={20} />
            <Icon name="eye" onPress={() => setShowImageUpload(true)} size={22} />
            <Gap width={20} />
            {upload_bukti_tf &&
              <Icon name="trash-can" 
              size={22}
                onPress={() => {
                  setUpload_Bukti_Tf(undefined);
                  setBuktiTF(undefined);
                }} />
            }

          </View>
          <Gap height={10} />
          {buktiTF?.uri && <TouchableOpacity
            onPress={() => onSave()}
            activeOpacity={0.7}
            className="self-center flex bg-primary px-3 py-2 rounded-md">
            <DefaultText title="Submit Bukti Transfer" titleClassName="text-white" />
          </TouchableOpacity>}
          <Gap height={10} />
          <View className="w-full h-[1px] bg-neutral-300 mb-3 mt-1" />
          {showPortofolioDetail?.data?.statuses?.map((list: any) => {
            return <View className="flex-row items-center">
              <Icon name="check-circle" size={26} color={list.status ? colors.primary : '#dbd4c8'} />
              <DefaultText
                title={list.message}
                titleClassName="flex-1 ml-1"
              />
            </View>
          })}
          <Gap height={30} />
          <View className="flex-row justify-center">
            <TouchableOpacity
              onPress={() => { }}
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
              onPress={() => { }}
              activeOpacity={0.7}
              className="self-center bg-primary px-3 py-2 rounded-md">
              <DefaultText title="Tutup" titleClassName="text-white" />
            </TouchableOpacity>
          </View>
          <Gap height={20} />
        </View>}
      </ScrollView>
      <ModalImage
        title='Preview Image Upload'
        hide={() => setShowImageUpload(false)}
        data={upload_bukti_tf as string}
        show={showImageUpload}
        onConfirm={() => setShowImageUpload(false)} />
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
