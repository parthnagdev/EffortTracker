package com.efforttracker.app.controller;


import com.efforttracker.app.tracker.EffortTracker;
import com.efforttracker.specs.ListTasksRequest;
import com.efforttracker.specs.ListTasksResponse;
import com.efforttracker.specs.Task;
import com.efforttracker.specs.TaskApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * Controller for Effort Tracker API.
 */
@RestController
public class EffortTrackingController implements TaskApi {

	@Autowired
	private EffortTracker effortTracker;

//	@PostMapping("/addUser")
//	public String addUser(@RequestBody final User user) {
//		effortTracker.addUser(user);
//		return "Added user: " + user;
//	}

	@Override
	public ResponseEntity<Task> createTask(Task task) {
		final Task createdTask = effortTracker.createTask(task);
		return ResponseEntity.of(Optional.of(createdTask));
	}
	//code by chatGPT below
	// @PostMapping("/assignTask")
	// public String assignTask(@RequestBody Task task, @RequestBody User user) {
	// 	effortTracker.assignTask(task, user);
	// 	return "Assigned task: " + task + " to user: " + user;
	// }

//	@PostMapping("/assignTask")
//	public String assignTask(@RequestBody AssignTaskRequest assignTaskRequest) {
//    effortTracker.assignTask(assignTaskRequest);
//    Task task = assignTaskRequest.getTask();
//    User user = assignTaskRequest.getUser();
//    return "Assigned task: " + task + " to user: " + user;
//	}

	// @PostMapping("/assignTask")
	// public String assignTask(@RequestParam String taskId, @RequestParam String userId) {
	// 	// Call the appropriate method on effortTracker
	// 	// Return a confirmation message
	// 	return null;
	// }
//	@PutMapping("/updateTask")
//	public String updateTask(@RequestBody Task task) {
//		effortTracker.updateTask(task);
//		return "Task updated: " + task;
//	}
	// @PutMapping("/updateTask")
	// public String updateTask(@RequestBody Task task) {
	// 	// Call the appropriate method on effortTracker
	// 	// Return a confirmation message
	// 	return null;
	// }
//	@RequestMapping(value = "/task/list", method = RequestMethod.POST, consumes = "application/json")
//	public ResponseEntity<List<Task>> getTasks(@ModelAttribute Filter filter) {
//		// Call the appropriate method on effortTracker
//		// Return the list of tasks
//		// return null;
//	}

	@Override
	public ResponseEntity<ListTasksResponse> listTasks(ListTasksRequest listTasksRequest) {
		final ListTasksResponse response = new ListTasksResponse();
		response.setTaskList(effortTracker.listTasks());
		return ResponseEntity.of(Optional.of(response));
	}
}