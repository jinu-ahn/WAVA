package com.worq.worcation.domain.chat.service;

import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.chat.dto.reqeust.ChatDto;
import com.worq.worcation.domain.chat.dto.response.ChatResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ChatService {
    void saveChat(final ChatDto chatDto, final String token);
    ResponseEntity<ApiResponse<List<ChatResponseDto>>> chatLogs(final Long ChannelId);

}
