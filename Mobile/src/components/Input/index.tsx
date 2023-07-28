import {TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import DefaultText from '../DefaultText';

interface InputProps {
  title?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  textInputProps?: TextInputProps;
}

export default function Input({
  title,
  value,
  onChangeText,
  textInputProps,
}: InputProps) {
  return (
    <View className="border-b-[1px] border-b-black py-2">
      {title && (
        <DefaultText title="Nomor HP" titleClassName="mb-1 font-inter-medium" />
      )}
      <TextInput
        className="font-inter m-0 p-0"
        value={value}
        onChangeText={onChangeText}
        {...textInputProps}
      />
    </View>
  );
}
