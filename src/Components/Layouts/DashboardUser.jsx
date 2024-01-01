import axios from "axios";
import React from "react";

import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [statusPengaduan, setStatusPengaduan] = React.useState("res");
  const [UserData, setUserData] = React.useState();
  const [Pengaduan, setPengaduan] = React.useState();
  const [Transaksi, setTransaksi] = React.useState();
  const [Riwayat, setRiwayat] = React.useState(0);
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  const getPengaduan = async () => {
    const response = await axios.get(
      "http://akpl-backend-production.up.railway.app/Pengaduan/" + Session.id
    );
    setStatusPengaduan(response.data[0].status);
  };

  const getRiwatatransaksi = async () => {
    try {
      const response = await axios.get(
        "http://akpl-backend-production.up.railway.app/OrderUser/" + Session.id
      );
      setRiwayat(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const checkPengaduan = async () => {
    try {
      const response = await axios.get(
        "http://akpl-backend-production.up.railway.app/Pengaduan/" + Session.id
      );
      console.log(response.data);
      if (response.data.length > 0) {
        setPengaduan(response.data);
      } else {
        setPengaduan(false);
      }
    } catch (error) {
      setPengaduan(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPengaduan();
    getTagihan2(Session.idOrder).then((data) => {
      setUserData(data);
    });
    checkPengaduan();
    getRiwatatransaksi();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      {console.log("tagihaan", UserData)}
      {!UserData && (
        <>
          <div>
            <div class="relative flex flex-col text-white bg-yellow-800 shadow-md bg-clip-border rounded-xl">
              <div class="px-6 pt-6">
                <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                  Informasi
                </h5>
              </div>
              <h6 class="px-6 block font-sans text-xl antialiased font-light leading-relaxed text-inherit m-3">
                Silahkan lakukan Pemilihan Paket
              </h6>
              <div class="p-6 pt-0">
                <button
                  class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-white text-yellow-800 shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={() => {
                    navigate("/Order");
                  }}
                >
                  Paket
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="grid gap-4 grid-cols-3 ">
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Paket Aktif
              </h5>
              <h6 class="block font-sans text-center text-2xl antialiased font-light leading-relaxed text-inherit">
                {UserData && UserData.status === "Lunas"
                  ? UserData.kodeProduk
                  : "Inactive"}
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                onClick={() => {
                  navigate("/Informasi");
                }}
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Informasi
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Status Tagihan
              </h5>
              <h6 class="block text-center font-sans text-2xl antialiased font-light leading-relaxed text-inherit">
                {Session.idOrder ? UserData && UserData.status : "Tidak Ada"}
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                onClick={() => {
                  navigate("/Order");
                }}
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Tagihan
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Riwayat Transaksi
              </h5>
              <h6 class="block text-center font-sans text-2xl antialiased font-light leading-relaxed text-inherit">
                {Riwayat}
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/RiwayatTransaksi");
                }}
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
      {!Pengaduan && (
        <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
          <div class="p-6">
            <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Buat pengaduan
            </h5>
          </div>
          <div class="p-6 pt-0">
            <button
              class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={() => {
                navigate("/Pengaduan");
              }}
            >
              Buat
            </button>
          </div>
        </div>
      )}
      {Pengaduan && (
        <div>
          <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Status Pengaduan
              </h5>
            </div>
            <h6 class="block font-sans text-center text-2xl antialiased font-light leading-relaxed text-inherit m-3">
              {statusPengaduan == "not"
                ? "Belum Ditanggapi"
                : statusPengaduan == "open"
                ? "Dibaca"
                : "Ditanggapi"}
            </h6>
            <div class="p-6 pt-0">
              <button
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/Pengaduan");
                }}
              >
                Pengaduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;

export const getTagihan = async (setTagihan, setTransaksi, idOrder) => {
  try {
    const response = await axios.get(
      "http://akpl-backend-production.up.railway.app/OrderID/" + idOrder
    );
    console.log("Tagihan", response.data);
    if (response.data) {
      setTagihan(response.data);
    } else {
      setTagihan(false);
    }
    try {
      const response2 = await axios.get(
        "http://akpl-backend-production.up.railway.app/Transaksi/" +
          response.data.idtransaksi
      );
      setTransaksi(response2.data);
    } catch (error) {
      setTransaksi(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTagihan2 = async (idOrder) => {
  console.log("get", idOrder);
  try {
    const response = await axios.get(
      "http://akpl-backend-production.up.railway.app/OrderTransaksi/" + idOrder
    );
    console.log("Tagihan", response.data);
    if (response.data) {
      return response.data[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
