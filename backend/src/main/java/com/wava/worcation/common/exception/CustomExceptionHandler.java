package com.wava.worcation.common.exception;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 작성자   : 이병수
 * 작성날짜 : 2024-08-04
 * 설명    : exception 처리 클래스
 * CustomException  : 명시적으로 작성된 예외를 처리
 * Exception : 그 외 모든 예외를 처리
 */
@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {


    /**
     * 작성자   : 이병수
     * 작성일   : 2024-08-04
     * 설명     : CustomException을 처리하는 메서드
     * @param customException 발생한 CustomException 객체
     * @return HTTP 상태 코드와 ApiResponse를 포함한 응답 객체
     *
     * 이 메서드는 CustomException이 발생했을 때 호출됩니다.
     * 발생한 CustomException 객체를 매개변수로 받아서 처리합니다.
     * ErrorCode에서 상태 코드와 메시지를 추출하여 응답을 생성합니다.
     */
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<String>> handleCustomException(CustomException customException) {
        ErrorCode errorCode = customException.getErrorCode();
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.error(errorCode.getStatus(), errorCode.getMessage()));
    }

    /**
     * 작성자   : 이병수
     * 작성일   : 2024-08-04
     * 설명     : 모든 Exception을 처리하는 메서드
//     * @param ex 발생한 Exception 객체
     * @return HTTP 상태 코드와 ApiResponse를 포함한 응답 객체 .
     *
     * 이 메서드는 CustomException을 제외한 모든 예외가 발생했을 때 호출됩니다.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "일시적인 오류가 발생하였습니다. 다시 시도해주세요."));
    }
}
