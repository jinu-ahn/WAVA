package com.worq.worcation.domain.channel.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class CommentResponseDto {
    private Long id;
    private Long feedid;
    private Long userid;
    private String comment;
    private Instant createdAt;
}
