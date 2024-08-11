package com.wava.worcation.domain.worcation.service;


import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.worcation.domain.Worcation;
import com.wava.worcation.domain.worcation.dto.WorcationRequestDto;
import com.wava.worcation.domain.worcation.dto.WorcationResponseDto;
import com.wava.worcation.domain.worcation.repository.WorcationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.SimpleDateFormat;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


/**
 * 작성자   : user
 * 작성날짜 : 2024-08-11
 * 설명    :
 */

@ExtendWith(MockitoExtension.class)
class WorcationServiceImplTest {

    private WorcationRequestDto worcationRequestDto;
    @InjectMocks
    private WorcationServiceImpl worcationServiceImpl;

    @Mock
    private WorcationRepository worcationRepository;

    private static final Logger log = LoggerFactory.getLogger(WorcationServiceImplTest.class);
    private User user;
    private Worcation worcation;

    @BeforeEach
    void setup() throws Exception {
        user = User.builder()
                .id(63L)
                .email("test1586@test.com")
                .password("$2a$10$VJTDditUN6rD9Z4aWuwjb.KeKpcoU.Jj1JBHKKPXHBci0Ika9Q.T.")
                .phone("01022222345")
                .nickName("나는야퉁퉁이")
                .sido("서울특별시")
                .sigungu("강동구")
                .profileImg("https://worqbucket.s3.ap-northeast-2.amazonaws.com/53a16f79-ef6d-4809-98a0-2fe245f78c53.jpg")
                .build();

        worcationRequestDto = WorcationRequestDto.builder()
                .start(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS").parse("2024-08-01 15:33:15.000000"))  // 시작 날짜 설정
                .end(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS").parse("2024-08-31 15:33:15.000000"))  // 종료 날짜 설정
                .sido("인천광역시")  // 시/도 설정
                .sigungu("남동구")  // 시/군/구 설정
                .job("무직")  // 직업 설정
                .build();

         worcation = Worcation.builder()
                .id(1L)
                .sido("서울특별시")
                .sigungu("강남구")
                .job("개발자")
                .build();

    }

    @Test
    void createWorcation() {
        Worcation worcation = Worcation.builder()
                .user(user)
                .start(worcationRequestDto.getStart())
                .end(worcationRequestDto.getEnd())
                .sido(worcationRequestDto.getSido())
                .sigungu(worcationRequestDto.getSigungu())
                .job(worcationRequestDto.getJob())
                .type(worcationRequestDto.getType())
                .build();

        when(worcationRepository.existsByUserId(user.getId())).thenReturn(false);
        when(worcationRepository.save(worcation)).thenReturn(worcation);

        //when
        ResponseEntity<?> response = worcationServiceImpl.createWorcation(worcationRequestDto, user);

        //then
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void updateWorcation() {

        Worcation updatedWorcation = Worcation.builder()
                .id(1L)
                .sido("서울특별시")
                .sigungu("강남구")
                .job("디자이너") // 수정 후 직업이 변경된다고 가정
                .build();

        when(worcationRepository.findById(1L)).thenReturn(Optional.of(worcation));
        when(worcationRepository.save(any(Worcation.class))).thenReturn(updatedWorcation);

        // When
        WorcationResponseDto response = worcationServiceImpl.updateWorcation(1L, worcationRequestDto);

        // Then
        assertNotNull(response);
        assertEquals("디자이너", response.getJob()); // 변경된 직업이 "디자이너"인지 확인
        verify(worcationRepository, times(1)).findById(1L);
        verify(worcationRepository, times(1)).save(any(Worcation.class));

    }

    @Test
    void deleteWorcation() {

        //given
        when(worcationRepository.findById(worcation.getId())).thenReturn(Optional.of(worcation));
        doNothing().when(worcationRepository).delete(worcation);

        //when
        worcationServiceImpl.deleteWorcation(worcation.getId());

        //then
        verify(worcationRepository, times(1)).delete(worcation);
        verify(worcationRepository, times(1)).findById(1L);
    }
}