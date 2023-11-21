import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { images } from '../../utils/images';
import Gap from '../../components/Gap';
import { getShowArtikelList } from '../../services/artikel';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { navigationRef } from '../../navigation/RootNavigation';

export default function SemuaBlog() {
  const dispatch = useDispatch<RootDispatch>();
  const { showArtikelListData } = useSelector(
    (state: RootState) => state.artikelReducer,
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigationRef.navigate("BlogDetail", { id: item.id })}
        className="mx-3 flex-row border-[1px] border-primary rounded-xl p-2 my-2">
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          className="w-[100] h-[60]"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText title={item.judul} />
          <Gap height={5} />
          <DefaultText
            title={item.author}
            titleClassName="text-xs"
          />
          <DefaultText title={item.created_at} titleClassName="text-xs" />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getShowArtikelList())
  }, []);

  return (
    <DefaultView>
      <DefaultHeader title="Semua Blog Artikel" />
      <FlatList
        data={showArtikelListData}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </DefaultView>
  );
}
