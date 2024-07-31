package com.worq.worcation.domain.channel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedRequestDto {
    private Long feedId;
    private String content;
    private String sido;
    private String gugun;
    private Long channelId;
}
