import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import DefaultView from '../../components/DefaultView';
import DefaultText from '../../components/DefaultText';
import DefaultHeader from '../../components/DefaultHeader';
import Gap from '../../components/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors';
import Button from '../../components/Button';
import { navigationRef } from '../../navigation/RootNavigation';
import { RootStackScreenProps } from '../../navigation/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '../../store';
import { getShowProductNasabahDetail } from '../../services/product';
import { formatRupiah } from '../../utils/currency';
import moment from 'moment';

export default function ProdukDetail({
  route,
}: RootStackScreenProps<'ProdukDetail'>) {
  const [activeNumber, setActiveNumber] = useState<number>(0);
  const id = route?.params?.noProduct;
  const { showProductDetail } = useSelector(
    (state: RootState) => state.productReducer,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getShowProductNasabahDetail(id));
  }, [dispatch]);

  return (
    <DefaultView>
      <DefaultHeader title="Detail Deposito" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-10">
          <Gap height={15} />
          <DefaultText
            title={showProductDetail?.nama}
            titleClassName="text-base font-inter-semibold"
          />
          <Gap height={15} />
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setActiveNumber(0)}
              activeOpacity={0.7}
              className="border-[1px] border-black rounded-lg flex-1 justify-center items-center py-2">
              <Icon
                name="hand-coin"
                size={50}
                color={activeNumber === 0 ? colors.primary : colors.black}
              />
              <DefaultText title="Detail Produk" titleClassName="text-xs" />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              onPress={() => setActiveNumber(1)}
              activeOpacity={0.7}
              className="border-[1px] border-black rounded-lg flex-1 justify-center items-center py-2">
              <Icon
                name="notebook-edit"
                size={50}
                color={activeNumber === 1 ? colors.primary : colors.black}
              />
              <DefaultText title="Detail BPR" titleClassName="text-xs" />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              onPress={() => setActiveNumber(2)}
              activeOpacity={0.7}
              className="border-[1px] border-black rounded-lg flex-1 justify-center items-center py-2">
              <Icon
                name="scale-balance"
                size={50}
                color={activeNumber === 2 ? colors.primary : colors.black}
              />
              <DefaultText title="Neraca" titleClassName="text-xs" />
            </TouchableOpacity>
          </View>
          <Gap height={25} />

          {activeNumber === 0 && (
            <View>
              <DefaultText
                title="Detail Produk"
                titleClassName="font-inter-semibold"
              />
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Kode Produk" titleClassName="flex-1" />
                <DefaultText title={`BPR -  ${showProductDetail?.no_produk}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Tenor" titleClassName="flex-1" />
                <DefaultText title={`${showProductDetail?.tenor} Bulan`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Nisbah" titleClassName="flex-1" />
                <DefaultText title={`${showProductDetail?.nisbah}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText
                  title="Proyeksi Bagi Hasil"
                  titleClassName="flex-1"
                />
                <DefaultText title={`${showProductDetail?.bagi_hasil}% / Tahun`} />
              </View>
              {/* <Gap height={10} />
              <View className="flex-row">
                <DefaultText
                  title="Transaksi Deposito"
                  titleClassName="flex-1"
                />
                <DefaultText title="Belum ada dari api ? Transaksi" />
              </View> */}
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Minimum Deposito" titleClassName="flex-1" />
                <DefaultText title={`${formatRupiah(String(showProductDetail?.minimal), "Rp ")} pertahun`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Dana Terkumpul" titleClassName="flex-1" />
                <DefaultText title={`${formatRupiah(String(showProductDetail?.total_amount), "Rp ")} (${showProductDetail?.total_perc}%)`} />
              </View>
            </View>
          )}

          {activeNumber === 1 && (
            <View>
              <DefaultText
                title="Detail BPR"
                titleClassName="font-inter-semibold"
              />
              <Gap height={10} />
              <DefaultText title={`${showProductDetail?.alamat}`} />
              <Gap height={15} />
              <View className="flex-row">
                <DefaultText title="Kode OJK" titleClassName="flex-1" />
                <DefaultText title={`${showProductDetail?.kode_ojk || '-'}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText
                  title="No. Surat keputusan"
                  titleClassName="flex-1"
                />
                <DefaultText title={`${showProductDetail?.no_sk  || '-'}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="No. Telepon" titleClassName="flex-1" />
                <DefaultText title={`${showProductDetail?.phone}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Website" titleClassName="flex-1" />
                <DefaultText title={`${showProductDetail?.website}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Mulai Beroperasi" titleClassName="flex-1" />
                <DefaultText title={`${moment(showProductDetail?.mulai_beroperasi).format("DD-MM-YYYY")}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText
                  title="Total Transaksi Deposito"
                  titleClassName="flex-1"
                />
                <DefaultText title={showProductDetail?.total_transaksi} />
              </View>
            </View>
          )}

          {activeNumber === 2 && (
            <View>
              <DefaultText
                title="Neraca Keuangan"
                titleClassName="font-inter-semibold"
              />
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Aset" titleClassName="flex-1" />
                <DefaultText title={`${formatRupiah(String(showProductDetail?.asset), "Rp ")}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Kewajiban" titleClassName="flex-1" />
                <DefaultText title={`${formatRupiah(String(showProductDetail?.kewajiban), "Rp ")}`} />
              </View>
              <Gap height={10} />
              <View className="flex-row">
                <DefaultText title="Ekuitas" titleClassName="flex-1" />
                <DefaultText title={`${formatRupiah(String(showProductDetail?.ekuitas), "Rp ")}`} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="pb-8 px-10 pt-2">
        <Button
          title="Ajukan Deposito"
          className="bg-primary rounded-lg"
          titleClassName="text-white"
          onPress={() => navigationRef.navigate('AjukanDeposito', { showProductDetail })}
        />
      </View>
    </DefaultView>
  );
}
