import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';

import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowProductNasabah } from '../../services/product';
import { formatRupiah } from '../../utils/currency';

const Item = (data: any) => {
  const noProduct = data?.data?.item?.no_produk;
  const angkaSebagaiPersentase = (data?.data?.item?.terkumpulpersen * 100).toFixed(2);
  const percentage = Math.ceil(parseFloat(angkaSebagaiPersentase));
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigationRef.navigate('ProdukDetail', { noProduct })}>
      <LinearGradient
        className="mx-3 p-2 rounded-xl mb-3"
        colors={[colors.primary, '#0F3746']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <DefaultText
          title={data?.data?.item?.namaMitra}
          titleClassName="text-white font-inter-semibold"
        />
        <Gap height={10} />
        <View className="flex-row">
          <View className="flex-1">
            <DefaultText title="Target" titleClassName="text-xs text-white" />
            <DefaultText
              title={formatRupiah(data?.data?.item?.target, 'Rp ')}
              titleClassName="text-xs text-white"
            />
            <Gap height={5} />
            <DefaultText title="Tenor" titleClassName="text-xs text-white" />
            <DefaultText
              title={data?.data?.item?.tenor}
              titleClassName="text-xs text-white"
            />
          </View>
          <Gap width={5} />
          <View className="flex-1">
            <DefaultText
              title="Minimal Deposito"
              titleClassName="text-xs text-white"
            />
            <DefaultText
              title={formatRupiah(data?.data?.item?.minimal, 'Rp ')}
              titleClassName="text-xs text-white"
            />
            <Gap height={5} />
            <DefaultText
              title="Proyeksi Bagi Hasil"
              titleClassName="text-xs text-white"
            />
            <DefaultText
              title={`${data?.data?.item?.bagi_hasil}% / Tahun`}
              titleClassName="text-xs text-white"
            />
          </View>
          <Gap width={5} />
          <View className="flex-1">
            <DefaultText
              title="Tanggal Berakhir"
              titleClassName="text-xs text-white"
            />
            <DefaultText
              title={`${data?.data?.item?.end_date}`}
              titleClassName="text-xs text-white"
            />
            <Gap height={5} />
            <DefaultText title="Nisbah" titleClassName="text-xs text-white" />
            <DefaultText
              title={`${data?.data?.item?.nisbah}`}
              titleClassName="text-xs text-white"
            />
          </View>
        </View>
        <Gap height={10} />
        <View className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <View
            className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full ${percentage > 1 ? 'bg-green-600' : null}`}
            style={{ width: `${percentage}%`, height: 35 }}>
            <DefaultText title={`${percentage}%`} titleClassName="text-center mt-1 text-white" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Produk() {
  const [showHasilSetara, setShowHasilSetara] = useState<boolean>(false);
  const [showToner, setShowTenor] = useState<boolean>(false);
  const [hasilSetara, setHasilSetara] = useState<string>('5');
  const [tenor, setTenor] = useState<string>('6');
  const { showProduct, showProcutLoading } = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowProductNasabah());
  }, [dispatch]);

  return (
    <DefaultView>
      <DefaultHeader title="Produk Deposito" />
      <View className="flex-row px-3 py-2 z-50">
        <View className="flex-1">
          <DefaultText title="Bagi Hasil Setara" />
          <Gap height={2.5} />
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-primary py-1 px-1 rounded-md flex-row items-center"
            onPress={() => setShowHasilSetara(!showHasilSetara)}>
            <DefaultText
              title={`${hasilSetara}%/Tahun`}
              titleClassName="text-white flex-1"
            />
            <Icon name="chevron-right" color={colors.white} size={20} />
          </TouchableOpacity>
          {showHasilSetara && (
            <View className="bg-white border-[1px] border-primary p-1 rounded-md absolute top-[54] right-0 left-0 z-10">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('1.5');
                  setShowHasilSetara(false);
                }}>
                <DefaultText
                  title=">= 1.5%"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('5');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title=">= 5%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('16');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title=">= 16%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('36');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="<= 36%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Gap width={50} />
        <View className="flex-1">
          <DefaultText title="Tenor" />
          <Gap height={2.5} />
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-primary py-1 px-1 rounded-md flex-row items-center"
            onPress={() => setShowTenor(!showToner)}>
            <DefaultText
              title={`>= ${tenor} Bulan`}
              titleClassName="text-white flex-1"
            />
            <Icon name="chevron-right" color={colors.white} size={20} />
          </TouchableOpacity>
          {showToner && (
            <View className="bg-white border-[1px] border-primary p-1 rounded-md absolute top-[54] right-0 left-0 z-10">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor('1');
                  setShowTenor(false);
                }}>
                <DefaultText
                  title=">= 1 Bulan"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor('6');
                  setShowTenor(false);
                }}>
                <DefaultText
                  title=">= 6 Bulan"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor('12');
                  setShowTenor(false);
                }}>
                <DefaultText
                  title=">= 12 Bulan"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {showProcutLoading ?
        <ActivityIndicator
          style={{ position: 'absolute', top: 150, left: 0, right: 0 }}
          size={'large'}
        /> : 
        <FlatList
          data={showProduct}
          keyExtractor={(_, key) => key.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={e => <Item data={e} />}
          contentContainerStyle={styles.container}
        />}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 50,
  },
});
