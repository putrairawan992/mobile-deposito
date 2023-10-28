import {
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
import { isEmail } from '../../utils/function';
import ModalBank from '../../components/ModalBank';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah, registerNasabah } from '../../services/user';
import ModalPenghasilan from '../../components/ModalPenghasilan';
import ModalStatusPernikahan from '../../components/ModalStatusPernikahan';
import { addStorage } from '../../utils/storage';
import { penghasilanValidation, statusNikahValidation } from '../../utils/constant';
import ModalImageSelfie from '../../components/ModalImage';
import ModalImageAhliWaris from '../../components/ModalImage';
import ModalImage from '../../components/ModalImage';

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
  const [bank, setBank] = useState<string>(detailNasabah?.nama_bank);
  const [rekening, setRekening] = useState<string>(detailNasabah?.norek);
  const [namaRekening, setNamaRekening] = useState<string>(detailNasabah?.atas_nama);
  const [privyId, setPrivyId] = useState<string>('');
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
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getDetailNasabah())
  }, [dispatch])


  const actionSubmitRegister = () => {
    let formdata = new FormData();
    formdata.append('email', email);
    formdata.append('nama', nama);
    formdata.append('ktp', ktp);
    formdata.append('tmpt_lahir', tempatLahir);
    formdata.append('tgl_lahir', detailNasabah?.tgl_lahir ?? moment(tanggalLahir).format('YYYY-MM-DD'));
    formdata.append('ibu_kandung', ibu);
    formdata.append('id_privy', privyId);
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
    formdata.append('nama_bank', bank);
    formdata.append('norek', rekening);
    formdata.append('atas_nama', namaRekening);
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
      size: fotoNasabah?.fileSize,
      uri: fotoKtpAhliWaris?.uri,
      name: fotoKtpAhliWaris?.fileName,
      type: fotoKtpAhliWaris?.type,
    } ?? '');
    dispatch(registerNasabah(formdata));
  };

  const onOpeGallery = async (index: number) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      if (index === 0) {
        setFotoKtp(result.assets[0]);
      } else if (index === 1) {
        setFotoNasabah(result.assets[0]);
      } else if (index === 2) {
        setFotoKtpAhliWaris(result.assets[0]);
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
              value={ktp}
              onChangeText={value => setKtp(value)}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />
            <Gap height={10} />
            <Input
              title="Tempat Lahir"
              value={tempatLahir}
              onChangeText={value => setTempatLahir(value)}
            />
            <Gap height={10} />
            <Input
              title="Tanggal Lahir"
              value={
                tanggalLahir ? moment(tanggalLahir).format('DD-MMMM-YYYY') : ''
              }
              onPress={() => setShowDate(true)}
            />
            <Gap height={10} />
            <Input
              title="Nama Ibu Kandung"
              value={ibu}
              onChangeText={value => setIbu(value)}
            />
            <Gap height={10} />
            <Input
              title="Status Pernikahan"
              value={statusNikahValidation(statusNikah)}
              onPress={() => setShowStatusPernikahan(true)}
            />
          </View>
        </ScrollView>
        <Button
          title="BACK"
          titleClassName="text-black"
          onPress={() => {
            setPage(0);
          }}
        />
        <Button
          title="LANJUT"
          className="bg-primary mx-10 my-5"
          titleClassName="text-white"
          onPress={() => {
            if (
              ktp.trim().length === 0 ||
              tempatLahir.trim().length === 0 ||
              !tanggalLahir ||
              ibu.trim().length === 0 ||
              statusNikah.trim().length === 0
            ) {
              return showToast('Data belum lengkap');
            }

            if (ktp.trim().length !== 16) {
              return showToast('No KTP tidak valid, 16 characters');
            }

            setPage(2);
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
              value={perusahaan}
              onChangeText={value => setPerusahaan(value)}
            />
            <Gap height={10} />
            <Input
              title="Profesi / Pekerjaan"
              value={profesi}
              onChangeText={value => setProfesi(value)}
            />
            <Gap height={10} />
            <Input
              title="Alamat Perusahaan"
              value={alamatPerusahaan}
              onChangeText={value => setAlamatPerusahaan(value)}
            />
            <Gap height={10} />
            <Input
              value={penghasilanValidation(penghasilan)}
              onPress={() => setShowPenghasilan(true)}
              title="Penghasilan"
            />
          </View>
        </ScrollView>
        <Button
          title="BACK"
          titleClassName="text-black"
          onPress={() => {
            setPage(1);
          }}
        />
        <Button
          title="LANJUT"
          className="bg-primary mx-10 my-5"
          titleClassName="text-white"
          onPress={() => {
            if (
              perusahaan.trim().length === 0 ||
              profesi.trim().length === 0 ||
              alamat.trim().length === 0 ||
              penghasilan.trim().length === 0
            ) {
              return showToast('Data belum lengkap');
            }
            setPage(3);
          }}
        />

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
              value={ahliWaris}
              onChangeText={value => setAhliWaris(value)}
            />
            <Gap height={10} />
            <Input
              title="No KTP Ahli Waris"
              value={ahliWarisKtp}
              onChangeText={value => setAhliWarisKtp(value)}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />
            <Gap height={10} />
            <Input
              title="No Telepon Ahli Waris"
              value={ahliWarisPhone}
              onChangeText={value => setAhliWarisPhone(value)}
              textInputProps={{
                keyboardType: 'phone-pad',
              }}
            />
            <Gap height={10} />
            <Input
              title="Hubungan Ahli Waris"
              value={hubunganAhliWaris}
              onChangeText={value => setHubunganAhliWaris(value)}
            />
          </View>
        </ScrollView>
        <Button
          title="BACK"
          titleClassName="text-black"
          onPress={() => {
            setPage(2);
          }}
        />
        <Button
          title="LANJUT"
          className="bg-primary mx-10 my-5"
          titleClassName="text-white"
          onPress={() => {
            if (
              ahliWaris.trim().length === 0 ||
              ahliWarisKtp.trim().length === 0 ||
              ahliWarisPhone.trim().length === 0
            ) {
              return showToast('Data belum lengkap');
            }

            // if (ahliWarisKtp.trim().length !== 16) {
            //   return showToast('No KTP tidak valid');
            // }

            setPage(4);
          }}
        />
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
              value={bank}
              onPress={() => setShowBank(true)}
            />
            <Gap height={10} />
            <Input
              title="No Rekening"
              value={rekening}
              onChangeText={value => setRekening(value)}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />
            <Gap height={10} />
            <Input
              title="Nama Rekening"
              value={namaRekening}
              onChangeText={value => setNamaRekening(value)}
            />
          </View>
        </ScrollView>
        <Button
          title="BACK"
          titleClassName="text-black"
          onPress={() => {
            setPage(3);
          }}
        />
        <Button
          title="LANJUT"
          className="bg-primary mx-10 my-5"
          titleClassName="text-white"
          onPress={() => {
            if (
              bank.trim().length === 0 ||
              rekening.trim().length === 0 ||
              namaRekening.trim().length === 0
            ) {
              return showToast('Data belum lengkap');
            }
            setPage(5);
          }}
        />

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
              title="Foto Selfie Nasabah"
              titleClassName="mb-1 font-inter-medium"
            />
            <Gap height={10} />
            <TouchableOpacity
              className="border-[1px] border-neutral-400 p-1 flex-row items-center"
            >
              <DefaultText
                title={fotoNasabah ? fotoNasabah.fileName?.slice(0, 30) + '...' : 'Upload File'}
                titleClassName="flex-1 text-xs mr-1"
                titleProps={{ numberOfLines: 1 }}
              />
              <Icon name="upload" onPress={() => onOpeGallery(1)} size={22} />
              <Gap width={25} />
              <Icon name="eye" onPress={() => setShowImageSelfieKtp(true)} size={22} />
              <Gap width={25} />
              <Icon name="trash-can" onPress={() => setFotoNasabah(undefined)} size={22} />
            </TouchableOpacity>
            <Gap height={10} />
            <DefaultText
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
            <Input
              title="Punya Privy ID"
              value={privyId}
              onChangeText={value => setPrivyId(value)}
            />
          </View>
        </ScrollView>
        <Button
          title="BACK"
          titleClassName="text-black"
          onPress={() => {
            setPage(4);
          }}
        />
        <ModalImage
          title='Preview Image KTP'
          hide={() => setShowImageKtp(false)}
          data={fotoKtp?.uri as string}
          show={showImageKtp}
          onConfirm={() => setShowImageKtp(false)} />
        <ModalImageSelfie
          title='Preview Selfie KTP'
          hide={() => setShowImageSelfieKtp(false)}
          data={fotoNasabah?.uri as string}
          show={showImageSelfieKtp}
          onConfirm={() => setShowImageSelfieKtp(false)} />
        <ModalImageAhliWaris
          title='Preview Ktp Ahli Waris'
          hide={() => setShowImageKtpAhliWaris(false)}
          data={fotoKtpAhliWaris?.uri as string}
          show={showImageKtpAhliWaris}
          onConfirm={() => setShowImageKtpAhliWaris(false)} />
        {registerLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Submit"
            className="bg-primary mx-10 my-5"
            titleClassName="text-white"
            onPress={() => actionSubmitRegister()}
          />
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
            value={nama}
            onChangeText={value => setNama(value)}
          />
          <Gap height={10} />
          <Input
            title="Email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Gap height={10} />
          <Input
            title="No Telepon"
            value={phone}
            onChangeText={value => setPhone(value)}
            textInputProps={{
              keyboardType: 'phone-pad',
            }}
          />
          <Gap height={10} />
          <Input
            title="Alamat Sekarang"
            value={alamat}
            onChangeText={value => setAlamat(value)}
          />
        </View>
      </ScrollView>
      <Button
        title="LANJUT"
        className="bg-primary mx-10 my-5"
        titleClassName="text-white"
        onPress={() => {
          if (
            nama?.trim()?.length === 0 ||
            email?.trim()?.length === 0 ||
            phone?.trim()?.length === 0 ||
            alamat?.trim()?.length === 0
          ) {
            return showToast('Data belum lengkap');
          }

          if (!isEmail(email)) {
            return showToast('Email tidak valid');
          }
          addStorage('pageRegister', 1);
          addStorage('dataPageZero', { nama, email, phone, alamat });
          setPage(1);
        }}
      />
    </DefaultView>
  );
}
