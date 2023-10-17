import AsyncStorage from '@react-native-async-storage/async-storage';

export const addStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log(`No data found for key: ${key}`);
      return null; // or handle the case when no data is found
    }
  } catch (e) {
    console.log(`Error while getting data for key ${key}: ${e}`);
    return null; // or handle the error
  }
};

export const removeStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
