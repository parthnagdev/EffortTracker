package com.efforttracker.controller;

import com.efforttracker.models.User;
import com.efforttracker.tracker.EffortTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for Effort Tracker API.
 */
@RestController
public class EffortTrackingController {

	@Autowired
	private EffortTracker effortTracker;

	@PostMapping("/addUser")
	public String addUser(@RequestBody final User user) {
		effortTracker.addUser(user);
		return "Added user: " + user;
	}
}