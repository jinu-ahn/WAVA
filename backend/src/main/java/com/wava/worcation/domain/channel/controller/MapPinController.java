package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import com.wava.worcation.domain.channel.service.MapPinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/channel/map")
@RequiredArgsConstructor
@Slf4j
public class MapPinController {
    private final MapPinService mapPinService;

    @PostMapping()
    private ResponseEntity<ApiResponse<MapPinResponseDto>> createPin(@RequestBody MapPinRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(mapPinService.createPin(requestDto)));
    }

    @PatchMapping("/{pinId}/update")
    private ResponseEntity<ApiResponse<MapPinResponseDto>> updatePin(@PathVariable("pinId") Long pinId, @RequestBody MapPinRequestDto requestDto) {
        log.info("in?");
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(mapPinService.updatePin(pinId, requestDto)));
    }

}
