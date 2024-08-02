package com.worq.worcation.domain.channel.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/channel/personal")
@RequiredArgsConstructor
@Slf4j
public class PersonalController {
    @GetMapping("/{userId}/info")
    public String info(@PathVariable("userId") String userId) {
        return null;
    }

    @GetMapping("/{userId}/feed")
    public String feed(@PathVariable("userId") String userId) {
        return null;
    }
}
