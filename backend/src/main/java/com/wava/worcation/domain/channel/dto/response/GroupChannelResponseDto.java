package com.wava.worcation.domain.channel.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class GroupChannelResponseDto {
    private Long id;
    private Long userId;
    private String sido;
    private String gugun;
    private String roomTitle;
    private String description;
    private int userCount;
}
