package com.wava.worcation.domain.channel.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedResponseDto {
    private String content;
    private int heart;
//    private Timestamp created_at;
    private Long id;
    private List<com.wava.worcation.domain.channel.dto.info.ImageResponseDto> imageList;
    private List<CommentResponseDto> commentList;
}

