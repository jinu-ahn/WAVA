import { localAxios as local } from "../util/http-commons";
import { nanoid } from "nanoid";
import { get_response } from "./dummy";
import axios from "axios";

// api 함수용 파일
const address = "/plan";
/**
 * 예시 api 함수 :
 * 서버에서 todo 이벤트 목록을 가져옵니다.
 * @param {String} userId
 *
 * @typedef {Object} TodoEvent
 * @property {string} id - 이벤트의 고유 식별자.
 * @property {string} title - 이벤트의 제목.
 * @property {string} start - 이벤트의 시작 날짜와 시간 (ISO 형식).
 * @property {string} end - 이벤트의 종료 날짜와 시간 (ISO 형식).
 * @property {string} content - 이벤트에 대한 추가 설명 또는 내용.
 * @property {boolean} isFinish - 이벤트가 완료되었는지 여부.
 * @property {"WORK"|"REST"} type - 이벤트가 완료되었는지 여부.
 * @property {string} important - 이벤트가 완료되었는지 여부.
 * @property {string} className - 이벤트가 완료되었는지 여부.
 *
 * @returns {Promise<TodoEvent[]>} - todo 이벤트 목록의 배열을 포함하는 프로미스를 반환합니다.
 * @throws {Error} - 네트워크 요청이 실패할 경우 오류를 발생시킵니다.
 */
export const getTodoList = async () => {
  try {
    const response = await local.get(address + "/view");
    if (response.data?.status !== "OK") {
      console.log(response.message);
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("todo 목록을 가져오는 중 오류 발생:", error);
    return false;
  }
};

export const getTodayTodoList = async () => {
  try {
    const response = await local.get(address + "/view/today");
    if (response.data?.status !== "OK") {
      console.log(response.message);
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("today todo 목록을 가져오는 중 오류 발생:", error);
    return false;
  }
};

// C
export const createTodoRequest = async (newTodoItem) => {
  try {
    const response = await local.post(address + "/create", newTodoItem);

    if (response.data?.status !== "OK") {
      console.log(response.message);
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }
    const { data } = response.data;
    return data;
  } catch (e) {
    console.error("todo 항목을 생성하는 중 오류 발생:", e);
    return false;
  }
};

// D
export const deleteTodoRequest = async (todoItem) => {
  try {
    const response = await local.delete(address + "/delete/" + todoItem);

    if (response.status === 204) {
      return true;
    } else {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }
  } catch (e) {
    console.error("todo 항목을 삭제하는 중 오류 발생:", e);
    return false;
  }
};

// U
export const updateTodoRequest = async (todoItem) => {
  try {
    // console.log(todoItem);
    const response = await local.patch(
      address + "/update/" + todoItem?.id,
      todoItem
    );

    if (response.status === 200) {
      return true;
    } else {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }
  } catch (e) {
    console.error("todo 항목을 수정하는 중 오류 발생:", e);
    return false;
  }
};

// WeatherService.js
// export const getWeatherStatus = async (lat, lng) => {
//   try {
//     const appkey = process.env.REACT_APP_OPENWEATHER_API_KEY;
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appkey}&units=metric`
//     );
//     if (response.status === 200) {
//       return response.data;
//     }
//   } catch (e) {
//     console.error("날씨정보에러: ", e);
//     return e;
//   }
// };
