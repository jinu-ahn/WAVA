package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import org.springframework.http.ResponseEntity;

public interface PersonalService {
    public ResponseEntity<ApiResponse<PersonalResponseDto>> ChannelInfo(Long userId);
}
