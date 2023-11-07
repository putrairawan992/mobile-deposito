import { ActivityIndicator, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';

const Item = (data: any) => {
  const noProduct = data?.data?.item?.no_produk;
  const angkaSebagaiPersentase = data?.data?.item?.total_perc;
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
          title={data?.data?.item?.nama_mitra}
          titleClassName="text-white font-inter-semibold"
        />
        <Gap height={10} />
        <View className="flex-row">
          <View className="flex-1">
            <DefaultText title="Target" titleClassName="text-xs text-white" />
            <DefaultText
              title={formatRupiah(String(data?.data?.item?.target), 'Rp ')}
              titleClassName="text-xs text-white"
            />
            <Gap height={5} />
            <DefaultText title="Tenor" titleClassName="text-xs text-white" />
            <DefaultText
              title={data?.data?.item?.tenor}
              titleClassName="text-xs text-white"
            />
            <Gap height={5} />
            <DefaultText
              title="Total Transaksi"
              titleClassName="text-xs text-white"
            />
            <DefaultText
              title={data?.data?.item?.total_transaksi}
              titleClassName="text-xs text-white"
            />
            <Gap height={5} />
          </View>
          <Gap width={5} />
          <View className="flex-1">
            <DefaultText
              title="Minimal Deposito"
              titleClassName="text-xs text-white"
            />
            <DefaultText
              title={formatRupiah(String(data?.data?.item?.minimal), 'Rp ')}
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
            <Gap height={5} />
            <DefaultText
              title="Dana Terkumpul"
              titleClassName="text-xs text-white"
            />
            <DefaultText
              title={formatRupiah(String(data?.data?.item?.total_amount), 'Rp ')}
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
        <View className="w-full bg-gray-200 dark:bg-gray-700">
          <View
            className={`text-xs font-medium text-blue-100 text-center leading-none  ${angkaSebagaiPersentase > 0 ? 'bg-green-600' : null}`}
            style={{ width: `${angkaSebagaiPersentase}%`, height: 35 }}>
          </View>
        </View>
        <DefaultText title={`${angkaSebagaiPersentase}%`} titleClassName="text-center mt-1 text-white" />

      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Produk() {
  const [showHasilSetara, setShowHasilSetara] = useState<boolean>(false);
  const [showToner, setShowTenor] = useState<boolean>(false);
  const [hasilSetara, setHasilSetara] = useState<string | undefined>(undefined);
  const [tenor, setTenor] = useState<string | undefined>(undefined);
  const { showProduct, showProcutLoading } = useSelector((state: RootState) => state.productReducer);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowProductNasabah());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      let queryParams = '';
      if (searchName || hasilSetara || tenor) {
        const queryNya = {
          string: searchName || undefined,
          bagi_hasil: hasilSetara || undefined,
          tenor: tenor || undefined,
        } as any
        queryParams = Object.keys(queryNya)
          .filter(key => queryNya[key])
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryNya[key]))
          .join('&');
      }
      dispatch(getShowProductNasabah(queryParams));
    }, [dispatch, hasilSetara, tenor, searchName]),
  );

  return (
    <DefaultView>
      <DefaultHeader title="Produk Deposito" />
      <View className="flex-row px-3 py-2 z-50">
        <View className="flex-1">
          <DefaultText title="Bagi Hasil Setara" />
          <Gap height={2.5} />
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-primary py-1 px-1 rounded-full flex-row items-center"
            onPress={() => setShowHasilSetara(!showHasilSetara)}>
            <DefaultText
              title={`${hasilSetara || 'Pilih Hasil'}%/Tahun`}
              titleClassName="text-white flex-1"
            />
            <Icon name="chevron-right" color={colors.white} size={20} />
          </TouchableOpacity>
          {showHasilSetara && (
            <View className="bg-white border-[1px] border-primary p-1 rounded-full absolute top-[54] right-0 left-0 z-10">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara(undefined);
                  setShowHasilSetara(false);
                }}>
                <DefaultText
                  title="Semua"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('9');
                  setShowHasilSetara(false);
                }}>
                <DefaultText
                  title="9%"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('8');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="8%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('7');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="7%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('6');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="6%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('5');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="5%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('4');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="4%" titleClassName="text-neutral-400" />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setHasilSetara('3');
                  setShowHasilSetara(false);
                }}>
                <DefaultText title="3%" titleClassName="text-neutral-400" />
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
            className="bg-primary py-1 px-1 rounded-full flex-row items-center"
            onPress={() => setShowTenor(!showToner)}>
            <DefaultText
              title={`>= ${tenor || 'Tenor'} Bulan`}
              titleClassName="text-white flex-1"
            />
            <Icon name="chevron-right" color={colors.white} size={20} />
          </TouchableOpacity>
          {showToner && (
            <View className="bg-white border-[1px] border-primary p-1 rounded-full absolute top-[54] right-0 left-0 z-10">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor(undefined);
                  setShowTenor(false);
                }}>
                <DefaultText
                  title="Semua"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor('3');
                  setShowTenor(false);
                }}>
                <DefaultText
                  title="3 Bulan"
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
                  title="6 Bulan"
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
                  title="12 Bulan"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor('18');
                  setShowTenor(false);
                }}>
                <DefaultText
                  title="18 Bulan"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
              <Gap height={2} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setTenor('24');
                  setShowTenor(false);
                }}>
                <DefaultText
                  title="24 Bulan"
                  titleClassName="text-neutral-400"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View className="p-5">
        <TextInput onChangeText={(e) => setSearchName(e)
        } className="bg-gray-300 py-1 px-1 rounded-full items-center" placeholder='Search name' />
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
