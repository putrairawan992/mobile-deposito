import {Image, View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import {colors} from '../../utils/colors';
import {images} from '../../utils/images';
import LinearGradient from 'react-native-linear-gradient';
import Gap from '../../components/Gap';
import DefaultText from '../../components/DefaultText';
import Button from '../../components/Button';
import {navigationRef} from '../../navigations/RootNavigation';

export default function SplashLogin() {
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
        <View className="items-center absolute bottom-7 self-center">
          <Button
            title="MASUK"
            onPress={() => navigationRef.navigate('SyaratKetentuan')}
          />
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
