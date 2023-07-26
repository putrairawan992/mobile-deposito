var serverURL = "/";
var serverApi = serverURL + "api/";
let thisYear = parseInt(new Date().getFullYear())

var role = null;
var token = null;
if (window.localStorage.getItem("jwttoken")) {
    token = window.localStorage.getItem("jwttoken");
    ajaxCall(serverApi + "userprofile", null, "GET", "userprofile");
} else {
    window.localStorage.removeItem("jwttoken");
    window.open(serverURL + "/", "_self");
}


function ajaxCall(url, dataNa = null, type = "GET", goto) {
    $.ajax({
        url: url,
        type: type,
        data: dataNa,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        headers: {
            Accept: "application/json",
        },
        success: function (data) {
            if (goto == "userprofile") userProfileNa(data)

            else if (goto == "jenisLogin") jenisLogin(data)
            else if (goto == "afterLogin") afterLogin(data)
            else swalBerhasil()
        },
        error: function (xhr, XMLHttpRequest, textStatus, errorThrown) {
            if (goto == "afterLogin") { afterLoginFailed(xhr.responseText) }
            else if (goto == "jenisLogin") {
                swal({
                    icon: "warning",
                    title: "Perhatian",
                    text: xhr.responseText,
                    button: false,
                })
            }
            else if (goto == "userprofile") {
                swal({
                    icon: "warning",
                    title: "Masa Anda sudah habis",
                    text: "Dimohon untuk login kembali",
                    button: false,
                })
                window.open(serverURL + "login", "_self");
            }
        },
    });
}

function swalBerhasil() {
    swal({
        title: "Berhasil",
        text: "Data Berhasil di Proses",
        buttons: false,
        icon: "success",
        closeOnClickOutside: true,
    });
}

function swalGagal(title = 'Gagal', text) {
    swal({
        title: title,
        text: text,
        buttons: false,
        icon: "warning",
        closeOnClickOutside: true,
    });
}

function swalTunggu() {
    swal({
        title: "Mohon Tunggu",
        text: "Mohon Menunggu Data Sedang di Proses.",
        buttons: false,
        closeOnClickOutside: true,
    });
}

function userProfileNa(data) {
    role = data.userProfile.role

    if (data["message"] == "Unauthorized.") {
        window.localStorage.removeItem("jwttoken");
        window.open(serverURL + "login", "_self");
    }

    // role = data["userProfile"]["role"];
    // id_masjid = data["userProfile"]["id_masjid"];
    // id_user = data["userProfile"]["id"];

    switch (role) {
        case 99:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 0:
            break;
        case 10: break;
        default:
            break;
    }
}

function buildDataTable(table, elementId, title, columns, columnDefs = [
    {
        searchable: false,
        orderable: false,
        targets: 0,
    },
]) {
    var destination = "#" + elementId;
    if ($.fn.dataTable.isDataTable(destination)) {
        $(destination).DataTable().destroy();
    }

    document.getElementById(elementId).innerHTML += table;

    var t = $(destination).DataTable({
        dom: "Bfrtip",
        buttons: [
            {
                extend: "excelHtml5",
                exportOptions: {
                    columns: [":visible :not(:last-child)"],
                },
                title: title,
                exportOptions: {
                    columns: columns,
                },
            },
            {
                extend: "pdfHtml5",
                exportOptions: {
                    columns: [":visible :not(:last-child)"],
                },
                title: title,
                exportOptions: {
                    columns: columns,
                },
            },
            "colvis",
        ],
        columnDefs: columnDefs,
        // order: [[1, "asc"]],
    });

    t.on("order.dt search.dt", function () {
        let i = 1;

        t.cells(null, 0, { search: "applied", order: "applied" }).every(
            function (cell) {
                this.data(i++);
            }
        );
    }).draw();
    $(destination).fadeIn();
}

function logoutUser() {
    swal({
        icon: "warning",
        title: "Logout Sistem",
        text: "Anda melakukan logout Aplikasi",
        button: true,
    });
    window.localStorage.removeItem("jwttoken");
    ajaxCall(serverApi + "logout", null, "POST");
    setTimeout(function () {
        window.open("/login", "_self");
    }, 1000);
};

function excelFileToJSON(file, goto) {
    try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {

            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            //displaying the json result
            if (goto == "uploadMasjid") uploadMasjid(result.Sheet1)
            else if (goto == "uploadPetugas") uploadPetugas(result.Sheet1)
            else if (goto == "uploadDonatur") uploadDonatur(result.Sheet1)
            else if (goto == "uploadMustahik") uploadMustahik(result.Sheet1)
            else return result.Sheet1
        }
    } catch (e) {
        console.error(e);
    }
}

function numbFor(nStr) {
    if (nStr % 1 != 0) {
        nStr = (Math.round(nStr * 100) / 100).toFixed(2).replace(",", ".");
    }

    nStr += "";
    x = nStr.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "." + "$2");
    }

    if (nStr.toString().includes(".")) {
        xNa = x1 + x2.replace('.', ',')
        return xNa;
    }

    return x1 + x2;
}

