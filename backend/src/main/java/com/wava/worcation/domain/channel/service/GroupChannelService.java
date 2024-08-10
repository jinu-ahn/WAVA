package com.wava.worcation.domain.channel.service;


import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import com.wava.worcation.domain.channel.dto.response.GroupDetailResponseDto;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GroupChannelService {
    ResponseEntity<ApiResponse<GroupChannelResponseDto>> createGroupChannel(final GroupChannelRequestDto groupChannelRequestDto, final User user);

    ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> showAllGroupChannel(final User user);

    ResponseEntity<ApiResponse<GroupDetailResponseDto>> getGroupInfo(final Long channelId);

    ResponseEntity<ApiResponse<GroupChannelResponseDto>> updateMemo(final Long channelId, final String memo);

    ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> userJoinChannels(final User user);

    ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> searchChannel(final User user, final String content);

    ResponseEntity<ApiResponse<GroupChannelResponseDto>> validateChannelLimit(final User user, final Long channelId);
}
