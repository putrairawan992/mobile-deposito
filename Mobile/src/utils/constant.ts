import { getStorage } from './storage';

export const API =
  'https://dev.depositosyariah.id/api';


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
  if (val === '0') {
    textVal = 'Belum Menikah'
  }
  if (val === '1') {
    textVal = 'Menikah'
  } 
  if (val === '2') {
    textVal = 'Duda / Janda'
  }
  return textVal;
}

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
