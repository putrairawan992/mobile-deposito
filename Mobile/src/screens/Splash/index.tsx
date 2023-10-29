import { ActivityIndicator, Image, View } from 'react-native';
import React, { createRef, useCallback, useEffect, useState } from 'react';
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



export default function Splash() {
  const [initialPage, setInitialPage] = useState<number>(0);
  const ref = createRef<PagerView>();
  const dispatch = useDispatch<RootDispatch>();
  const { showSplashDashboard, showSplashListLoading } = useSelector(
    (state: RootState) => state.dashboardReducer,
  );
  const { checkLoginLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const redirectFunction = async () => {
    if (await getItem("phone-email") && await getItem("token-expired") === undefined) {
      dispatch(checkLogin(await getItem("phone-email")))
    }
  }

  useEffect(() => {
    redirectFunction()
    dispatch(getSplashDashboard())
  }, [dispatch])

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (initialPage === 2) {
        ref.current?.setPage(0);
      } else {
        ref.current?.setPage(initialPage + 1);
      }
    }, 5000);

    return () => clearInterval(intervalID);
  }, [initialPage, ref]);


  return (
    <DefaultView statusBarColor={colors.primaryLight}>
      <LinearGradient
        className="flex-1"
        colors={[colors.primaryLight, colors.primary]}>
        <Gap height={15} />
        <Image
          className="w-[180] h-[120] self-center"
          source={images.splashLogo}
          resizeMode="contain"
        />
        {showSplashListLoading ? <ActivityIndicator /> :
          <PagerView
            className="h-[200]"
            ref={ref}
            initialPage={initialPage}
            onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
            {showSplashDashboard?.map((list: any, index: any) => {
              return <View key={index + 1 || 1}>
                <Image
                  className="w-[200] h-[200] self-center"
                  source={{ uri: list.image }}
                  resizeMode="contain"
                />
              </View>
            })}
          </PagerView>
        }
        <DefaultText
          title="Selamat datang di Deposito Syariah"
          titleClassName="text-center font-inter-semibold text-lg"
        />
        <Gap height={15} />
        <DefaultText
          title={
            'Aplikasi Marketplace Pertama Khusus Produk\nDeposito Syariah di Indonesia'
          }
          titleClassName="text-center"
        />
        <Gap height={20} />
        <View className="flex-row justify-center">
          <View
            className={`w-[20] h-[4] rounded-full ${initialPage === 0 ? 'bg-white' : 'bg-neutral-500'
              }`}
          />
          <Gap width={5} />
          <View
            className={`w-[20] h-[4] rounded-full ${initialPage === 1 ? 'bg-white' : 'bg-neutral-500'
              }`}
          />
          <Gap width={5} />
          <View
            className={`w-[20] h-[4] rounded-full ${initialPage === 2 ? 'bg-white' : 'bg-neutral-500'
              }`}
          />
        </View>

        <View className="items-center absolute bottom-7 self-center">
          {checkLoginLoading ? <ActivityIndicator /> :
            <Button
              title="MASUK"
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
