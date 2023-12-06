import { ActivityIndicator, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { getPembatalanPortofolioDetail, getPenarikanPortofolioDetail, getShowBuktiBagiHasilPortofolioDetail, getShowPortofolioDetail } from '../../services/portofolio';
import { formatRupiah } from '../../utils/currency';
import { MAX_FILE_SIZE, SYARIAH_URL, capitalizeFirstLetter } from '../../utils/constant';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import ModalImage from '../../components/ModalImage';
import ModalImagelunas from '../../components/ModalImage';
import { uploadBuktiPengajuan } from '../../services/user';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function PortofolioDetail({ route }: RootStackScreenProps<'PortofolioDetail'>) {
  const no_transaksi = route.params?.no_transaksi;
  const [perpanjang, setPerpanjang] = useState<boolean>(true);
  const [showModalBatal, setShowModalBatal] = useState<boolean>(false);
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [showImageUploadLunas, setShowImageUploadLunas] = useState<boolean>(false);
  const [isShowImageProsesPenarikan, setShowImageProsesPenarikan] = useState<boolean>(false);
  const [buktiTF, setBuktiTF] = useState<Asset | string>() as any;
  const { showPortofolioDetail, showBuktiHasilPortofolioLoadingDetail, showButktiHasilPortofolioDetail, showPortofolioLoadingDetail } = useSelector((state: RootState) => state.portofolioReducer);
  const [upload_bukti_tf, setUpload_Bukti_Tf] = useState<string | Asset>(showPortofolioDetail?.data?.buktiTF ? `${SYARIAH_URL}/${showPortofolioDetail?.data?.buktiTF?.image}` : '') as any;
  const dispatch = useDispatch<RootDispatch>();
  const dummyStatus = [
    { "message": "Pengajuan Deposito", "status": true },
    { "message": "Tanda Tangan Dokumen", "status": false },
    { "message": "Pengajuan Disetujui BPR", "status": false },
    { "message": "Pembayaran Berhasil", "status": false },
    { "message": "Deposito Aktif", "status": false },
    {
      "message": "Pelunasan", "status": false
    }]
  const [timeShow, setTimeShow] = useState<any>(dummyStatus);
  const [messageText, setMessageText] = useState<string | undefined>("Tahapan berikutnya adalah Tanda Tangan Dokumen, silahkan cek email Anda untuk tanda tangan dokumen");
  const totalPengem = parseInt(showPortofolioDetail?.data?.amount) + parseInt(showPortofolioDetail?.data?.bagi_hasil);
  const [flagSubmit, setFlagSubmit] = useState<string>('');
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(getShowPortofolioDetail(no_transaksi));
  }, [no_transaksi]);

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return navigation.navigate("Portofolio");
    }),
    [navigation]
  );

  useEffect(() => {
    dispatch(getShowBuktiBagiHasilPortofolioDetail(showPortofolioDetail?.data?.bagiHasil?.data?.no_transaksi));
    setUpload_Bukti_Tf(showPortofolioDetail?.data?.buktiTF?.image ? `${SYARIAH_URL}/${showPortofolioDetail?.data?.buktiTF?.image}` : null)
  }, [showPortofolioDetail])

  console.log("showButktiHasilPortofolioDetail", showButktiHasilPortofolioDetail);


  useEffect(() => {
    switch (parseInt(showPortofolioDetail?.data?.status)) {
      case 2:
        setMessageText("Tahapan berikutnya adalah persetujuan pengajuan deposito dari pihak Bank, mohon ditunggu");
        setTimeShow([
          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Tanda Tangan Dokumen", "status": true },
          { "message": "Pengajuan Disetujui BPR", "status": false },
          { "message": "Pembayaran Berhasil", "status": false },
          { "message": "Deposito Aktif", "status": false },
          {
            "message": "Pelunasan", "status": false
          }])
        break;
      case 3:
        setMessageText("Tahapan berikutnya adalah pembayaran deposito, mohon untuk diupload bukti pembayarannya")
        setTimeShow([

          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Tanda Tangan Dokumen", "status": true },
          { "message": "Pengajuan Disetujui BPR", "status": true },
          { "message": "Pembayaran Berhasil", "status": false },
          { "message": "Deposito Aktif", "status": false },
          {
            "message": "Pelunasan", "status": false
          }])
        break;
      case 4:
        setMessageText(
          "Deposito anda sudah aktif dan bagi hasil akan ditransfer oleh pihak Bank di akhir periode masa aktif deposito")
        setTimeShow([

          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Tanda Tangan Dokumen", "status": true },
          { "message": "Pengajuan Disetujui BPR", "status": true },
          { "message": "Pembayaran Berhasil", "status": true },
          { "message": "Deposito Aktif", "status": false },
          {
            "message": "Pelunasan", "status": false
          }])
        break;
      case 5:
        setMessageText(undefined);
        setTimeShow([

          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Tanda Tangan Dokumen", "status": true },
          { "message": "Pengajuan Disetujui BPR", "status": true },
          { "message": "Pembayaran Berhasil", "status": true },
          { "message": "Deposito Aktif", "status": true },
          {
            "message": "Pelunasan", "status": false
          }])
        break;
      case 9:
        setMessageText(undefined);
        setTimeShow([

          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Tanda Tangan Dokumen", "status": true },
          { "message": "Pengajuan Disetujui BPR", "status": true },
          { "message": "Pembayaran Berhasil", "status": true },
          { "message": "Deposito Aktif", "status": true },
          {
            "message": "Pelunasan", "status": true
          }])
        break;
      case 0:
      case 6:
        setMessageText('Portofolio telah dibatalkan');
        setTimeShow([

          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Dibatalkan", "status": true }])
        break;
      default:
        setTimeShow([
          { "message": "Pengajuan Deposito", "status": true },
          { "message": "Tanda Tangan Dokumen", "status": false },
          { "message": "Pengajuan Disetujui BPR", "status": false },
          { "message": "Pembayaran Berhasil", "status": false },
          { "message": "Deposito Aktif", "status": false },
          {
            "message": "Pelunasan", "status": false
          }])
    }
  }, [showPortofolioDetail?.data?.status])

  const onOpeGallery = async (index: number) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      if (result?.assets[0]?.fileSize as any > MAX_FILE_SIZE) {
        return Toast.show({
          type: 'error',
          text1: 'Perhatian',
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
    let validSubmit = showPortofolioDetail?.data?.buktiTF
    let formdata = new FormData();
    formdata.append('image', {
      size: buktiTF?.fileSize,
      uri: buktiTF?.uri,
      name: buktiTF?.fileName,
      type: buktiTF?.type,
    } ?? '');
    dispatch(uploadBuktiPengajuan(formdata, showPortofolioDetail?.data?.no_transaksi as any, validSubmit));
  };

  const actionProsesPenarikan = () => {
    setShowImageProsesPenarikan(!isShowImageProsesPenarikan)
  }
  const bgVal = () => {
    let bgColor = 'orange'
    if (showPortofolioDetail?.data?.status === "6" || showPortofolioDetail?.data?.status === "0") {
      bgColor = 'red'
    }
    if (showPortofolioDetail?.data?.status === "4") {
      bgColor = 'bg-yellow-600'
    }
    if (showPortofolioDetail?.data?.status === "5") {
      bgColor = '#2193b0'
    }
    if (showPortofolioDetail?.data?.status === "9") {
      bgColor = '#0f9b0f'
    }
    return bgColor;
  }
  const statusVal = () => {
    let status = 'Process';
    if (showPortofolioDetail?.data?.status === "6" || showPortofolioDetail?.data?.status === "0") {
      status = 'Batal'
    }
    if (showPortofolioDetail?.data?.status === "4") {
      status = 'Pembayaran Berhasil'
    }
    if (showPortofolioDetail?.data?.penarikan?.status) {
      status = 'Proses Penarikan'
    } else if (showPortofolioDetail?.data?.pengembalian?.status) {
      status = 'Proses Pengembalian'
    } else if (showPortofolioDetail?.data?.status === "5") {
      status = 'Aktif'
    }
    if (showPortofolioDetail?.data?.status === "9") {
      status = 'Lunas'
    }
    return { status: status };
  };

  const statusTransaksi = () => {
    let status;
    showPortofolioDetail?.data?.periode?.forEach((per: any) => {
      per.no_trx.forEach((trx: any) => {
        status = parseInt(trx.status) === 5 ? 'Berhasil' : 'Proses'
      })
    })
    return status;
  }

  return (
    <DefaultView>
      <DefaultHeader backButton={() => navigationRef.navigate('Portofolio')} title="Detail Portofolio" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {showPortofolioLoadingDetail ? 
        <ActivityIndicator 
        style={{ position: 'absolute', top: 150, left: 0, right: 0 }}
          size={'large'} /> :
          <View className="px-8">
            <Gap height={15} />
            <DefaultText
              title="Detail Portofolio"
              titleClassName="font-inter-semibold"
            />
            <View className="w-full h-[1px] bg-neutral-300 my-3" />
            <View className="flex-row">
              <DefaultText
                title={showPortofolioDetail?.data?.namaMitra}
                titleClassName="text-base flex-1 font-inter-semibold"
              />
              <View style={{ backgroundColor: bgVal() }} className={`px-3 py-2 rounded-md self-center`}>
                <DefaultText
                  title={capitalizeFirstLetter(statusVal().status)}
                  titleClassName="text-xs text-white"
                />
              </View>
            </View>
            <View className="w-full h-[1px] bg-neutral-300 my-3" />
            <View className="flex-row">
              <DefaultText title="No Transaksi" titleClassName="flex-1" />
              <DefaultText title={no_transaksi} titleClassName="text-base font-inter-semibold" />
            </View>
            {showPortofolioDetail?.data?.penarikan?.status &&
              <TouchableOpacity
                onPress={() => actionProsesPenarikan()}
                activeOpacity={0.7}
                className="self-center flex px-3 py-2 bg-blue-600 text-white rounded-full py-1 px-4 text-xs">
                <DefaultText title={isShowImageProsesPenarikan ? "Hide Proses Penarikan" : "Proses Penarikan"} titleClassName="text-white" />
              </TouchableOpacity>}

            <View className="w-full h-[1px] bg-neutral-300 my-3" />
            <View className="flex-row">
              <DefaultText
                title={`Pilihan Tenor\n${showPortofolioDetail?.data?.tenor} Bulan`}
                titleClassName="flex-1"
              />
              <DefaultText title={`Bagi Hasil\n${showPortofolioDetail?.data?.bagi_hasil_setara}%`} />
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
            <Gap height={10} />
            <View className="w-full h-[1px] bg-neutral-300 my-3" />
            <View className="flex-row">
              <DefaultText title="Nama Pemilik Rekening" titleClassName="flex-1" />
              <DefaultText title={showPortofolioDetail?.data?.norek?.atas_nama} />
            </View>
            <Gap height={10} />
            <View className="flex-row">
              <DefaultText title="No Rekening" titleClassName="flex-1" />
              <DefaultText title={showPortofolioDetail?.data?.norek?.norek} />
            </View>
            <Gap height={10} />
            <View className="flex-row">
              <DefaultText title="Nama Bank" titleClassName="flex-1" />
              <DefaultText title={showPortofolioDetail?.data?.norek?.nama} />
            </View>
            <Gap height={10} />
            <View className="w-full h-[1px] bg-neutral-300 my-3" />
            <View className="flex-row">
              <DefaultText
                title="Perpanjang Otomatis Deposito"
                titleClassName="flex-1"
              />
              <DefaultText
                title={showPortofolioDetail?.data?.periode && showPortofolioDetail?.data?.periode[0]?.aro == 1 ? "Ya" : "Tidak"}
              />
            </View>
            <View className="w-full h-[1px] bg-neutral-300 my-3" />
            {isShowImageProsesPenarikan ? null : showPortofolioDetail?.data?.norekMitra?.map((list: any) => {
              return <View>
                <Gap height={20} />
                <DefaultText title='Rekening Pembayaran Deposito' titleClassName='font-inter-bold' />
                <Gap height={10} />
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
            {showPortofolioDetail?.data?.statuses && showPortofolioDetail?.data?.statuses[3]?.status && <View className="flex-row items-center">
              <DefaultText title="Bukti Transfer" titleClassName="flex-1" />
              {upload_bukti_tf ?
                <Image source={{ uri: upload_bukti_tf }} style={{ height: 100, width: 130 }} /> :
                <TouchableOpacity
                  className='border-[1px] border-primary mt-2 rounded-full self-center flex-row px-4 py-2'
                  onPress={() => onOpeGallery(0)}>
                  <DefaultText
                    title={'Upload Foto'}
                    titleClassName="font-inter-regular "
                  />
                  <Icon name="upload" size={20} />
                </TouchableOpacity>}
              {upload_bukti_tf && <Gap width={20} />}
              {upload_bukti_tf &&
                <Icon name="eye" onPress={() => setShowImageUpload(true)} size={22} />
              }
              {!showPortofolioDetail?.data?.penarikan?.status && upload_bukti_tf && <Gap width={20} />}
              {!showPortofolioDetail?.data?.penarikan?.status && upload_bukti_tf &&
                <Icon name="trash-can"
                  size={22}
                  onPress={() => {
                    setUpload_Bukti_Tf(undefined);
                    setBuktiTF(undefined);
                  }} />
              }
            </View>}
            <Gap height={10} />
            {!showPortofolioDetail?.data?.penarikan?.status && showPortofolioDetail?.data?.statuses && showPortofolioDetail?.data?.statuses[3]?.status && buktiTF?.uri &&
              <TouchableOpacity
                onPress={() => onSave()}
                activeOpacity={0.7}
                className="self-center flex bg-primary px-3 py-2 rounded-full">
                <DefaultText title="Simpan Bukti Transfer" titleClassName="text-white" />
              </TouchableOpacity>}
            <Gap height={10} />
            {isShowImageProsesPenarikan ?
              <View>
                <DefaultText title="Detail Transaksi Pengembalian" titleClassName="font-inter-bold" />
                <Gap height={20} />
                <View className="flex-row">
                  <DefaultText title={`Periode ${showPortofolioDetail?.data?.periode[0]?.start_date} - ${showPortofolioDetail?.data?.periode[0]?.end_date}`} titleClassName="flex-1" />
                  <DefaultText title={showPortofolioDetail?.data?.periode[0]?.statusNa} />
                </View>
                <Gap height={10} />
                <View className="flex-row">
                  <DefaultText title="Penarikan" />
                  <Gap width={5} />
                  <View style={{ backgroundColor: statusTransaksi() === 'Berhasil' ? "#0f9b0f" : bgVal(), width: 70 }} className={`px-3 py-2 self-center rounded-md`}>
                    <DefaultText
                      title={capitalizeFirstLetter(statusTransaksi() as any)}
                      titleClassName="text-xs text-white"
                    />
                  </View>
                  <Text className='flex-1' />
                  <DefaultText title={formatRupiah(String(showPortofolioDetail?.data?.periode[0]?.no_trx[0]?.amount), 'Rp ')} />
                </View>
                <Gap height={10} />
                <View className="flex-row">
                  <DefaultText title="Bagi Hasil" />
                  <Gap width={5} />
                  <View style={{ backgroundColor: statusTransaksi() === 'Berhasil' ? "#0f9b0f" : bgVal(), width: 70 }} className={`px-3 py-2 self-center rounded-md`}>
                    <DefaultText
                      title={capitalizeFirstLetter(statusTransaksi() as any)}
                      titleClassName="text-xs text-white"
                    />
                  </View>
                  <Text className='flex-1' />
                  <DefaultText title={formatRupiah(String(showPortofolioDetail?.data?.periode[0]?.no_trx[1]?.amount), 'Rp ')} />
                </View>
                <Gap height={30} />
                <View className="w-full h-[1px] bg-neutral-300 mb-3 mt-1" />
                {showButktiHasilPortofolioDetail?.data?.image &&
                  <View className="flex-row items-center">
                    <DefaultText title="Lihat Bukti Transfer" titleClassName="flex-1" />
                    <Image source={{ uri: `${SYARIAH_URL}/${showButktiHasilPortofolioDetail?.data?.image}` }}
                      style={{ height: 100, width: 130 }} />
                    <Gap width={20} />
                    <Icon name="eye" onPress={() => setShowImageUploadLunas(true)} size={22} />
                  </View>}
              </View> : <View>
                <View className="w-full h-[1px] bg-neutral-300 mb-3 mt-1" />
                <View className="flex-row">
                  <DefaultText title="Proses" titleClassName="font-inter-bold" />
                </View>
                <Gap height={10} />
                {messageText && <View
                  className="bg-primary-light rounded-2xl px-5 py-3 flex-row items-center">
                  <View className="flex-1">
                    <DefaultText title={messageText} />
                  </View>
                </View>}
                <Gap height={10} />
                {timeShow?.map((list: any) => {
                  return <View className="flex-row items-center">
                    <Icon name="check-circle" size={26} color={list.status ? colors.primary : '#dbd4c8'} />
                    <DefaultText
                      title={list.message}
                      titleClassName="flex-1 ml-1"
                    />
                  </View>
                })}
              </View>}
            <Gap height={30} />
            <View className="flex-row justify-center">
              {/* <TouchableOpacity
                onPress={() => { }}
                activeOpacity={0.7}
                className="self-center bg-primary px-3 py-2 mr-3 rounded-full">
                <DefaultText title="Tanya produk" titleClassName="text-white" />
              </TouchableOpacity> */}

              {showPortofolioDetail?.data?.status == 5 && !showPortofolioDetail?.data?.penarikan?.status &&
                <TouchableOpacity
                  onPress={() => {
                    setShowModalBatal(true);
                    setFlagSubmit("penarikan")
                  }}
                  activeOpacity={0.7}
                  className="self-center bg-primary px-3 py-2 mr-3  rounded-full">
                  <DefaultText title="Penarikan" titleClassName="text-white" />
                </TouchableOpacity>}

              {(showPortofolioDetail?.data?.status == 1 || showPortofolioDetail?.data?.status == 2 || showPortofolioDetail?.data?.status == 3) && <TouchableOpacity
                onPress={() => { setShowModalBatal(true); setFlagSubmit("pembatalan") }}
                activeOpacity={0.7}
                className="self-center bg-primary px-3 py-2 mr-3  rounded-full">
                <DefaultText title="Pembatalan" titleClassName="text-white" />
              </TouchableOpacity>}

              <TouchableOpacity
                onPress={() => { navigationRef.navigate('Portofolio') }}
                activeOpacity={0.7}
                className="self-center bg-primary px-3 py-2 mr-3  rounded-full">
                <DefaultText title="Tutup" titleClassName="text-white" />
              </TouchableOpacity>
            </View>
            <Gap height={20} />
          </View>}
      </ScrollView>
      <ModalImagelunas
        title={'Preview Image Bukti Transfer '}
        hide={() => setShowImageUploadLunas(false)}
        data={`${SYARIAH_URL}/${showButktiHasilPortofolioDetail?.data?.image}`}
        show={showImageUploadLunas}
        onConfirm={() => setShowImageUploadLunas(false)} />
      <ModalImage
        title={'Preview Image Upload'}
        hide={() => setShowImageUpload(false)}
        data={upload_bukti_tf as string}
        show={showImageUpload}
        onConfirm={() => setShowImageUpload(false)} />
      <ModalAlert
        show={showModalBatal}
        hide={() => setShowModalBatal(false)}
        title={
          'Anda akan melakukan transaksi ini ?\nPengajuan anda akan kami validasi terlebih dahulu dalam waktu maksimal 2x24jam'
        }
        onConfirm={() => {
          flagSubmit === "penarikan" ?
            dispatch(getPenarikanPortofolioDetail(no_transaksi, setShowModalBatal)) :
            dispatch(getPembatalanPortofolioDetail(no_transaksi, setShowModalBatal))
        }}
        type="warning"
      />
    </DefaultView>
  );
}
