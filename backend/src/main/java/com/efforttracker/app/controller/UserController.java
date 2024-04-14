package com.efforttracker.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

//import com.efforttracker.app.models.User;
import com.efforttracker.specs.User;
import com.efforttracker.specs.ListUsersRequest;
import com.efforttracker.specs.ListUsersResponse;
import com.efforttracker.app.tracker.EffortTracker;
import com.efforttracker.specs.UserApi;

import jakarta.validation.OverridesAttribute.List;

import java.util.Optional;

@RestController
public class UserController implements UserApi {

    @Autowired
	private EffortTracker effortTracker;

    @Override
	public ResponseEntity<User> createUser(User user) {
        if(user.getId() != null) {
            throw new IllegalArgumentException("User ID must be null");
        }
		final User createdUser = effortTracker.addUser(user);
		return ResponseEntity.of(Optional.of(createdUser));
	}

    @Override
	public ResponseEntity<ListUsersResponse> listUsers(ListUsersRequest listUsersRequest) {
		final ListUsersResponse response = new ListUsersResponse();
		response.setUserList(effortTracker.listUsers());
		return ResponseEntity.of(Optional.of(response));
	}
    
}
