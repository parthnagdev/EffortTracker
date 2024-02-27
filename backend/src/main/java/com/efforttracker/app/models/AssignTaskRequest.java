package com.efforttracker.app.models;

import com.efforttracker.specs.Task;
import lombok.Data;

@Data
public class AssignTaskRequest {
    private Task task;
    private User user;
}