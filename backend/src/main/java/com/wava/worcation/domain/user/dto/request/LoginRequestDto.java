package com.wava.worcation.domain.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 작성자 : jingu
 * 날짜 : 2024/07/27
 * 설명 : 로그인 Data Transport Object
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$", message="비밀번호는 영문 및 숫자 포함 8자리 이상 20자리 이하 가능합니다.")
    private String password;
}

