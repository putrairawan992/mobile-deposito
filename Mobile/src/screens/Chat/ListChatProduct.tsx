import React, { useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import DefaultText from '../../components/DefaultText'
import DefaultView from '../../components/DefaultView'
import { colors } from '../../utils/colors'
import DefaultHeader from '../../components/DefaultHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootDispatch, RootState } from '../../store'
import { getChatJenisListKeluhan } from '../../services/chat'
import { navigationRef } from '../../navigation/RootNavigation'

export default function ListChatProduct() {
    const { showJenisKeluhan, showJenisKeluhanLoading } = useSelector(
        (state: RootState) => state.chatReducer
    );
    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => {
        dispatch(getChatJenisListKeluhan());
    }, [dispatch]);

    console.log("showJenisKeluhan", showJenisKeluhan?.data);


    return (<DefaultView
        statusBarColor={colors.primaryLight}
        containerClassName="bg-primary-light">
        <DefaultHeader title="Chat" />
        <View className="bg-white p-6 flex-1 mx-10 my-8 rounded-lg">
            <DefaultText
                title="Pilih Keluhan"
                titleClassName="text-base font-inter-semibold mx-5 my-3"
            />
            {showJenisKeluhanLoading ? <ActivityIndicator size={"large"} /> : showJenisKeluhan?.data?.length > 0 ?
                showJenisKeluhan?.data?.map((item: any) => {
                    return <View className='p-2'>
                        <TouchableOpacity
                            className='p-2 bg-gray-100 rounded-md border border-blue-gray-300 cursor-pointer'
                            onPress={() => navigationRef.navigate('ChatRegistrasi', { id: item.id })}
                        >
                            <View className='font-bold text-sm flex-row items-center justify-between'>
                                <DefaultText title={item.nama} titleClassName='font-inter-bold' />
                            </View>
                        </TouchableOpacity>
                    </View>
                }) : <DefaultText title="Belum ada data keluhan." titleClassName='font-inter-bold text-center mt-10' />}
        </View>
    </DefaultView>
    )
}
