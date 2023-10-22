import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import LinearGradient from 'react-native-linear-gradient';
import { navigationRef } from '../../navigation/RootNavigation';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowPortofolio } from '../../services/portofolio';
import { formatRupiah } from '../../utils/currency';

const Item = ({ item }: any) => {
  const statusVal = () => {
    let status = 'ON PROCESS';
    if (item.status === 0) {
      status = 'BATAL'
    }
    if (item.status === 4) {
      status = 'PEMBAYARAN BERHASIL'
    }
    if (item.status === 5) {
      status = 'SELESAI'
    }
    if (item.status === 6) {
      status = 'DI TOLAK'
    }
    return status;
  }

  return (
    <LinearGradient
      className="mx-3 p-2 rounded-xl mb-3"
      colors={[colors.primary, '#0F3746']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <DefaultText
        title={item.id_nasabah}
        titleClassName="text-white font-inter-semibold"
      />
      <Gap height={10} />
      <View className="flex-row">
        <View className="flex-1">
          <DefaultText
            title="Nilai Deposito"
            titleClassName="text-xs text-white"
          />
          <DefaultText
            title={formatRupiah(item?.amount, "Rp")}
            titleClassName="text-xs text-white"
          />
          <Gap height={5} />
          <DefaultText title="Tenor" titleClassName="text-xs text-white" />
          <DefaultText title={`${item.tenor} Bulan`} titleClassName="text-xs text-white" />
        </View>
        <Gap width={5} />
        <View className="flex-1">
          <DefaultText
            title="Proyeksi Bagi Hasil"
            titleClassName="text-xs text-white"
          />
          <DefaultText title={`${item.bagi_hasil}% / Tahun`} titleClassName="text-xs text-white" />
          <Gap height={5} />
          <DefaultText title="Nisbah" titleClassName="text-xs text-white" />
          <DefaultText title="40 : 60" titleClassName="text-xs text-white" />
        </View>
        <Gap width={5} />
        <View className="">
          <View className="bg-yellow-600 px-1 py-1 rounded-sm self-center">
            <DefaultText
              title={statusVal()}
              titleClassName="text-xs text-white"
            />
          </View>
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => navigationRef.navigate('PortofolioDetail', { no_transaksi: item.no_transaksi })}
            activeOpacity={0.7}
            className="bg-primary px-3 py-2 rounded-md self-center">
            <DefaultText
              title="Lihat Detail"
              titleClassName="text-xs text-white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default function Portofolio() {
  const [tabs] = useState<string[]>([
    'Semua',
    'Proses',
    'Aktif',
    'Lunas',
    'Batal',
  ]);
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [params, setParams] = useState<any>(undefined);
  const { showPortofolio, showPortofolioLoading } = useSelector((state: RootState) => state.portofolioReducer);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    switch (activeTab) {
      case 'Semua':
        setParams(undefined);
        break;
      case 'Proses':
        setParams('/status/1');
        break;
      case 'Aktif':
      case 'Lunas':
        setParams('/status/5');
        break;
      case 'Batal':
        setParams('/status/6');
        break;
    }
    dispatch(getShowPortofolio(params));
  }, [activeTab, params])

  console.log("showPortofolio", showPortofolio);


  return (
    <DefaultView>
      <DefaultHeader title="Portofolio" />
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}>
          {tabs.map((item, key) => {
            return (
              <TouchableOpacity
                onPress={() => setActiveTab(item)}
                activeOpacity={0.7}
                key={key}
                className={`border-[1px] border-primary mx-[5px] px-2 py-1 rounded-md ${item === activeTab ? 'bg-primary' : 'bg-white'
                  }`}>
                <DefaultText
                  title={item}
                  titleClassName={
                    item === activeTab ? 'text-white' : 'text-black'
                  }
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {showPortofolioLoading ? <ActivityIndicator /> : <FlatList
        data={showPortofolio?.data}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} />}
        contentContainerStyle={styles.container}
      />}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 50,
  },
});
