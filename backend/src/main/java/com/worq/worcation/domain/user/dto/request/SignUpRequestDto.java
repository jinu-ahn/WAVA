package com.worq.worcation.domain.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String nickName;
    @NotBlank
    @Pattern(regexp = "^\\d{2,3}\\d{3,4}\\d{4}$",message = "전화번호는 01000000000 형식으로 입력해야 합니다.")
    private String phone;
    @NotBlank
    private String sido;
    @NotBlank
    private String sigungu;
}
