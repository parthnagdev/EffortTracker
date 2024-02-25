package com.efforttracker.models;

import lombok.Data;

@Data
public class AssignTaskRequest {
    private Task task;
    private User user;
}