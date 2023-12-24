import React, { useEffect } from 'react'
import DefaultView from '../../components/DefaultView'
import DefaultHeader from '../../components/DefaultHeader'
import { RootStackScreenProps } from '../../navigation/interface';
import { ActivityIndicator, Image, View } from 'react-native';
import { HEIGHT, WIDTH } from '../../utils/constant';
import DefaultText from '../../components/DefaultText';
import { ScrollView } from 'react-native-gesture-handler';

export default function PromoDetail({ route }: RootStackScreenProps<'PromoDetail'>) {
    const dataDetail = route.params.data;


    return (
        <DefaultView>
            <DefaultHeader title="Promo Detail" />
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <Image source={{ uri: dataDetail?.image }} style={{ justifyContent: "center" }} resizeMode='contain' height={HEIGHT / 4} width={WIDTH / 1.1} />
                    <DefaultText title={dataDetail?.namaMitra} titleClassName='text-lg font-inter-bold' />
                    <View className='flex-row items-center'>
                        <DefaultText titleClassName='text-xs' title={dataDetail?.end_date} />
                    </View>
                    <DefaultText title={dataDetail?.deskripsi} />
                </View>
            </ScrollView>
        </DefaultView>
    )
}
