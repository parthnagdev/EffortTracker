// package com.efforttracker.models;

// import lombok.Builder;
// import lombok.Value;

// @Builder
// @Value
// public class Task {
//     private String name;
//     private String description;
//     private int effort; // in number of days.
//     private String startDate;
//     private String endDate;
//     private State state;
// }
package com.efforttracker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class Task {
    String name;
    String description;
    Integer effort;
    LocalDate startDate;
    LocalDate endDate;
    State state;
    User user;
    private static int lastAssignedID = 0;
    private int taskID;

    public Task() {
        this.taskID = ++lastAssignedID;
    }
}