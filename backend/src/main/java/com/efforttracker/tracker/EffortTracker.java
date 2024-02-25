package com.efforttracker.tracker;

import com.efforttracker.models.Task;
import com.efforttracker.models.User;
import com.efforttracker.models.filter.Filter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Requirements:
 * 1. Create a Task.
 * 2. Assign task to a User.
 * 3. Update:
 *     a. Set estimates on a task.
 *     b. Mention start date in a task. (Calculate end date).
 * 4. A task can have 3 states: open, in-progress, complete.
 * 5. Search:
 *      a. Show all tasks under a user.
 *      b. Users can filter the tasks according to task state.
 * 6. Add user
 *
 * Additional feature:
 * 1. Create tasks under a story.
 * 2. A task can be a child of another task.
 * 3. Parent task can display effort by adding all the efforts of child tasks.
 * 4. Generate Report.
 */


// @Component
// public class EffortTracker {
//     private User user;
//     private Task task;
//     private Filter filter;
//     private List<Task> tasks;
//     private String taskId;
//     private String userId;
//     private String message;
//     private String taskState;
//     private String story;
//     private String effort;
//     private List<User> users;

//     public void addUser(final User user) {
//         this.user = user;
//         System.out.println("User: " + user);
//     }

//     public void createTask(final Task task) {
//         this.task = task;
//         System.out.println("Task: " + task);
//         tasks.add(task);


//     }

//     public void assignTask(final Task task, final User user) {

//     }

//     public void updateTask(final Task task, final User user) {

//     }

//     public List<Task> getTasks(final Filter filter) {
//         return null;
//     }


    @Component
    public class EffortTracker {
        private List<User> users = new ArrayList<>();
        private List<Task> tasks = new ArrayList<>();

        public void addUser(final User user) {
            users.add(user);
            System.out.println("User: " + user);
        }

        public void createTask(final Task task) {
            tasks.add(task);
            System.out.println("Task: " + task);
        }

        public void assignTask(final Task task, final User user) {
            int taskIndex = tasks.indexOf(task);
            if (taskIndex != -1) {
                tasks.get(taskIndex).setUser(user);
                System.out.println("Task: " + task + " assigned to User: " + user);
            } else {
                System.out.println("Task not found");
            }
        }

        // public void updateTask(final Task task) {
        //     int taskIndex = tasks.indexOf(task);
        //     if (taskIndex != -1) {
        //         tasks.set(taskIndex, task);
        //         System.out.println("Task: " + task + " updated");
        //     } else {
        //         System.out.println("Task not found");
        //     }
        // }


                        public void updateTask(final Task updatedTask) {
                            int taskIndex = tasks.indexOf(updatedTask);
                            if (taskIndex != -1) {
                                Task existingTask = tasks.get(taskIndex);
                                if (updatedTask.getName() != null) {
                                    existingTask.setName(updatedTask.getName());
                                }
                                if (updatedTask.getDescription() != null) {
                                    existingTask.setDescription(updatedTask.getDescription());
                                }
                                if (updatedTask.getEffort() != null) {
                                    existingTask.setEffort(updatedTask.getEffort());
                                }
                                if (updatedTask.getStartDate() != null) {
                                    existingTask.setStartDate(updatedTask.getStartDate());
                                }
                                if (updatedTask.getEndDate() != null) {
                                    existingTask.setEndDate(updatedTask.getEndDate());
                                }
                                if (updatedTask.getState() != null) {
                                    existingTask.setState(updatedTask.getState());
                                }
                                System.out.println("Task: " + existingTask + " updated");
                            } else {
                                System.out.println("Task not found");
                            }
                        }

        public List<Task> getTasks(final Filter filter) {
            // This is a simple implementation that only filters by state.
            // You might need to add more complex filtering logic.
            if (filter.getState() != null) {
                return tasks.stream()
                    .filter(task -> task.getState() == filter.getState())
                    .collect(Collectors.toList());
            } else {
                return new ArrayList<>(tasks);
            }
        }
    }
//}
