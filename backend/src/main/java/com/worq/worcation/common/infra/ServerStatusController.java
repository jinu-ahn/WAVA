package com.worq.worcation.common.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 작성자   : 이병수
 * 작성날짜 : 2024-07-28
 * 설명    : 배포 PORT번호를 설정하기 위한 클래스
 */
@RestController
@RequestMapping("/infra")
public class ServerStatusController {

    @Value("${server.env}")
    private String env;

    @Value("${server.port}")
    private String port;

    @Value("${server.serverName}")
    private String serverName;

    @Value("${server.serverAddress}")
    private String serverAddress;

    /**
     * 서버 상태를 확인하는 메서드
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-07-28
     * @ 설명     : 서버의 현재 상태를 반환
     * @return 서버의 현재 상태 정보
     */
    @GetMapping("/hc")
    public ResponseEntity<?> healthCheck() {
        try {
            Map<String, String> currentServerData = new HashMap<>();
            currentServerData.put("serverName", serverName);
            currentServerData.put("serverAddress", serverAddress);
            currentServerData.put("serverPort", port);
            currentServerData.put("serverEnv", env);

            return ResponseEntity.ok().body(currentServerData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(createErrorResponse("서버에서 문제가 발생하였습니다. 다시 시도해주세요"));
        }
    }

    /**
     * 서버의 환경 변수를 반환하는 메서드
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-07-28
     * @return 서버의 환경 변수 (blue, green)
     */
    @GetMapping("/env")
    public ResponseEntity<?> getEnv() {
        try {
            return ResponseEntity.ok().body(Map.of("env", env));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(createErrorResponse("서버에서 문제가 발생하였습니다. 다시 시도해주세요"));
        }
    }

    /**
     * 현재 서버의 포트를 반환하는 메서드 .
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-07-28
     * @return 현재 서버의 포트 번호
     */
    @GetMapping("/port")
    public ResponseEntity<?> getCurrentPort() {
        try {
            return ResponseEntity.ok().body(Map.of("port", port));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(createErrorResponse("서버에서 문제가 발생하였습니다. 다시 시도해주세요"));
        }
    }

    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("msg", message);
        return errorResponse;
    }
}
