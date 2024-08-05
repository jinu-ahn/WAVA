package com.worq.worcation.domain.channel.service;

import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.channel.dto.info.PersonalResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface PersonalService {

    ResponseEntity<ApiResponse<PersonalResponseDto>> ChannelInfo(Long userId);
}
