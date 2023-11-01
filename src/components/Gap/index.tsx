import React from 'react';
import {View, ViewStyle} from 'react-native';

interface GapProps {
  classname?: string;
  height?: number;
  style?: ViewStyle;
  width?: number;
}

export default function Gap({classname, height, width, style}: GapProps) {
  return <View className={classname} style={{width, height, ...style}} />;
}
