import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import {colors} from '../../utils/colors';

const Item = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={() => setShowMore(!showMore)}
      activeOpacity={0.7}
      className="bg-green-200 border-[1px] border-green-600 p-2 rounded-md mb-3">
      <View className="flex-row">
        <DefaultText
          title="Siapa saja yang dapat menjadi Deposan Deposito BPR Syariah?"
          titleClassName="font-inter-semibold flex-1"
        />
        <Gap width={5} />
        <Icon name={showMore ? 'chevron-down' : 'chevron-right'} size={26} />
      </View>
      {showMore && (
        <DefaultText
          title="Seluruh Warga Negara Indonesia (WNI) dengan usia minimal 17 tahun dan memiliki Kartu Tanda Penduduk (KTP) elektrik. Seluruh Badan Usaha yang didirikan di Indonesia"
          titleClassName="mt-3"
        />
      )}
    </TouchableOpacity>
  );
};

export default function FAQ() {
  return (
    <DefaultView>
      <DefaultHeader title="FAQ" />
      <View className="flex-row items-center border-[1px] border-primary mx-5 py-2 px-3 rounded-md">
        <View className="bg-green-500 rounded-full p-[2px]">
          <Icon name="magnify" size={20} color={colors.white} />
        </View>
        <Gap width={5} />
        <TextInput
          className="p-0 m-0 font-inter-semibold flex-1"
          placeholder="Cari Pertanyaanmu"
        />
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => <Item />}
        contentContainerStyle={styles.container}
      />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
