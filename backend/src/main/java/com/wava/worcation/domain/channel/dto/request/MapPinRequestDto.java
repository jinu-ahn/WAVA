package com.wava.worcation.domain.channel.dto.request;

import com.wava.worcation.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@ToString
public class MapPinRequestDto {
    private Long channelId;
    private Double lat;
    private Double lng;
    private String placeName;
    private String placeUrl;
    private Long pinOrder;
    private LocalDateTime visitDate;
    private List<CompanionRequestDto> user;
}
