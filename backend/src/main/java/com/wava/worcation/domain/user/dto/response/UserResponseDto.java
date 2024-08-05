package com.wava.worcation.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {
    private Long id;
    private String email;
    private String nickName;
    private String phone;
    private String sido;
    private String sigungu;
}
