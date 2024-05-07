package com.efforttracker.app.controller;


//import com.efforttracker.app.models.User;
import com.efforttracker.app.tracker.EffortTracker;
import com.efforttracker.specs.ListTasksRequest;
import com.efforttracker.specs.ListTasksResponse;
import com.efforttracker.specs.Task;
import com.efforttracker.specs.TaskApi;
//import com.efforttracker.specs.User;
//import com.efforttracker.specs.UserApi;

import jakarta.validation.OverridesAttribute.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
		if(task.getId() != null) {
			throw new IllegalArgumentException("Task ID must be null");
		}
		//System.out.println("Task: " + task);
		final Task createdTask = effortTracker.createTask(task);
		return ResponseEntity.of(Optional.of(createdTask));
	}

	
	@Override
	public ResponseEntity<Task> updateTask(Task task) {
		final Task updatedTask = effortTracker.updateTask(task);
		return ResponseEntity.of(Optional.of(updatedTask));
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
		if(listTasksRequest.getFilter() == null) {
			//System.out.println("Filter is null");
			response.setTaskList(effortTracker.listTasks(null, null, null, null));
			return ResponseEntity.of(Optional.of(response));
		}
		response.setTaskList(effortTracker.listTasks(
			listTasksRequest.getFilter().getIdFilter(),
			listTasksRequest.getFilter().getUserFilter(),
			listTasksRequest.getFilter().getProjectFilter(),
			listTasksRequest.getFilter().getStateFilter()
		));
		return ResponseEntity.of(Optional.of(response));
	}


	@GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("healthy");
    }
}