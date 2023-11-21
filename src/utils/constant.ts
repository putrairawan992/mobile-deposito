import { Dimensions } from 'react-native';
import { getStorage } from './storage';

export const API =
  'https://dev.depositosyariah.id/api';


 export const WIDTH = Dimensions.get('window').width;
 export const HEIGHT = Dimensions.get('window').height;

export const getToken = async ()=>{
  return await getStorage('token');
}  

export const defaultHeaderAxios = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};

export const statusNikahValidation = (val: string) => {
  let textVal;
  if (val === '1') {
    textVal = 'Belum Menikah'
  }
  if (val === '2') {
    textVal = 'Menikah'
  } 
  if (val === '3') {
    textVal = 'Cerai Hidup'
  }
  if (val === '4') {
    textVal = 'Cerai Mati'
  }
  return textVal;
}

export  const MAX_FILE_SIZE = 500 * 1024;

 export const penghasilanValidation = (val: string) => {
  let textVal;
  if (val === '1') {
    textVal = '0 - 5 jt'
  }
  if (val === '2') {
    textVal = '5 - 10 jt'
  } 
  if (val === '3') {
    textVal = '10 - 20 jt'
  }
  if (val === '4') {
    textVal = '20 - 50 jt'
  }
  if (val === '5') {
    textVal = '> 50 jt'
  }
  return textVal;
}

export function capitalizeFirstLetter(val:string) {
  return val?.charAt(0)?.toUpperCase() + val?.slice(1)?.replace(/[0-9]|[_]|[-]/g, ' ');
}
