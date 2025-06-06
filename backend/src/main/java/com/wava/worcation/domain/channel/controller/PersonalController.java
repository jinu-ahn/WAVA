package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.info.DescriptionRequestDto;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.wava.worcation.domain.channel.service.PersonalService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/channel/personal")
@RequiredArgsConstructor
@Slf4j
public class PersonalController {
    private final PersonalService personalService;

    

    @GetMapping("/{nickName}/info")
    public ResponseEntity<ApiResponse<PersonalResponseDto>> info(@PathVariable(value = "nickName") String nickName,@AuthUser User user) {
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(personalService.channelInfo(nickName,user)));
    }

    @GetMapping("/{nickName}/feed")
    public ResponseEntity<ApiResponse<?>> personalFeed(@PathVariable(value = "nickName") String nickName,
                                                     @RequestParam(value = "page",defaultValue = "0") int page,
                                                     @AuthUser User user) {
        try {
            // 페이지 네이션된 피드를 검색
            Page<FeedSortResponseDto> feedSortResponse = personalService.personalFeed(page, nickName, user);

            // 페이지 네이션 정보 계산
            boolean hasMore = feedSortResponse.hasNext();
            int totalPages = feedSortResponse.getTotalPages();

            // 응답 데이터 준비
            Map<String, Object> responseData = Map.of(
                    "hasMore", hasMore,
                    "currentPage", page,
                    "totalPages", totalPages,
                    "data", feedSortResponse.getContent()
            );

            // 성공적인 응답 반환
            return ResponseEntity.ok(ApiResponse.success(responseData));
        } catch (Exception e) {
            // 예외 처리 및 실패 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    @PatchMapping("/profile")
    public ResponseEntity<ApiResponse<?>> changeProfile(@RequestParam(value = "image") MultipartFile file, @AuthUser User user){
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(personalService.changeProfile(file,user)));
    }

    @PatchMapping("/description")
    public ResponseEntity<ApiResponse<?>> changeDescription(@RequestBody DescriptionRequestDto description, @AuthUser User user){
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(personalService.changeDescription(description,user)));
    }
}
