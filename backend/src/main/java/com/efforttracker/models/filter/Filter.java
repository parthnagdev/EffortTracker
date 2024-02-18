package com.efforttracker.models.filter;

import com.efforttracker.models.State;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class Filter {
    private String username;
    private State state;
}
