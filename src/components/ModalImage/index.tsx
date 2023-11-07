import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';

interface ModalBankProps {
  show: boolean;
  data: string;
  title: string;
  hide: () => void;
  onConfirm: () => void;
}

export default function ModalImage({ show, hide, onConfirm, data, title }: ModalBankProps) {
  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] border-primary">
        <DefaultText
          title={title}
          titleClassName="text-center text-base font-inter-bold"
        />
        <Gap height={30} />
        <Image source={{ uri: data }} style={{ height: 222, width: "100%" }} />
        <Gap height={15} />
        <TouchableOpacity
          onPress={onConfirm}
          activeOpacity={0.7}
          className="self-center bg-primary px-5 py-2 rounded-full">
          <DefaultText title="OK" titleClassName="text-white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
