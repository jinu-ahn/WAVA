package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.wava.worcation.domain.channel.service.PersonalService;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/channel/personal")
@RequiredArgsConstructor
@Slf4j
public class PersonalController {
        PersonalService personalService;

    @GetMapping("/{userId}/info")
    public ResponseEntity<ApiResponse<PersonalResponseDto>> info(@PathVariable("userId") Long userId) {
        return personalService.ChannelInfo(userId);
    }

    @GetMapping("/{userId}/feed")
    public String feed(@PathVariable("userId") String userId) {
        return null;
    }
}
