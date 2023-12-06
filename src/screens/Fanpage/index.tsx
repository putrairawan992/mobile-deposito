import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import Gap from '../../components/Gap';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../../store';
import { socialMediaService } from '../../services/dasbhoard';

export default function Fanpage() {
  const [socialMedia, setSocialMedia] = useState<any>();
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(socialMediaService(setSocialMedia))
  }, []);

  console.log("socialMedia", socialMedia);


  return (
    <DefaultView>
      <DefaultHeader title="Ikuti Fanpage Kami" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-3">
          {socialMedia?.data?.map((list: any) => {
            return <TouchableOpacity
              onPress={() => Linking.openURL(list.link)}
              style={{
                borderRadius: 8,
                borderColor: '#2A8E54',
                borderWidth: 1, marginTop: 15
              }}
              activeOpacity={0.7}
              className="flex-row items-center bg-green-200 p-3">
              <View className="bg-primary rounded-full p-1">
                <Icon name={list.nama?.toLowerCase()} size={35} color={colors.white} />
              </View>
              <Gap width={10} />
              <DefaultText title={list.nama} titleClassName="text-base flex-1" />
            </TouchableOpacity>
          })}
        </View>
      </ScrollView>
    </DefaultView>
  );
}
