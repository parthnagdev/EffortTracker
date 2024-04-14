package com.efforttracker.app.models;

import lombok.Builder;
//import lombok.Value;
import lombok.Data;

@Builder
//@Value
@Data
public class User {
    private String name;
    private String username;
}
