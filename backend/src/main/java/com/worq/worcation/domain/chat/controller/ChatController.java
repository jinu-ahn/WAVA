package com.worq.worcation.domain.chat.controller;

import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.chat.dto.reqeust.ChatDto;
import com.worq.worcation.domain.chat.dto.response.ChatResponseDto;
import com.worq.worcation.domain.chat.service.ChatService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    @MessageMapping("/chat")
    public ChatDto sendChat(@Payload ChatDto chatDto) {
        template.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);
        return chatDto;
    }

    @PostMapping("/chat/save")
    public String saveChat(@RequestBody ChatDto chatDto, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        chatService.saveChat(chatDto, token);
        return "성공";
    }

    @GetMapping("/chat/logs/{channelId}")
    public ResponseEntity<ApiResponse<List<ChatResponseDto>>> getChatLogs(@PathVariable Long channelId) {
        return chatService.chatLogs(channelId);
    }
}
