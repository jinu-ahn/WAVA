package com.wava.worcation.domain.channel.dto.response;

import com.wava.worcation.domain.user.dto.response.GroupUserResponseDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Data
@Builder
public class GroupDetailResponseDto {
    private Long channelId;
    private String channelTitle;
    private String channelDescription;
    private String channelMemo;
    private List<GroupUserResponseDto> user;
}
