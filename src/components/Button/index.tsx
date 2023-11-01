import {TouchableOpacity} from 'react-native';
import React from 'react';
import DefaultText from '../DefaultText';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  buttonColors?: string[];
  className?: string;
  titleClassName?: string;
}

export default function Button({
  title,
  onPress,
  className,
  titleClassName,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`bg-white px-16 py-2 rounded-full justify-center items-center ${className}`}>
      <DefaultText
        title={title}
        titleClassName={`text-lg font-inter-bold text-primary ${titleClassName}`}
      />
    </TouchableOpacity>
  );
}
