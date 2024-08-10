package com.wava.worcation.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupUserResponseDto {
    private Long userId;
    private String profile;
    private String nickName;
    private String job;
}
