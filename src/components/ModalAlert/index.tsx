import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/colors';

interface ModalAlertProps {
  show: boolean;
  hide: () => void;
  type?: 'success' | 'warning' | undefined;
  title: string;
  onConfirm: () => void;
}

export default function ModalAlert({
  show,
  hide,
  type = 'success',
  title,
  onConfirm,
}: ModalAlertProps) {
  return (
    <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
      <View className="bg-white p-2 py-4 rounded-lg border-[2px] border-primary">
        {type && (
          <View className="self-center mb-2">
            {type === 'success' ? (
              <Icon name="check-circle" size={80} color={colors.primary} />
            ) : type === 'warning' ? (
              <Icon name="alert" size={80} color={'#f2a31b'} />
            ) : null}
          </View>
        )}
        <DefaultText title={title} titleClassName="text-center" />
        <Gap height={15} />

        <View className='flex-row justify-center items-center mb-5'>
        <TouchableOpacity
          onPress={hide}
          activeOpacity={0.7}
          className="self-center px-5 bg-slate-600 py-2 rounded-md">
          <DefaultText title="Close" titleClassName="text-white" />
        </TouchableOpacity>
        <Gap width={15} />
        <TouchableOpacity
          onPress={onConfirm}
          activeOpacity={0.7}
          className="self-center bg-primary px-5 py-2 rounded-md">
          <DefaultText title="OK" titleClassName="text-white" />
        </TouchableOpacity>
 
        </View>
      </View>
    </Modal>
  );
}
