import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import { getShowNotificationList, getShowReadNotificationList } from '../../services/notification';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import moment from 'moment';

export default function Notifikasi() {
  const dispatch = useDispatch<RootDispatch>();
  const { showNotificationList, showNotificationListLoading, showReadNotificationListLoading } = useSelector(
    (state: RootState) => state.notificationReducer,
  );

  useEffect(() => {
    dispatch(getShowNotificationList());
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          dispatch(getShowReadNotificationList(item?.id));
          dispatch(getShowNotificationList());
        }}
        className={`border-[1px] border-primary py-2 px-5 mb-1 
        ${item?.notifikasi === "0" ? 'bg-white' : 'bg-primary-light' }`}>
        {/* <DefaultText
          title="Promo"
          titleClassName="font-inter-semibold text-neutral-500"
        />
        <Gap height={5} /> */}
        <DefaultText
          title={item?.content?.text}
          titleClassName="font-inter-medium"
        />
        <Gap height={5} />
        <DefaultText
          title={`deposito by ${item?.content?.data?.nasabah}`}
          titleClassName="text-xs"
        />
        <DefaultText title={moment(item?.update_at).format('DD MMM YYYY')} titleClassName="text-xs" />
      </TouchableOpacity>
    );
  };

  return (
    <DefaultView>
      <DefaultHeader title="Pemberitahuan Terbaru" />
      {showNotificationListLoading || showReadNotificationListLoading ? 
      <ActivityIndicator size="large" 
      style={{ position: "absolute", top: 250, left: 0, right: 0 }} /> : 
      showNotificationList?.data?.length > 0 ?
        <View className='p-5'>
          <FlatList
            data={showNotificationList?.data}
            keyExtractor={(_, key) => key.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View> :
        <DefaultText title="Tidak ada notifikasi."
          titleClassName='self-center mt-44 font-inter-medium tex-xl align-middle'
        />}
    </DefaultView>
  );
}
