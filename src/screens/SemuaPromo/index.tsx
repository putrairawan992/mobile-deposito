import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowPromo } from '../../services/product';
import { navigationRef } from '../../navigation/RootNavigation';

export default function SemuaPromo() {
  const { showPromo } = useSelector(
    (state: RootState) => state.productReducer,
  );
  const [showMore, setShowMore] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const [indexes, setIndexes] = useState<any>()

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
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => navigationRef.navigate("PromoDetail", { data: item })}
              style={{borderRadius: 8, borderColor: '#2A8E54', borderWidth: 1}}
              className="mx-3 flex-row p-2 my-2">
              <Image
                source={{ uri: item?.image }}
                resizeMode="cover"
                className="w-[100] h-[60]"
              />
              <Gap width={10} />
              <View className="flex-1">
                <DefaultText title={item?.deskripsi?.slice(0, 20) + '...'} />
                <TouchableOpacity onPress={() => navigationRef.navigate("PromoDetail", { data: item })}>
                  <DefaultText title="Lihat Semua" titleClassName="text-xs underline text-blue-600" />
                </TouchableOpacity>
                <Gap height={5} />
                <DefaultText
                  title={`deposito by ${item?.namaMitra}`}
                  titleClassName="text-xs"
                />
                <DefaultText title={item?.end_date} titleClassName="text-xs" />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </DefaultView>
  );
}
