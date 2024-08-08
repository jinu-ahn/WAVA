package com.wava.worcation.domain.channel.dto.request;

import com.wava.worcation.domain.user.domain.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MapPinRequestDto {
    private Long channelId;
    private Double lat;
    private Double lng;
    private String placeName;
    private String info;
    private Long pinOrder;
    private List<CompanionRequestDto> user;
}
