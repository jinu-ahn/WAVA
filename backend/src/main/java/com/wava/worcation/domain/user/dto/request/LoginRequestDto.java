package com.wava.worcation.domain.user.dto.request;

import lombok.Getter;
/**
 * 작성자 : jingu
 * 날짜 : 2024/07/27
 * 설명 : 로그인 Data Transport Object
 */
@Getter
public class LoginRequestDto {
    private String email;
    private String password;
}

