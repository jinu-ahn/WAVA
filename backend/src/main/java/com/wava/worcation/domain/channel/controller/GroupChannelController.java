package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import com.wava.worcation.domain.channel.service.GroupChannelService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/channel")
@RequiredArgsConstructor
public class GroupChannelController {


    private final GroupChannelService groupChannelServcice ;

    /**
     *
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-08-03
     * @ 설명     : 그룹 채널 전체 보기

     * @return
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> showAllGroupChannel (HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return groupChannelServcice.showAllGroupChannel(token);

    }


    /**
     *
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-08-03
     * @ 설명     : 그룹 채널 추가

     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> createGroupChannel (@RequestBody GroupChannelRequestDto groupChannelRequestDto, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return groupChannelServcice.createGroupChannel(groupChannelRequestDto,token);

    }

    @GetMapping ("/detail/{channelId}")
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> getGroupChannelDetail (@PathVariable("channelId") String channelId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return groupChannelServcice.getGroupChannelDetail(channelId,token);
    }





}
