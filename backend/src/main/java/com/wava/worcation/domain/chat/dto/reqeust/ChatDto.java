package com.wava.worcation.domain.chat.dto.reqeust;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChatDto {
    private Long channelId;
    private String nickName;
    private String registTime;
    private String message;
}
