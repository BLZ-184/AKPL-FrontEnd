import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardTeknisi = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  console.log(data);
  const getData = async () => {};

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 grid-cols-2 ">
        <div className="sm:col-span-1">
          <div class="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                User Aktip
              </h5>
              <h6 class="block font-sans text-center text-5xl antialiased font-light leading-relaxed text-inherit">
                a
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
                Pengaduan Belum ditanggapi
              </h5>
              <h6 class="block text-center font-sans text-5xl antialiased font-light leading-relaxed text-inherit">
                a
              </h6>
            </div>
            <div class="p-6 pt-0">
              <button
                onClick={() => {
                  navigate("/ReportPengaduan");
                }}
                class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeknisi;
