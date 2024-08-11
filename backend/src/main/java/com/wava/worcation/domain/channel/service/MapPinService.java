package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MapPinService {
    MapPinResponseDto createPin(final MapPinRequestDto mapPinRequestDto);
    MapPinResponseDto updatePin(final Long pinId, final MapPinRequestDto mapPinRequestDto);
    void deletePin(final Long pinId);
    List<MapPinResponseDto> getChannelPins(final Long channelId);
}
