import { ActivityIndicator, ScrollView,  View, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../DefaultText';
import Gap from '../Gap';
import Button from '../Button';
import RenderHTML from 'react-native-render-html';
import { colors } from '../../utils/colors';
import DefaultView from '../DefaultView';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getSkDashboard } from '../../services/dasbhoard';

interface ModalBankProps {
    show: boolean;
    hide: () => void;
    onConfirm: () => void;
}

export default function ModalSkPengajuan({ show, hide, onConfirm }: ModalBankProps) {
    const dispatch = useDispatch<RootDispatch>();
    const { showSkDashboard, showSkDashboardLoading } = useSelector(
        (state: RootState) => state.dashboardReducer,
    );

    useEffect(() => {
        dispatch(getSkDashboard())
    }, [dispatch]);

    const { width } = useWindowDimensions();
    const regex = /(<([^>]+)>)/;
    const source = {
        html: showSkDashboard?.data[0]?.syarat?.replace(regex, '')
    };

    return (
        <Modal isVisible={show} onBackButtonPress={hide} onBackdropPress={hide}>
            <DefaultView
                statusBarColor={colors.primary}>
                <View className="px-5 py-4 bg-white flex-1 rounded-t-2xl">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <DefaultText
                            title="SYARAT & KETENTUAN DEPOSITO SYARIAH"
                            titleClassName="font-inter-semibold text-center"
                        />
                        <Gap height={10} />

                        {showSkDashboardLoading ?
                            <ActivityIndicator size={"large"} style={{ position: 'absolute', top: 22, left: 0, right: 0, zIndex: 10 }} /> :
                            <ScrollView style={{ flex: 1 }}>
                                <View>
                                    <RenderHTML contentWidth={width} source={source} />
                                </View>
                            </ScrollView>
                        }
                    </ScrollView>

                    <View className="mt-10">
                        <Gap height={20} />
                        <Button
                            title="Keluar"
                            className="bg-primary mx-10"
                            titleClassName="text-white"
                            onPress={onConfirm}
                        />
                    </View>
                </View>
            </DefaultView>
        </Modal>
    );
}
