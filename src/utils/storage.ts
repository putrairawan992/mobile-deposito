import AsyncStorage from '@react-native-async-storage/async-storage';

export const addStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getItem = async (key: string) => {
  let data = await AsyncStorage.getItem(key) as any;
  data = JSON.parse(data);
  if (
    data !== null &&
    data.expireAt &&
    new Date(data.expireAt) < new Date()
  ) {
    await AsyncStorage.removeItem(key);
    data = null;
  }
  return data?.value;
}

export const setItem = async (key: string, value: any, expireInMinutes: number) => {
  const data = { value } as any;
  if (expireInMinutes) {
    const expireAt = getExpireDate(expireInMinutes) as any;
    data.expireAt = expireAt;
  } else {
    const expireAt = JSON.parse(await AsyncStorage.getItem(key) as any)?.expireAt;
    if (expireAt) {
      data.expireAt = expireAt;
    } else {
      return;
    }
  }
  const objectToStore = JSON.stringify(data);
  return AsyncStorage.setItem(key, objectToStore);
}

export const getExpireDate = (expireInMinutes: any) => {
  const now = new Date();
  const expireTime = new Date(now);
  expireTime.setMinutes(now.getMinutes() + expireInMinutes);
  return expireTime;
}

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

export const saveExitTime = async () => {
  try {
    const exitTime = new Date().getTime().toString();
    await AsyncStorage.setItem('@exitTime', exitTime);
  } catch (error) {
    console.error('Error saving exit time:', error);
  }
};

export const getExitTime = async () => {
  try {
    const exitTime = await AsyncStorage.getItem('@exitTime');
    return exitTime ? parseInt(exitTime) : null;
  } catch (error) {
    console.error('Error getting exit time:', error);
    return null;
  }
};
