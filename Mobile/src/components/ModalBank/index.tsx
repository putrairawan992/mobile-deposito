import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';

interface ModalBankProps {
  show: boolean;
  hide: () => void;
  onConfirm: (value: string) => void;
}

export default function ModalBank({show, hide, onConfirm}: ModalBankProps) {
  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] border-primary">
        <DefaultText
          title="Pilih Bank"
          titleClassName="text-center text-base font-inter-bold"
        />
        <Gap height={15} />
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('Bank Rakyat Indonesia (BRI)')}>
          <DefaultText title="- Bank Rakyat Indonesia (BRI)" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('Bank Mandiri')}>
          <DefaultText title="- Bank Mandiri" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-2"
          onPress={() => onConfirm('Bank Central Asia (BCA)')}>
          <DefaultText title="- Bank Central Asia (BCA)" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
