import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useRestaurantsPathsContext } from "../../context/restaurantsPathsContext";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const QrCode = () => {
  const { selectedRestaurantName } = useRestaurantsPathsContext();

  return (
    <section className="mx-auto my-24 w-11/12 rounded-lg bg-gray-100 p-6 xs:p-12 sm:w-5/6 md:w-1/2">
      <Link
        className="mb-4 flex items-center gap-1 text-sm"
        to={`/r/${selectedRestaurantName}`}
      >
        <IoIosArrowRoundBack className="text-xl" />
        <span>Back</span>
      </Link>
      <h1 className="mb-6 text-3xl font-bold">QR Code</h1>
      <section className="flex items-center justify-center">
        <QRCode value={`digidines.com/r/${selectedRestaurantName}`} />
      </section>
    </section>
  );
};

export default QrCode;
