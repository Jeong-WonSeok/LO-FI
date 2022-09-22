package com.ssafy.lofi.util.scheduler;

import com.ssafy.lofi.controller.MainController;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableAsync
@RequiredArgsConstructor
public class Scheduler {

    private final MainController mainController;

    @Scheduled(cron = "0 0 1 1/1 * ?")
    public void scheduleMissingPerson() throws ParseException {
        mainController.deleteMissingPerson();
        mainController.getLostPerson(10000487, "5ea509f2f6344251", 100);
    }
}
