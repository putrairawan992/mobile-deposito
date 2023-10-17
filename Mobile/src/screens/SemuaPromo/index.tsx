import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowPromo } from '../../services/product';
import moment from 'moment';

export default function SemuaPromo() {
  const { showPromo } = useSelector(
    (state: RootState) => state.productReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowPromo());
  }, [dispatch]);
  
  return (
    <DefaultView>
      <DefaultHeader title="Semua Promo" />
      <FlatList
        data={showPromo}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              className="mx-3 flex-row border-[1px] border-primary rounded-xl p-2 my-2">
              <Image
                source={{uri:item?.image}}
                resizeMode="cover"
                className="w-[100] h-[60]"
              />
              <Gap width={10} />
              <View className="flex-1">
                <DefaultText title={item?.deskripsi} />
                <Gap height={5} />
                <DefaultText
                  title={`deposito by ${item?.id_mitra}`}
                  titleClassName="text-xs"
                />
                <DefaultText title={moment(item?.end_date).format("DD-MM-YYYY")} titleClassName="text-xs" />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </DefaultView>
  );
}
