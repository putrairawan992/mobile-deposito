import Toast from 'react-native-simple-toast';

export const showToast = (message: string) => {
  Toast.show(message, Toast.SHORT);
};
