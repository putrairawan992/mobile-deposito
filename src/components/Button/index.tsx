import {TouchableOpacity} from 'react-native';
import React from 'react';
import DefaultText from '../DefaultText';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  buttonColors?: string[];
  className?: string;
  titleClassName?: string;
  py?:string;
  rounded?: string;
}

export default function Button({
  title,
  onPress,
  className,
  titleClassName,
  py = 'px-16',
  rounded = 'rounded-full'
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`${py} ${rounded} bg-white py-2 justify-center items-center ${className}`}>
      <DefaultText
        title={title}
        titleClassName={`text-lg font-inter-bold text-primary ${titleClassName}`}
      />
    </TouchableOpacity>
  );
}
