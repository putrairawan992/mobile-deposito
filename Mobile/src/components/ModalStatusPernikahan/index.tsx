import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';

interface ModalStatusPernikahanProps {
  show: boolean;
  hide: () => void;
  onConfirm: (value: string) => void;
}

export default function ModalStatusPernikahan({show, hide, onConfirm}: ModalStatusPernikahanProps) {
  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] border-primary">
        <DefaultText
          title="Pilih Status Nikah"
          titleClassName="text-center text-base font-inter-bold"
        />
        <Gap height={15} />
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('0')}>
          <DefaultText title="Belum Nikah" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('1')}>
          <DefaultText title="Menikah" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('2')}>
          <DefaultText title="Duda / Janda" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
