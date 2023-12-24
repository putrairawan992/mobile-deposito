import { ActivityIndicator, Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
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
import { RootDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailNasabah, updateNasabah } from '../../services/user';
import { MAX_FILE_SIZE, SYARIAH_URL, penghasilanValidation, statusNikahValidation } from '../../utils/constant';
import ModalStatusPernikahan from '../../components/ModalStatusPernikahan';
import ModalPenghasilan from '../../components/ModalPenghasilan';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import ModalImageSelfie from '../../components/ModalImage';
import ModalImage from '../../components/ModalImage';

export default function DetailPribadiEdit({ route }: RootStackScreenProps<'DetailPribadiEdit'>) {
  const detailPribadi = route.params?.detailNasabah as any;
  const [ktp, setKtp] = useState<string>(detailPribadi?.ktp);
  const [nama, setNama] = useState<string>(detailPribadi?.nama);
  const [tempatLahir, setTempatLahir] = useState<string>(detailPribadi?.tmpt_lahir);
  const [tanggalLahir, setTanggalLahir] = useState<Date>();
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
  const [ktp_image, setKtp_image] = useState<string | Asset>(detailPribadi?.image_ktp ? `${SYARIAH_URL}/${detailPribadi?.image_ktp}` : '') as any;
  const [image_selfie, setImage_selfie] = useState<string | Asset>(detailPribadi?.image_selfie ? `${SYARIAH_URL}/${detailPribadi?.image_selfie}` : '') as any;
  const [fotoKtp, setFotoKtp] = useState<Asset | string>() as any;
  const [fotoNasabah, setFotoNasabah] = useState<Asset | string>() as any;
  const [showStatusPernikahan, setShowStatusPernikahan] =
    useState<boolean>(false);
  const [showImageKtp, setShowImageKtp] = useState<boolean>(false);
  const [showImageSelfieKtp, setShowImageSelfieKtp] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const { updateRegisterLoading,token } = useSelector(
    (state: RootState) => state.userReducer,
  );
console.log("token",token);

  const onSave = () => {
    if (ktp.trim().length !== 16) {
      return showToast('No KTP tidak valid');
    }
    if (pin.trim().length < 6) {
      return showToast('Masukkan PIN kamu');
    }
    let formdata = new FormData();
    formdata.append('ktp', ktp);
    formdata.append('nama', nama);
    formdata.append('tmpt_lahir', tempatLahir);
    formdata.append('tgl_lahir', moment(tanggalLahir).format('YYYY-MM-DD'));
    formdata.append('ibu_kandung', ibu);
    formdata.append('status_pernikahan', statusNikah);
    formdata.append('jenis_pekerjaan', profesi);
    formdata.append('nama_perusahaan', perusahaan);
    formdata.append('alamat_kerja', alamatPerusahaan);
    formdata.append('penghasilan', penghasilan);
    fotoKtp && formdata.append('image_ktp', {
      size: fotoKtp?.fileSize,
      uri: fotoKtp?.uri,
      name: fotoKtp?.fileName,
      type: fotoKtp?.type,
    } ?? '');
    fotoNasabah && formdata.append('image_selfie', {
      size: fotoNasabah?.fileSize,
      uri: fotoNasabah?.uri,
      name: fotoNasabah?.fileName,
      type: fotoNasabah?.type,
    } ?? '');
    formdata.append('pin', pin);
    dispatch(updateNasabah(formdata, setShowModalSuccess));
  };

  const onOpeGallery = async (index: number, type?: string) => {
    let result;
    if (type === 'selfie') {
      result = await launchCamera({ mediaType: 'photo', maxHeight: 800, maxWidth: 1100 });
    } else {
      result = await launchImageLibrary({ mediaType: 'photo' });
    }
    if (result.assets) {
      if (result?.assets[0]?.fileSize as any > MAX_FILE_SIZE) {
        return Toast.show({
          type: 'error',
          text1: 'Perhatian',
          text2: 'Max Upload 500kb',
        });
      } else {
        if (index === 0) {
          setFotoKtp(result.assets[0]);
          setKtp_image(result?.assets[0]?.uri);
        } else if (index === 1) {
          setFotoNasabah(result.assets[0]);
          setImage_selfie(result?.assets[0]?.uri);
        }
      }
    }

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
                maxLength={16}
                onChangeText={value => setKtp(value)}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[200] px-2 py-2">
              <TextInput
                className="m-0 p-0 font-inter-regular"
                value={nama}
                onChangeText={value => setNama(value)}
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
                value={tanggalLahir ? moment(tanggalLahir).format('DD-MMMM-YYYY') : detailPribadi?.tgl_lahir}
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
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto KTP " titleClassName="flex-1" />
            {ktp_image ?
              <TouchableOpacity onPress={() => setShowImageKtp(true)} >
                <View>
                  <Image source={{ uri: ktp_image }} style={{ height: 100, width: 180 }} />
                </View>
              </TouchableOpacity> :
              <TouchableOpacity
                className='border-[1px] border-primary rounded-md w-[200] px-2 py-2 flex-row items-center'
                onPress={() => onOpeGallery(0)}>
                <DefaultText
                  title={'Upload Foto'}
                  titleClassName="m-0 p-0 font-inter-regular "
                  titleProps={{ numberOfLines: 1 }}
                />

                <Icon name="upload" style={{ marginLeft: 50 }} size={20} />
              </TouchableOpacity>}

            {ktp_image && <Icon name="trash-can" onPress={() => {
              setFotoKtp(undefined);
              setKtp_image(undefined);
            }} size={20} />}
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto Selfie " titleClassName="flex-1" />
            {image_selfie ?
              <TouchableOpacity onPress={() => setShowImageSelfieKtp(true)}>
                <View>
                  <Image source={{ uri: image_selfie }} style={{ height: 100, width: 180 }} />
                </View>
              </TouchableOpacity> :
              <TouchableOpacity
                className='border-[1px] border-primary rounded-md w-[200] px-2 py-2 flex-row items-center'
                onPress={() => onOpeGallery(1, "selfie")}>
                <DefaultText
                  title={'Ambil Foto'}
                  titleClassName="m-0 p-0 font-inter-regular "
                  titleProps={{ numberOfLines: 1 }}
                />

                <Icon name="camera" style={{ marginLeft: 50 }} size={20} />
              </TouchableOpacity>}

            {image_selfie && <Icon name="trash-can" onPress={() => {
              setFotoKtp(undefined);
              setImage_selfie(undefined);
            }} size={20} />}
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
          {updateRegisterLoading ? <ActivityIndicator /> :
            <TouchableOpacity
              onPress={onSave}
              activeOpacity={0.7}
              className="bg-primary px-10 py-3 rounded-md self-center">
              <DefaultText title="Simpan" titleClassName="text-white" />
            </TouchableOpacity>}
        </View>
      </ScrollView>

      <ModalImage
        title='Lihat Foto KTP'
        hide={() => setShowImageKtp(false)}
        data={ktp_image as any}
        show={showImageKtp}
        onConfirm={() => setShowImageKtp(false)} />
      <ModalImageSelfie
        title='Lihat Selfie KTP'
        hide={() => setShowImageSelfieKtp(false)}
        data={image_selfie as any}
        show={showImageSelfieKtp}
        onConfirm={() => setShowImageSelfieKtp(false)} />

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
          dispatch(getDetailNasabah());
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
