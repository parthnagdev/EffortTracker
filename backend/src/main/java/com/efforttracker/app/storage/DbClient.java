package com.efforttracker.app.storage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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
         String insert_sql = "INSERT INTO tasks (title, description, estimate, username, state) VALUES ('" + task.getTitle() + "', '" + task.getDescription() + "' , '" + task.getEstimate() + "', '" + task.getUsername() + "', '" + task.getState() + "')";
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
         String update_sql = "UPDATE tasks SET title = '" + updatedTask.getTitle() + "', description = '" + updatedTask.getDescription() + "', estimate = '" + updatedTask.getEstimate() + "', username = '" + updatedTask.getUsername() + "', state = '" + updatedTask.getState() + "' WHERE id = '" + updatedTask.getId() + "'";
         try (Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(update_sql);
         }
      } catch (final SQLException ex) {
         throw new RuntimeException("Unable to update task.", ex);
      }

      return updatedTask;
    }

    public List<Task> listTasks(List<String> taskIds) {
    getConnection();
    if(taskIds == null || taskIds.isEmpty()){
        try {
            String select_sql = "SELECT * FROM tasks";
            try (ResultSet rs = betterExecuteQuery(select_sql)) {
                List<Task> tasks = new ArrayList<>();
                while (rs.next()) {
                    Task task = new Task();
                    task.setId(rs.getString("id"));
                    task.setTitle(rs.getString("title"));
                    task.setDescription(rs.getString("description"));
                    task.setEstimate(rs.getLong("estimate"));
                    task.setUsername(rs.getString("username"));
                    task.setState(State.valueOf(rs.getString("state")));
                    tasks.add(task);
                }
                return tasks;
            }
        } catch (final SQLException ex) {
            throw new RuntimeException("Unable to retrieve tasks data.", ex);
        }
    }
    List<Task> filteredTasks = new ArrayList<>();
    for(String taskId : taskIds){
        Task task = getTask(taskId);
        if(task != null){
            filteredTasks.add(task);
        }
    }
    return filteredTasks;

        //return null;
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