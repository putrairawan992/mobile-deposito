import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DefaultText from '../DefaultText';
import {colors} from '../../utils/colors';

interface TabItemInterface {
  active: boolean;
  onLongPress: () => void;
  onPress: () => void;
  title: string | any;
}

const TabItem = ({title, active, onPress, onLongPress}: TabItemInterface) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onLongPress={onLongPress}
      onPress={onPress}>
      {title === 'Beranda' ? (
        <MaterialCommunityIcons
          name={active ? 'home' : 'home-outline'}
          size={30}
          color={active ? colors.primary : colors.black}
        />
      ) : title === 'Produk' ? (
        <MaterialCommunityIcons
          name={active ? 'wallet' : 'wallet-outline'}
          size={30}
          color={active ? colors.primary : colors.black}
        />
      ) : title === 'Portofolio' ? (
        <MaterialCommunityIcons
          name={active ? 'file-account' : 'file-account-outline'}
          size={30}
          color={active ? colors.primary : colors.black}
        />
      ) : title === 'Profile' ? (
        <MaterialCommunityIcons
          name={active ? 'account' : 'account-outline'}
          size={30}
          color={active ? colors.primary : colors.black}
        />
      ) : null}

      <DefaultText
        title={title}
        titleClassName={`font-medium mt-1 ${
          active ? 'text-primary' : 'text-black'
        }`}
      />
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  wrapperLabel: {marginTop: 6},
});
