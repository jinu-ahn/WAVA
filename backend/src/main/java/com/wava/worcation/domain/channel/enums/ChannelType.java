package com.wava.worcation.domain.channel.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ChannelType {
    GROUP("C001"), PERSONAL("C002");

    private String code;
}
