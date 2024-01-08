import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowBankListData, getShowKotaData } from '../../services/bank';
import { useFocusEffect } from '@react-navigation/native';

interface ModalKotaProps {
  show: boolean;
  hide: () => void;
  onConfirm: (value: string) => void;
}

export default function ModalGetKota({ show, hide, onConfirm }: ModalKotaProps) {
  const { showKotaData, showKotaDataLoading } = useSelector(
    (state: RootState) => state.bankDataReducer,
  );
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowKotaData());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      let queryParams = { cari: searchName }
      dispatch(getShowKotaData(queryParams));
    }, [dispatch, searchName]),
  );

  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] h-[350px] border-primary">
        <DefaultText
          title="Pilih Kota"
          titleClassName="text-center text-base font-inter-bold"
        />
        <Gap height={15} />
        <View className="p-5">
          <TextInput onChangeText={(e) => setSearchName(e)
          } className="bg-gray-300 py-1 px-1 rounded-md items-center" placeholder='Cari Nama Kota' />
        </View>
        <Gap height={30} />
        <ScrollView>
          {showKotaDataLoading ? <ActivityIndicator size={"large"} /> :
            showKotaData?.length > 0 ? showKotaData?.map((data: any) => {
              return <TouchableOpacity
                activeOpacity={0.7}
                className="p-1"
                onPress={() => onConfirm(data)}>
                <View className="w-full h-[1px] bg-neutral-300 mb-3 mt-1" />
                <View className='flex-row'>
                  <Text>{data?.kota}, {data?.provinsi}</Text>
                </View>
              </TouchableOpacity>
            }) : <DefaultText
              title="Kota yang anda cari tidak ada"
              titleClassName="text-center text-base font-inter-bold"
            />}
        </ScrollView>
      </View>
    </Modal>
  );
}
