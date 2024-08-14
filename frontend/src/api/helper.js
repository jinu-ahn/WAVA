import Swal from "sweetalert2";

// try-catch 헬퍼함수
export const handleRequest = async (requestFunction, type) => {
  try {
    const response = await requestFunction();
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 204
    ) {
      return response.data || true;
    } else if (response?.data?.message) {
      throw new Error(response?.data?.message);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.error(type + " : Error - " + error);
    if (error.response?.data?.error) {
      // window.alert 대신 Swal로 변경
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: error.response.data.error,
      });
    }

    return false;
  }
};
