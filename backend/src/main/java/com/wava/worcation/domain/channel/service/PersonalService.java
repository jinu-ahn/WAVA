package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.wava.worcation.domain.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface PersonalService {
    public ResponseEntity<ApiResponse<PersonalResponseDto>> ChannelInfo(String nickName,User user);

    Page<FeedSortResponseDto> personalFeed(int pages, String nickname, User user);

    ResponseEntity changeProfile(String imageUrl,User user);
    ResponseEntity changeDescription(String description,User user);
}
