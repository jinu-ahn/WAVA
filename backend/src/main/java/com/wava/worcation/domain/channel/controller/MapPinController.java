package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import com.wava.worcation.domain.channel.service.MapPinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/channel/map")
@RequiredArgsConstructor
@Slf4j
public class MapPinController {
    private final MapPinService mapPinService;

    @PostMapping("/pin")
    private ResponseEntity<ApiResponse<MapPinResponseDto>> createPin(@RequestBody MapPinRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(mapPinService.createPin(requestDto)));
    }
}
