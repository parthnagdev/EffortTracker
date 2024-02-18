package com.efforttracker.models;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class User {
    private String name;
    private String username;
}
