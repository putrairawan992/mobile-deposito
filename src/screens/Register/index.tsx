import {
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showToast } from '../../utils/toast';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ModalBank from '../../components/ModalBank';
import { launchImageLibrary, Asset, launchCamera } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah, registerNasabah } from '../../services/user';
import ModalPenghasilan from '../../components/ModalPenghasilan';
import ModalStatusPernikahan from '../../components/ModalStatusPernikahan';
import { addStorage } from '../../utils/storage';
import { MAX_FILE_SIZE, penghasilanValidation, statusNikahValidation } from '../../utils/constant';
import ModalImageSelfie from '../../components/ModalImage';
import ModalImageAhliWaris from '../../components/ModalImage';
import ModalImage from '../../components/ModalImage';
import Toast from 'react-native-toast-message';
import { getCheckEmailUser, getCheckKtpUser } from '../../services/dasbhoard';
import { getValidationBankListData } from '../../services/bank';

export default function Register() {
  const { registerLoading, detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [page, setPage] = useState<number>(0);
  const [nama, setNama] = useState<string>(detailNasabah?.nama); //
  const [email, setEmail] = useState<string>(detailNasabah?.email);
  const [phone, setPhone] = useState<string>(detailNasabah?.phone);
  const [alamat, setAlamat] = useState<string>(detailNasabah?.alamat);
  const [ktp, setKtp] = useState<string>(detailNasabah?.ktp);
  const [tempatLahir, setTempatLahir] = useState<string>(detailNasabah?.tmpt_lahir);
  const [tanggalLahir, setTanggalLahir] = useState<Date>();
  const [ibu, setIbu] = useState<string>(detailNasabah?.ibu_kandung);
  const [statusNikah, setStatusNikah] = useState<string>(detailNasabah?.status_pernikahan);
  const [perusahaan, setPerusahaan] = useState<string>(detailNasabah?.nama_perusahaan);
  const [profesi, setProfesi] = useState<string>(detailNasabah?.jenis_pekerjaan);
  const [alamatPerusahaan, setAlamatPerusahaan] = useState<string>(detailNasabah?.alamat_kerja);
  const [penghasilan, setPenghasilan] = useState<string>(detailNasabah?.penghasilan);
  const [ahliWaris, setAhliWaris] = useState<string>(detailNasabah?.nama_ahli_waris);
  const [ahliWarisKtp, setAhliWarisKtp] = useState<string>(detailNasabah?.ktp_ahli_waris);
  const [ahliWarisPhone, setAhliWarisPhone] = useState<string>(detailNasabah?.phone_ahli_waris);
  const [hubunganAhliWaris, setHubunganAhliWaris] = useState<string>(detailNasabah?.hub_ahli_waris);
  const [bank, setBank] = useState<any>(detailNasabah?.nama_bank);
  const [rekening, setRekening] = useState<string>(detailNasabah?.norek);
  const [namaRekening, setNamaRekening] = useState<string>(detailNasabah?.atas_nama);
  const [messageCheckEmail, setMessageCheckEmail] = useState<string>('');
  const [messageCheckKtp, setMessageCheckKtp] = useState<string>('');
  const [messageCheckPhone, setMessageCheckPhone] = useState<string>('');
  const [messageAhliWaris, setMessageAhliWaris] = useState<string>('');

  const [showImageKtp, setShowImageKtp] = useState<boolean>(false);
  const [showImageSelfieKtp, setShowImageSelfieKtp] = useState<boolean>(false);
  const [showImageKtpAhliWaris, setShowImageKtpAhliWaris] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showBank, setShowBank] = useState<boolean>(false);
  const [showPenghasilan, setShowPenghasilan] = useState<boolean>(false);
  const [showStatusPernikahan, setShowStatusPernikahan] =
    useState<boolean>(false);
  const [fotoKtp, setFotoKtp] = useState<Asset>();
  const [fotoNasabah, setFotoNasabah] = useState<Asset>();
  const [fotoKtpAhliWaris, setFotoKtpAhliWaris] = useState<Asset>();
  const [validateBank, setValidateBank] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getDetailNasabah())
  }, [dispatch])

  function convertToLowerCase(inputString: string): string {
    return inputString?.toLowerCase();
  }

  const actionSubmitRegister = () => {
    let formdata = new FormData();
    formdata.append('email', convertToLowerCase(email));
    formdata.append('nama', nama);
    formdata.append('ktp', ktp);
    formdata.append('tmpt_lahir', tempatLahir);
    formdata.append('tgl_lahir', detailNasabah?.tgl_lahir ?? moment(tanggalLahir).format('YYYY-MM-DD'));
    formdata.append('ibu_kandung', ibu);
    formdata.append('status_pernikahan', statusNikah);
    formdata.append('jenis_pekerjaan', profesi);
    formdata.append('alamat', alamat);
    formdata.append('nama_perusahaan', perusahaan);
    formdata.append('alamat_kerja', alamatPerusahaan);
    formdata.append('penghasilan', penghasilan);
    formdata.append('nama_ahli_waris', ahliWaris);
    formdata.append('ktp_ahli_waris', ahliWarisKtp);
    formdata.append('phone_ahli_waris', ahliWarisPhone);
    formdata.append('hub_ahli_waris', hubunganAhliWaris);
    formdata.append('nama_bank', bank?.nama?.toUpperCase());
    formdata.append('norek', rekening);
    formdata.append('atas_nama', validateBank?.name_rek);
    formdata.append('image_ktp', {
      size: fotoKtp?.fileSize,
      uri: fotoKtp?.uri,
      name: fotoKtp?.fileName,
      type: fotoKtp?.type,
    } ?? '');
    formdata.append('image_selfie', {
      size: fotoNasabah?.fileSize,
      uri: fotoNasabah?.uri,
      name: fotoNasabah?.fileName,
      type: fotoNasabah?.type,
    } ?? '');
    formdata.append('image_ktp_ahli_waris', {
      size: fotoKtpAhliWaris?.fileSize,
      uri: fotoKtpAhliWaris?.uri,
      name: fotoKtpAhliWaris?.fileName,
      type: fotoKtpAhliWaris?.type,
    } ?? '');
    if (!validateBank?.name_rek) {
      return Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2: 'Rekening Bank Belum di Input',
      });
    }
    dispatch(registerNasabah(formdata, email));
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
        } else if (index === 1) {
          setFotoNasabah(result.assets[0]);
        } else if (index === 2) {
          setFotoKtpAhliWaris(result.assets[0]);
        }
      }
    }
  };

  if (page === 1) {
    return (
      <DefaultView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-3">
            <DefaultText
              title="Daftar Akun Deposito Syariah"
              titleClassName="font-inter-bold text-lg"
            />
            <Gap height={10} />
            <DefaultText title="Lengkapi data dirimu di bawah ya" />
            <Gap height={10} />
            <Input
              title="No KTP"
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              length={16}
              isConditional={true}
              value={ktp}
              onChangeText={value => setKtp(value)}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />
            {messageCheckKtp && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {messageCheckKtp}
                </Text>
              </View>
            )}
            <Gap height={10} />
            <Input
              title="Tempat Lahir"
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              value={tempatLahir}
              isConditional={true}
              onChangeText={value => setTempatLahir(value)}
            />
            <Gap height={10} />
            <Input
              title="Tanggal Lahir"
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              value={
                tanggalLahir ? moment(tanggalLahir).format('DD-MMMM-YYYY') : ''
              }
              isConditional={true}
              onPress={() => setShowDate(true)}
            />
            <Gap height={10} />
            <Input
              title="Nama Ibu Kandung"
              isConditional={true}
              value={ibu}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              onChangeText={value => setIbu(value)}
            />
            <Gap height={10} />
            <Input
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              title="Status Pernikahan"
              isConditional={true}
              value={statusNikahValidation(statusNikah)}
              onPress={() => setShowStatusPernikahan(true)}
            />
          </View>

          <View className='flex-row items-center justify-center mb-5'>
            <Button
              title="Kembali"
              py='px-4'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                setPage(0);
              }}
            />
            <Button
              title="Lanjut"
              py='px-7'
              className="bg-primary mr-4 my-5"
              disabled={
                !ktp ||
                !tempatLahir ||
                !ibu ||
                !statusNikah ||
                !tanggalLahir
              }
              titleClassName="text-white text-small"
              onPress={() => {
                if (
                  ktp?.trim()?.length === 0 ||
                  tempatLahir?.trim()?.length === 0 ||
                  !tanggalLahir ||
                  ibu?.trim()?.length === 0 ||
                  statusNikah?.trim()?.length === 0
                ) {
                  return showToast('Data belum lengkap');
                }

                if (ktp?.trim()?.length !== 16) {
                  return showToast('No KTP tidak valid, 16 character');
                }
                dispatch(getCheckKtpUser(ktp, setMessageCheckKtp, setPage))
              }}
            />
          </View>
        </ScrollView>
        <ModalStatusPernikahan
          show={showStatusPernikahan}
          hide={() => setShowStatusPernikahan(false)}
          onConfirm={value => {
            setShowStatusPernikahan(false);
            setStatusNikah(value);
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

  if (page === 2) {
    return (
      <DefaultView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-3">
            <DefaultText
              title="Daftar Akun Deposito Syariah"
              titleClassName="font-inter-bold text-lg"
            />
            <Gap height={10} />
            <DefaultText title="Lengkapi data dirimu di bawah ya" />
            <Gap height={10} />
            <Input
              title="Nama Perusahaan"
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              value={perusahaan}
              onChangeText={value => setPerusahaan(value)}
            />
            <Gap height={10} />
            <Input
              title="Profesi / Pekerjaan"
              value={profesi}
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              onChangeText={value => setProfesi(value)}
            />

            <Gap height={10} />
            <Input
              title="Alamat Perusahaan"
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              value={alamatPerusahaan}
              onChangeText={value => setAlamatPerusahaan(value)}
            />

            <Gap height={10} />
            <Input
              value={penghasilanValidation(penghasilan)}
              onPress={() => setShowPenghasilan(true)}
              title="Penghasilan"
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
            />
          </View>

          <View className='flex-row items-center items-center justify-center mb-5'>
            <Button
              title="Kembali"
              py='px-4'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                setPage(1);
              }}
            />
            <Button
              title="Lanjut"
              disabled={
                !perusahaan ||
                !profesi ||
                !alamatPerusahaan ||
                !penghasilan
              }
              py='px-7'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                if (
                  perusahaan?.trim()?.length === 0 ||
                  profesi?.trim()?.length === 0 ||
                  penghasilan?.trim()?.length === 0 ||
                  alamatPerusahaan?.trim()?.length === 0
                ) {
                  return showToast('Data belum lengkap');
                }
                setPage(3);
              }}
            />
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
      </DefaultView>
    );
  }

  if (page === 3) {
    return (
      <DefaultView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-3">
            <DefaultText
              title="Daftar Akun Deposito Syariah"
              titleClassName="font-inter-bold text-lg"
            />
            <Gap height={10} />
            <DefaultText title="Lengkapi data dirimu di bawah ya" />
            <Gap height={10} />
            <Input
              title="Nama Ahli Waris"
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              value={ahliWaris}
              onChangeText={value => setAhliWaris(value)}
            />

            <Gap height={10} />
            <Input
              title="No KTP Ahli Waris"
              length={16}
              value={ahliWarisKtp}
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              onChangeText={value => setAhliWarisKtp(value)}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />
            {messageAhliWaris && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {messageAhliWaris}
                </Text>
              </View>
            )}
            <Gap height={10} />
            <Input
              title="No Telepon Ahli Waris"
              value={ahliWarisPhone}
              onChangeText={value => setAhliWarisPhone(value)}
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              textInputProps={{
                keyboardType: 'phone-pad',
              }}
            />

            <Gap height={10} />
            <Input
              title="Hubungan Ahli Waris"
              value={hubunganAhliWaris}
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              onChangeText={value => setHubunganAhliWaris(value)}
            />

          </View>
          <View className='flex-row items-center justify-center mb-5'>
            <Button
              title="Kembali"
              py='px-4'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                setPage(2);
              }}
            />
            <Button
              title="Lanjut"
              py='px-7'
              className="bg-primary mr-4 my-5"
              disabled={
                !ahliWaris ||
                !ahliWarisKtp ||
                !ahliWarisPhone ||
                !hubunganAhliWaris
              }
              titleClassName="text-white text-small"
              onPress={async () => {
                if (ahliWarisKtp?.trim()?.length !== 16) {
                  return showToast('NIK KTP ahli waris tidak valid, 16 character');
                }
                if (ktp !== ahliWarisKtp) {
                  setPage(4);
                  setMessageAhliWaris('');
                } else {
                  setMessageAhliWaris('NIK KTP ahli waris tidak boleh sama dengan NIK KTP nasabah');
                }
              }}
            />
          </View>
        </ScrollView>
      </DefaultView>
    );
  }

  if (page === 4) {
    return (
      <DefaultView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-3">
            <DefaultText
              title="Daftar Akun Deposito Syariah"
              titleClassName="font-inter-bold text-lg"
            />
            <Gap height={10} />
            <DefaultText title="Lengkapi data dirimu di bawah ya" />
            <Gap height={10} />
            <Input
              title="Nama Bank"
              value={bank?.nama?.toUpperCase()}
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              onPress={() => setShowBank(true)}
            />

            <Gap height={10} />
            <Input
              title="No Rekening"
              value={rekening}
              isConditional={true}
              ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
              onChangeText={value => setRekening(value)}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />

            <Gap height={10} />
            {validateBank?.success && validateBank?.name_rek &&
              <View className='border-b-[1px] border-b-black py-2'>
                <DefaultText
                  title="Nama Rekening"
                  titleClassName={`mb-1 text-black font-inter-medium`}
                />
                <DefaultText title={validateBank?.name_rek} titleClassName='font-inter text-black' />
              </View>}
          </View>
          {!validateBank?.success && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {validateBank?.message}
              </Text>
            </View>
          )}
          {isLoading ? <ActivityIndicator size={"large"} /> : <View className='flex-row items-center justify-center mb-5'>
            <Button
              title="Kembali"
              py='px-4'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                setPage(3);
              }}
            />
            <Button
              title="Lanjut"
              py='px-7'
              disabled={
                !bank?.nama ||
                !rekening}
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                dispatch(getValidationBankListData({
                  "code_bank":
                    bank?.kode?.toLocaleLowerCase(),
                  "no_rek": rekening
                }, setValidateBank, () => { }))
                if (!validateBank?.success) {
                  return;
                } else {
                  if (
                    bank?.nama?.trim()?.length === 0 ||
                    rekening?.trim()?.length === 0 ||
                    namaRekening?.trim()?.length === 0
                  ) {
                    return showToast('Data belum lengkap');
                  }
                  setTimeout(() => {
                    setPage(5);
                  }, 2500)
                }
              }}
            />
          </View>}

        </ScrollView>
        <ModalBank
          show={showBank}
          hide={() => setShowBank(false)}
          onConfirm={value => {
            setShowBank(false);
            setBank(value);
          }}
        />
      </DefaultView>
    );
  }

  if (page === 5) {
    return (
      <DefaultView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-3">
            <DefaultText
              title="Daftar Akun Deposito Syariah"
              titleClassName="font-inter-bold text-lg"
            />
            <Gap height={10} />
            <DefaultText title="Lengkapi data dirimu di bawah ya" />
            <Gap height={10} />
            <DefaultText
              title="Foto KTP"
              subtitleClassName='text-red-600'
              subtitle={"*"}
              titleClassName="mb-1 font-inter-medium"
            />
            <Gap height={10} />
            <TouchableOpacity
              className="border-[1px] border-neutral-400 p-1 flex-row items-center"
            >
              <DefaultText
                title={fotoKtp ? fotoKtp?.fileName?.slice(0, 30) + '...' : 'Upload File'}
                titleClassName="flex-1 text-xs mr-1"
                titleProps={{ numberOfLines: 1 }}
              />
              <Icon name="upload" onPress={() => onOpeGallery(0)} size={22} />
              <Gap width={25} />
              <Icon name="eye" onPress={() => setShowImageKtp(true)} size={22} />
              <Gap width={25} />
              <Icon name="trash-can" onPress={() => setFotoKtp(undefined)} size={22} />
            </TouchableOpacity>

            <Gap height={10} />
            <DefaultText
              subtitleClassName='text-red-600'
              subtitle={"*"}
              title="Foto Selfie Nasabah"
              titleClassName="mb-1 font-inter-medium"
            />
            <Gap height={10} />
            <TouchableOpacity
              className="border-[1px] border-neutral-400 p-1 flex-row items-center"
            >
              <DefaultText
                title={fotoNasabah ? fotoNasabah.fileName?.slice(0, 30) + '...' : 'Ambil Foto'}
                titleClassName="flex-1 text-xs mr-1"
                titleProps={{ numberOfLines: 1 }}
              />
              <Icon name="camera" onPress={() => onOpeGallery(1, "selfie")} size={22} />
              <Gap width={25} />
              <Icon name="eye" onPress={() => setShowImageSelfieKtp(true)} size={22} />
              <Gap width={25} />
              <Icon name="trash-can" onPress={() => setFotoNasabah(undefined)} size={22} />
            </TouchableOpacity>
            <Gap height={10} />
            <DefaultText
              subtitleClassName='text-red-600'
              subtitle={"*"}
              title="Foto KTP Ahli Waris"
              titleClassName="mb-1 font-inter-medium"
            />
            <Gap height={10} />
            <TouchableOpacity
              className="border-[1px] border-neutral-400 p-1 flex-row items-center"
            >
              <DefaultText
                title={fotoKtpAhliWaris ? fotoKtpAhliWaris.fileName?.slice(0, 30) + '...' : 'Upload File'}
                titleClassName="flex-1 text-xs mr-1"
                titleProps={{ numberOfLines: 1 }}
              />
              <Icon name="upload" onPress={() => onOpeGallery(2)} size={22} />
              <Gap width={25} />
              <Icon name="eye" onPress={() => setShowImageKtpAhliWaris(true)} size={22} />
              <Gap width={25} />
              <Icon name="trash-can" onPress={() => setFotoKtpAhliWaris(undefined)} size={22} />
            </TouchableOpacity>
            <Gap height={10} />
          </View>
        </ScrollView>
        <ModalImage
          title='Lihat Foto KTP'
          hide={() => setShowImageKtp(false)}
          data={fotoKtp?.uri as string}
          show={showImageKtp}
          onConfirm={() => setShowImageKtp(false)} />
        <ModalImageSelfie
          title='Lihat Selfie KTP'
          hide={() => setShowImageSelfieKtp(false)}
          data={fotoNasabah?.uri as string}
          show={showImageSelfieKtp}
          onConfirm={() => setShowImageSelfieKtp(false)} />
        <ModalImageAhliWaris
          title='Lihat KTP Ahli Waris'
          hide={() => setShowImageKtpAhliWaris(false)}
          data={fotoKtpAhliWaris?.uri as string}
          show={showImageKtpAhliWaris}
          onConfirm={() => setShowImageKtpAhliWaris(false)} />
        {registerLoading ? (
          <ActivityIndicator />
        ) : (
          <View className='flex-row items-center justify-center mb-5'>
            <Button
              title="Kembali"
              py='px-4'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => {
                setPage(4);
              }}
            />
            <Button
              title="Simpan"
              disabled={
                fotoKtp === undefined ||
                fotoNasabah === undefined ||
                fotoKtpAhliWaris === undefined}
              py='px-7'
              className="bg-primary mr-4 my-5"
              titleClassName="text-white text-small"
              onPress={() => actionSubmitRegister()}
            />
          </View>
        )}
      </DefaultView>
    );
  }

  return (
    <DefaultView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <DefaultText
            title="Daftar Akun Deposito Syariah"
            titleClassName="font-inter-bold text-lg"
          />
          <Gap height={10} />
          <DefaultText title="Lengkapi data dirimu di bawah ya" />
          <Gap height={10} />
          <Input
            title="Nama Lengkap Sesuai KTP"
            ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
            value={nama}
            isConditional={true}
            onChangeText={value => setNama(value)}
          />
          <Gap height={10} />
          <Input
            ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
            title="Email"
            isConditional={true}
            value={email}
            onChangeText={value => setEmail(value)}
          />

          {messageCheckEmail && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {messageCheckEmail}
              </Text>
            </View>
          )}
          <Gap height={10} />
          <Input
            title="No Telepon"
            ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
            value={phone}
            isConditional={true}
            onChangeText={value => setPhone(value)}
            textInputProps={{
              keyboardType: 'phone-pad',
            }}
          />
          {messageCheckPhone && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {messageCheckPhone}
              </Text>
            </View>
          )}
          <Gap height={10} />
          <Input
            ComponentRight={<DefaultText title="*" titleClassName='text-red-600 ml-2' />}
            title="Alamat Sekarang"
            isConditional={true}
            value={alamat}
            onChangeText={value => setAlamat(value)}
          />
        </View>

        <Button
          title="Lanjut"
          className={`bg-primary mx-10 my-5`}
          titleClassName="text-white"
          disabled={
            !nama ||
            !email ||
            !phone ||
            !alamat
          }
          onPress={async () => {
            dispatch(getCheckEmailUser({ email }, setMessageCheckEmail, setPage, phone, setMessageCheckPhone))
            // if (
            //   nama?.trim()?.length === 0 ||
            //   email?.trim()?.length === 0 ||
            //   phone?.trim()?.length === 0 ||
            //   alamat?.trim()?.length === 0
            // ) {
            //   return showToast('Data belum lengkap');
            // }

            // if (!isEmail(email)) {
            //   return showToast('Email tidak valid');
            // }
            addStorage('pageRegister', 1);
            addStorage('dataPageZero', { nama, email, phone, alamat });
          }}
        />
      </ScrollView>
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
    marginBottom: 5,
    marginLeft: 20,
  },
  errorText: {
    color: 'red',
  },
});
