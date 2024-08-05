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
    CHANNEL_FULL(HttpStatus.FORBIDDEN, "채널 인원이 가득찼습니다.");
    private HttpStatus status;
    private String message;
}
