package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import com.wava.worcation.domain.channel.dto.response.GroupDetailResponseDto;
import com.wava.worcation.domain.channel.service.GroupChannelService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> showAllGroupChannel (@AuthUser User user) {
        return groupChannelServcice.showAllGroupChannel(user);
    }


    /**
     *
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-08-03
     * @ 설명     : 그룹 채널 추가

     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> createGroupChannel (@RequestBody GroupChannelRequestDto groupChannelRequestDto, @AuthUser User user) throws Exception {
        return groupChannelServcice.createGroupChannel(groupChannelRequestDto,user);

    }

    @GetMapping ("/detail/{channelId}")
    public ResponseEntity<ApiResponse<GroupDetailResponseDto>> getGroupChannelDetail (@PathVariable("channelId") Long channelId) {
        return groupChannelServcice.getGroupDetail(channelId);
    }

    @PatchMapping ("/update/{channelId}")
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> updateMemo (@PathVariable("channelId") Long channelId, @RequestBody Map<String,String> memo) {
        return groupChannelServcice.updateMemo(channelId,memo.get("memo"));
    }

    @GetMapping("/userchannel")
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> getUserChannel (@AuthUser User user) {
        return groupChannelServcice.userJoinChannel(user);
    }


}
