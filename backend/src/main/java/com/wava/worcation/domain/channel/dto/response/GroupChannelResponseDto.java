package com.wava.worcation.domain.channel.dto.response;


import com.wava.worcation.domain.channel.enums.ChannelType;
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
    private String channelType;
    private int userCount;
    private int r;
    private int g;
    private int b;
}
