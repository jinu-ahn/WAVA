import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const carouselItems = [
  {
    title: "강원특별자치도",
    image: "/assets/팜플렛/강원 팜플렛.png",
    url: "https://worcation.co.kr/gw",
  },
  {
    title: "더 휴일",
    image: "/assets/팜플렛/더 휴일 팜플렛.png",
    url: "https://thehyuil.co.kr/",
  },
  {
    title: "데스커",
    image: "/assets/팜플렛/데스커 팜플렛.png",
    url: "https://www.deskerworcation.com/",
  },
  {
    title: "부산",
    image: "/assets/팜플렛/부산 팜플렛.png",
    url: "https://www.busaness.com/",
  },
  {
    title: "서울",
    image: "/assets/팜플렛/서울 팜플렛.png",
    url: "https://worcation.sba.kr/",
  },
  {
    title: "어촌체험 휴양마을",
    image: "/assets/팜플렛/어촌체험 휴양마을 팜플렛.png",
    url: "https://seantour.kr/newseantour/main/main.do",
  },
  {
    title: "전북특별자치도",
    image: "/assets/팜플렛/전북 팜플렛.png",
    url: "https://jb-worcation.com/",
  },
  {
    title: "제주도",
    image: "/assets/팜플렛/제주 팜플렛.png",
    url: "https://jejuworcation.or.kr/",
  },
  {
    title: "충청남도",
    image: "/assets/팜플렛/충남 팜플렛.png",
    url: "https://cnctf.or.kr/site/worcation/main.php",
  },
];

const CarouselComponent = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={3000}
      centerMode={true}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass="flex justify-center items-center"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {carouselItems.map((item, index) => (
        <div
          key={index}
          className="bg-transparent w-full px-2 flex flex-col items-center"
        >
          <div className="card-body items-center p-4 bg-transparent">
            <h2 className="card-title text-mainTxt font-bold text-base sm:text-lg">
              {item.title}
            </h2>
          </div>
          <figure className="relative">
            <img
              draggable={false}
              className="rounded-xl w-full h-auto"
              src={item.image}
              alt={item.title}
            />
            <button
              className="btn btn-sm sm:btn-md backdrop-blur-lg bg-transparent border border-white absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white"
              onClick={() => openInNewTab(item.url)}
            >
              <span className="[text-shadow:#000_1px_0_10px] text-xs sm:text-sm">
                이동하기
              </span>
            </button>
          </figure>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
