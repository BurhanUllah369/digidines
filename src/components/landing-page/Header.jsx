import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { carouselImages } from "../../data/data";
import Nav from "./Nav";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FaArrowRightLong
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FaArrowLeftLong
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

export default function Header() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <header className="w-full h-dvh bg-gradient-to-b from-white to-headerBg">
      <Nav />
      <section className="w-11/12 mx-auto">
        <Slider {...settings}>
          <div className="pt-12">
            <section className="w-3/4 mx-auto flex justify-between">
              <section className="flex flex-col items-start justify-evenly">
                <h1 className="text-6xl ">
                  Designed to increase your sales by 30%
                </h1>
                <button className="px-6 py-4 bg-mainColor rounded-lg text-white">
                  Start your free trial
                </button>
              </section>
              <section className="flex">
                <img
                  className="absolute bottom-0"
                  src={carouselImages.one.url1}
                  alt=""
                />
                <img
                  className="w-full h-full ml-32 mb-5"
                  src={carouselImages.one.url2}
                  alt=""
                />
              </section>
            </section>
          </div>
          <div className="">
            <section className="w-5/6 mx-auto mb-24">
              <h1 className="text-4xl mb-4">
                All in one menu platform for restaurants, cafes, and hotels!
              </h1>
              <section className="w-full flex justify-between gap-5">
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url1}
                    alt=""
                  />
                  <section className="w-2/3 p-4 absolute -bottom-12 left-1/2 -translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-lg font-semibold">Tablet Menu</h2>
                    <p className="text-xs">Our tablet menu app runs on iOS and Android</p>
                  </section>
                </section>
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url2}
                    alt=""
                  />
                  <section className="w-2/3 p-4 absolute -bottom-12 left-1/2 -translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-lg font-semibold">QR Menu</h2>
                    <p className="text-xs">Our tablet menu app runs on iOS and Android</p>
                  </section>
                </section>
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url3}
                    alt=""
                  />
                  <section className="w-2/3 p-4 absolute -bottom-12 left-1/2 -translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-lg font-semibold">QR Menu</h2>
                    <p className="text-xs">Our tablet menu app runs on iOS and Android</p>
                  </section>
                </section>
                <section className="relative">
                  <img
                    className="w-full h-full block rounded-xl"
                    src={carouselImages.two.url4}
                    alt=""
                  />
                  <section className="w-2/3 p-4 absolute -bottom-12 left-1/2 -translate-x-1/2 bg-mainColor text-white text-center rounded-lg">
                    <h2 className="text-lg font-semibold">Online Ordering</h2>
                    <p className="text-xs">Our tablet menu app runs on iOS and Android</p>
                  </section>
                </section>
              </section>
            </section>
          </div>
          <div>
            <section>
              <h1>Online Delivery & Pick-up Menu</h1>
              <h3>with 0% commission!</h3>
              <p>Reduce your dependency on delivery channel partners and start accepting direct online delivery and takeaways. Create your delivery menu that is different from your dine-in menu and connect your delivery menu link to your website and share it across your social media channels!</p>
              <section>
                <button>Learn More</button>
                <button>Start Free Trial</button>
              </section>
            </section>
            <section>
              <img src={carouselImages.three.url1} alt="" />
            </section>
          </div>
        </Slider>
      </section>
    </header>
  );
}
