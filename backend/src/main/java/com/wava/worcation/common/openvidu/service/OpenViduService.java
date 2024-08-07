package com.wava.worcation.common.openvidu.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.common.util.RedisUtil;
import io.openvidu.java.client.OpenVidu;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OpenViduService {

    private OpenVidu openvidu;
    private  RedisUtil redisUtil;
    @Autowired
    public OpenViduService(@Value("${openvidu.url}") String openviduUrl, @Value("${openvidu.secret}") String secret) {

        this.openvidu = new OpenVidu(openviduUrl,secret);
    }

    public ResponseEntity<ApiResponse<String>> createSession() throws Exception{
        String sessionId = openvidu.createSession().getSessionId();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(sessionId));

    }

    public  ResponseEntity<ApiResponse<String>> generateToken(String sessionId) throws Exception {
        String token = openvidu.getActiveSession(sessionId).createConnection().getToken();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(token));

    }


}
