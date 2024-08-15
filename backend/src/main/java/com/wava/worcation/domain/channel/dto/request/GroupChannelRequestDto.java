package com.wava.worcation.domain.channel.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GroupChannelRequestDto {
    private String channelSido;

    private String channelSigungu;

    @NotBlank
    @Pattern(regexp= "^.{1,255}$", message="제목은 1글자 이상 255자 이하로 작성가능합니다.")
    private String channelTitle;

    @NotBlank
    @Pattern(regexp= "^.{1,255}$", message="내용은 1글자 이상 255자 이하로 작성가능합니다.")
    private String channelDescription;
}