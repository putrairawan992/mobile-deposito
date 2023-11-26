import { AppState, BackHandler, Dimensions, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultHeader from '../../components/DefaultHeader';
import { colors } from '../../utils/colors';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getChatListKeluhan } from '../../services/chat';

import { checkLogin, getUserProfile } from '../../services/user';
import socket from '../../utils/socket';
import WebView from 'react-native-webview';
import { RootStackScreenProps } from '../../navigation/interface';
import { SYARIAH_URL } from '../../utils/constant';
import { addStorage, getExitTime, getStorage, removeStorage, saveExitTime } from '../../utils/storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ModalAlert from '../../components/ModalAlert';

export default function Chat({ route }: RootStackScreenProps<"Chat">) {
  const dispatch = useDispatch<RootDispatch>();
  const token = route.params?.token;
  const { userProfile } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [isShowAlertAuth, setIsShowAlertAuth] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getChatListKeluhan());
  }, [dispatch]);


  const handleExit = async () => {
    await saveExitTime();
  };


  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'background') {
        await handleExit();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [useIsFocused]);

  const useNasabah = useCallback(async () => {
    const exitTime = await getExitTime();
    const currentTime = new Date().getTime();
    if (exitTime && await getStorage("phone-email")) {
      const elapsedTime = (currentTime - exitTime) / 1000;
      if (elapsedTime > 30) {
        setIsShowAlertAuth(true);
      }
    }
  }, [useIsFocused]);

  useFocusEffect(useCallback(() => {
    useNasabah();
  }, [useIsFocused]));


  const handleBackPress = (): boolean => {
    removeStorage('@exitTime');
    return false;
  };


  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress])
  );


  useEffect(() => {
    if (userProfile.data?.userProfile?.id_user) {
      socket.emit('setUsername', userProfile.data?.userProfile?.id_user);
    }
  }, [userProfile])


  return (
    <DefaultView
      statusBarColor={colors.primaryLight}
      containerClassName="bg-primary-light">
      <DefaultHeader
        backButton={() => {
          navigationRef.navigate("MyTabs");
          removeStorage('@exitTime');
        }}
        title="Chat"
      />
      <View className="flex-1 rounded-lg">
        {/* <DefaultText
          title="Chat with us"
          titleClassName="text-base font-inter-semibold mx-5 my-3"
        /> */}
        <WebView
          // allowsLinkPreview
          // allowsCrossDomainNavigation
          javaScriptEnabled
          // keyboardDisplayRequiresUserAction={true}
          // startInLoadingState 
          // domStorageEnabled 
          // sharedCookiesEnabled
          // cacheEnabled
          style={{ width: Dimensions.get('window').width }}
          source={{ uri: `${SYARIAH_URL}/user?token=${token}` }}
        //url={`https://dev.depositosyariah.id/user?token=${token}`}
        />
        {/* <ScrollView>
          {showKeluhanListLoading ? <ActivityIndicator size={"large"} /> : showKeluhanList?.data?.length > 0 ?
            showKeluhanList?.data?.map((item: any) => {
              return <View className='p-2'>
                <TouchableOpacity
                  className='p-2 bg-gray-100 rounded-md border border-blue-gray-300 cursor-pointer'
                  onPress={() => navigationRef.navigate('ChatRegistrasi', { id: item.id })}
                >
                  <View className='font-bold text-sm flex-row items-center justify-between'>
                    <DefaultText title={item.showNamaUser} titleClassName='font-inter-bold' />
                    <DefaultText title={item.created_at} titleClassName='text-xs font-inter-bold' />
                  </View>
                  <Gap height={10} />
                  <DefaultText titleClassName='text-sm font-light' title={`Terkait Masalah ${item.namaKomplen}`} />
                </TouchableOpacity>
              </View>
            }) : <DefaultText title="Belum ada pertanyaan." titleClassName='font-inter-bold text-center mt-10' />}
        </ScrollView> */}
        {/* <TouchableOpacity onPress={() => navigationRef.navigate('ListChatProduct')} className='p-2 px-3 bg-white rounded-md border border-blue-700 text-blue-700 flex items-center'>
          <DefaultText title="Kirim Pesan Baru" />
        </TouchableOpacity> */}
      </View>
      <ModalAlert
        show={isShowAlertAuth}
        buttonOne={false}
        type='warning'
        hide={async () => {
          setIsShowAlertAuth(false);
          addStorage("detected-exitTime", "okeTrue");
          dispatch(checkLogin(await getStorage("phone-email")))
        }}
        title={'Sesi Anda telah berakhir, silahkan login kembali'}
        onConfirm={async () => {
          setIsShowAlertAuth(false);
          addStorage("detected-exitTime", "okeTrue");
          dispatch(checkLogin(await getStorage("phone-email")))
        }}
      />
    </DefaultView>
  );
}
