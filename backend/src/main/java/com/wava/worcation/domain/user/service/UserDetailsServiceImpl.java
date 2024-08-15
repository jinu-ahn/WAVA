package com.wava.worcation.domain.user.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.domain.UserAdapter;
import com.wava.worcation.domain.user.repository.UserRepository;
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

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : SecurityContextHolder에 저장할 유저 디테일 생성
     * @param email 유저 이메일
     * @return 유저 객체를 담고있는 Adapter
     */
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));
        return new UserAdapter(user);
    }
}
