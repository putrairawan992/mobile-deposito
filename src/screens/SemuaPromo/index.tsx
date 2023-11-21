import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowPromo } from '../../services/product';

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
            <View
              className="mx-3 flex-row border-[1px] border-primary rounded-xl p-2 my-2">
              <Image
                source={{ uri: item?.image }}
                resizeMode="cover"
                className="w-[100] h-[60]"
              />
              <Gap width={10} />
              <View className="flex-1">
                {item?.deskripsi?.length > 300 ?
                  (index === indexes && showMore) ?
                    <>
                      <DefaultText title={item?.deskripsi} />
                      <TouchableOpacity onPress={() => { setShowMore(false); setIndexes(index) }}>
                        <DefaultText title="Tutup Semua" titleClassName="text-xs underline text-blue-600" />
                      </TouchableOpacity>
                    </> :
                    <>
                      <DefaultText title={item?.deskripsi?.slice(0, 100) + '...'} />
                      <TouchableOpacity onPress={() => { setShowMore(true); setIndexes(index) }}>
                        <DefaultText title="Lihat Semua" titleClassName="text-xs underline text-blue-600" />
                      </TouchableOpacity>
                    </> :
                  <DefaultText title={item?.deskripsi} />
                }
                <Gap height={5} />
                <DefaultText
                  title={`deposito by ${item?.namaMitra}`}
                  titleClassName="text-xs"
                />
                <DefaultText title={item?.end_date} titleClassName="text-xs" />
              </View>
            </View>
          );
        }}
      />
    </DefaultView>
  );
}
