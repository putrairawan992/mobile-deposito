import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { getDetailNasabah } from '../../services/user';
import { removeStorage } from '../../utils/storage';

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
  const { detailNasabah } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowPromo());
    dispatch(getShowDashboard());
    dispatch(getDetailNasabah());
  }, [dispatch]);

  return (
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
          onPress={() => navigationRef.navigate('Chat')}>
          <Icon name="message" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        className="mx-2 p-3 rounded-xl"
        colors={[colors.primary, '#0F3746']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <DefaultText
          title={`Selamat datang, ${detailNasabah?.nama}`}
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
              [{ val: showDashboard?.bagiHasil, label: "Proyek Bagi Hasil" },
              { val: showDashboard?.deposito, label: "Proyek Deposito" },
              { val: showDashboard?.portofolio, label: "Proyek Portofolio" }]}
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
                  titleClassName="font-inter-bold text-3xl"
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

      <ScrollView showsVerticalScrollIndicator={false}>
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
          data={(showPromo && showPromo?.length > 0) && showPromo || [1, 2, 3, 4]}
          scrollAnimationDuration={100}
          onSnapToItem={index => setPromoActive(index)}
          renderItem={({ item }: any) => (
            <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'center' }}>
              <Image
                style={{ width: width / 1.2, height: width / 2.2 }}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
        <View className="flex-row justify-center">
          {[1, 2, 3].map((item, key) => {
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
            title="Update Deposito Syariah"
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
            title="Update Deposito Syariah"
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
          <Button
            title="Yuk Deposito Sekarang"
            onPress={() => navigationRef.navigate('AjukanDeposito')}
            className="bg-primary rounded-xl self-center px-6"
            titleClassName="text-white"
          />
        </View>

        <Gap height={50} />
      </ScrollView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  containerBlog: {
    paddingHorizontal: 5,
  },
});
