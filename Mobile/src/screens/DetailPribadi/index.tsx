import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getDetailNasabah } from '../../services/user';
import { penghasilanValidation, statusNikahValidation } from '../../utils/constant';


export default function DetailPribadi() {
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();
  
  useEffect(() => {
    dispatch(getDetailNasabah())
  }, [dispatch])

 console.log(detailNasabah);
 

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
            <DefaultText title="Foto Ktp" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <Image source={{uri:'https://dev.depositosyariah.id/'+ detailNasabah?.image_ktp}} style={{width:150,height:100}} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto Selfie" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <Image source={{uri:'https://dev.depositosyariah.id/'+ detailNasabah?.image_selfie}} style={{width:150,height:100}} />
            </View>
          </View>
          <Gap height={5} />
          <View className="flex-row items-center">
            <DefaultText title="Foto Ktp Ahli Waris" titleClassName="flex-1" />
            <View className="border-[1px] border-primary rounded-md w-[160] px-2 py-2">
              <Image source={{uri:'https://dev.depositosyariah.id/'+ detailNasabah?.image_ktp_ahli_waris}} style={{width:150,height:100}} />
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
    </DefaultView>
  );
}
