import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowBankListData } from '../../services/bank';
import { useFocusEffect } from '@react-navigation/native';

interface ModalBankProps {
  show: boolean;
  hide: () => void;
  onConfirm: (value: string) => void;
}

export default function ModalBank({ show, hide, onConfirm }: ModalBankProps) {
  const { showBankListData, showBankListDataLoading } = useSelector(
    (state: RootState) => state.bankDataReducer,
  );
  const [bankSearchName, setBankSearchName] = useState<string | undefined>(undefined);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowBankListData());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      let queryParams = '';
      if (bankSearchName) {
        const queryNya = {
          nama: bankSearchName || undefined,
        } as any
        queryParams = Object.keys(queryNya)
          .filter(key => queryNya[key])
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryNya[key]))
          .join('&');
      }
      dispatch(getShowBankListData(queryParams));
    }, [dispatch, bankSearchName]),
  );

  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] h-[350px] border-primary">
        <DefaultText
          title="Pilih Bank"
          titleClassName="text-center text-base font-inter-bold"
        />
        <Gap height={15} />
        <View className="p-5">
          <TextInput onChangeText={(e) => setBankSearchName(e)
          } className="bg-gray-300 py-1 px-1 rounded-md items-center" placeholder='Cari Nama Bank' />
        </View>
        <Gap height={30} />
        <ScrollView>
          {showBankListDataLoading ? <ActivityIndicator size={"large"} /> :
            showBankListData?.data && showBankListData?.data?.length > 0 && showBankListData?.data?.map((data: any) => {
              return <TouchableOpacity
                activeOpacity={0.7}
                className="p-1"
                onPress={() => onConfirm(data)}>
                  <View className="w-full h-[1px] bg-neutral-300 mb-3 mt-1" />
                  <View className='flex-row'>
                  <Text>{data?.nama}</Text>
                  </View>
              </TouchableOpacity>
            })}
        </ScrollView>
      </View>
    </Modal>
  );
}
