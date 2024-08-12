import useDeviceStore from "../store/deviceStore";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../components/common/customDatePicker";
import { useLayoutEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createWorcation, updateWorcation } from "../api/createWorcationApi";
import Swal from "sweetalert2";
import { validateWorcation } from "../util/func";
import SidoSigunguSelector from "../components/Worcation/SidoSigunguSelector";
import useUserStore from "../store/userStore";

function WorcationPage() {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const worcation = useUserStore((state) => state.userInfo?.worcation);
  const { setWorcation } = useUserStore();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(null);

  const [data, setData] = useState({
    start: new Date(),
    end: new Date(),
    sido: "",
    sigungu: "",
    job: "",
  });

  useLayoutEffect(() => {
    if (worcation) {
      setIsEdit(true);
      setData(worcation);
    } else {
      setIsEdit(false);
    }
  }, [worcation]);

  const dataChangeHandle = (type, value) => {
    setData((state) => ({ ...state, [type]: value }));
  };

  const sidoChangeHandle = (e) => {
    if (e === data.sido) {
      return;
    }
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    setData((state) => ({ ...state, sigungu: "", sido: e }));
  };

  // 구군 변경 함수
  const sigunguChangeHandle = (e) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    setData((state) => ({ ...state, sigungu: e }));
  };

  // 서브밋 함수
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      let result = false;
      let newWorcationData = null;
      if (validateWorcation(data)) {
        if (isEdit) {
          // 에딧 api 호출
          const worcationId = worcation?.id;
          ({ result, newWorcationData } = await updateWorcation(
            data,
            worcationId
          ));
        } else {
          // 등록 api 호출
          ({ result, newWorcationData } = await createWorcation(data));
        }
        if (result === true) {
          setWorcation(newWorcationData);
          await Swal.fire({
            icon: "success",
            title: "완료!",
            showConfirmButton: false,
            width: "300px",
            timer: 2000,
          });
          if (isEdit) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
          return;
        } else {
          await Swal.fire({
            icon: "error",
            title: "에러!",
            showConfirmButton: false,
            width: "300px",
            timer: 2000,
          });
          return;
        }
      }

      Swal.fire({
        icon: "error",
        title: "확인해 주세요",
        text: "입력값이 잘못되었어요!",
        // footer: '<a href="#">Why do I have this issue?</a>',
        timer: 1000,
      });
    } catch (e) {
      console.error(e, "worcation create에러");
    }
  };

  return (
    <div
      className={`
      ${
        isMobile
          ? "flex flex-col items-center justify-center min-h-screen max-h-screen w-screen overflow-auto p-4"
          : "grid grid-cols-1 justify-items-center mt-20 mb-20"
      }
    `}
    >
      <div
        className={`
        ${isMobile ? "w-full max-w-[90%] scale-90" : ""}
      `}
      >
        <div
          className={`
          ${
            isMobile
              ? "text-[#1c77c3] text-xl font-bold mb-4"
              : "text-[#1c77c3] text-[20px] font-bold font-['Noto Sans']"
          }
        `}
        >
          {
            isEdit ? (
              // 하단 수정 페이지 컨텐츠
              <>
                <span className="text-black">
                  워케이션 정보를{" "}
                  <span className="text-vacationHigh">업데이트</span>하세요!
                  <br />
                  <span className="text-mainBlue glow">WAVA</span>와 함께 새로운{" "}
                  <span className="text-toDoMid">경험</span>을 시작하세요!!
                </span>
              </>
            ) : (
              // 수정 페이지 끝
              // 등록 페이지 컨텐츠
              <>
                <span className="text-black">
                  워케이션을 <span className="text-vacationHigh">등록</span>
                  해 주세요!
                  <br />
                  <span className="text-mainBlue">WAVA</span>와 함께{" "}
                  <span className="text-toDoMid">워케이션</span>을 즐겨보세요!!
                </span>
              </>
            )
            // 등록 페이지 끝
          }
        </div>
        <div
          className={`
          ${
            isMobile
              ? "w-full h-px bg-gray-200 my-4"
              : "w-[350px] [h-0px] mt-2 mb-2 border border-gray-200"
          }
        `}
        />

        <div className="w-full max-w-xs">
          <form
            className={`
            ${
              isMobile
                ? "space-y-4"
                : "px-8 pt-6 pb-8 w-[350px] border border-[#1c77c3] rounded-lg shadow-lg shadow-blue-500/50"
            }
          `}
          >
            <SidoSigunguSelector
              sido={data.sido}
              sigungu={data.sigungu}
              sidoChangeHandle={sidoChangeHandle}
              sigunguChangeHandle={sigunguChangeHandle}
            />

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomDatePicker
                  label="시작일"
                  timeSet={data.start}
                  editTimeSet={(value) => dataChangeHandle("start", value)}
                />

                <div className="my-3" />
                <CustomDatePicker
                  label="종료일"
                  timeSet={data.end}
                  editTimeSet={(value) => dataChangeHandle("end", value)}
                />
              </LocalizationProvider>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 my-4"
                htmlFor="password"
              >
                직업
              </label>
              <input
                id="job"
                name="job"
                type="text"
                value={data.job}
                onChange={(value) =>
                  dataChangeHandle("job", value.target.value)
                }
                className="focus:outline-none ps-3  w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder=""
              />
            </div>

            <button
              type="button"
              onClick={submitHandle}
              className="w-full h-10 border rounded-[10px] mt-3 mb-1 drop-shadow-md bg-[#1c77c3] text-white"
            >
              등록하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WorcationPage;
