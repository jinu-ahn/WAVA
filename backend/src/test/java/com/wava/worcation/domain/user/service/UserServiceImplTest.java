package com.wava.worcation.domain.user.service;

import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.util.RedisUtil;
import com.wava.worcation.domain.user.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 작성자   : user
 * 작성날짜 : 2024-08-11
 * 설명    :
 */
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Mock
    private Authentication authentication;
    @Mock
    private TokenProvider tokenProvider;
    @Mock
    private RedisUtil redisUtil;



    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void signUp() {

    }

    @Test
    void login() {
    }

    @Test
    void logout() {
    }

    @Test
    void reissue() {
    }

    @Test
    void nickNameCheck() {
    }
}