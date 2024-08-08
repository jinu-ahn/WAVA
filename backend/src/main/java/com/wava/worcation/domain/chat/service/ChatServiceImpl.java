package com.wava.worcation.domain.chat.service;

import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.chat.domain.Chat;
import com.wava.worcation.domain.chat.dto.reqeust.ChatDto;
import com.wava.worcation.domain.chat.dto.response.ChatResponseDto;
import com.wava.worcation.domain.chat.repository.ChatRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService{
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final ChannelRepository channelRepository;

    /**
     * 채팅 저장
     * @param chatDto
     */
    @Override
    @Transactional
    public void saveChat(final ChatDto chatDto, final String token) {
        Authentication authentication = tokenProvider.getAuthentication(token);
        User userOpt = userRepository.findByEmail(authentication.getName()).orElseThrow();
        Channel channelOpt = channelRepository.findById(chatDto.getChannelId()).orElseThrow();

        Chat chat = Chat.builder()
                .user(userOpt)
                .channel(channelOpt)
                .content(chatDto.getMessage())
                .build();

        chatRepository.save(chat);
    }

    /**
     * 이전 채팅 로그 가져오기
     * @param ChannelId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<ChatResponseDto>>> chatLogs(final Long ChannelId) {
        List<Chat> chatLogs = chatRepository.findByChannelId(ChannelId);
        List<ChatResponseDto> chatResponseDtoList = new ArrayList<>();
        for (Chat chatLog : chatLogs) {
            chatResponseDtoList.add(
                    ChatResponseDto.builder()
                            .userId(chatLog.getUser().getId())
                            .nickName(chatLog.getUser().getNickName())
                            .message(chatLog.getContent())
                            .registTime(chatLog.getRegistTime())
                            .userProfile(chatLog.getUser().getProfileImg())
                            .build());
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(chatResponseDtoList));
    }
}
