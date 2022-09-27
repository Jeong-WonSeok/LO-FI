package com.ssafy.lofi.util.scheduler;

import com.ssafy.lofi.controller.MainController;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@EnableAsync
@RequiredArgsConstructor
public class Scheduler {

    private final MainController mainController;

    @Scheduled(cron = "0 0 0 1/1 * ?")
    public void scheduleMissingPerson() throws ParseException {
        mainController.deleteMissingPerson();
        mainController.getLostPerson(10000487, "5ea509f2f6344251", 100);
    }

    @Scheduled(cron = "0 0 1 1/1 * ?")
    public void scheduleLostArticle() throws IOException {
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedNow = now.minusDays(1).format(formatter);
        String formattedBefore = now.minusMonths(1).format(formatter);
        mainController.getLostArticle(formattedNow, formattedBefore);
    }

    @Scheduled(cron = "0 0 2 1/1 * ?")
    public void scheduleFoundArticle() throws IOException {
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedNow = now.minusDays(1).format(formatter);
        mainController.getFoundArticle(formattedNow);
    }
}
