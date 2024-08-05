package com.worq.worcation.domain.chat.controller;

import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.chat.dto.reqeust.ChatDto;
import com.worq.worcation.domain.chat.dto.response.ChatResponseDto;
import com.worq.worcation.domain.chat.service.ChatService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class ChatController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    @MessageMapping("/message")
    public ChatDto sendChat(@Payload ChatDto chatDto,@Header(name = "Authorization") String token) {
        template.convertAndSend("/sub/chatroom/" + chatDto.getChannelId(), chatDto);
        chatService.saveChat(chatDto,token.substring(7));
        return chatDto;
    }

    @GetMapping("/chat/logs/{channelId}")
    public ResponseEntity<ApiResponse<List<ChatResponseDto>>> getChatLogs(@PathVariable(name = "channelId") Long channelId) {
        return chatService.chatLogs(channelId);
    }
}