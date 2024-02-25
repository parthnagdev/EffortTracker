package com.efforttracker.models;

import lombok.Builder;
import lombok.Value;

@Builder
//@Value
@Data
public class User {
    private String name;
    private String username;
}
