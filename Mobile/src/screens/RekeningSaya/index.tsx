import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import {navigationRef} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowBankList } from '../../services/dasbhoard';

const Item = ({
  isActive,
  onPress,
  item
}: {
  isActive?: boolean;
  onPress: () => void;
  item:any;
}) => {
  return (
    <View className="px-5 flex-row items-center mb-3">
      <View className="bg-primary-light border-[1px] border-primary p-2 rounded-md flex-row items-center flex-1">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-1"
          onPress={() => navigationRef.navigate('RekeningSayaDetail')}>
          <DefaultText title={item.nama} />
          <Gap height={2.5} />
          <DefaultText title={item.norek} />
          <Gap height={2.5} />
          <DefaultText title={item.atas_nama} />
        </TouchableOpacity>
        <Icon name="chevron-right" size={30} />
      </View>
      <Gap width={10} />
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {isActive ? (
          <View className="w-[20] h-[20] border-[1px] border-primary rounded-full bg-primary" />
        ) : (
          <View className="w-[20] h-[20] border-[1px] border-primary rounded-full" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default function RekeningSaya() {
  const [active, setActive] = useState<number>(0);
  const [bankList,setBankList] = useState<any>([]);
  const { showBankList,showBankListLoading } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(()=>{
    dispatch(getShowBankList())
  },[])

  return (
    <DefaultView>
      <DefaultHeader title="Rekening Saya" />
      <FlatList
        data={showBankList}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({index,item}) => (
          
          <Item item={item} isActive={index === active} onPress={() => setActive(index)} />
        )}
        contentContainerStyle={styles.container}
      />

      <View className="pb-10 pt-3">
        <TouchableOpacity
          onPress={() => navigationRef.navigate('RekeningSayaTambah')}
          activeOpacity={0.7}
          className="bg-primary px-10 py-3 rounded-md self-center">
          <DefaultText title="Tambah Akun Bank" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
