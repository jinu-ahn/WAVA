package com.wava.worcation.domain.chat.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService{
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final ChannelRepository channelRepository;

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-05
     * @ 설명     : 전송한 채팅 저장
     * @param chatDto 채팅 데이터
     * @param token 헤더에 들어있는 액세스 토큰 (유저 정보)
     * @return
     * @status 성공 : 201 , 실패 : 401, 404
     */
    @Override
    @Transactional
    public ChatDto saveChat(final ChatDto chatDto, final String token) {
        Authentication authentication = tokenProvider.getAuthentication(token);
        User userOpt = userRepository.findByEmail(authentication.getName()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Channel channel = channelValidate(chatDto.getChannelId());

        Chat chat = Chat.builder()
                .user(userOpt)
                .channel(channel)
                .content(chatDto.getMessage())
                .build();

        chatRepository.save(chat);

        return chatDto;
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-05
     * @ 설명     : 채팅방에 해당되는 이전 채팅 로그 가져오기
     * @param channelId 채널 식별 아이디
     * @return 채팅 로그 리스트
     * @status 성공 : 200, 실패 : 404
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChatResponseDto> chatLogs(final Long channelId) {
        Channel channel = channelValidate(channelId);
        List<Chat> chatLogs = chatRepository.findByChannelId(channel.getId());

        List<ChatResponseDto> chatResponseDtoList = chatLogs.stream()
                .map(chatLog -> ChatResponseDto.builder()
                        .userId(chatLog.getUser().getId())
                        .nickName(chatLog.getUser().getNickName())
                        .message(chatLog.getContent())
                        .registTime(chatLog.getRegistTime())
                        .userProfile(chatLog.getUser().getProfileImg())
                        .build())
                .collect(Collectors.toList());

        return chatResponseDtoList;
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-05
     * @ 설명     : 데이터베이스에 존재하는 채널인지 검증
     * @param channelId 채널 식별 아이디
     * @return 채팅 로그 리스트
     * @status 실패 : 404
     */
    private Channel channelValidate(Long channelId) {
        Channel channel = channelRepository.findById(channelId).orElseGet(null);
        if(channel == null) {
            throw new CustomException(ErrorCode.CHANNEL_NOT_FOUND);
        }
        return channel;
    }
}
