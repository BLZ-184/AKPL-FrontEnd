import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardTeknisi = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    user: 0,
    teknisi: 0,
    layanan: 0,
  });
  console.log(data);
  const getData = async () => {
    const response2 = await axios.get(
      "https://akpl-backend-production.up.railway.app/ISP"
    );
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/users"
    );
    setData({
      user: response.data.filter((user) => user.role === "User").length,
      teknisi: response.data.filter((user) => user.role === "Teknisi").length,
      layanan: response.data.length,
    });
    console.log(response, response2);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 grid-cols-3 ">
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Total User
              </h5>
              <h6 class="block font-sans text-center text-5xl antialiased font-light leading-relaxed text-inherit">
                {data.user}
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                onClick={() => {
                  navigate("/ViewData");
                }}
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Total Teknisi
              </h5>
              <h6 class="block text-center font-sans text-5xl antialiased font-light leading-relaxed text-inherit">
                {data.teknisi}
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                onClick={() => {
                  navigate("/ViewData");
                }}
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Total Layanan
              </h5>
              <h6 class="block text-center font-sans text-5xl antialiased font-light leading-relaxed text-inherit">
                {data.layanan}
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/ViewData");
                }}
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <div class="p-6">
            <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Tambah Akun
            </h5>
          </div>
          <div class="p-6 pt-0">
            <button
              class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={() => {
                navigate("/TambahAkun");
              }}
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeknisi;
