package com.wava.worcation.common.openvidu.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.common.util.RedisUtil;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenViduService {

    private OpenVidu openvidu;
    private  RedisUtil redisUtil;
    @Autowired
    public OpenViduService(@Value("${openvidu.url}") String openviduUrl, @Value("${openvidu.secret}") String secret) {

        this.openvidu = new OpenVidu(openviduUrl,secret);
    }

    public ResponseEntity<ApiResponse<String>> createSession(String channelId) throws Exception{
//        SessionProperties properties = SessionProperties.Builder(channelId);
        Session session = openvidu.createSession();
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(session.getSessionId()));

    }

    public  ResponseEntity<ApiResponse<String>> generateToken(String sessionId) throws Exception {
        Session session = openvidu.getActiveSession(sessionId);
       String token= session.createConnection(new ConnectionProperties.Builder().build()).getToken();

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(token));

    }


}
