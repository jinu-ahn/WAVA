package com.wava.worcation.domain.channel.dto.response;

import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MapPinResponseDto {
    private Long pinId;
    private Long channelId;
    private Double lat;
    private Double lng;
    private String placeName;
    private String info;
    private Long pinOrder;
    private List<UserResponseDto> user;
}
