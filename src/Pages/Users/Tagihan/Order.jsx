import axios from "axios";
import React from "react";
import Modals from "../../../Components/Layouts/Dialog";

const Order = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const [PaymentMethode, setPaymentMethode] = React.useState("");
  const [order, setorder] = React.useState({
    kode: "",
    createBy: Session.id,
  });
  const [isp, setISP] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const handleSave = async (e) => {
    const sekarang = new Date();
    const idTransaksi = sekarang.getTime();
    console.log(Session.id, order.kode, PaymentMethode, idTransaksi);
    try {
      const response = await axios.post(
        "http://localhost:1000/OrderTransaksi",
        {
          idPelanggan: Session.id,
          kodeProduk: order.kode,
          idtransaksi: idTransaksi,
          metode: PaymentMethode,
          jumlah: order.harga,
        }
      );
      console.log(response);
      setOpen(!open);
      handleOpen2();
    } catch (error) {
      console.log(error);
    }
  };

  const getISP = async () => {
    try {
      const response = await axios.get("http://localhost:1000/ISP");
      console.log(response.data);
      setISP(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getISP();
  }, []);

  const handleChangePaket = (e) => {
    const speed = isp.filter((data) => data.kode === e.target.value)[0].speed;
    const harga = isp.filter((data) => data.kode === e.target.value)[0].harga;
    const desk = isp.filter((data) => data.kode === e.target.value)[0].desk;

    setorder({
      ...order,
      kode: e.target.value,
      harga: harga,
      speed: speed,
      desk: desk,
    });
  };

  return (
    <div className="w-full p-20 bg-white">
      <div className="">
        <div className=" border-gray-900/10 pb-12 ">
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Order Paket
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Silahkan isi untuk membuat Tagihan
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="paket"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                paket
              </label>
              <div className="mt-2">
                <select
                  id="paket"
                  name="paket"
                  autoComplete="paket"
                  onChange={(e) => {
                    handleChangePaket(e);
                  }}
                  defaultChecked={"Pilih paket"}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option disabled selected>
                    Pilih paket
                  </option>
                  {isp.map((isp) => (
                    <option value={isp.kode}>{isp.kode}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="speed"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                speed
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="speed"
                    id="speed"
                    autoComplete="speed"
                    disabled
                    value={order.speed}
                    onChange={(e) => {
                      setorder({ ...order, speed: e.target.value });
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="harga"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                harga
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="harga"
                    id="harga"
                    autoComplete="harga"
                    disabled
                    value={order.harga && formatRupiah(order.harga, "Rp. ")}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="Deskripsi"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Deskripsi
              </label>
              <div className="mt-2">
                <textarea
                  id="Deskripsi"
                  name="Deskripsi"
                  disabled
                  rows={3}
                  value={order.desk}
                  onChange={(e) => {
                    setorder({ ...order, Deskripsi: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Silahkan isi untuk membuat tagihan dari paket yang dipilih
              </p>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12 ">
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Metode Pembayaran
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Silahkan untuk memilih metode pembayaran
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="PaymentMethode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Metode Pembayaran
              </label>
              <div className="mt-2">
                <select
                  id="PaymentMethode"
                  name="PaymentMethode"
                  autoComplete="PaymentMethode"
                  onChange={(e) => {
                    setPaymentMethode(e.target.value);
                  }}
                  defaultChecked={"Pilih PaymentMethode"}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option disabled selected>
                    Pilih Payment Methode
                  </option>
                  <option>Alfamart</option>
                  <option>Indomaret</option>
                  <option>Dana</option>
                  <option>Ovo</option>
                  <option>Gopay</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-6 flex items-center justify-end gap-x-6">
        <>
          <button className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            onClick={handleOpen}
            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </>
      </div>
      <Modals
        open={open}
        title={"Buat Tagihan"}
        handler={() => setOpen(false)}
        setCancle={() => setOpen(false)}
        setConfirm={handleSave}
      >
        Apakah kamu yakin untuk membuat tagihan untuk paket ini?
        <table>
          <tbody>
            <tr>
              <td>Paket</td>
              <td>{order.kode}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{order.speed}</td>
            </tr>
            <tr>
              <td>Harga</td>
              <td>{order.harga && formatRupiah(order.harga, "Rp. ")}</td>
            </tr>
            <tr>
              <td>Metode Pembayaran</td>
              <td>{PaymentMethode}</td>
            </tr>
          </tbody>
        </table>
      </Modals>
      <Modals
        open={open2}
        title={"Tambah order"}
        handler={() => setOpen2(false)}
        setConfirm={() => setOpen2(false)}
      >
        Tambah order berhasil dibuat!
      </Modals>
    </div>
  );
};

export default Order;

export function formatRupiah(angka, prefix) {
  console.log("angka", angka);
  let number_string = angka.toString(),
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
