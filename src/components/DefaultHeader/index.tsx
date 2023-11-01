import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultText from '../DefaultText';
import { colors } from '../../utils/colors';
import { navigationRef } from '../../navigation/RootNavigation';

interface DefaultHeaderProps {
  title?: string;
  backButton?: any;
  containerClassName?: string;
  iconColor?: string;
  titleClassName?: string;
}

export default function DefaultHeader({
  title,
  containerClassName,
  iconColor,
  titleClassName,
  backButton
}: DefaultHeaderProps) {
  return (
    <View className={`flex-row items-center p-3 ${containerClassName ?? ''}`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => backButton ? backButton() : navigationRef.goBack()}>
        <Icon name="chevron-left" size={30} color={iconColor ?? colors.black} />
      </TouchableOpacity>
      <DefaultText
        title={title}
        titleClassName={`text-base font-inter-bold flex-1 ml-2 ${titleClassName ?? ''
          }`}
      />
    </View>
  );
}
