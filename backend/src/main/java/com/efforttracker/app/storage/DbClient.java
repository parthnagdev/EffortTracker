package com.efforttracker.app.storage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.efforttracker.specs.Project;
import com.efforttracker.specs.State;
import com.efforttracker.specs.Task;
import com.efforttracker.specs.User;

//import com.efforttracker.app.models.User;

/**
 * Scenario 1: Failover happens when autocommit is set to true - Catch SQLException with code 08S02.
 */
public class DbClient {
    
   private static final String CONNECTION_STRING = "jdbc:mysql://database-1.cp6o00skgzb5.ap-south-1.rds.amazonaws.com:3306/EffortTrackerSchema";
   private static final String USERNAME = "admin";
   private static final String PASSWORD = "12345678";
   private static final int MAX_RETRIES = 5;

   private Connection conn;

//    public static void main(String args[]) {
//       final DbClient dbClient = new DbClient();
//       dbClient.printTasks();
//    }

   public DbClient() {
      conn = getConnection();
   }

//    public void printTasks() {
//     getConnection();
//       try {
//          String select_sql = "SELECT * FROM tasks";
//          try (ResultSet rs = betterExecuteQuery(select_sql)) {
//             while (rs.next()) {
//                System.out.println(rs.getString("title"));
//             }
//          }
//       } catch (final SQLException ex) {
//          throw new RuntimeException("Unable to retrieve users data.", ex);
//       }
//    }

