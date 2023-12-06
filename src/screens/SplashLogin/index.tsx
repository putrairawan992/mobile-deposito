import { ActivityIndicator, Image, View } from 'react-native';
import React, { useEffect } from 'react';
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
import { getDetailNasabah, getLogoNasabah } from '../../services/user';

export default function SplashLogin() {
  const { detailNasabah, detailNasabahDetailLoading, logoNasabah } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getDetailNasabah());
    dispatch(getLogoNasabah())
  }, [dispatch]);

  return (
    <DefaultView statusBarColor={colors.primaryLight}>
      <LinearGradient
        className="flex-1"
        colors={[colors.primaryLight, colors.primary]}>
        <View className="flex-1 justify-center items-center">
          <Image
            className="w-[200] h-[200] self-center"
            source={images.splashLogo}
            resizeMode="contain"
          />
        </View>
        <View style={{ bottom: 40 }} className="items-center absolute self-center">
          {detailNasabahDetailLoading ? <ActivityIndicator size="large" /> :
            <Button
              title="Masuk"
              onPress={() => navigationRef.navigate(!detailNasabah?.idUserNasabah ? 'SyaratKetentuan' : 'MyTabs')}
            />}
          <Gap height={15} />
          <DefaultText
            title="Terdaftar dan diawasi oleh"
            titleClassName="text-white font-inter-medium"
          />
          <Gap height={15} />
          <View className='flex-row content-center'>
            {logoNasabah && logoNasabah?.length > 0 &&
              logoNasabah?.map((list: any) => {
                return <Image
                  className="w-[100] h-[50] self-center"
                  source={{ uri: list.image }}
                  resizeMode="contain"
                />
              })}
          </View>
        </View>
      </LinearGradient>
    </DefaultView>
  );
}
