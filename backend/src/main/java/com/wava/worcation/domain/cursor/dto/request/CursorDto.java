package com.wava.worcation.domain.cursor.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CursorDto {
    private Long channelId;
    private String nickName;
    private double x;
    private double y;
}
