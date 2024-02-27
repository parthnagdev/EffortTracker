package com.efforttracker.app.models.filter;

import com.efforttracker.app.models.State;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class Filter {
    private String username;
    private State state;
}
