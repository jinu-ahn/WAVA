package com.worq.worcation.domain.user.service;

import com.worq.worcation.domain.user.domain.User;
import com.worq.worcation.domain.user.domain.UserAdapter;
import com.worq.worcation.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 작성자 : jingu
 * 날짜 : 2024/07/27
 * 설명 : UserDetailsService 구현체
 */
@RequiredArgsConstructor
@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("사용자가 존재하지 않습니다."));
        return new UserAdapter(user);
    }
}
