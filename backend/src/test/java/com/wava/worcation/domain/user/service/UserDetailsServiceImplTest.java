package com.wava.worcation.domain.user.service;

import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

/**
 * 작성자   : user
 * 작성날짜 : 2024-08-11
 * 설명    :
 */
@ExtendWith(MockitoExtension.class)
class UserDetailsServiceImplTest {


    @InjectMocks
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Mock
    private UserRepository userRepository;



    @Test
    void loadUserByUsername() {


        //givens
        User user = User.builder()
                .id(63L)
                .email("test1586@test.com")
                .password("$2a$10$VJTDditUN6rD9Z4aWuwjb.KeKpcoU.Jj1JBHKKPXHBci0Ika9Q.T.")
                .phone("01022222345")
                .nickName("나는야퉁퉁이")
                .sido("서울특별시")
                .sigungu("강동구")
                .roles(List.of("visitor"))
                .profileImg("https://worqbucket.s3.ap-northeast-2.amazonaws.com/53a16f79-ef6d-4809-98a0-2fe245f78c53.jpg")
                .build();
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));


        //when
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(user.getEmail());

        //then
        assertNotNull(userDetails);
        assertEquals(user.getEmail(), userDetails.getUsername());
    }
}