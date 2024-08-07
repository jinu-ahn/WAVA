package com.wava.worcation.domain.channel.dto.response;

import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GroupDetailResponseDto {
    private Long channelId;
    private String channelTitle;
    private String channelDescription;
    private List<UserResponseDto> user;
}
