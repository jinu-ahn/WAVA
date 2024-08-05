package com.worq.worcation.domain.chat.repository;

import com.worq.worcation.domain.chat.domain.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByChannelId(Long channelId);
}
