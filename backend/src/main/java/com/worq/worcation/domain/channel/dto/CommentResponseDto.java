package com.worq.worcation.domain.channel.dto;

import com.worq.worcation.domain.channel.domain.Feed;
import com.worq.worcation.domain.user.domain.User;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class CommentResponseDto {
    private Long id;
    private Feed feed;
    private User user;
    private String comment;
    private Instant createdAt;
}
