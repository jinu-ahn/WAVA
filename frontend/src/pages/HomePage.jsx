import React, { useEffect, useState } from "react";
import Carousel from "../components/Home/Carousel";
import AnimatedDiv from "../components/Home/AnimatedDiv";
import useDeviceStore from "../store/deviceStore";

function HomePage() {
  const [animate, setAnimate] = useState(false);
  const isMobile = useDeviceStore((state) => state.isMobile);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="w-full mx-auto">
      {/* 메인 Section */}
      <section
        id="서비스 소개"
        className="py-2 text-center px-6 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/메인/talk.jpg')",
          height: "75vh",
        }}
      >
        <h1
          className={`text-4xl font-bold text-white transform -translate-y-32 
            ${animate ? "animate-dropInTitle" : ""}
          `}
        >
          WELCOME TO WAVA
        </h1>
        <p className="text-lg mt-2 text-white transform -translate-y-32">
          Work And Vacation’s Assistant
        </p>
      </section>

      {/* 카드 섹션 */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "진행중인 워케이션.png",
            "대시보드.png",
            "모임 채널.png",
            "개인 채널.png",
          ].map((img, index) => (
            <div key={index} className="aspect-w-4 aspect-h-3">
              <img
                src={`/assets/메인/${img}`}
                alt={img.split(".")[0]}
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 워케이션 소개 Section */}
      <section
        id="워케이션 소개"
        className="relative py-2 text-center px-6 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/메인/fire.jpg')",
          height: "95vh",
        }}
      >
        <h1 className="text-4xl font-bold text-white transform -translate-y-64">
          워케이션이란?
        </h1>
        <div
          className={`absolute bottom-0 right-0 text-right p-4 ${
            isMobile ? "bg-black bg-opacity-30 rounded-lg w-full" : ""
          }`}
        >
          <p className={`mt-2 text-white ${isMobile ? "text-sm" : "text-lg"}`}>
            Work(일), Vacation(휴가)의 합성어로,
          </p>
          <p className={`mt-2 text-white ${isMobile ? "text-sm" : "text-lg"}`}>
            집과 사무실에서 벗어나
          </p>
          <p className={`mt-2 text-white ${isMobile ? "text-sm" : "text-lg"}`}>
            휴가지에서 업무와 휴식을 동시에 경험하는
          </p>
          <p className={`mt-2 text-white ${isMobile ? "text-sm" : "text-lg"}`}>
            새로운 근무제도를 뜻합니다.
          </p>
          <p className={`mt-2 text-white ${isMobile ? "text-sm" : "text-lg"}`}>
            WAVA에서
          </p>
          <p className={`mt-2 text-white ${isMobile ? "text-sm" : "text-lg"}`}>
            일(Work)상에서 쉼표가 되는 순간을 기대해주세요!
          </p>
        </div>
      </section>

      {/* 진행중인 워케이션 */}
      <section
        id="진행중인 워케이션"
        className="py-16 text-center px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/bgbg.jpg')" }}
      >
        <h2 className="text-3xl font-semibold mb-5 text-white">
          진행중인 워케이션
        </h2>
        <Carousel />
      </section>

      {/* 기대효과 Section */}
      <section id="기대효과" className="py-4 bg-white text-center px-4">
        <AnimatedDiv animation="animate-fade-in">
          <div className="my-2">
            <h2 className="text-3xl font-semibold">기대효과</h2>
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/assets/기대효과/기대효과.png"
                alt="기대효과"
                className="object-cover w-full h-full p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </AnimatedDiv>
      </section>
      {/* 카드 섹션 */}
      <section className="container mx-auto px-4 py-2">
        <AnimatedDiv animation="animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/assets/기대효과/도표/생산성 향상.png"
                alt="생산성 향상"
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/assets/기대효과/도표/삶의 질 개선.png"
                alt="삶의 질 개선"
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/assets/기대효과/도표/직무 만족도 증대.png"
                alt="직무 만족도"
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/assets/기대효과/도표/직원 복지 향상.png"
                alt="직원 복지 향상"
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </AnimatedDiv>
        <AnimatedDiv animation="animate-fade-in">
          <div className="my-3">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/assets/기대효과/도표/chart.png"
                alt="재참여 및 이유"
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </AnimatedDiv>
      </section>
    </div>
  );
}

export default HomePage;
