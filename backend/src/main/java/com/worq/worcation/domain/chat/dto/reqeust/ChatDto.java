package com.worq.worcation.domain.chat.dto.reqeust;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatDto {
    private Long channelId;
    private String message;
}
