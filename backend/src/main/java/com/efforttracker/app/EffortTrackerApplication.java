package com.efforttracker.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EffortTrackerApplication {

    public static void main(String[] args) {
        // Starts the spring web server.
        SpringApplication.run(EffortTrackerApplication.class, args);
    }
}
