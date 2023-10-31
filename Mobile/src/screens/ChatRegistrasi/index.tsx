import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { io } from 'socket.io-client';
import { addStorage, getStorage } from '../../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getUserProfile } from '../../services/user';
import { RootStackScreenProps } from '../../navigation/interface';
import { getChatListDetailKeluhan } from '../../services/chat';
import socket from '../../utils/socket';

const Item = ({ title, isRight }: { title: string; isRight?: boolean }) => {
  return (
    <View
      className={`rounded-lg p-3 max-w-[90%] mb-3 ${isRight ? 'bg-primary-light self-end' : 'bg-neutral-300'
        }`}>
      <DefaultText title={title} />
    </View>
  );
};

let chatDatav = {
  username: null,
  role: null,
  room: null,
  isChat: false,
  nasabah: null,
  cs: null,
  rate: null,
  url: null,
}

interface DataChatInterface {
  username: any,
  role: any,
  room: any,
  isChat: boolean,
  nasabah: any,
  cs: any,
  rate: any,
  url: any,
}

export default function ChatRegistrasi({ route }: RootStackScreenProps<'ChatRegistrasi'>) {
  const idParams = route.params.id;
  const [chatData, setChatData] = useState<DataChatInterface>(chatDatav);
  const dispatch = useDispatch<RootDispatch>();
  const { userProfile } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { showChatKeluan, showChatKeluanLoading } = useSelector(
    (state: RootState) => state.chatReducer
  );
  const [userNameChat, setUsernameChat] = useState<string | undefined>(showChatKeluan?.data?.namaCS);
  const [statusUser, setStatusUser] = useState<string | undefined>('Offline');
  const [customerShowName, setCustomerShowName] = useState<string | undefined>();
  const [messageInput, setMessageInput] = useState<string | undefined>();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getChatListDetailKeluhan(idParams));
  }, [dispatch, idParams])

  useLayoutEffect(() => {
    konek2SocketIO(showChatKeluan?.data);
  }, [showChatKeluan, userProfile,socket]);

  function konek2SocketIO(data: any) {

    socket.on('chatHistory', (message:any) => {
      console.log("tes: ", message)
      chatHistory(message)
    });

    socket.on('chat', (message:any) => {
     onChat(message);
    })
  }

  function chatHistory(message:any) {
    console.log("chatHistory===>",message);
    
  }

  function onChat(message:any) {
console.log("message===>:", message);

  }


  return (
    <DefaultView
      statusBarColor={colors.primaryLight}
      containerClassName="bg-primary-light">
      <DefaultHeader title="Bantuan Registrasi" />
      <View className="bg-white flex-1 mx-5 rounded-lg">
        <View className='ml-2 mb-2 mt-1 rounded-lg p-3 max-w-[90%] bg-primary-light'>
          <DefaultText titleClassName='pl-3 font-inter-bold' title={userNameChat} />
          <DefaultText titleClassName='text-xs text-gray-600 pl-3' title={statusUser} />
        </View>
      </View>
      <View className="mb-5 mt-3 rounded-lg px-2 py-3 mx-5 flex-row bg-neutral-300 max-h-[250px]">
        <TouchableOpacity activeOpacity={0.7}>
          <Icon name="attachment" size={24} color={colors.black} />
        </TouchableOpacity>
        <Gap width={10} />
        <TextInput
          className="p-0 m-0 font-inter-regular flex-1 leading-5"
          placeholder="Tulis Pesan Anda"
          onChangeText={(e) => setMessageInput(e)}
          placeholderTextColor={colors.black}
          multiline={true}
        />
        <Gap width={10} />
        <TouchableOpacity activeOpacity={0.7}>
          <Icon name="send" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
    </DefaultView>
  );
}