    public Task getTask(final String taskId) {
    getConnection();
        try {
            String select_sql = "SELECT * FROM tasks WHERE id = '" + taskId + "'";
            try (ResultSet rs = betterExecuteQuery(select_sql)) {
                Task task = new Task();
                while (rs.next()) {
                    task.setId(rs.getString("id"));
                    task.setTitle(rs.getString("title"));
                    task.setDescription(rs.getString("description"));
                    task.setEstimate(rs.getLong("estimate"));
                    task.setUsername(rs.getString("username"));
                    task.setState(State.valueOf(rs.getString("state")));
                    task.setParentId(rs.getString("parentId"));
                    task.setProjectId(rs.getString("projectId"));
                    return task;
                }
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve task data.", ex);
        }

        return null;
    }

    public User getUser(final String username) {
    getConnection();
        try {
            String select_sql = "SELECT * FROM users WHERE username = '" + username + "'";
            try (ResultSet rs = betterExecuteQuery(select_sql)) {
                User user = new User();
                while (rs.next()) {
                    user.setId(rs.getString("id"));
                    user.setName(rs.getString("name"));
                    user.setUsername(rs.getString("username"));
                    return user;
                }
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve user data.", ex);
        }

        return null;
    }

   public User addUser(final User user) {
    getConnection();
      try {
         String insert_sql = "INSERT INTO `EffortTrackerSchema`.`users`(`name`,`username`) VALUES('" + user.getName() + "','" + user.getUsername() + "')";
         try (Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(insert_sql);
         }
      } catch (final SQLException ex) {
         throw new RuntimeException("Unable to add user.", ex);
      }

      return user;  //why are we returning user, i think we should return null
   }

   public Task createTask(final Task task) {
    getConnection();
      try {
        String insert_sql = "INSERT INTO tasks (title, description, estimate, username, state, parentId, projectId) VALUES ('"
        + task.getTitle() + "', '" 
        + task.getDescription() + "' , '" 
        + task.getEstimate() + "', '" 
        + task.getUsername() + "', '" 
        + task.getState() + "', '"
        + task.getParentId() + "', '"
        + task.getProjectId() + "')";
     try (PreparedStatement stmt = conn.prepareStatement(insert_sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.executeUpdate();

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    task.setId(generatedKeys.getString(1));
                } else {
                    throw new SQLException("Creating task failed, no ID obtained.");
                } 
            }
         }
      } catch (final SQLException ex) {
         throw new RuntimeException("Unable to create task.", ex);
      }

      return task; //why are we returning task, i think we should return null
   }

   public Task updateTask(final Task updatedTask) {
    getConnection();
      try {
         String update_sql = "UPDATE tasks SET title = '" + updatedTask.getTitle() + "', description = '" + updatedTask.getDescription() + "', estimate = '" + updatedTask.getEstimate() + "', username = '" + updatedTask.getUsername() + "', state = '" + updatedTask.getState() + "', projectId = '" + updatedTask.getProjectId() + "', parentId = '" + updatedTask.getParentId() + "' WHERE id = '" + updatedTask.getId() + "'";
         try (Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(update_sql);
         }
      } catch (final SQLException ex) {
         throw new RuntimeException("Unable to update task.", ex);
      }

      return updatedTask;
    }

    // public List<Task> listTasks(List<String> taskIds, List<String> usernames, List<String> projectIds, State state) {
    // getConnection();
    // if((taskIds == null || taskIds.isEmpty()) && (usernames == null || usernames.isEmpty()) && (projectIds == null || projectIds.isEmpty()) && state == null){
    //     System.out.println("taskIds is null or empty");
    //     try {
    //         String select_sql = "SELECT * FROM tasks";
    //         try (ResultSet rs = betterExecuteQuery(select_sql   )) {
    //             List<Task> tasks = new ArrayList<>();
    //             while (rs.next()) {
    //                 Task task = new Task();
    //                 task.setId(rs.getString("id"));
    //                 task.setTitle(rs.getString("title"));
    //                 task.setDescription(rs.getString("description"));
    //                 task.setEstimate(rs.getLong("estimate"));
    //                 task.setUsername(rs.getString("username"));
    //                 task.setState(State.valueOf(rs.getString("state")));
    //                 task.setParentId(rs.getString("parentId"));
    //                 task.setProjectId(rs.getString("projectId"));
    //                 tasks.add(task);
    //             }
    //             return tasks;
    //         }
    //     } catch (final SQLException ex) {
    //         throw new RuntimeException("Unable to retrieve tasks data.", ex);
    //     }
    // }
    // List<Task> filteredTasks = new ArrayList<>();
    // if(taskIds != null && !taskIds.isEmpty()){
    //     for(String taskId : taskIds){
    //         Task task = getTask(taskId);
    //         if(task != null){
    //             filteredTasks.add(task);
    //         }
    //     }
    // }
    // if(usernames != null && !usernames.isEmpty()){
    //     for(String username : usernames){
    //         try {
    //             String select_sql = "SELECT * FROM tasks WHERE username = '" + username + "'";
    //             try (ResultSet rs = betterExecuteQuery(select_sql)) {
    //                 while (rs.next()) {
    //                     Task task = new Task();
    //                     task.setId(rs.getString("id"));
    //                     task.setTitle(rs.getString("title"));
    //                     task.setDescription(rs.getString("description"));
    //                     task.setEstimate(rs.getLong("estimate"));
    //                     task.setUsername(rs.getString("username"));
    //                     task.setState(State.valueOf(rs.getString("state")));
    //                     task.setParentId(rs.getString("parentId"));
    //                     task.setProjectId(rs.getString("projectId"));
    //                     filteredTasks.add(task);
    //                 }
    //             }
    //         } catch (final SQLException ex) {
    //             throw new RuntimeException("Unable to retrieve tasks data.", ex);
    //         }
    //     }
    // }
    // if(projectIds != null && !projectIds.isEmpty()){
    //     for(String projectId : projectIds){
    //         try {
    //             String select_sql = "SELECT * FROM tasks WHERE projectId = '" + projectId + "'";
    //             try (ResultSet rs = betterExecuteQuery(select_sql)) {
    //                 while (rs.next()) {
    //                     Task task = new Task();
    //                     task.setId(rs.getString("id"));
    //                     task.setTitle(rs.getString("title"));
    //                     task.setDescription(rs.getString("description"));
    //                     task.setEstimate(rs.getLong("estimate"));
    //                     task.setUsername(rs.getString("username"));
    //                     task.setState(State.valueOf(rs.getString("state")));
    //                     task.setParentId(rs.getString("parentId"));
    //                     task.setProjectId(rs.getString("projectId"));
    //                     filteredTasks.add(task);
    //                 }
    //             }
    //         } catch (final SQLException ex) {
    //             throw new RuntimeException("Unable to retrieve tasks data.", ex);
    //         }
    //     }
    // }
    // if(state != null){
    //     try {
    //         String select_sql = "SELECT * FROM tasks WHERE state = '" + state + "'";
    //         try (ResultSet rs = betterExecuteQuery(select_sql)) {
    //             while (rs.next()) {
    //                 Task task = new Task();
    //                 task.setId(rs.getString("id"));
    //                 task.setTitle(rs.getString("title"));
    //                 task.setDescription(rs.getString("description"));
    //                 task.setEstimate(rs.getLong("estimate"));
    //                 task.setUsername(rs.getString("username"));
    //                 task.setState(State.valueOf(rs.getString("state")));
    //                 task.setParentId(rs.getString("parentId"));
    //                 task.setProjectId(rs.getString("projectId"));
    //                 filteredTasks.add(task);
    //             }
    //         }
    //     } catch (final SQLException ex) {
    //         throw new RuntimeException("Unable to retrieve tasks data.", ex);
    //     }
    // }

    // return filteredTasks;

    // }

    public List<Task> listTasks(List<String> taskIds, List<String> usernames, List<String> projectIds, State state, List<String> parentTaskIds) {
        getConnection();

        final String select_sql_query;

        if ((taskIds == null || taskIds.isEmpty())
         && (usernames == null || usernames.isEmpty())
        && (projectIds == null || projectIds.isEmpty())
        && state == null
        && (parentTaskIds == null || parentTaskIds.isEmpty())) {
            select_sql_query = "SELECT * FROM tasks";
        } else {

            StringBuilder select_sql = new StringBuilder("SELECT * FROM tasks WHERE ");

            if (taskIds != null && !taskIds.isEmpty()) {
                String taskIdsStr = String.join("','", taskIds);
                select_sql.append("id IN ('").append(taskIdsStr).append("') AND ");
            }

            if (usernames != null && !usernames.isEmpty()) {
                String usernamesStr = String.join("','", usernames);
                select_sql.append("username IN ('").append(usernamesStr).append("') AND ");
            }

            if (projectIds != null && !projectIds.isEmpty()) {
                String projectIdsStr = String.join("','", projectIds);
                select_sql.append("projectId IN ('").append(projectIdsStr).append("') AND ");
            }

            if (state != null) {
                select_sql.append("state = '").append(state).append("' AND ");
            }

            if (parentTaskIds != null && !parentTaskIds.isEmpty()) {
                String parentTaskIdsStr = String.join("','", parentTaskIds);
                select_sql.append("parentId IN ('").append(parentTaskIdsStr).append("') AND ");
            }

            // Remove the last " AND " from the query
            if (select_sql.toString().endsWith(" AND ")) {
                select_sql.setLength(select_sql.length() - 5);
            }

            select_sql_query = select_sql.toString();
        }

        final List<Task> tasks = new ArrayList<>();
    
        try (ResultSet rs = betterExecuteQuery(select_sql_query)) {
            while (rs.next()) {
                Task task = new Task();
                task.setId(rs.getString("id"));
                task.setTitle(rs.getString("title"));
                task.setDescription(rs.getString("description"));
                task.setEstimate(rs.getLong("estimate"));
                task.setUsername(rs.getString("username"));
                task.setState(State.valueOf(rs.getString("state")));
                task.setParentId(rs.getString("parentId"));
                task.setProjectId(rs.getString("projectId"));
                tasks.add(task);
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve tasks data.", ex);
        }
    
        return tasks;
    }


    public List<User> listUsers() {
    getConnection();
        try {
            String select_sql = "SELECT * FROM users";
            try (ResultSet rs = betterExecuteQuery(select_sql)) {
                List<User> users = new ArrayList<>();
                while (rs.next()) {
                    User user = new User();
                    user.setId(rs.getString("id"));
                    user.setName(rs.getString("name"));
                    user.setUsername(rs.getString("username"));
                    users.add(user);
                }
                return users;
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve users data.", ex);
        }

        //return null;
    }

    public Project createProject(final Project project) {
        getConnection();
        try {
            //System.out.println("Creating project from DbClient.java");
            String insert_sql = "INSERT INTO projects (name, description, startDate, endDate) VALUES (?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(insert_sql)) {
                stmt.setString(1, project.getName());
                stmt.setString(2, project.getDescription());
                stmt.setDate(3, java.sql.Date.valueOf(project.getStartDate()));
                stmt.setDate(4, java.sql.Date.valueOf(project.getEndDate()));
                stmt.executeUpdate();
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to create project.", ex);
        }
    
        return project;
    }

    public Project getProject(final String projectId) {
        getConnection();
        try {
            String select_sql = "SELECT * FROM projects WHERE id = '" + projectId + "'";
            try (ResultSet rs = betterExecuteQuery(select_sql)) {
                Project project = new Project();
                while (rs.next()) {
                    project.setId(rs.getString("id"));
                    project.setName(rs.getString("name"));
                    project.setDescription(rs.getString("description"));
                    project.setStartDate(rs.getDate("startDate").toLocalDate());
                    project.setEndDate(rs.getDate("endDate").toLocalDate());
                    return project;
                }
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve project data.", ex);
        }
    
        return null;
    }

    public List<Project> listProjects() {
        getConnection();
        try {
            String select_sql = "SELECT * FROM projects";
            try (ResultSet rs = betterExecuteQuery(select_sql)) {
                List<Project> projects = new ArrayList<>();
                while (rs.next()) {
                    Project project = new Project();
                    project.setId(rs.getString("id"));
                    project.setName(rs.getString("name"));
                    project.setDescription(rs.getString("description"));
                    project.setStartDate(rs.getDate("startDate").toLocalDate());
                    project.setEndDate(rs.getDate("endDate").toLocalDate());
                    projects.add(project);
                }
                return projects;
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve projects data.", ex);
        }
    
        //return null;
    }

    public Project updateProject(final Project updatedProject) {
        getConnection();
        try {
            String update_sql = "UPDATE projects SET name = ?, description = ?, startDate = ?, endDate = ? WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(update_sql)) {
                stmt.setString(1, updatedProject.getName());
                stmt.setString(2, updatedProject.getDescription());
                stmt.setDate(3, java.sql.Date.valueOf(updatedProject.getStartDate()));
                stmt.setDate(4, java.sql.Date.valueOf(updatedProject.getEndDate()));
                stmt.setString(5, updatedProject.getId());
                stmt.executeUpdate();
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to update project.", ex);
        }
    
        return updatedProject;
    }

    public void deleteProject(final String projectId) {
        getConnection();
        try {
            String delete_sql = "DELETE FROM projects WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(delete_sql)) {
                stmt.setString(1, projectId);
                stmt.executeUpdate();
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to delete project.", ex);
        }
    }

    public void deleteTask(final String taskId) {
        getConnection();
        try {
            String delete_sql = "DELETE FROM tasks WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(delete_sql)) {
                stmt.setString(1, taskId);
                stmt.executeUpdate();
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to delete task.", ex);
        }
    }

    public void deleteUser(final String username) {
        getConnection();
        try {
            String delete_sql = "DELETE FROM users WHERE username = ?";
            try (PreparedStatement stmt = conn.prepareStatement(delete_sql)) {
                stmt.setString(1, username);
                stmt.executeUpdate();
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to delete user.", ex);
        }
    }

    public void deleteAllTasks() {
        getConnection();
        try {
            String delete_sql = "DELETE FROM tasks";
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(delete_sql);
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to delete tasks.", ex);
        }
    }

    public void deleteAllProjects() {
        getConnection();
        try {
            String delete_sql = "DELETE FROM projects";
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(delete_sql);
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to delete projects.", ex);
        }
    }

    public void deleteAllUsers() {
        getConnection();
        try {
            String delete_sql = "DELETE FROM users";
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(delete_sql);
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to delete users.", ex);
        }
    }

    


   



   private Connection getConnection() {
      try {
         if (conn == null || conn.isClosed()) {
            conn = DriverManager.getConnection(CONNECTION_STRING,USERNAME,PASSWORD);
//               // Configure the connection.
//               setInitialSessionState(conn);
//
//               // Do something with method "betterExecuteQuery" using the Cluster-Aware Driver.
//               String select_sql = "SELECT * FROM tasks";
//               try (ResultSet rs = betterExecuteQuery(conn, select_sql)) {
//                  while (rs.next()) {
//                     System.out.println(rs.getString("first_name"));
//                  }
//               }

         }
      } catch (final SQLException ex) {
         throw new RuntimeException("Unable to connect to DB", ex);
      }

      return conn;
   }

//   private static void setInitialSessionState(Connection conn) throws SQLException {
//      // Your code here for the initial connection setup.
//      try (Statement stmt1 = conn.createStatement()) {
//         stmt1.executeUpdate("SET time_zone = \"+00:00\"");
//      }
//   }

   // A better executing query method when autocommit is set as the default value - true.
   private ResultSet betterExecuteQuery(String query) throws SQLException {
      // Record the times of retry.
      int retries = 0;

      while (true) {
         try {
            Statement stmt = conn.createStatement();
            return stmt.executeQuery(query);
         } catch (SQLException e) {
            // If the attempt to connect has failed MAX_RETRIES times,            
            // throw the exception to inform users of the failed connection.
            if (retries > MAX_RETRIES) {
               throw e;
            }

            // Failover has occurred and the driver has failed over to another instance successfully.
            if ("08S02".equalsIgnoreCase(e.getSQLState())) {
               // Reconfigure the connection.
               getConnection();
               // Re-execute that query again.
               retries++;

            } else {
               // If some other exception occurs, throw the exception.
               throw e;
            }
         }
      }
   }
}