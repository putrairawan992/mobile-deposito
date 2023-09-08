import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {images} from '../../utils/images';
import Gap from '../../components/Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowPromo } from '../../services/product';
import moment from 'moment';

export default function SemuaPromo() {
  const {showPromo } = useSelector(
    (state: RootState) => state.productReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  console.log('showPromo===>', showPromo);

  useEffect(() => {
    dispatch(getShowPromo());
  }, [dispatch]);

  const renderItem = ({val}:any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="mx-3 flex-row border-[1px] border-primary rounded-xl p-2 my-2">
        <Image
          source={val?.image}
          resizeMode="cover"
          className="w-[100] h-[60]"
        />
        <Gap width={10} />
        <View className="flex-1">
          <DefaultText title={val?.deskripsi} />
          <Gap height={5} />
          <DefaultText
            title={`deposito by ${val?.user_created}`}
            titleClassName="text-xs"
          />
          <DefaultText title={moment(val?.created_at).format("DD-MM-YYYY")} titleClassName="text-xs" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DefaultView>
      <DefaultHeader title="Semua Promo" />
      <FlatList
        data={showPromo}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </DefaultView>
  );
}
