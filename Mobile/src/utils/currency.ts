export function formatRupiah(angka: any, prefix: string) {
    if (angka !== undefined || angka !== null || angka !== '') {
        const number_string = angka?.replace(/[^,\d]/g, '')?.toString();
        const split = number_string?.split(',')
        const sisa = split && split[0]?.length % 3
        let rupiah = split && split[0]?.substr(0, sisa)
        const ribuan = split && split[0]?.substr(sisa)?.match(/\d{3}/gi);
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        rupiah = split &&  split[1] != undefined ? rupiah + ',' + split &&  split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }
}