package com.wava.worcation.common.openvidu.controller;

import com.wava.worcation.common.openvidu.service.OpenViduService;
import com.wava.worcation.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/openvidu")
@RequiredArgsConstructor
public class OpenViduController {
    private final OpenViduService openViduService;

    /**
     * 새로운 OpenVidu 세션을 생성 함수
     *
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-08-07
     * @ 설명     : 새로운 OpenVidu 세션을 생성하고, 세션 ID를 포함한 응답을 반환합니다.
     *
     * @return 세션 ID를 포함하는 ApiResponse를 포함한 ResponseEntity 객체
     * @throws Exception 세션 생성 중 오류가 발생하면 발생
     */
    @PostMapping("/create/session")
    public ResponseEntity<ApiResponse<String>> createSession() throws Exception {
        log.debug("createSession");
        return openViduService.createSession();
    }

    /**
     * 주어진 OpenVidu 세션에 대해 새로운 토큰을 생성 함수
     *
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-08-07
     * @ 설명     : 주어진 세션 ID에 대한 새로운 토큰을 생성하고, 토큰을 포함한 응답을 반환합니다.
     *
     * @param  토큰을 생성할 OpenVidu 세션의 ID
     * @return 생성된 토큰을 포함하는 ApiResponse를 포함한 ResponseEntity 객체
     * @throws Exception 토큰 생성 중 오류가 발생하면 발생
     */

    @PostMapping("/create/token")
    public ResponseEntity<ApiResponse<String>> createToken(@RequestBody Map<String, String> request) throws Exception {
        String sessionId = request.get("session");
        // OpenVidu 토큰 생성 로직
       // 실제 토큰 생성 로직을 적용해야 합니다.
        return openViduService.generateToken(sessionId);
    }




}
