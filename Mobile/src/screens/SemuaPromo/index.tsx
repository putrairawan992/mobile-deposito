import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {images} from '../../utils/images';
import Gap from '../../components/Gap';

export default function SemuaPromo() {
  const renderItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="mx-3 flex-row border-[1px] border-primary rounded-xl p-2 my-2">
        <Image
          source={images.promo}
          resizeMode="cover"
          className="w-[100] h-[60]"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText title="AJAK TEMAN DAN DAPATKAN BONUS BERLIMPAH!" />
          <Gap height={5} />
          <DefaultText
            title="deposito by Harta Insan Karimah"
            titleClassName="text-xs"
          />
          <DefaultText title="01 July 2023" titleClassName="text-xs" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DefaultView>
      <DefaultHeader title="Semua Promo" />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </DefaultView>
  );
}
