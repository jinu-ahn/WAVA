package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MapPinService {
    List<MapPinResponseDto> getChannelPins(final Long channelId);
    MapPinResponseDto markerFunction(final MapPinRequestDto mapPinRequestDto);
}
