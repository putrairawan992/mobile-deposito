import {FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';

export default function Notifikasi() {
  const renderItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="border-[1px] border-primary py-2 px-5 mb-1 bg-primary-light">
        <DefaultText
          title="Promo"
          titleClassName="font-inter-semibold text-neutral-500"
        />
        <Gap height={5} />
        <DefaultText
          title="AJAK TEMAN DAN DAPATKAN BONUS BERLIMPAH!"
          titleClassName="font-inter-medium"
        />
        <Gap height={5} />
        <DefaultText
          title="deposito by Harta Insan Karimah"
          titleClassName="text-xs"
        />
        <DefaultText title="01 July 2023" titleClassName="text-xs" />
      </TouchableOpacity>
    );
  };

  return (
    <DefaultView>
      <DefaultHeader title="Pemberitahuan Terbaru" />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </DefaultView>
  );
}
