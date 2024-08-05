package com.worq.worcation.common.config.websocket;

import com.worq.worcation.common.jwt.AuthenticationFilter;
import com.worq.worcation.common.jwt.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.netty.channel.ChannelInboundHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final TokenProvider tokenProvider;
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (accessor.getCommand() == StompCommand.CONNECT) {
            if(accessor.getNativeHeader("Authorization") == null) {
                throw new JwtException("로그인이 필요한 서비스입니다.");
            }
            if(tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization").substring(7))) {
                throw new JwtException("유효하지 않은 토큰입니다.");
            }
        }
        return message;
    }
}
