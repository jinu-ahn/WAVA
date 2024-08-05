package com.worq.worcation.domain.channel.controller;

import com.worq.worcation.common.s3.service.S3ImageUpLoadService;
import com.worq.worcation.domain.channel.dto.info.FeedResponseDto;
import com.worq.worcation.domain.channel.dto.info.InfoResponseDto;
import com.worq.worcation.domain.channel.service.InfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/channel/feed")
@RequiredArgsConstructor
@Slf4j
public class InfoController{
    public final InfoService infoService;
    public final S3ImageUpLoadService s3ImageUpLoadService;

    @PostMapping("/create")
    public ResponseEntity<?> createInfo(
            @RequestParam("image") List<MultipartFile> images,
            @RequestParam("content")String content,
            @RequestParam("sido") String sido,
            @RequestParam("sigungu") String sigungu,
            @AuthenticationPrincipal UserDetails userdetails) throws IOException {


        List<String> imgUrls = new ArrayList<>();
        try {
            for(MultipartFile image : images){
                imgUrls.add(s3ImageUpLoadService.uploadImage(image));
            }

            infoService.CreateFeed(content,sido,sigungu,imgUrls, userdetails);

            return ResponseEntity.ok().build();
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(400).body("잘못된 요청입니다.");
        }
    }

    @GetMapping("/{feedId}")
    public ResponseEntity<?> viewFeed(@PathVariable("feedId") Long feedId, @RequestParam Long userId) {
        try {
            FeedResponseDto feedResponseDto = infoService.viewFeed(feedId,userId);
            return ResponseEntity.ok(feedResponseDto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.CREATED).body("잘못된 요청");
        }
    }

    @GetMapping("/{feedId}/like")
    public ResponseEntity<?> likeAdd (@PathVariable("feedId") Long feedId, @RequestParam Long userId){
        try{
            infoService.likeAdd(feedId,userId);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(400).body("잘못된 요청입니다.");
        }
    }

    @DeleteMapping("/{feedId}/dislike")
    public ResponseEntity<?> dislike (@PathVariable("feedId") Long feedId, @RequestParam Long userId){
        try{
            infoService.likeDistract(feedId,userId);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(400).body("잘못된 요청입니다.");
        }
    }

    @PostMapping("/{feedId}/comment")
    public ResponseEntity<?> createComment(@PathVariable("feedId") String feedId, @RequestBody Map<String, String> comment) {
        try {
            Long userid = Long.valueOf(comment.get("userid"));
            Long feedid = Long.valueOf(feedId);
            String commentContext = comment.get("Comment");

            Map<String, Object> commentMap = infoService.createComment(userid, feedid, commentContext);

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
