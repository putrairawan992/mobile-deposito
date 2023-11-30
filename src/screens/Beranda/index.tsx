import {
  ActivityIndicator,
  AppState,
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import { images } from '../../utils/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import Button from '../../components/Button';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getShowPromo } from '../../services/product';
import { RootDispatch, RootState } from '../../store';
import { getShowDashboard } from '../../services/dasbhoard';
import { formatRupiah } from '../../utils/currency';
import { checkLogin, getDetailNasabah, getUserProfile } from '../../services/user';
import { addStorage, getExitTime, getStorage, saveExitTime, } from '../../utils/storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ModalAlert from '../../components/ModalAlert';
import { ScrollView } from 'react-native-gesture-handler';
import { WIDTH } from '../../utils/constant';
import { getShowArtikelList } from '../../services/artikel';
import moment from 'moment';
import { getShowNotificationList } from '../../services/notification';
import { EntryAnimation } from '../../utils/EntryAnimation';


export default function Beranda() {
  const { width } = useWindowDimensions();
  const { showPromo } = useSelector(
    (state: RootState) => state.productReducer,
  );
  const [topActive, setTopActive] = useState<number>(0);
  const { showDashboard, showDashboardLoading } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const { detailNasabah, checkLoginLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const { showArtikelListData } = useSelector(
    (state: RootState) => state.artikelReducer,
  );
  const { showNotificationList } = useSelector(
    (state: RootState) => state.notificationReducer,
  );
  const [index, setIndex] = React.useState<number>(0);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [dtNasabah, setDtNasabah] = useState<any>();
  const [notifCount, setNotifCount] = useState<number>(0);
  const [isShowAlertAuth, setIsShowAlertAuth] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowPromo());
    dispatch(getUserProfile());
    dispatch(getShowArtikelList())
    dispatch(getShowDashboard()).then(async (res: any) => {
      if (!res?.statuses['5'].status && await getStorage("resetPass")) {
        navigationRef.navigate("BuatPassword", { isShowDashboard: true });
      }
    });
  }, [dispatch]);

  const handleBackPress = (): boolean => {
    return true;
  };


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


  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress])
  );

  // useEffect(() => {
  //   if (token && !userProfile?.data?.statuse?.profile && detailNasabah?.idUserNasabah) {
  //     setUpdateProfile(true);
  //   }
  // }, [detailNasabah,userProfile]);

  const redirectUrlChat = async () => {
    navigationRef.navigate("Chat", { token: await getStorage("token") });
  }

  const sumNotifications = (notifications: any[]): number => {
    return notifications?.reduce((total, notification) => {
      console.log("notification?.notifikasi", notification?.notifikasi);

      return total + (notification?.notifikasi !== '0' ? 1 : 0);
    }, 0);
  };

  useFocusEffect(useCallback(() => {
    dispatch(getShowDashboard());
    dispatch(getShowNotificationList());
    dispatch(getDetailNasabah());
  }, [dispatch]))
  console.log("showNotificationList?.data", showNotificationList?.data);

  useFocusEffect(
    useCallback(() => {
      const totalNotifications: number = sumNotifications(showNotificationList?.data);
      setDtNasabah(detailNasabah);
      setNotifCount(totalNotifications);
    }, [detailNasabah, showNotificationList]));

  return (
    <DefaultView>
      <View className="flex-row items-center px-5 py-2 mb-2">
        <Image
          className="w-[80] h-[40]"
          source={images.logo}
          resizeMode="contain"
        />
        <Gap classname="flex-1" />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigationRef.navigate('Notifikasi')}>
          {notifCount > 0 && <View className='bg-red-500 absolute right-4 bottom-3 px-1 py-0.3 rounded-full'>
            <Text className='text-white'>{notifCount}</Text>
          </View>}
          <Icon name="bell" size={24} color={'#2A8E54'} />
        </TouchableOpacity>
        <Gap width={10} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => redirectUrlChat()}>
          <Icon name="message" size={24} color={'#2A8E54'} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        className="mx-2 p-3 rounded-xl"
        colors={[colors.primary, '#0F3746']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <DefaultText
          title={`Selamat datang, ${dtNasabah?.nama}`}
          titleClassName="text-white"
        />
        <Gap height={10} />
        <View className="flex-row items-center">
          <View className="bg-white p-3 rounded-lg flex-1 mr-2">
            <Carousel
              loop
              width={width / 1.2}
              {...{ vertical: true }}
              height={50}
              // autoPlay={true}
              data={
                [{ val: showDashboard?.bagiHasil, label: "Bagi Hasil" },
                { val: showDashboard?.deposito, label: "Total Deposito" },
                { val: showDashboard?.portofolio, label: "Total Portofolio" }]}
              // scrollAnimationDuration={1000}
              onSnapToItem={index => setTopActive(index)}
              renderItem={({ item, index }) => (
                <View>
                  <DefaultText
                    title={item.label}
                    titleClassName="font-inter-medium"
                  />
                  <DefaultText
                    title={formatRupiah(String(item.val), "Rp")}
                    titleClassName="font-inter-bold text-xl"
                  />
                </View>
              )}
            />
          </View>
          <Gap width={10} />
          <View>
            <View
              className={`w-[3] h-[20]  rounded-full ${topActive === 0 ? 'bg-white' : 'bg-neutral-400'
                }`}
            />
            <Gap height={3} />
            <View
              className={`w-[3] h-[20]  rounded-full ${topActive === 1 ? 'bg-white' : 'bg-neutral-400'
                }`}
            />
            <Gap height={3} />
            <View
              className={`w-[3] h-[20]  rounded-full ${topActive === 2 ? 'bg-white' : 'bg-neutral-400'
                }`}
            />
          </View>
        </View>
      </LinearGradient>
      <Gap height={20} />

      <EntryAnimation index={0}>
        <ScrollView>
          <View className="flex-row items-center px-5">
            <DefaultText
              title="Pilihan Promo"
              titleClassName="text-base font-inter-medium flex-1"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigationRef.navigate('SemuaPromo')}>
              <DefaultText
                title="Lihat Semua"
                titleClassName="text-xs text-primary"
              />
            </TouchableOpacity>
          </View>
          {showPromo && showPromo?.length > 0 &&
            <View style={{ paddingLeft: 18, paddingRight: 15 }}>
              <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                autoPlayInterval={5000}
                data={showPromo}
                // scrollAnimationDuration={5000}
                onSnapToItem={index => setIndex(index)}
                renderItem={({ item }: { item: { image: string } }) => (
                  <View style={styles.child}>
                    <Image
                      style={{ width: WIDTH / 1.1, height: "100%" }}
                      source={{ uri: item?.image }}
                      resizeMode="contain"
                    />
                  </View>
                )}
              />
              {/* <CarouselSnap
                data={showPromo}
                renderItem={({ item }) => (
                  <View style={styles.child}>
                    <Image
                      style={{ width: WIDTH / 1.1, height: "100%" }}
                      source={{ uri: item?.image }}
                      resizeMode="contain"
                    />
                  </View>
                )}
                loop
                autoplay
                // autoplayDelay={5000}
                // autoplayInterval={5000}
                activeSlideAlignment={'start'}
                onSnapToItem={i => setIndex(i)}
                sliderWidth={WIDTH}
                itemWidth={WIDTH}
                sliderHeight={HEIGHT}
              /> */}
            </View>}
          <Gap height={10} />
          <View className="flex-row justify-center">
            {(showPromo && showPromo?.length > 0) && showPromo.map((item: any, key: any) => {
              return (
                <View
                  key={key}
                  className={`w-[15] h-[3] rounded-full mx-1 ${key === index ? 'bg-blue-500' : 'bg-neutral-400'}`}
                />
              );
            })}
          </View>
          <View className="w-full h-[2] bg-neutral-300 my-3" />
          <Gap height={10} />
          <View className="flex-row items-center px-5">
            <DefaultText
              title="Artikel Terbaru"
              titleClassName="text-base font-inter-medium flex-1"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigationRef.navigate('SemuaBlog')}>
              <DefaultText
                title="Lihat Semua"
                titleClassName="text-xs text-primary"
              />
            </TouchableOpacity>
          </View>
          <Gap height={10} />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerBlog}>
            {showArtikelListData && showArtikelListData?.length > 0 && showArtikelListData.map((item: any, key: number) => {
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.7}
                  onPress={() => navigationRef.navigate("BlogDetail", { id: item.id })}
                  className="p-2 border-[1px] border-primary self-start rounded-xl mx-2"
                  style={{ width: width / 2.1, height: width / 2 }}>
                  <Image
                    style={{ height: width / 4.2 }}
                    className="w-full"
                    source={{ uri: item.image }}
                    resizeMode="cover"
                  />
                  <Gap height={10} />
                  <DefaultText
                    title={item.judul}
                    titleClassName="font-inter-medium text-xs text-primary"
                    titleProps={{
                      numberOfLines: 2,
                    }}
                  />
                  <View className="absolute bottom-1 left-2">
                    <DefaultText title={item.author} titleClassName="text-xs" />
                    <DefaultText title={moment(item.created_at).format("DD MMMM YYYY")} titleClassName="text-xs" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Gap height={10} />
          <View className="w-full h-[2] bg-neutral-300 my-3" />
          <View className="px-5">
            <DefaultText
              title="Tentang Deposito Syariah"
              titleClassName="text-base font-inter-medium"
            />
            <Gap height={5} />
            <DefaultText title="Kenapa Harus Investasi di Deposito BPR Syariah" />
            <Gap height={10} />
            <View className="flex-row border-[1px] border-primary rounded-lg p-2">
              <Image
                className="w-[60] h-[60]"
                source={images.depositoOne}
                resizeMode="contain"
              />
              <Gap width={10} />
              <View className="flex-1">
                <DefaultText
                  title="Mau Deposito? Mudah!"
                  titleClassName="font-inter-medium"
                />
                <Gap height={2.5} />
                <DefaultText
                  title="#LebihMudah"
                  titleClassName="font-inter-medium text-xs text-primary"
                />
                <Gap height={2.5} />
                <DefaultText
                  title="Aplikasi yang mudah digunakan, mau deposito tidak perlu pergi ke Bank."
                  titleClassName="text-xs"
                />
              </View>
            </View>
            <Gap height={10} />
            <View className="flex-row border-[1px] border-primary rounded-lg p-2">
              <Image
                className="w-[60] h-[60]"
                source={images.depositoOne}
                resizeMode="contain"
              />
              <Gap width={10} />
              <View className="flex-1">
                <DefaultText
                  title="Nikmati akses ratusan BPR Syariah"
                  titleClassName="font-inter-medium"
                />
                <Gap height={2.5} />
                <DefaultText
                  title="#LebihPraktis"
                  titleClassName="font-inter-medium text-xs text-primary"
                />
                <Gap height={2.5} />
                <DefaultText
                  title="Cukup 1x daftar dan nikmati kemudian buka deposito di ratusan BPR terseleksi di Indonesia"
                  titleClassName="text-xs"
                />
              </View>
            </View>
            <Gap height={20} />
            {(!showDashboard?.bagiHasil && !showDashboard?.deposito) &&
              <Button
                title="Yuk Deposito Sekarang"
                onPress={() => navigationRef.navigate('Produk')}
                className="bg-primary rounded-xl self-center px-6"
                titleClassName="text-white"
              />}
          </View>

          <Gap height={50} />
        </ScrollView>
      </EntryAnimation>
      <ModalAlert
        show={isShowAlertAuth}
        buttonOne={false}
        type='warning'
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
      <ModalAlert show={updateProfile}
        hide={() =>
          setUpdateProfile(false)
        }
        title='Lengkapi Data Profile'
        onConfirm={() => {
          setUpdateProfile(false);
          navigationRef.navigate('DetailPribadi');
        }}
        type='warning' />
    </DefaultView>



  );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerBlog: {
    paddingHorizontal: 5,
  },
  child: { width },
});

