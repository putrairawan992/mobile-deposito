import { ActivityIndicator, Image, View, useWindowDimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import { colors } from '../../utils/colors';
import { images } from '../../utils/images';
import LinearGradient from 'react-native-linear-gradient';
import Gap from '../../components/Gap';
import DefaultText from '../../components/DefaultText';
import Button from '../../components/Button';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getSplashDashboard } from '../../services/dasbhoard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwiperFlatList, { Pagination, PaginationProps } from 'react-native-swiper-flatlist';
import { useFocusEffect } from '@react-navigation/native';
import { addStorage, getExitTime, getStorage } from '../../utils/storage';
import { checkLogin, getDetailNasabah } from '../../services/user';
import { WIDTH } from '../../utils/constant';
import Carousel from 'react-native-reanimated-carousel';

export default function Splash() {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch<RootDispatch>();
  const { showSplashDashboard } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const { checkLoginLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [index, setIndex] = React.useState<number>(0);
  const [loadingShow, setLoadingShow] = useState<boolean>(true);
  const { detailNasabah, detailNasabahDetailLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const fetchApiRequest = async () => {
    if (await getStorage("token")) {
      dispatch(getDetailNasabah());
    }
  }

  useFocusEffect(useCallback(() => {
    fetchApiRequest();
  }, []));

  const useNasabah = useCallback(async () => {
    const exitTime = await getExitTime();
    const currentTime = new Date().getTime();
    console.log("useNasabah");
    if (exitTime && await getStorage("phone-email")) {
      const elapsedTime = (currentTime - exitTime) / 1000;
      console.log("exitTime && await getStorage(phone-email)", elapsedTime);
      if (elapsedTime > 30) {
        console.log("elapsedTime > 30");
        addStorage("detected-exitTime", "okeTrue");
        dispatch(checkLogin(await getStorage("phone-email")));
      }
      if (elapsedTime < 30 && !await getStorage("detected-exitTime")) {
        navigationRef.navigate("MyTabs");
        return;
      } else {
        dispatch(checkLogin(await getStorage("phone-email")));
      }
    } else {
      if (await getStorage("token") && detailNasabah?.idUserNasabah && !await getStorage("detected-exitTime")) {
        console.log("ELSE exitTime && await getStorage phone-email");
        navigationRef.navigate("MyTabs");
        return;
      }
    }
  }, [detailNasabah, detailNasabahDetailLoading]);

  useFocusEffect(useCallback(() => {
    useNasabah();
  }, [detailNasabah, detailNasabahDetailLoading]));


  useEffect(() => {
    setTimeout(() => {
      setLoadingShow(false);
    }, 3333)
  }, [loadingShow]);

  useEffect(() => {
    dispatch(getSplashDashboard());
  }, [])

  const CustomPagination = (props: JSX.IntrinsicAttributes & PaginationProps) => {
    return (
      <Pagination
        {...props}
        paginationActiveColor="#4286f4"
        paginationStyle={{
          top: WIDTH / 0.85,
        }}
        paginationStyleItem={{ width: 15, height: 3, borderRadius: 8 }}
      />
    );
  };

  if (loadingShow) {
    return <DefaultView statusBarColor={colors.primaryLight}>
      <View
        style={{
          marginTop: WIDTH / 1.5
        }}>
        <Image
          className="w-[180] h-[120] self-center"
          source={images.splashLogo}
          resizeMode="contain"
        />
      </View>
    </DefaultView>
  }

  return (<DefaultView statusBarColor={colors.primaryLight}>
    <LinearGradient
      className="flex-1"
      colors={[colors.primaryLight, colors.primary]}>
      <Gap height={15} />
      <Image
        className="w-[180] h-[120] self-center"
        source={images.splashLogo}
        resizeMode="contain"
      />
      {showSplashDashboard && showSplashDashboard?.length > 0 &&
        <Carousel
          loop
          width={width}
          height={width / 1.3}
          autoPlay={true}
          autoPlayInterval={5000}
          data={showSplashDashboard}
          onSnapToItem={index => setIndex(index)}
          renderItem={({ item }) => (
            <Image
              style={{ width: width, height: "100%" }}
              source={{ uri: item.image }}
              resizeMode="contain"
            />

          )}
        />
        // <SwiperFlatList
        //   autoplay
        //   autoplayDelay={5}
        //   autoplayLoop
        //   showPagination
        //   PaginationComponent={CustomPagination}
        //   data={showSplashDashboard}
        //   renderItem={({ item }) => (
        //     <View className='items-center' style={{ height: WIDTH / 1.4, width: WIDTH, padding: 15 }}>
        //       <Image
        //         style={{ width: width, height: WIDTH / 1.3 }}
        //         source={{ uri: item.image }}
        //         resizeMode="contain"
        //       />
        //       {/* <Gap height={20} />
        //       <DefaultText
        //         title={item?.deskripsi?.length > 100 ? item?.deskripsi?.slice(0, 100) + '...' : item?.deskripsi}
        //         titleClassName="text-center flex flex-wrap font-inter-semibold text-md"
        //       /> */}

        //     </View>
        //   )}
        // />
      }
        <Gap height={10} />
          <View className="flex-row justify-center">
            {(showSplashDashboard && showSplashDashboard?.length > 0) && showSplashDashboard.map((item: any, key: any) => {
              return (
                <View
                  key={key}
                  className={`w-[15] h-[3] rounded-full mx-1 ${key === index ? 'bg-white' : 'bg-neutral-400'}`}
                />
              );
            })}
          </View>
      <Gap height={20} />
      <View className="items-center absolute bottom-12 self-center">
        {checkLoginLoading || loadingShow ? <ActivityIndicator /> :
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
    </LinearGradient>
  </DefaultView>
  );

}
