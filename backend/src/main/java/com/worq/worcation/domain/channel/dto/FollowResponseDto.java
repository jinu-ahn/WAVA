package com.worq.worcation.domain.channel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowResponseDto {
    private Long channelId;
    private int followerCount;
    private int followingCount;
}
