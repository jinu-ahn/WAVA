package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.s3.service.S3ImageUpLoadService;
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
    private final S3ImageUpLoadService s3ImageUpLoadService;

    

    @GetMapping("/{nickName}/info")
    public ResponseEntity<ApiResponse<PersonalResponseDto>> info(@PathVariable("nickName") String nickName,@AuthUser User user) {
        return personalService.ChannelInfo(nickName,user);
    }

    @GetMapping("/{nickName}/feed")
    public ResponseEntity<ApiResponse<?>> personalFeed(@PathVariable("nickName") String nickName,
                                                     @RequestParam(defaultValue = "0") int page,
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
    public ResponseEntity<ApiResponse<?>> changeProfile(@RequestParam("image") MultipartFile file, @AuthUser User user){
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(HttpStatus.BAD_REQUEST,"잘못된 요청"));
            }
            String imageUrl = s3ImageUpLoadService.uploadImage(file);
            return personalService.changeProfile(imageUrl,user);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,"에러 발생!"));
        }
    }

    @PatchMapping("/description")
    public ResponseEntity<ApiResponse<?>> changeDescription(@RequestBody DescriptionRequestDto description, @AuthUser User user){
        try {
            if (description.getDescription().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(HttpStatus.BAD_REQUEST,"잘못된 요청"));
            }
            return personalService.changeDescription(description.getDescription(),user);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,"에러 발생!"));
        }
    }
}
