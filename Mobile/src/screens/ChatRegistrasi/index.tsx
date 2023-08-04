import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {colors} from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Item = ({title, isRight}: {title: string; isRight?: boolean}) => {
  return (
    <View
      className={`rounded-lg p-3 max-w-[90%] mb-3 ${
        isRight ? 'bg-primary-light self-end' : 'bg-neutral-300'
      }`}>
      <DefaultText title={title} />
    </View>
  );
};

export default function ChatRegistrasi() {
  return (
    <DefaultView
      statusBarColor={colors.primaryLight}
      containerClassName="bg-primary-light">
      <DefaultHeader title="Bantuan Registrasi" />
      <View className="bg-white flex-1 mx-5 rounded-lg">
        <FlatList
          data={[1, 2]}
          keyExtractor={(_, key) => key.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <Item
              title={
                index === 0
                  ? 'Hi. Selamat datang di Karimah live chat, bisa di bantu dengan siapa saya berbicara?\n\napakah ada yang bisa saya bantu seputar karimah deposito syariah?'
                  : 'Hai, Bagaimana cara saya untuk depositio di BPR Syariah HIK?'
              }
              isRight={index === 1}
            />
          )}
        />
      </View>
      <View className="mb-5 mt-3 rounded-lg px-2 py-3 mx-5 flex-row bg-neutral-300 max-h-[250px]">
        <TouchableOpacity activeOpacity={0.7}>
          <Icon name="attachment" size={24} color={colors.black} />
        </TouchableOpacity>
        <Gap width={10} />
        <TextInput
          className="p-0 m-0 font-inter-regular flex-1 leading-5"
          placeholder="Tulis Pesan Anda"
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
