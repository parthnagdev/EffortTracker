package com.efforttracker.app.tracker;

//import com.efforttracker.app.models.AssignTaskRequest;
import com.efforttracker.app.storage.DbClient;
import com.efforttracker.specs.ListTasksRequest;
import com.efforttracker.specs.Project;
import com.efforttracker.specs.State;
//import com.efforttracker.app.models.User;
import com.efforttracker.specs.Task;
import com.efforttracker.specs.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
//import java.util.Random;
import java.util.UUID;

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
        //private List<User> users = new ArrayList<>();
        //private List<Task> tasks = new ArrayList<>();
        DbClient dbClient = new DbClient();

        public User addUser(final User user) {
            //String userId = UUID.randomUUID().toString();
            //user.setId(userId);
            //users.add(user);
            dbClient.addUser(user);
            //System.out.println("User: " + user);
            return dbClient.getUser(user.getUsername());
        }

        public Task createTask(Task task) {
            //String taskId = UUID.randomUUID().toString();
            //task.setId(taskId);
            //tasks.add(task);
            System.out.println("Task: " + task);
            task = dbClient.createTask(task);
            return dbClient.getTask(task.getId());
        }

        public void deleteTask(String id) {
            //String taskId = UUID.randomUUID().toString();
            //task.setId(taskId);
            //tasks.add(task);
            dbClient.deleteTask(id);
        }

        public Project createProject(Project project) {
            //System.out.println("creating project from EffortTracker");
            return dbClient.createProject(project);
        }

        public Project updateProject(Project project) {
            if (project.getId() == null) {
                throw new IllegalArgumentException("Project ID must not be null");
            }
            Project existingProject = dbClient.getProject(project.getId());

            if (existingProject != null) {
                if (project.getName() != null) {
                    existingProject.setName(project.getName());
                }
                if (project.getDescription() != null) {
                    existingProject.setDescription(project.getDescription());
                }
                if (project.getStartDate() != null) {
                    existingProject.setStartDate(project.getStartDate());
                }
                if (project.getEndDate() != null) {
                    existingProject.setEndDate(project.getEndDate());
                }
                dbClient.updateProject(existingProject);
                return existingProject;
            } else {
                throw new IllegalArgumentException("Project ID not found: " + project.getId());
            }
        }

        public List<Project> listProjects() {
            return dbClient.listProjects();
        }

        // public Task updateTask(final Task task) {
        //     int taskIndex = tasks.indexOf(task);
        //     if (taskIndex != -1) {
        //         tasks.set(taskIndex, task);
        //         //System.out.println("Task: " + task + " updated");
        //         return task;
        //     } else {
        //         //System.out.println("Task not found");
        //         return null;
        //     }
        // }

        // public Task updateTask(final Task updatedTask) {
        //     for (int i = 0; i < tasks.size(); i++) {
        //         Task existingTask = tasks.get(i);
        //         if (existingTask.getID() == updatedTask.getID()) {
        //             tasks.set(i, updatedTask);
        //             return updatedTask;
        //         }
        //     }
        //     return null;
        // }

        // public void assignTask(final Task task, final User user) {
        //     int taskIndex = tasks.indexOf(task);
        //     if (taskIndex != -1) {
        //         tasks.get(taskIndex).setUser(user);
        //         System.out.println("Task: " + task + " assigned to User: " + user);
        //     } else {
        //         System.out.println("Task not found");
        //     }
        // }

        // public void assignTask(final AssignTaskRequest assignTaskRequest) {
        // Task task = assignTaskRequest.getTask();
        // User user = assignTaskRequest.getUser();

        // int taskIndex = tasks.indexOf(task);
        // int userIndex = users.indexOf(user); // assuming 'users' is a list of all users

        // if (taskIndex != -1 && userIndex != -1) {
        //     tasks.get(taskIndex).setUsername(user.getUsername());
        //     System.out.println("Task: " + task + " assigned to User: " + user);
        // } else {
        //     if (taskIndex == -1) {
        //         System.out.println("Task not found");
        //     }
        //     if (userIndex == -1) {
        //         System.out.println("User not found");
        //     }
        // }
        // }

        // public void updateTask(final Task task) {
        //     int taskIndex = tasks.indexOf(task);
        //     if (taskIndex != -1) {
        //         tasks.set(taskIndex, task);
        //         System.out.println("Task: " + task + " updated");
        //     } else {
        //         System.out.println("Task not found");
        //     }
        // }


       public Task updateTask(final Task updatedTask) {
           if (updatedTask.getId() == null) {
               throw new IllegalArgumentException("Task ID must not be null");
           }
           Task existingTask = dbClient.getTask(updatedTask.getId());

           if (existingTask != null) {
               if (updatedTask.getTitle() != null) {
                   existingTask.setTitle(updatedTask.getTitle());
               }
               if (updatedTask.getDescription() != null) {
                   existingTask.setDescription(updatedTask.getDescription());
               }
               if (updatedTask.getEstimate() != null) {
                   existingTask.setEstimate(updatedTask.getEstimate());
               }
            //    if (updatedTask.getStartDate() != null) {
            //        existingTask.setStartDate(updatedTask.getStartDate());
            //    }
            //    if (updatedTask.getEndDate() != null) {
            //        existingTask.setEndDate(updatedTask.getEndDate());
            //    }
               if (updatedTask.getState() != null) {
                   existingTask.setState(updatedTask.getState());
               }
               if (updatedTask.getUsername() != null) {
                    String username = updatedTask.getUsername();
                    User user = dbClient.getUser(username);
                
                    if(user != null){
                        existingTask.setUsername(username);
                    }
                    else{
                        throw new IllegalArgumentException("User not found: " + updatedTask.getUsername());
                    }
                   //existingTask.setUsername(updatedTask.getUsername());
               }
                if (updatedTask.getProjectId() != null) {
                     String projectId = updatedTask.getProjectId();
                    Project project = dbClient.getProject(projectId);

                    if(project != null){
                        existingTask.setProjectId(projectId);
                    }
                    else{
                        throw new IllegalArgumentException("Project not found: " + updatedTask.getProjectId());
                    }
                }
               //System.out.println("Task: " + existingTask + " updated");
               dbClient.updateTask(existingTask);
               return existingTask;
           } else {
               throw new IllegalArgumentException("Task ID not found: " + updatedTask.getId());
           }
       }

        public List<Task> listTasks(List<String> taskIds, List<String> usernames, List<String> projectIds, State state, List<String> parentTaskIds) {
            return dbClient.listTasks(taskIds, usernames, projectIds, state, parentTaskIds);
            //return tasks;
        }

        public List<User> listUsers() {
            return dbClient.listUsers();
        }

//        public List<Task> getTasks(final Filter filter) {
//            // This is a simple implementation that only filters by state.
//            // You might need to add more complex filtering logic.
//            if (filter.getState() != null) {
//                return tasks.stream()
//                    .filter(task -> task.getState() == filter.getState())
//                    .collect(Collectors.toList());
//            } else {
//                return new ArrayList<>(tasks);
//            }
//        }
    }
//}
