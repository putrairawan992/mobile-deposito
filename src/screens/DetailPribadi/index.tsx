import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah } from '../../services/user';
import { SYARIAH_URL, penghasilanValidation, statusNikahValidation } from '../../utils/constant';
import ModalImageSelfie from '../../components/ModalImage';
import ModalImageAhliWaris from '../../components/ModalImage';
import ModalImage from '../../components/ModalImage';


export default function DetailPribadi() {
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();
  const [showImageKtp, setShowImageKtp] = useState<boolean>(false);
  const [showImageSelfieKtp, setShowImageSelfieKtp] = useState<boolean>(false);
  const [showImageKtpAhliWaris, setShowImageKtpAhliWaris] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDetailNasabah())
  }, [dispatch])
  
  return (
    <DefaultView>
      <DefaultHeader title="Detail Pribadi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          <View className="flex-row items-center">
            <DefaultText title="No KTP" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.ktp} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.nama} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Tempat Lahir" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.tmpt_lahir} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Tanggal Lahir" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.tgl_lahir} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama Ibu Kandung" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.ibu_kandung} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Status Pernikahan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={statusNikahValidation(detailNasabah?.status_pernikahan)} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Profesi/Pekerjaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.jenis_pekerjaan} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Nama Perusahaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.nama_perusahaan} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Alamat Perusahaan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={detailNasabah?.alamat_kerja} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Penghasilan" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <DefaultText title={penghasilanValidation(detailNasabah?.penghasilan)} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto KTP" titleClassName="flex-1" />
            <TouchableOpacity onPress={() => setShowImageKtp(true)}   className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              {detailNasabah?.image_ktp ? <Image source={{ uri: `${SYARIAH_URL}/${detailNasabah?.image_ktp}` }} style={{ width: 150, height: 100 }} /> : <DefaultText title="-" titleClassName="text-black" />}
            </TouchableOpacity>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto Selfie" titleClassName="flex-1" />
            <TouchableOpacity onPress={() => setShowImageSelfieKtp(true)}  className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              {detailNasabah?.image_selfie ? <Image source={{ uri: `${SYARIAH_URL}/${detailNasabah?.image_selfie}` }} style={{ width: 150, height: 100 }} /> : <DefaultText title="-" titleClassName="text-black" />}
            </TouchableOpacity>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto KTP Ahli Waris" titleClassName="flex-1" />
            <TouchableOpacity onPress={() => setShowImageKtpAhliWaris(true)}  className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              {detailNasabah?.image_ktp_ahli_waris ? <Image source={{ uri: `${SYARIAH_URL}/${detailNasabah?.image_ktp_ahli_waris}` }} style={{ width: 150, height: 100 }} /> : <DefaultText title="-" titleClassName="text-black" />}
            </TouchableOpacity>
          </View>
          <Gap height={5} />
        </View>
      </ScrollView>

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={() => navigationRef.navigate('DetailPribadiEdit', { detailNasabah })}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-md self-center">
          <DefaultText title="Edit" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
      <ModalImage
        title='Preview Image KTP'
        hide={() => setShowImageKtp(false)}
        data={detailNasabah?.image_ktp ? `${SYARIAH_URL}/${detailNasabah?.image_ktp}` : null as any}
        show={showImageKtp}
        onConfirm={() => setShowImageKtp(false)} />
      <ModalImageSelfie
        title='Preview Selfie KTP'
        hide={() => setShowImageSelfieKtp(false)}
        data={detailNasabah?.image_selfie ? `${SYARIAH_URL}/${detailNasabah?.image_selfie}` : null as any}
        show={showImageSelfieKtp}
        onConfirm={() => setShowImageSelfieKtp(false)} />
      <ModalImageAhliWaris
        title='Preview KTP Ahli Waris'
        hide={() => setShowImageKtpAhliWaris(false)}
        data={detailNasabah?.image_ktp_ahli_waris ? `${SYARIAH_URL}/${detailNasabah?.image_ktp_ahli_waris}` : null as any}
        show={showImageKtpAhliWaris}
        onConfirm={() => setShowImageKtpAhliWaris(false)} />
    </DefaultView>
  );
}
