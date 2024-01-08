import { AppState, BackHandler, Dimensions, Platform, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultHeader from '../../components/DefaultHeader';
import { colors } from '../../utils/colors';
import { navigationRef } from '../../navigation/RootNavigation';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../../store';

import { checkLogin } from '../../services/user';
import WebView from 'react-native-webview';
import { RootStackScreenProps } from '../../navigation/interface';
import { SYARIAH_URL } from '../../utils/constant';
import { addStorage, getExitTime, getStorage, removeStorage, saveExitTime } from '../../utils/storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ModalAlert from '../../components/ModalAlert';

export default function Chat({ route }: RootStackScreenProps<"Chat">) {
  const dispatch = useDispatch<RootDispatch>();
  const token = route.params?.token;
  const webViewRef = useRef(null)
  const onContentProcessDidTerminate = () => webViewRef?.current?.reload();
  const [isShowAlertAuth, setIsShowAlertAuth] = useState<boolean>(false);

  const handleExit = async () => {
    await saveExitTime();
  };
  console.log(token, "<<<<token");

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
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress])
  );

  return (
    <DefaultView
      statusBarColor={colors.primaryLight}
      containerClassName="bg-primary-light">
      <DefaultHeader
        backButton={() => {
          navigationRef.navigate("MyTabs");
          removeStorage('@exitTime');
        }}
        title="Hubungi Kami"
      />
      <View className="flex-1 rounded-lg">
        <WebView
          // ref={webViewRef}
          // onContentProcessDidTerminate={onContentProcessDidTerminate}
          javaScriptEnabled={true}
          // sharedCookiesEnabled={true}
          // thirdPartyCookiesEnabled={true}
          style={{ width: Dimensions.get('window').width }}
          source={{ uri: `${SYARIAH_URL}/user?token=${token}` }}
        />
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


//apk