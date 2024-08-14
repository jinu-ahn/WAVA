package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import com.wava.worcation.domain.channel.service.MapPinService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
public class MapPinController {
    private final MapPinService mapPinService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/marker/position")
    public ResponseEntity<ApiResponse<MapPinResponseDto>> markerFunction(@Payload MapPinRequestDto mapPinRequestDto, @Header("Authorization") String userToken) {
        MapPinResponseDto mapPinResponseDto = mapPinService.markerFunction(mapPinRequestDto, userToken.substring(7));
        messagingTemplate.convertAndSend("/sub/map/" + mapPinResponseDto.getChannelId(), mapPinResponseDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(mapPinResponseDto));
    }
    @GetMapping("/position/detail/{channelId}")
    public ResponseEntity<ApiResponse<List<MapPinResponseDto>>> detail(@PathVariable("channelId") Long channelId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(mapPinService.getChannelPins(channelId)));
    }

}
