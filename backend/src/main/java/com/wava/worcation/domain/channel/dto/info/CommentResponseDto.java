package com.wava.worcation.domain.channel.dto.info;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class CommentResponseDto {
    private String nickName;
    private Long id;
    private Long feedid;
    private Long userid;
    private String comment;
    private Instant createdAt;
}
