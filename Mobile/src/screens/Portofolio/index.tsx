import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from '../../navigations/RootNavigation';
import {colors} from '../../utils/colors';
import Gap from '../../components/Gap';

const Item = () => {
  return (
    <LinearGradient
      className="mx-3 p-2 rounded-xl mb-3"
      colors={[colors.primary, '#0F3746']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <DefaultText
        title="BPR Kencana Abadi"
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
            title="Rp 1.000.000.000"
            titleClassName="text-xs text-white"
          />
          <Gap height={5} />
          <DefaultText title="Tenor" titleClassName="text-xs text-white" />
          <DefaultText title="3 Bulan" titleClassName="text-xs text-white" />
        </View>
        <Gap width={5} />
        <View className="flex-1">
          <DefaultText
            title="Proyeksi Bagi Hasil"
            titleClassName="text-xs text-white"
          />
          <DefaultText title="5% / Tahun" titleClassName="text-xs text-white" />
          <Gap height={5} />
          <DefaultText title="Nisbah" titleClassName="text-xs text-white" />
          <DefaultText title="40 : 60" titleClassName="text-xs text-white" />
        </View>
        <Gap width={5} />
        <View className="">
          <View className="bg-yellow-600 px-1 py-1 rounded-sm self-center">
            <DefaultText
              title="Proses Penarikan"
              titleClassName="text-xs text-white"
            />
          </View>
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => navigationRef.navigate('PortofolioDetail')}
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
                className={`border-[1px] border-primary mx-[5px] px-2 py-1 rounded-md ${
                  item === activeTab ? 'bg-primary' : 'bg-white'
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
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => <Item />}
        contentContainerStyle={styles.container}
      />
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
