import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { carouselImages } from "../../data/data";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { HiArrowLongDown } from "react-icons/hi2";

function SampleNextArrow(props) {
  const { className, style, onClick, arrows } = props;
  return arrows ? (
    <FaArrowRightLong
      className={className}
      style={{ ...style, display: "block", color: "black"}}
      onClick={onClick}
    />
  ) : null;
}

function SamplePrevArrow(props) {
  const { className, style, onClick, arrows } = props;
  return arrows ? (
    <FaArrowLeftLong
      className={className}
      style={{ ...style, display: "block", color: "black"}}
      onClick={onClick}
    />
  ) : null;
}

export default function Header() {
  const [arrows, setArrows] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      windowWidth < 768 ? setArrows(false) : setArrows(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow arrows={arrows} />,
    prevArrow: <SamplePrevArrow arrows={arrows} />,
  };
  return (
    <header id="header" className="w-full ">
      <section className="w-11/12 mx-auto">
        <Slider {...settings}>
          {/* first slide  */}
          <div className="pt-12">
            <section className="w-11/12 md:w-3/4 mx-auto sm:mt-32 lg:mt-0 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-32 lg:gap-12">
              <section className="w-full flex flex-col items-start justify-evenly gap-12 ">
                <h1 className="text-3xl sm:text-6xl">
                  Designed to increase your sales by 30%
                </h1>
                <button className="px-4 py-2 md:px-6 md:py-4 bg-mainColor rounded-lg text-white">
                  Start your free trial
                </button>
              </section>
              <section className="flex w-full ">
                <img
                  className="absolute lg:top-0"
                  src={carouselImages.one.url1}
                  alt=""
                />
                <img
                  className="h-full lg:ml-32 mb-5"
                  src={carouselImages.one.url2}
                  alt=""
                />
              </section>
              <HiArrowLongDown className="hidden sm:block lg:hidden text-9xl mx-auto"/>
            </section>
          </div>

          {/* second slide  */}
          <div className="">
            <section className="w-11/12 xl:w-5/6 mx-auto mb-24 mt-12 lg:mt-0">
              <h1 className="text-2xl md:text-4xl mb-4">
                All in one menu platform for restaurants, cafes, and hotels!
              </h1>
              <section className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-16 lg:gap-16">
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url1}
                    alt=""
                  />
                  <section className="w-full lg:w-2/3 p-1 md:p-4 absolute -bottom-12 left-0 lg:left-1/2 lg:-translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold">
                      Tablet Menu
                    </h2>
                    <p className="text-xs">
                      Our tablet menu app runs on iOS and Android
                    </p>
                  </section>
                </section>
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url2}
                    alt=""
                  />
                  <section className="w-full lg:w-2/3 p-1 md:p-4 absolute -bottom-12 lg:left-1/2 lg:-translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold">QR Menu</h2>
                    <p className="text-xs">
                      Our tablet menu app runs on iOS and Android
                    </p>
                  </section>
                </section>
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url3}
                    alt=""
                  />
                  <section className="w-full lg:w-2/3 p-1 md:p-4 absolute -bottom-12 lg:left-1/2 lg:-translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold">QR Menu</h2>
                    <p className="text-xs">
                      Our tablet menu app runs on iOS and Android
                    </p>
                  </section>
                </section>
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url4}
                    alt=""
                  />
                  <section className="w-full lg:w-2/3 p-1 md:p-4 absolute -bottom-12 lg:left-1/2 lg:-translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold">Online Ordering</h2>
                    <p className="text-xs">
                      Our tablet menu app runs on iOS and Android
                    </p>
                  </section>
                </section>
              </section>
            </section>
          </div>

          {/* third slide  */}
          <div>
            <section className="w-11/12 xl:w-5/6 mx-auto mt-12 sm:mt-32 lg:mt-0 grid grid-cols-1 lg:grid-cols-2 gap-12 content-center">
              <section className="lg:w-full flex flex-col justify-center gap-4">
                <h1 className="text-2xl md:text-4xl xl:text-6xl">
                  Online Delivery & Pick-up Menu
                </h1>
                <h3 className="text-xl d:text-2xl xl:text-3xl">with 0% commission!</h3>
                <p className="text-sm sm:text-base">
                  Reduce your dependency on delivery channel partners and start
                  accepting direct online delivery and takeaways. Create your
                  delivery menu that is different from your dine-in menu and
                  connect your delivery menu link to your website and share it
                  across your social media channels!
                </p>
                <section className="mt-4 flex">
                  <button className="mr-4 px-4 py-2 md:px-6 md:py-4 border border-mainColor  rounded-lg text-sm sm:text-base">
                    Learn More
                  </button>
                  <button className="px-4 py-2 md:px-6 md:py-4 bg-mainColor rounded-lg text-xs sm:text-base text-white">
                    Start Free Trial
                  </button>
                </section>
              </section>
              <section className="w-full">
                <img src={carouselImages.three.url1} alt="" />
              </section>
              <HiArrowLongDown className="hidden sm:block lg:hidden sm:block text-9xl mx-auto"/>
            </section>
          </div>
        </Slider>
      </section>
    </header>
  );
}
