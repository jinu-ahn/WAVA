package com.wava.worcation.domain.channel.service;
import com.wava.worcation.domain.channel.dto.info.DescriptionRequestDto;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.wava.worcation.domain.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface PersonalService {
    PersonalResponseDto channelInfo(String nickName,User user);

    Page<FeedSortResponseDto> personalFeed(int pages, String nickname, User user);

    String changeProfile(MultipartFile file, User user);
    String changeDescription(DescriptionRequestDto description, User user);
}
