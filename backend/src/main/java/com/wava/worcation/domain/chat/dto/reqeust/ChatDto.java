package com.wava.worcation.domain.chat.dto.reqeust;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatDto {
    private Long channelId;
    private String message;
}
