import {
  ActivityIndicator,
  AppState,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { API, capitalizeFirstLetter } from '../../utils/constant';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { addStorage, getExitTime, getStorage, saveExitTime } from '../../utils/storage';
import { checkLogin } from '../../services/user';
import ModalAlert from '../../components/ModalAlert';

const Item = ({ item }: any) => {
  const bgVal = () => {
    let bgColor = 'orange'
    if (item.status === "6" || item.status === "0") {
      bgColor = 'red'
    }
    if (item.status === "4") {
      bgColor = 'bg-yellow-600'
    }
    if (item.status === "5") {
      bgColor = '#2193b0'
    }
    if (item.status === "9") {
      bgColor = '#0f9b0f'
    }
    return bgColor;
  }

  const statusVal = () => {
    let status = 'Process';
    if (item.status === "6" || item.status === "0") {
      status = 'Batal'
    }
    if (item.status === "4") {
      status = 'Pembayaran Berhasil'
    }
    if (item?.penarikan?.status) {
      status = 'Proses Penarikan'
    } else if (item?.pengembalian?.status) {
      status = 'Proses Pengembalian'
    } else if (item?.status === "5") {
      status = 'Aktif'
    }
    if (item.status === "9") {
      status = 'Lunas'
    }
    return status;
  }

  const percentage = (item.bagi_hasil / item.bagi_hasil) * 100;


  return (
    <LinearGradient
      className="mx-3 p-2 rounded-xl mb-3"
      colors={[colors.primary, '#0F3746']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <DefaultText
        title={item.namaMitra}
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
            title={formatRupiah(String(item?.amount), "Rp")}
            titleClassName="text-xs text-white"
          />
          <Gap height={5} />
          <DefaultText title="Tenor" titleClassName="text-xs text-white" />
          <DefaultText title={`${item.tenor} Bulan`} titleClassName="text-xs text-white" />
          <Gap height={5} />
          <DefaultText title="Estimasi Bagi Hasil" titleClassName="text-xs text-white" />
          <DefaultText title={formatRupiah(String(item?.bagi_hasil), "Rp")} titleClassName="text-xs text-white" />
        </View>
        <Gap width={5} />
        <View className="flex-1">
          <DefaultText
            title="Bagi Hasil"
            titleClassName="text-xs text-white"
          />
          <DefaultText title={`${item.bagi_hasil_perc}% / Tahun`} titleClassName="text-xs text-white" />
          <Gap height={5} />
          <DefaultText title="Nisbah" titleClassName="text-xs text-white" />
          <DefaultText title={item.nisbah} titleClassName="text-xs text-white" />
          <Gap height={5} />
          <DefaultText title="Tanggal Jatuh Tempo" titleClassName="text-xs text-white" />
          <DefaultText title={item.jatuh_tempo} titleClassName="text-xs text-white" />
        </View>
        <Gap width={5} />
        <View>
          <View style={{ backgroundColor: bgVal() }} className={`px-3 py-2 rounded-md self-center`}>
            <DefaultText
              title={capitalizeFirstLetter(statusVal())}
              titleClassName="text-xs text-white"
            />
          </View>
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => navigationRef.navigate('PortofolioDetail', { no_transaksi: item.no_transaksi })}
            activeOpacity={0.7}
            className="bg-primary px-3 py-2 rounded-full self-center">
            <DefaultText
              title="Lihat Detail"
              titleClassName="text-xs text-white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient >
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

  const [isShowAlertAuth, setIsShowAlertAuth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const { showPortofolio, showPortofolioLoading } = useSelector((state: RootState) => state.portofolioReducer);
  const dispatch = useDispatch<RootDispatch>();
  const { checkLoginLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation();
  const isFocused = useMemo(() => navigation.isFocused(), []);

  useFocusEffect(useCallback(() => {
    if (isFocused) {
      dispatch(getShowPortofolio(`${API}/pengajuan`));
    }
  }, [isFocused]));

  useEffect(() => {
    let params = `${API}/pengajuan`;
    switch (activeTab) {
      case 'Proses':
        params = `${API}/pengajuan/status/1`;
        break;
      case 'Aktif':
        params = `${API}/pengajuan/status/5`;
        break;
      case 'Lunas':
        params = `${API}/pengajuan/status/9`;
        break;
      case 'Batal':
        params = `${API}/pengajuan/status/0`;
        break;
      default:
        params = `${API}/pengajuan`;
        break;
    }
    dispatch(getShowPortofolio(params));
  }, [activeTab]);


  const useNasabah = useCallback(async () => {
    const exitTime = await getExitTime();
    const currentTime = new Date().getTime();
    if (exitTime && await getStorage("phone-email")) {
      const elapsedTime = (currentTime - exitTime) / 1000;
      if (elapsedTime > 30) {
        setIsShowAlertAuth(true);
      }
    }
  }, [useIsFocused]);

  useFocusEffect(useCallback(() => {
    useNasabah();
  }, [useIsFocused]));


  const handleExit = async () => {
    await saveExitTime();
  };


  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'background') {
        await handleExit();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [useIsFocused]);




  return (checkLoginLoading ? <ActivityIndicator size="large" style={{ position: 'absolute', top: 150, left: 0, right: 0 }} /> :
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
                style={{ borderRadius: 8, borderColor: '#2A8E54', borderWidth: 1 }}
                key={key}
                className={`mx-[5px] px-2 py-1 ${item === activeTab ? 'bg-primary' : 'bg-white'
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
      {showPortofolioLoading ?
        <ActivityIndicator style={{ position: 'absolute', top: 150, left: 0, right: 0 }}
          size={'large'} /> : showPortofolio?.data?.length > 0 ? <FlatList
            data={showPortofolio?.data}
            keyExtractor={(_, key) => key.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Item item={item} />}
            contentContainerStyle={styles.container}
          /> :
          <DefaultText titleClassName='text-black mt-20 font-inter-semibold self-center' title={"Belum Memiliki Portofolio"} />}
      <ModalAlert
        show={isShowAlertAuth}
        type='warning'
        buttonOne={false}
        hide={async () => {
          setIsShowAlertAuth(false);
          addStorage("detected-exitTime", "okeTrue");
          dispatch(checkLogin(await getStorage("phone-email")))
        }}
        title={'Sesi Anda telah berakhir, silahkan login kembali'}
        onConfirm={async () => {
          setIsShowAlertAuth(false);
          addStorage("detected-exitTime", "okeTrue");
          dispatch(checkLogin(await getStorage("phone-email")))
        }}
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
