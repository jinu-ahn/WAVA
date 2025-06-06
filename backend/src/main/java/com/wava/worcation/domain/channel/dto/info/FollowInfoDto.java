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
public class FollowInfoDto {
    private Long Id;
    private List<UserFollowInfoDto>  userList;
    private String nickName;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserFollowInfoDto{
        private Long userId;
        private String profile;
        private String nickname;
        private boolean isFollower;
        private boolean hasFollowerRelationship;
    }
}
