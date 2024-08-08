package com.wava.worcation.domain.worcation.application;

import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.worcation.dto.WorcationRequestDto;
import com.wava.worcation.domain.worcation.dto.WorcationResponseDto;
import org.springframework.http.ResponseEntity;

public interface WorcationService {
    ResponseEntity<?> createWorcation(WorcationRequestDto worcationRequestDto, User user);

    WorcationResponseDto updateWorcation(Long worcationId, WorcationRequestDto worcationRequestDto);

    void deleteWorcation(Long worcationid);
}
