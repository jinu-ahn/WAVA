package com.wava.worcation.domain.cursor.controller;


import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.cursor.dto.request.CursorDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CursorController {

    private final SimpMessagingTemplate template;
//    private final CursorService cursorService;

    @MessageMapping("/position")
    public ResponseEntity<ApiResponse<CursorDto>> sendCursorPosition(@Payload CursorDto cursorDto, @Header(name="Authorization") String token) {
        System.out.println("유저 닉네임: " + cursorDto.getNickName() + " 그리고 채널 아이디: " + cursorDto.getChannelId() + " x: " + cursorDto.getX() + " y: " + cursorDto.getY());
        template.convertAndSend("/sub/cursorroom/" + cursorDto.getChannelId(), cursorDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(cursorDto));
    }
}
