import React from "react";
import Logo from "../../../Components/Elements/Logo";
import { getTagihan2 } from "../../../Components/Layouts/DashboardUser";
import { formatRupiah } from "./Order";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Modals from "../../../Components/Layouts/Dialog";
import axios from "axios";
import { getSessionUpdate } from "../../../App";

const Tagihan = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  const [data, setData] = React.useState();

  React.useEffect(() => {
    getTagihan2(Session.idOrder).then((data) => {
      setData(data);
    });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handlerOpen = () => {
    setOpen(!open);
  };
  const handlerNewTagihan = async () => {
    console.log(Session.id);
    try {
      const response = await axios.patch(
        "https://akpl-backend-production.up.railway.app/setNullorder/" +
          Session.id
      );
      console.log(response.data);
      getSessionUpdate();
      handlerOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-12 ">
      <div className=" max-w-[1115px] mx-auto">
        <CardTagihan data={data} />
        <div className="mt-6 flex justify-end gap-x-3">
          <button
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            onClick={createPDF}
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="https://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download PDF
          </button>
          <button
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() => {
              handlerOpen();
            }}
          >
            Buat Tagihan Baru
          </button>
        </div>
      </div>
      <Modals
        open={open}
        handler={handlerOpen}
        title={"Buat Tagihan Baru"}
        setCancle={handlerOpen}
        setConfirm={handlerNewTagihan}
      >
        Apakah anda yakin untuk membuat tagihan baru?
      </Modals>
    </div>
  );
};

export default Tagihan;

export const CardTagihan = ({ data, status }) => {
  console.log("CardTagihan", data);
  const newDate = (date) => {
    const daate = new Date(date);
    const newDate = new Date(
      daate.getFullYear(),
      daate.getMonth(),
      daate.getDate() + 6
    );

    return newDate.toISOString();
  };
  return (
    <div className="flex flex-col  bg-white shadow-2xl rounded-xl dark:bg-gray-800">
      <div id="pdf" className="p-4 sm:p-10">
        <div className="flex justify-between">
          <Logo color={"black"} widht={"w-52"} />

          <div className="text-end">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Tagihan #
            </h2>
            <span className="mt-1 block text-gray-500">
              {data && data.idtransaksi}
            </span>

            <div className="mt-4 not-italic text-gray-800 dark:text-gray-200 max-w-sm">
              Jalan Mayor Syamsu No 1 Jayaraga Kec. Tarogong Kidul, Kabupaten
              Garut, Jawa Barat, Indonesia
            </div>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Tagihan untuk:
            </h3>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {data && data.name}
            </h3>
            <div className="mt-2 not-italic text-gray-500">
              {data && data.alamat}
            </div>
          </div>

          <div className="sm:text-end space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Tanggal Tagihan:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {data && data.orderCreate.split("T")[0]}
                </dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Tenggat:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {data && newDate(data.orderCreate).split("T")[0]}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                Layanan
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase">
                Qty
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase">
                Metode
              </div>
              <div className="text-end text-xs font-medium text-gray-500 uppercase">
                Harga
              </div>
            </div>

            <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  layanan
                </h5>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {data && data.kodeProduk}
                </p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Qty
                </h5>
                <p className="text-gray-800 dark:text-gray-200">1 Bulan</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Metode
                </h5>
                <p className="text-gray-800 dark:text-gray-200">
                  {data && data.metode}
                </p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Harga
                </h5>
                <p className="sm:text-end text-gray-800 dark:text-gray-200">
                  {data && formatRupiah(data.jumlah, "Rp. ")}
                </p>
              </div>
            </div>

            <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Virtual Akun {data && data.metode}
            </h3>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {data && data.idtransaksi}
            </h3>
          </div>

          <div className="sm:text-end space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Total:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {data && formatRupiah(data.jumlah, "Rp. ")}
                </dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Biaya yang perlu dibayar:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {data && formatRupiah(data.jumlah, "Rp. ")}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 sm:mt-12">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Terima Kasih!
            </h4>
            <p className="text-gray-500">
              Silahkan bayar menggunakan metode yang telah anda pilih.
            </p>
          </div>
          {status && (
            <div>
              <p
                className={`text-xl font-semibold ${
                  data && data.status == "Lunas"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                Status : {data && data.status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const createPDF = async () => {
  const pdf = new jsPDF("landscape", "px", "a4");

  const dataa = await html2canvas(document.getElementById("pdf"));
  pdf.addImage(dataa.toDataURL("image/png"), "PNG", 0, 0);

  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const contentWidth = dataa.width;
  const contentHeight = dataa.height;
  const scaleX = width / contentWidth;
  const scaleY = height / contentHeight;
  pdf.scale(scaleX, scaleY);

  pdf.save("Tagihan.pdf");
};
