import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import React, { ReactNode } from 'react';
import DefaultText from '../DefaultText';

interface InputProps {
  title?: string;
  titleClassName?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  textInputProps?: TextInputProps;
  ComponentRight?: ReactNode;
  onPress?: () => void;
  length?: number | undefined;
  isConditional?: boolean;
}

export default function Input({
  title,
  value,
  onChangeText,
  textInputProps,
  titleClassName,
  ComponentRight,
  isConditional = false,
  onPress,
  length
}: InputProps) {
  return (
    <Pressable
      disabled={!onPress}
      className="border-b-[1px] border-b-black py-2"
      onPress={onPress}>
      <View className='flex-row'>
        {title && (
          <DefaultText
            title={title}
            titleClassName={`mb-1 font-inter-medium ${titleClassName ?? ''}`}
          />
        )}
        {isConditional && ComponentRight && ComponentRight}
      </View>
      <Pressable disabled={!onPress} className="flex-row" onPress={onPress}>
        <TextInput
          className="font-inter m-0 p-0 flex-1 text-black"
          value={value}
          maxLength={length}
          onChangeText={onChangeText}
          editable={!onPress}
          onPressIn={onPress}
          {...textInputProps}
        />
        {!isConditional &&  ComponentRight && ComponentRight}
      </Pressable>
    </Pressable>
  );
}
