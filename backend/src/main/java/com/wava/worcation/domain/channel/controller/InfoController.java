package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.s3.service.S3ImageUpLoadService;
import com.wava.worcation.domain.channel.dto.info.FeedResponseDto;
import com.wava.worcation.domain.channel.dto.info.InfoResponseDto;
import com.wava.worcation.domain.channel.service.InfoService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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


    @GetMapping("/{feedId}")
    public ResponseEntity<?> viewFeed(@PathVariable("feedId") Long feedId, @AuthUser User user) {
        log.info("{}",feedId);
        try {
            FeedResponseDto feedResponseDto = infoService.viewFeed(feedId,user);
            return ResponseEntity.ok(feedResponseDto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.CREATED).body(e.getMessage());
        }
    }

    @GetMapping("/{feedId}/like")
    public ResponseEntity<?> likeAdd (@PathVariable("feedId") Long feedId, @AuthUser User user){
        try{
            infoService.likeAdd(feedId,user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }catch (Exception e){
            return ResponseEntity.status(400).body("잘못된 요청입니다.");
        }
    }

    @DeleteMapping("/{feedId}/dislike")
    public ResponseEntity<?> dislike (@PathVariable("feedId") Long feedId, @AuthUser User user){
        try{
            infoService.likeDistract(feedId,user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }catch (Exception e){
            return ResponseEntity.status(400).body("잘못된 요청입니다.");
        }
    }

    @PostMapping("/{feedId}/comment")
    public ResponseEntity<?> createComment(@PathVariable("feedId") Long feedId, @RequestParam("comment") String comment, @AuthUser User user) {
        try {
            Long userId = user.getId();

            Map<String, Object> commentMap = infoService.createComment(userId, feedId, comment);

            return ResponseEntity.ok(commentMap);
        }
        catch (Exception e){
            return ResponseEntity.status(400).body("400에러");
        }
    }


    @GetMapping("/search")
    public ResponseEntity<List<InfoResponseDto>> searchFeed(@RequestParam String keyword) {
        return null;
    }

}
