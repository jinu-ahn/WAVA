import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AnimatedDiv from "./AnimatedDiv";

const data = [
  { name: "직원 복지", value: 98.1 },
  { name: "생산성", value: 61.5 },
  { name: "직무 만족도", value: 84.6 },
  { name: "삶의 질", value: 92.3 },
];

const economicImpact = [
  { title: "직접 지출액", value: "3,500억원" },
  { title: "고용유발효과", value: "약 2만7천명" },
  { title: "생산유발효과", value: "약 7조원" },
];

const BenefitCard = ({ title, value, imageSrc }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
    <img
      src={imageSrc}
      alt={title}
      className="w-full h-32 object-cover mb-4 rounded"
    />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold text-blue-600">{value}%</p>
  </div>
);

const ExpectationSection = () => (
  <section
    id="기대효과"
    className="py-16 bg-cover bg-center"
    style={{ backgroundImage: "url('/assets/bgbg.webp')" }}
  >
    <div className="container mx-auto px-4">
      <AnimatedDiv animation="animate-fade-in">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          기대효과
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <BenefitCard
            title="직원 복지 향상"
            value={98.1}
            imageSrc="/assets/기대효과/도표/직원 복지 향상.webp"
          />
          <BenefitCard
            title="생산성 향상"
            value={61.5}
            imageSrc="/assets/기대효과/도표/생산성 향상.webp"
          />
          <BenefitCard
            title="직무 만족도 증대"
            value={84.6}
            imageSrc="/assets/기대효과/도표/직무 만족도 증대.webp"
          />
          <BenefitCard
            title="삶의 질 개선"
            value={92.3}
            imageSrc="/assets/기대효과/도표/삶의 질 개선.webp"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            워케이션 효과 및 경제적 파급효과
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 h-80 lg:h-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2C46A9" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-bold mb-8 text-center">
                경제적 파급효과
              </h4>
              <ul className="space-y-4">
                {economicImpact.map((item, index) => (
                  <li key={index} className="flex flex-col text-center">
                    <span className="font-medium text-lg">{item.title}</span>
                    <span className="text-red-700 font-semibold text-xl">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            재참여 희망 비율 및 재참여 희망 이유
          </h3>
          <img
            src="/assets/기대효과/도표/chart.webp"
            alt="재참여 및 이유"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </AnimatedDiv>
    </div>
  </section>
);

export default ExpectationSection;
