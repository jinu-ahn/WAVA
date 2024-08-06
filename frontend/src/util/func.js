/**
 *  할 일 유효성 검증 함수
 * @param {{
 * title:string
 * content:string
 * start:Date
 * end:Date
 * className:"HIGH"|"MID"|"LOW"
 * important:"HIGH"|"MID"|"LOW"
 * type:"WORK"|"REST"
 * isFinish:boolean
 * }} event 

 * @returns {Boolean<true|false>} 
*/
export function validateEvent(event) {
  // 문자열 및 기타 필수 속성 확인
  if (!event.title || typeof event.title !== "string") {
    console.error("title");
    return false;
  }

  if (!event.content || typeof event.content !== "string") {
    console.error("content");
    return false;
  }

  if (!event.className || typeof event.className !== "string") {
    console.error("className");
    return false;
  }

  if (
    typeof event.important !== "string" ||
    (event.important !== "HIGH" &&
      event.important !== "MID" &&
      event.important !== "LOW")
  ) {
    console.error("important");
    return false;
  }

  if (!event.type || typeof event.type !== "string") {
    console.error("type");
    return false;
  }

  if (typeof event.isFinish !== "boolean") {
    console.error("isFinish");
    return false;
  }

  // 날짜 유효성 확인
  if (!event.start || isNaN(Date.parse(event.start))) {
    console.error("startDate");
    return false;
  }
  if (!event.end || isNaN(Date.parse(event.end))) {
    console.error("endDate");
    return false;
  }

  // 시작 날짜와 종료 날짜 비교
  if (
    event.start &&
    event.end &&
    new Date(event.start) >= new Date(event.end)
  ) {
    console.error("sted value");
    return false;
  }

  return true;
}

/**
 *  워케이션 등록 유효성 검증 함수
 * @param {{
 * start : date
 * end : date,
 * sido : string,
 * sigungu : string,
 * job : string,
 * }} data
 * @returns {Boolean<true|false>} - todo 이벤트 목록의 배열을 포함하는 프로미스를 반환합니다.
 */
export function validateWorcation(data) {
  const { start, end, sido, sigungu, job } = data;

  // 날짜 형식 검사

  console.log(start);
  if (!start || isNaN(Date.parse(start))) {
    console.error("유효하지 않은 시작 날짜입니다.");
    return false;
  }
  if (!end || isNaN(Date.parse(end))) {
    console.error("유효하지 않은 종료 날짜입니다.");
    return false;
  }
  if (end <= start) {
    console.error("종료 날짜는 시작 날짜 이후여야 합니다.");
    return false;
  }

  // 문자열 필드 유효성 검사
  if (typeof sido !== "string" || sido.trim() === "") {
    console.error("시/도 정보가 유효하지 않습니다.");
    return false;
  }
  if (typeof sigungu !== "string" || sigungu.trim() === "") {
    console.error("구/군 정보가 유효하지 않습니다.");
    return false;
  }
  if (typeof job !== "string" || job.trim() === "") {
    console.error("직업 정보가 유효하지 않습니다.");
    return false;
  }

  // 모든 검사를 통과한 경우
  return true;
}
