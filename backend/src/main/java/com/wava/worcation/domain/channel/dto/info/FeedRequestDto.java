package com.wava.worcation.domain.channel.dto.info;

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
