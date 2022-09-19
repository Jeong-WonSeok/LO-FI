package com.ssafy.lofi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LofiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LofiApplication.class, args);
	}

}
