package com.worq.worcation.domain.channel.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalResponseDto {
    long id;
    long userId;
    String nickName;
    String sido;
    String sigungu;
    String description;
    String profileImage;
    int follow;
    int follower;
    int feedCount;

}
