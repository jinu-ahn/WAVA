package com.wava.worcation.domain.channel.service;


import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GroupChannelService {
    ResponseEntity<ApiResponse<GroupChannelResponseDto>> createGroupChannel(final GroupChannelRequestDto groupChannelRequestDto, String token);

    ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> showAllGroupChannel(String token);

    ResponseEntity<ApiResponse<GroupChannelResponseDto>> getGroupChannelDetail(String channelId, String token);
}