function konversiTanggal(dateNa) {
    // Fill Nama dan tanggal Print
    var dateNa = new Date(),
        weekday = new Array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'),
        dayOfWeek = weekday[dateNa.getDay()],
        domEnder = function () {
            var a = dateNa;
            if (/1/.test(parseInt((a + "").charAt(0))))
                return "th"; a = parseInt((a + "").charAt(1));
            return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th"
        }(),
        dayOfMonth = (dateNa.getDate() < 10) ? '0' + dateNa.getDate() : dateNa.getDate(),
        months = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'),
        monthsNumber = new Array('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'),
        curMonth = months[dateNa.getMonth()],
        curMonthNumber = monthsNumber[dateNa.getMonth()],
        curYear = dateNa.getFullYear(),
        curHour = dateNa.getHours() > 12 ? dateNa.getHours() - 12 : (dateNa.getHours() < 10 ? "0" + dateNa.getHours() : dateNa.getHours()),
        curMinute = dateNa.getMinutes() < 10 ? "0" + dateNa.getMinutes() : dateNa.getMinutes(),
        curSeconds = dateNa.getSeconds() < 10 ? "0" + dateNa.getSeconds() : dateNa.getSeconds(),
        curMeridiem = dateNa.getHours() > 12 ? "PM" : "AM";
    return dayOfWeek + " " + dayOfMonth + " " + curMonth + " " + curYear + " " + curMonthNumber;
}

function dateFormatOne(dateNa) {
    let yyyy = dateNa.split('-')[0]
    let mm = dateNa.split('-')[1]
    let dd = dateNa.split('-')[2]

    return dd + '/' + mm + '/' + yyyy
}

function inWords(num) {
    var a = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas', 'Duabelas', 'Tigabelas', 'Empatbelas', 'Limabelas', 'Enambelas', 'Tujuhbelas', 'Delapanbelas', 'Sembilanbelas']
    var b = ['', '', 'Duapuluh', 'Tigapuluh', 'Empatpuluh', 'Limapuluh', 'Enampuluh', 'Tujuhpuluh', 'Delapanpuluh', 'Sembilanpuluh']
    var c = ['', 'Seratus', 'Duaratus', 'Tigaratus', 'Empatratus', 'Limaratus', 'Enamratus', 'Tujuhratus', 'Delapanratus', 'Sembilanratus']

    var miliarText = ''
    var jutaanText = ''
    var ribuanText = ''
    var satuanText = ''

    n = num / 1000000000 // Miliar
    miliar = Math.floor(n)
    if (miliar > 0) {
        num = num - (miliar * 1000000000)
        ratusan = Math.floor(miliar / 100) // Ratusan
        if (ratusan > 0) {
            miliarText = c[ratusan]
        }
        puluh = miliar - (ratusan * 100)
        if (20 > puluh > 0) {
            miliarText += ' ' + a[puluh]
        } else {
            puluhan = Math.floor(puluh / 10) // Puluhan
            miliarText += ' ' + b[puluhan]
            satuan = puluh - (puluhan * 10)
            miliarText += ' ' + a[satuan]
        }
        miliarText += ' miliar '
    }

    n = num / 1000000 // Jutaan
    jutaan = Math.floor(n)
    if (jutaan > 0) {
        num = num - (jutaan * 1000000)
        ratusan = Math.floor(jutaan / 100) // Ratusan
        if (ratusan > 0) {
            jutaanText = c[ratusan]
        }
        puluh = jutaan - (ratusan * 100)
        if (20 > puluh > 0) {
            jutaanText += ' ' + a[puluh]
        } else {
            puluhan = Math.floor(puluh / 10) // Puluhan
            jutaanText += ' ' + b[puluhan]
            satuan = puluh - (puluhan * 10)
            jutaanText += ' ' + a[satuan]
        }
        jutaanText += ' juta '
    }

    n = num / 1000 // Ribuan
    ribuan = Math.floor(n)
    if (ribuan > 0) {
        num = num - (ribuan * 1000)
        ratusan = Math.floor(ribuan / 100) // Ratusan
        if (ratusan > 0) {
            ribuanText = c[ratusan]
        }
        puluh = ribuan - (ratusan * 100)
        if (20 > puluh > 0) {
            ribuanText += ' ' + a[puluh]
        } else {
            puluhan = Math.floor(puluh / 10) // Puluhan
            ribuanText += ' ' + b[puluhan]
            satuan = puluh - (puluhan * 10)
            ribuanText += ' ' + a[satuan]
        }
        ribuanText += ' ribu '
    }

    // Satuan
    satuan = num
    if (satuan > 0) {
        ratusan = Math.floor(satuan / 100) // Ratusan
        if (ratusan > 0) {
            satuanText = c[ratusan]
        }
        puluh = satuan - (ratusan * 100)
        if (20 > puluh > 0) {
            satuanText += ' ' + a[puluh]
        } else {
            puluhan = Math.floor(puluh / 10) // Puluhan
            satuanText += ' ' + b[puluhan]
            satuan = puluh - (puluhan * 10)
            satuanText += ' ' + a[satuan]
        }
    }

    return titleCase(miliarText + jutaanText + ribuanText + satuanText)
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}
