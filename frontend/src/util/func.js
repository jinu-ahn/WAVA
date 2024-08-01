/**
 *  할 일 유효성 검증 함수
 * @param {{
 * title:string
 * content:string
 * start:Date
 * end:Date
 * className:"상"|"중"|"하"
 * important:"상"|"중"|"하"
 * type:"WORK"|"REST"
 * isFinish:boolean
 * }} event 

 * @returns {Promise<event>} - todo 이벤트 목록의 배열을 포함하는 프로미스를 반환합니다.
 * @throws {Error} - */
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
    (event.important !== "상" &&
      event.important !== "중" &&
      event.important !== "하")
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
 *  할 일 유효성 검증 함수
 * @param {{
 * title:string
 * content:string
 * start:Date
 * end:Date
 * className:"상"|"중"|"하"
 * important:"상"|"중"|"하"
 * type:"WORK"|"REST"
 * isFinish:boolean
 * }} event 

 * @returns {Promise<event>} - todo 이벤트 목록의 배열을 포함하는 프로미스를 반환합니다.
 * @throws {Error} - */
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
    (event.important !== "상" &&
      event.important !== "중" &&
      event.important !== "하")
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
