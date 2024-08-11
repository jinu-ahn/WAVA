package com.wava.worcation.domain.channel.domain;

import com.wava.worcation.domain.chat.domain.Chat;
import com.wava.worcation.domain.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "channel", schema = "wava")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
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
    @Column(name = "channel_sido", nullable = false)
    private String channelSido;


    @NotNull
    @Column(name = "channel_sigungu", nullable = false)
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

    @Column(name = "red")
    private int red;

    @Column(name = "green")
    private int green;

    @Column(name = "blue")
    private int blue;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.REMOVE)
    private List<Chat> chat;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ChannelUser> channelUsers = new HashSet<>();

    @OneToMany(mappedBy = "channel", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MapPin> pins;


    public void memoUpdate(String memo) {
        this.channelMemo = memo;
    }
    public void updateDescription(String description) {
        this.channelDescription = description;
    }

}