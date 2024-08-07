package com.wava.worcation.domain.channel.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedSortResponseDto {

    private Long id; // 피드 아이디
    private Long userid;//유저 아이디
    private String content; // 피드 내용
    private Integer likes; // 좋아요 수
    private String imageUrl; // 이미지 리스트
    private int commentsCount; // 댓글 갯수
    private boolean isLiked; // 사용자가 좋아요를 눌렀는지 여부
    private Integer likedCount; // 좋아요 수

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ImageDto {
        private String imageName; // 이미지 이름
        private String imageUrl; // 이미지 URL
    }
}
