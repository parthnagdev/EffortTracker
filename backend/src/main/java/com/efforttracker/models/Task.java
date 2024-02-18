package com.efforttracker.models;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class Task {
    private String name;
    private String description;
    private int effort; // in number of days.
    private String startDate;
    private String endDate;
    private State state;
}
