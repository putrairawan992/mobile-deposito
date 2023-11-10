import { ActivityIndicator, Image, View, useWindowDimensions } from 'react-native';
import React, { createRef, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import { colors } from '../../utils/colors';
import { images } from '../../utils/images';
import LinearGradient from 'react-native-linear-gradient';
import Gap from '../../components/Gap';
import DefaultText from '../../components/DefaultText';
import Button from '../../components/Button';
import PagerView from 'react-native-pager-view';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getSplashDashboard } from '../../services/dasbhoard';
import { getItem } from '../../utils/storage';
import { checkLogin } from '../../services/user';
import { useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Splash() {
  const { width } = useWindowDimensions();
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();
  const dispatch = useDispatch<RootDispatch>();
  const { showSplashDashboard, showSplashListLoading } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const [loading,setLoading] = useState(true);
  const { detailNasabah, detailNasabahDetailLoading, checkLoginLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );

  useFocusEffect(
    useCallback(() => {
      const useToken = async () => {
        if (await getItem("token-expired") && detailNasabah?.idUserNasabah) {
          navigationRef.navigate("MyTabs");
          return;
        }
      }
      if (!detailNasabahDetailLoading) {
        useToken();
      }
    }, [detailNasabah, detailNasabahDetailLoading]),
  );

  const redirectFunction = async () => {
    if (await getItem("phone-email") && await getItem("token-expired") === undefined) {
      dispatch(checkLogin(await getItem("phone-email")))
    }
  }

  useEffect(() => {
    redirectFunction()
    dispatch(getSplashDashboard());
    setTimeout(()=>{
      setLoading(false)
    },3000)
  }, [dispatch])


  return (
    <DefaultView statusBarColor={colors.primaryLight}>
      {loading ? <ActivityIndicator  style={{ position: 'absolute', top: 150, left: 0, right: 0 }}
      size={'large'}/>:<LinearGradient
        className="flex-1"
        colors={[colors.primaryLight, colors.primary]}>
        <Gap height={15} />
        <Image
          className="w-[180] h-[120] self-center"
          source={images.splashLogo}
          resizeMode="contain"
        />
        <Carousel
          loop
          width={width}
          height={300}
          autoPlay={true}
          autoPlayInterval={5000}
          scrollAnimationDuration={100}
          data={(showSplashDashboard && showSplashDashboard?.length > 0) && showSplashDashboard || [1, 2, 3, 4]}
          onSnapToItem={index => setInitialPage(index)}
          renderItem={({ item }: any) => (
            <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'center' }}>
              <Image
                style={{ width: width, height: 200 }}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <Gap height={20} />
              <DefaultText
                title={item?.deskripsi?.length > 100 ? item?.deskripsi?.slice(0, 100) + '...' : item?.deskripsi}
                titleClassName="text-center flex flex-wrap font-inter-semibold text-lg"
              />
            </TouchableOpacity>
          )}
        />
        <View className="flex-row mt-1 justify-center">
          {(showSplashDashboard && showSplashDashboard?.length > 0) && showSplashDashboard.map((item: any, key: any) => {
            return (
              <View
                key={key}
                className={`w-[15] h-[3] rounded-full mx-1 ${key === initialPage ? 'bg-white' : 'bg-neutral-500'
                  }`}
              />
            );
          })}
        </View>
        <Gap height={20} />
        <View className="items-center absolute bottom-7 self-center">
          {checkLoginLoading ? <ActivityIndicator /> :
            <Button
              title="Masuk"
              onPress={() => navigationRef.navigate('Login')}
            />
          }
          <Gap height={15} />
          <DefaultText
            title="Terdaftar dan diawasi oleh"
            titleClassName="text-white font-inter-medium"
          />
          <Gap height={15} />
          <Image
            className="w-[200] h-[50] self-center"
            source={images.splashFooter}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>}
    </DefaultView>
  );
}
