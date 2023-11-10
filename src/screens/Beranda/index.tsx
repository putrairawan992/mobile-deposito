import {
  ActivityIndicator,
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  ToastAndroid,
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
import { getItem, getStorage } from '../../utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import ModalAlert from '../../components/ModalAlert';
import { ScrollView } from 'react-native-gesture-handler';

export default function Beranda() {
  const { width } = useWindowDimensions();
  const { showPromo } = useSelector(
    (state: RootState) => state.productReducer,
  );
  const [promoActive, setPromoActive] = useState<number>(0);
  const [topActive, setTopActive] = useState<number>(0);
  const { showDashboard } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const { detailNasabah, detailNasabahDetailLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [dtNasabah, setDtNasabah] = useState<any>();
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowPromo());
    dispatch(getUserProfile());
    dispatch(getShowDashboard());
    dispatch(getDetailNasabah());
  }, [dispatch]);

  const handleBackPress = (): boolean => {
    return true;
  };
  
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
    //Linking.openURL(`https://dev.depositosyariah.id/user?token=${await getStorage("token")}`)
  }


  useFocusEffect(useCallback(() => {
    if (!detailNasabahDetailLoading) {
      const useNasabah = async () => {
        setLoading(false);
        if (await getStorage('register-completed') === null) {
          if (await getItem("token-expired") && !detailNasabah.idUserNasabah) {
            if (await getStorage('skIsTrue') === null) {
              navigationRef.navigate("SyaratKetentuan");
            } else {
              navigationRef.navigate("Register");
            }
          }
          if (await getStorage("phone-email") && await getItem("token-expired") === undefined) {
            dispatch(checkLogin(await getStorage("phone-email")))
          }
        }
      }
      setTimeout(() => {
        useNasabah();
      }, 2222)
      setDtNasabah(detailNasabah);
    }
  }, [detailNasabah, detailNasabahDetailLoading])
  );

  return (
    loading ? <ActivityIndicator size="large" style={{ position: 'absolute', top: 150, left: 0, right: 0 }} /> :
      <DefaultView>
        <View className="flex-row items-center px-5 py-2 border-b-[1px] border-b-neutral-300">
          <Image
            className="w-[80] h-[40]"
            source={images.logo}
            resizeMode="contain"
          />
          <Gap classname="flex-1" />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigationRef.navigate('Notifikasi')}>
            <Icon name="bell" size={24} color={colors.black} />
          </TouchableOpacity>
          <Gap width={10} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => redirectUrlChat()}>
            <Icon name="message" size={24} color={colors.black} />
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
            <Carousel
              loop
              width={width / 1.2}
              {...{ vertical: true }}
              height={100}
              // autoPlay={true}
              data={
                [{ val: showDashboard?.bagiHasil, label: "Bagi Hasil" },
                { val: showDashboard?.deposito, label: "Total Deposito" },
                { val: showDashboard?.portofolio, label: "Total Portofolio" }]}
              // scrollAnimationDuration={1000}
              onSnapToItem={index => setTopActive(index)}
              renderItem={({ item }) => (
                <View className="bg-white p-3 rounded-lg flex-1 mr-2">
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
          <Gap height={10} />
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            autoPlayInterval={5000}
            scrollAnimationDuration={100}
            data={(showPromo && showPromo?.length > 0) && showPromo || [1, 2, 3, 4]}
            onSnapToItem={index => setPromoActive(index)}
            renderItem={({ item, index }: any) => (
              <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'center' }}>
                <Image
                  style={{ width: width, height: width / 2 }}
                  source={{ uri: item.image }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
          <View className="flex-row mt-2 justify-center">
            {(showPromo && showPromo?.length > 0) && showPromo.map((item: any, key: any) => {
              return (
                <View
                  key={key}
                  className={`w-[15] h-[3] rounded-full mx-1 ${key === promoActive ? 'bg-blue-500' : 'bg-neutral-400 '
                    }`}
                />
              );
            })}
          </View>
          <View className="w-full h-[2] bg-neutral-300 my-3" />
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
            {[1, 2, 3].map((_, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.7}
                  className="p-2 border-[1px] border-primary self-start rounded-xl mx-2"
                  style={{ width: width / 2.1, height: width / 2 }}>
                  <Image
                    style={{ height: width / 4.2 }}
                    className="w-full"
                    source={images.promo}
                    resizeMode="cover"
                  />
                  <DefaultText
                    title="Perbedaan Kerja Keras dan Kerja Cerdas, Lebih Baik Mana?"
                    titleClassName="font-inter-medium text-xs text-primary"
                    titleProps={{
                      numberOfLines: 2,
                    }}
                  />
                  <View className="absolute bottom-2 left-2">
                    <DefaultText title="deposito HIK" titleClassName="text-xs" />
                    <DefaultText title="04 July 2023" titleClassName="text-xs" />
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
                  title="Bagi Hasil hingga 6,75%"
                  titleClassName="font-inter-medium"
                />
                <Gap height={2.5} />
                <DefaultText
                  title="#LebihUntung"
                  titleClassName="font-inter-medium text-xs text-primary"
                />
                <Gap height={2.5} />
                <DefaultText
                  title="Sesuai dengan aturan LPS dari lebih tinggi dari Bagi Hasil deposito biasa"
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
                  title="Cukup 1x daftar dan nikmati kemudian buka deposito di ratusan BPS terseleksi di Indonesia"
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

const styles = StyleSheet.create({
  containerBlog: {
    paddingHorizontal: 5,
  },
});
