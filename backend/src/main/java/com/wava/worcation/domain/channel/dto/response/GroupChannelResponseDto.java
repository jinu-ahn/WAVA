package com.wava.worcation.domain.channel.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class GroupChannelResponseDto {
    private Long channelId;
    private Long userId;
    private String channelSido;
    private String channelSigungu;
    private String channelTitle;
    private String channelDescription;
    private String channelMemo;
    private int userCount;
}
