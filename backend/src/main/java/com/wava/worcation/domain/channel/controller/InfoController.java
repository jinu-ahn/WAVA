package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.s3.service.S3ImageUpLoadService;
import com.wava.worcation.domain.channel.dto.info.CommentRequestDto;
import com.wava.worcation.domain.channel.dto.info.FeedResponseDto;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.FeedRepository;
import com.wava.worcation.domain.channel.service.InfoService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/channel/feed")
@RequiredArgsConstructor
@Slf4j
public class InfoController{
    public final InfoService infoService;
    @Autowired
    private S3ImageUpLoadService s3ImageUpLoadService;
    @Autowired
    private FeedRepository feedRepository;
    @Autowired
    private ChannelRepository channelRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createInfo(
            @RequestParam("image") List<MultipartFile> images,
            @RequestParam("content") String content,
            @RequestParam("sido") String sido,
            @RequestParam("sigungu") String sigungu,
            @AuthUser User user) throws Exception {

        List<String> imgUrls = new ArrayList<>();

        try {
            if (images.size() < 10 && !images.isEmpty()) {
                for (MultipartFile image : images) {
                    imgUrls.add(s3ImageUpLoadService.uploadImage(image));
                }
            } else {
                // 이미지가 없을 때 에러 반환
                return ResponseEntity.status(400).body("이미지가 필요합니다.");
            }

            infoService.CreateFeed(content, sido, sigungu, imgUrls, user);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(500).body("잘못된 요청입니다.");
        }
    }

    @DeleteMapping("{feedId}/delete")
    public ResponseEntity<?> deleteFeed(@PathVariable("feedId") Long feedId, @AuthUser User user) throws Exception {
        try {
            infoService.deleteFeed(feedId,user);
            return ResponseEntity.ok().body("성공적으로 삭제완료");
        }
        catch (CustomException e){
            return ResponseEntity.status(e.getErrorCode().getStatus()).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{feedId}")
    public ResponseEntity<?> viewFeed(@PathVariable("feedId") Long feedId, @AuthUser User user) {
        log.info("{}",feedId);
        try {
            FeedResponseDto feedResponseDto = infoService.viewFeed(feedId,user);
            if (feedResponseDto != null) {
            return ResponseEntity.ok(feedResponseDto);
            }
            else{
                return ResponseEntity.status(404).build();
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.CREATED).body(e.getMessage());
        }
    }

    @PostMapping("/{feedId}/like")
    public ResponseEntity<?> likeAdd (@PathVariable("feedId") Long feedId, @AuthUser User user){
        try{
            infoService.likeAdd(feedId,user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{feedId}/dislike")
    public ResponseEntity<?> dislike (@PathVariable("feedId") Long feedId, @AuthUser User user){
        try{
            infoService.likeDistract(feedId,user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/{feedId}/comment")
    public ResponseEntity<?> createComment(@PathVariable("feedId") Long feedId, @RequestBody CommentRequestDto comment, @AuthUser User user) {
        try {
            Long userId = user.getId();

            Map<String, Object> commentMap = infoService.createComment(userId, feedId, comment.getComment());

            return ResponseEntity.ok(commentMap);
        }
        catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }


    @GetMapping("/search")
    public ResponseEntity<ApiResponse<?>> searchFeed(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam String content,
                                                     @AuthUser User user) {
        try {
            // 페이지 네이션된 피드를 검색
            Page<FeedSortResponseDto> feedSortResponse = infoService.searchfeed(page, content, user);

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


}
