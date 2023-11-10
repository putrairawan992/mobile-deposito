import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import {colors} from '../../utils/colors';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const Item = ({
  title,
  isRight,
  isProduct,
}: {
  title: string;
  isRight?: boolean;
  isProduct?: boolean;
}) => {
  if (isProduct) {
    return (
      <LinearGradient
        colors={[colors.primary, '#0F3746']}
        className="rounded-lg p-3 max-w-[90%] mb-3 self-end">
        <View className="flex-row items-center">
          <DefaultText
            title="BPR Kencana Abadi"
            titleClassName="font-inter-semibold text-white"
          />
          <View className="bg-yellow-600 p-1 rounded-md">
            <DefaultText
              title="Proses"
              titleClassName="text-[10px] text-white"
            />
          </View>
        </View>
        <Gap height={2.5} />
        <View className="flex-row">
          <View>
            <DefaultText
              title="Kode Produk"
              titleClassName="text-[10px] text-white mb-[2px]"
            />
            <DefaultText
              title="BPR - 2242444"
              titleClassName="text-[10px] text-white"
            />
          </View>
          <Gap width={10} />
          <View>
            <DefaultText
              title="Bagi Hasil"
              titleClassName="text-[10px] text-white mb-[2px]"
            />
            <DefaultText
              title="5% / Tahun"
              titleClassName="text-[10px] text-white"
            />
          </View>
          <Gap width={10} />
          <View>
            <DefaultText
              title="Nisbah"
              titleClassName="text-[10px] text-white mb-[2px]"
            />
            <DefaultText
              title="40:60"
              titleClassName="text-[10px] text-white"
            />
          </View>
          <Gap width={10} />
          <View>
            <DefaultText
              title="Tenor"
              titleClassName="text-[10px] text-white mb-[2px]"
            />
            <DefaultText
              title="3 Bulan"
              titleClassName="text-[10px] text-white"
            />
          </View>
        </View>
      </LinearGradient>
    );
  }

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
      <DefaultHeader title="Bantuan Transaksi" />
      <View className="bg-white flex-1 mx-5 rounded-lg">
        <FlatList
          inverted={true}
          style={styles.container}
          data={[1, 2]}
          keyExtractor={(_, key) => key.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <Item
              title={'Hai, sudah sampai mana transaksi saya berjalan?'}
              isRight={true}
              isProduct={index === 1}
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

const styles = StyleSheet.create({
  container: {
    scaleY: -1,
  },
});
