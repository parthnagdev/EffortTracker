package com.efforttracker.controller;

import com.efforttracker.models.AssignTaskRequest;
import com.efforttracker.models.Task;
import com.efforttracker.models.User;
import com.efforttracker.tracker.EffortTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import com.efforttracker.models.filter.Filter;

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

	@PostMapping("/createTask")
	public String createTask(@RequestBody final Task task) {
		effortTracker.createTask(task);
		return "Added task: " + task;
	}
	//code by chatGPT below
	// @PostMapping("/assignTask")
	// public String assignTask(@RequestBody Task task, @RequestBody User user) {
	// 	effortTracker.assignTask(task, user);
	// 	return "Assigned task: " + task + " to user: " + user;
	// }

	@PostMapping("/assignTask")
	public String assignTask(@RequestBody AssignTaskRequest assignTaskRequest) {
    effortTracker.assignTask(assignTaskRequest);
    Task task = assignTaskRequest.getTask();
    User user = assignTaskRequest.getUser();
    return "Assigned task: " + task + " to user: " + user;
	}

	// @PostMapping("/assignTask")
	// public String assignTask(@RequestParam String taskId, @RequestParam String userId) {
	// 	// Call the appropriate method on effortTracker
	// 	// Return a confirmation message
	// 	return null;
	// }
	@PutMapping("/updateTask")
	public String updateTask(@RequestBody Task task) {
		effortTracker.updateTask(task);
		return "Task updated: " + task;
	}
	// @PutMapping("/updateTask")
	// public String updateTask(@RequestBody Task task) {
	// 	// Call the appropriate method on effortTracker
	// 	// Return a confirmation message
	// 	return null;
	// }
	@GetMapping("/getTasks")
	public List<Task> getTasks(@ModelAttribute Filter filter) {
		return effortTracker.getTasks(filter);
		// Call the appropriate method on effortTracker
		// Return the list of tasks
		// return null;
	}

	@GetMapping("/listTasks")
	public List<Task> listTasks() {
		return effortTracker.listTasks();
	}
}