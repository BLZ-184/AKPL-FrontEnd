import axios from "axios";
import React from "react";

import { useNavigate } from "react-router-dom";

const Informasi = () => {
  const navigate = useNavigate();
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);

  const getISP = async () => {
    const response = await axios.get("http://localhost:1000/ISP");
    console.log(response.data);
    setTABLE_ROWS(response.data);
  };

  React.useEffect(() => {
    getISP();
  }, []);

  function formatRupiah(angka, prefix) {
    let number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  return (
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
          Harga
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Berikut informasi untuk harga-harga dan layanan yang tersedia
        </p>
      </div>
      <div class="lg:w-2/3 w-full mx-auto overflow-auto">
        <table class="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 rounded-tl rounded-bl">
                Paket
              </th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">
                Speed
              </th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">
                Harga
              </th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">
                Deskripsi
              </th>
              <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 rounded-tr rounded-br"></th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((item, index) => (
              <tr>
                <td class="px-4 py-3">{item.kode}</td>
                <td class="px-4 py-3">{item.speed}</td>
                <td class="px-4 py-3">{formatRupiah(item.harga, "Rp. ")}</td>
                <td class="px-4 py-3 text-lg text-gray-900">{item.desk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
        <button
          onClick={() => {
            navigate("/Order");
          }}
          class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Informasi;
