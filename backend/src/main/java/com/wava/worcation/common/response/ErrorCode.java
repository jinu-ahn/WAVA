package com.wava.worcation.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND,"해당 유저를 찾을 수 없습니다."),
    DUPLICATE_NICKNAME(HttpStatus.CONFLICT,"이미 가입되어있는 닉네임입니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT,"이미 가입되어있는 이메일입니다."),
    DUPLICATE_PHONE_NUMBER(HttpStatus.CONFLICT,"이미 가입되어있는 전화번호입니다."),
    CHANNEL_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 채널입니다."),
    CHANNEL_FULL(HttpStatus.FORBIDDEN, "채널 인원이 가득찼습니다."),
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "일시적인 오류가 발생했습니다"),
    BLACK_LIST_TOKEN(HttpStatus.FORBIDDEN,"로그아웃 된 유저입니다."),
    UNKNOWN_TOKEN(HttpStatus.valueOf(400), "토큰이 존재하지 않습니다."),
    WRONG_TYPE_TOKEN(HttpStatus.valueOf(401), "잘못된 타입의 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.valueOf(402), "만료된 토큰입니다."),
    UNSUPPORTED_TOKEN(HttpStatus.valueOf(403), "지원되지 않는 토큰입니다."),
    PLAN_NOT_FOUND(HttpStatus.NOT_FOUND,"일정을 찾을 수 없습니다."),
    FEED_NOT_FOUND(HttpStatus.NOT_FOUND,"피드를 찾을 수 없습니다.");

    private HttpStatus status;
    private String message;
}
