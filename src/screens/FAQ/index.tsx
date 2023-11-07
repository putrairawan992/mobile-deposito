import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../../components/Gap';
import { colors } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getFaqDashboard } from '../../services/dasbhoard';
import { API } from '../../utils/constant';

const Item = (item: any) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <TouchableOpacity
      onPress={() => setShowMore(!showMore)}
      activeOpacity={0.7}
      className="bg-green-200 border-[1px] border-green-600 p-2 rounded-full mb-3">
      <View className="flex-row">
        <DefaultText
          title={item?.item?.question}
          titleClassName="font-inter-semibold flex-1"
        />
        <Gap width={5} />
        <Icon name={showMore ? 'chevron-down' : 'chevron-right'} size={26} />
      </View>
      {showMore && (
        <DefaultText
          title={item?.item?.answer}
          titleClassName="mt-3"
        />
      )}
    </TouchableOpacity>
  );
};

export default function FAQ() {
  const { showFaqDashboard, showFaqDashboardLoading } = useSelector((state: RootState) => state.dashboardReducer);
  const dispatch = useDispatch<RootDispatch>();
  const [paramsSearch, setParamsSearch] = useState<string | undefined>();

  useEffect(() => {
    dispatch(getFaqDashboard(`${API}/faq`));
  }, [dispatch])

  useEffect(() => {
    let url = `${API}/faq`
    if (paramsSearch) {
      url = `${API}/faqcari/${paramsSearch}`;
    }
    dispatch(getFaqDashboard(url));
  }, [paramsSearch]);

  console.log("showFaqDashboard", showFaqDashboard?.data);


  return (
    <DefaultView>
      <DefaultHeader title="FAQ" />
      <View className="flex-row items-center border-[1px] border-primary mx-5 py-2 px-3 rounded-md">
        <View className="bg-green-500 rounded-full p-[2px]">
          <Icon name="magnify" size={20} color={colors.white} />
        </View>
        <Gap width={5} />
        <TextInput
          onChangeText={(e) => setParamsSearch(e)}
          className="p-0 m-0 font-inter-semibold flex-1"
          placeholder="Cari Pertanyaanmu"
        />
      </View>
      {showFaqDashboardLoading ? <ActivityIndicator size={"large"} style={{ marginTop: 66 }} /> : <FlatList
        data={showFaqDashboard?.data}
        keyExtractor={(_, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} />}
        contentContainerStyle={styles.container}
      />}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
