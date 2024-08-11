package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.ChannelUser;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import com.wava.worcation.domain.channel.enums.ChannelType;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.ChannelUserRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.worcation.dao.WorcationRepository;
import com.wava.worcation.domain.worcation.domain.Worcation;
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

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroupChannelServiceImplTest {

    private static final Logger log = LoggerFactory.getLogger(GroupChannelServiceImplTest.class);
    @InjectMocks
    private GroupChannelServiceImpl groupChannelServiceImpl;

    @Mock
    private ChannelRepository channelRepository;
    @Mock
    private ChannelUserRepository channelUserRepository;
    @Mock
    private WorcationRepository worcationRepository;


    // 클래스 인스턴스 변수로 선언
    private User user;
    private GroupChannelRequestDto groupChannelRequestDto;

    @BeforeEach
    public void setUp() {
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

        groupChannelRequestDto = new GroupChannelRequestDto();
        groupChannelRequestDto.setChannelSido("서울");
        groupChannelRequestDto.setChannelSigungu("경기");
        groupChannelRequestDto.setChannelTitle("나는 바로 옵티머스 프라임 웅~치킨 웅~치킨");
        groupChannelRequestDto.setChannelDescription("no Transactional annotation");

    }
    /**
     * @작성자 : 이병수
     * @작성일 : 2024-08-10
     * @설명 : createGroupChannel 메서드를 테스트합니다.
     *         채널과 채널 사용자 객체를 저장하고, 메서드가 올바른 응답을 반환하는지 검증합니다.
     */
    @Test
    void createGroupChannel() {

        //given : 데이터설정
        Channel channel = Channel.builder()
                .user(user)
                .channelDescription(groupChannelRequestDto.getChannelDescription())
                .channelTitle(groupChannelRequestDto.getChannelTitle())
                .channelType(ChannelType.GROUP.getCode())
                .channelSido(groupChannelRequestDto.getChannelSido())
                .channelSigungu(groupChannelRequestDto.getChannelSigungu())
                .build();

        ChannelUser channelUser = ChannelUser.builder()
                .channel(channel)
                .user(user)
                .build();

        // Mockito를 사용하여 메서드 호출 시 예상되는 결과를 설정
        when(channelRepository.save(any(Channel.class))).thenReturn(channel);
        when(channelUserRepository.save(any(ChannelUser.class))).thenReturn(channelUser);

        // When: 메서드 실행
        ResponseEntity<ApiResponse<GroupChannelResponseDto>> response = groupChannelServiceImpl.createGroupChannel(groupChannelRequestDto, user);

        // Then: 결과 검증

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(groupChannelRequestDto.getChannelTitle(), response.getBody().getData().getChannelTitle());
        verify(channelRepository, times(1)).save(any(Channel.class));
        verify(channelUserRepository, times(1)).save(any(ChannelUser.class));

    }



    @Test
    void showAllGroupChannel(){


        //given

        Channel dbChannelData = Channel.builder()
                .id(56L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강동구")
                .channelTitle("나는야퉁퉁이")
                .channelDescription("나는야퉁퉁이님의 채널 입니다.")
                .channelType("C002")
                .build();

        List<Channel> dbChannelList = List.of();

        Worcation worcation = Worcation.builder()
                .sido("서울특별시")
                .build();

        Channel expectedChannel = Channel.builder()
                .id(56L)
                .user(User.builder().id(63L).build())
                .channelSido("서울특별시")
                .channelSigungu("강동구")
                .channelTitle("나는야퉁퉁이")
                .channelDescription("나는야퉁퉁이님의 채널 입니다.")
                .channelType("C002")
                .build();

        List<Channel> channelList = List.of(expectedChannel);

        //when
        when(worcationRepository.findByUserId(user.getId())).thenReturn(worcation);
        when(channelRepository.findAllByChannelType(ChannelType.GROUP.getCode(), worcation.getSido())).thenReturn(channelList);

        //실제 메서드 호출
        //then
        ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> response = groupChannelServiceImpl.showAllGroupChannel(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void groupGroupDetail(){

        Channel channel = Channel.builder()

                .build();
    }
}