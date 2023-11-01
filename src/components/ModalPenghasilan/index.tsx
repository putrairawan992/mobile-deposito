import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';

interface ModalPenghasilanProps {
  show: boolean;
  hide: () => void;
  onConfirm: (value: string) => void;
}

export default function ModalPenghasilan({show, hide, onConfirm}: ModalPenghasilanProps) {
  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] border-primary">
        <DefaultText
          title="Pilih Penghasilan"
          titleClassName="text-center text-base font-inter-bold"
        />
        <Gap height={15} />
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('1')}>
          <DefaultText title="0 - 5 jt" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('2')}>
          <DefaultText title="5 - 10 jt" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('3')}>
          <DefaultText title="10 - 20 jt" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('4')}>
          <DefaultText title="20 - 50 jt" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('5')}>
          <DefaultText title="> 50 jt" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
