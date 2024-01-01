import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const option = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

const Statistik = ({ detail, dataOrderan }) => {
  const [series, setSeries] = React.useState([]);
  const [tahun, setTahun] = React.useState("2023");
  const getISP = async () => {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/ISP"
    );
    getAllOrderan(response.data.map((isp) => isp.kode));
  };

  const getAllOrderan = async (dataIsp) => {
    if (dataOrderan) {
      prosesData(dataIsp, dataOrderan);
    } else {
      try {
        const response = await axios.get(
          "https://akpl-backend-production.up.railway.app/OrderTransaksi"
        );
        prosesData(dataIsp, response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const prosesData = (dataIsp, dataOrderan) => {
    const result = dataIsp.map((isp) => {
      const dataPerbulan = Array.from({ length: 12 }, () => 0);
      dataOrderan
        .filter((data) => data.kodeProduk === isp && data.status === "Lunas")
        .filter((data) => data.orderCreate.split("-")[0] === tahun)
        .map((data) => data.orderCreate.split("-")[1])
        .forEach((bulan) => {
          const index = parseInt(bulan, 10) - 1;
          dataPerbulan[index]++;
        });
      return { name: isp, data: dataPerbulan };
    });
    setSeries(result);
    console.log(dataIsp, dataOrderan);
    console.log(result);
  };

  useEffect(() => {
    getISP();
  }, [tahun]);

  const navigate = useNavigate();

  return (
    <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div class="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-max rounded-lg bg-blue-800 p-5 text-white">
            <svg
              xmlns="https://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              ></path>
            </svg>
          </div>
          <div>
            <h6 class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
              Diagram Batang Pengguna Bulanan
            </h6>
            <p class="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
              Memvisualisasikan data pengguna per bulan
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-3">
            <label
              htmlFor="Role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Filter Tahun
            </label>
            <div>
              <select
                id="Role"
                name="Role"
                autoComplete="Role"
                onChange={(e) => {
                  setTahun(e.target.value);
                }}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              >
                <option>2022</option>
                <option selected>2023</option>
                <option>2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 px-2 pb-0">
        <ReactApexChart
          options={option}
          series={series}
          type="line"
          height={"200vh"}
          width={"100%"}
        />
      </div>
      {detail && (
        <div class="p-6 pt-0">
          <button
            onClick={() => {
              navigate("/statistik");
            }}
            class="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Detail
          </button>
        </div>
      )}
    </div>
  );
};

export default Statistik;
