package com.worq.worcation.domain.channel.domain;

import com.worq.worcation.domain.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "channel", schema = "worQ")
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "channel_id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Column(name = "channel_sido", nullable = false, length = 4)
    private String channelSido;

    @NotNull
    @Column(name = "channel_sigungu", nullable = false, length = 4)
    private String channelSigungu;

    @Size(max = 255)
    @NotNull
    @Column(name = "channel_title", nullable = false)
    private String channelTitle;

    @Size(max = 255)
    @Column(name = "channel_description")
    private String channelDescription;

    @Size(max = 255)
    @Column(name = "channel_memo")
    private String channelMemo;

    @Size(max = 4)
    @NotNull
    @Column(name = "channel_type", nullable = false, length = 4)
    private String channelType;

}