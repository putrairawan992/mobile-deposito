import React, { useEffect } from 'react'
import DefaultView from '../../components/DefaultView'
import DefaultHeader from '../../components/DefaultHeader'
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowArtikelDetaill, getShowArtikelList } from '../../services/artikel';
import { RootStackScreenProps } from '../../navigation/interface';
import { ActivityIndicator, Image, View } from 'react-native';
import { HEIGHT, WIDTH } from '../../utils/constant';
import DefaultText from '../../components/DefaultText';
import RenderHTML from 'react-native-render-html';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

export default function BlogDetail({ route }: RootStackScreenProps<'BlogDetail'>) {
    const dispatch = useDispatch<RootDispatch>();
    const { showArtikelDetailData, showArtikelDetailDataLoading } = useSelector(
        (state: RootState) => state.artikelReducer,
    );
    const idParams = route.params.id;

    useEffect(() => {
        dispatch(getShowArtikelDetaill(idParams))
    }, [idParams]);

    return (
        showArtikelDetailDataLoading ? <ActivityIndicator size={"large"} style={{ top: 150 }} /> : <DefaultView>
            <DefaultHeader title="Artikel Detail" />
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <Image source={{ uri: showArtikelDetailData?.data?.image }} style={{ justifyContent: "center" }} resizeMode='contain' height={HEIGHT / 4} width={WIDTH / 1.1} />
                    <DefaultText title={showArtikelDetailData?.data?.judul} titleClassName='text-lg font-inter-bold' />
                    <View className='flex-row items-center'>
                        <DefaultText title={showArtikelDetailData?.data?.author} titleClassName='text-xs mr-2' />
                        <DefaultText titleClassName='text-xs' title={moment(showArtikelDetailData?.data?.created_at).format('DD MMMM YYYY')} />
                    </View>
                    <RenderHTML contentWidth={WIDTH} source={{ html: showArtikelDetailData?.data?.isi }} />
                </View>
            </ScrollView>
        </DefaultView>
    )
}
