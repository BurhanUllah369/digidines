import React from "react";
import QRCode from "react-qr-code";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const QrCode = () => {
  const { selectedRestaurant } = useRestaurantsPathsContext();
  return (
    <section className="w-11/12 sm:w-5/6 md:w-1/2 mx-auto my-24 p-6 xs:p-12 bg-gray-100 rounded-lg">
      <Link className="mb-4 flex items-center gap-1 text-sm" to={`/r/${selectedRestaurant}`}>
        <IoIosArrowRoundBack className="text-xl" />
        <span>Back</span>
      </Link>
      <h1 className="mb-6 text-3xl font-bold">QR Code</h1>
      <section className="flex justify-center items-center">
        <QRCode value={`digidines.com/r/${selectedRestaurant}`} />
      </section>
    </section>
  );
};

export default QrCode;
