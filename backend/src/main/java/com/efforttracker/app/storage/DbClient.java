package com.efforttracker.app.storage;


import java.sql.*;

/**
 * Scenario 1: Failover happens when autocommit is set to true - Catch SQLException with code 08S02.
 */
public class DbClient {
    
   private static final String CONNECTION_STRING = "jdbc:mysql:aws://database-1.cp6o00skgzb5.ap-south-1.rds.amazonaws.com:3306/EffortTrackerSchema";
   private static final String USERNAME = "admin";
   private static final String PASSWORD = "12345678";
   private static final int MAX_RETRIES = 5;

   public DbClient() throws SQLException {
      try (Connection conn = DriverManager.getConnection(CONNECTION_STRING, USERNAME, PASSWORD)) {
         // Configure the connection.
         setInitialSessionState(conn);

         // Do something with method "betterExecuteQuery" using the Cluster-Aware Driver.
         String select_sql = "SELECT * FROM tasks";
         try (ResultSet rs = betterExecuteQuery(conn, select_sql)) {
            while (rs.next()) {
               System.out.println(rs.getString("first_name"));
            }
         }
      }
   }

   private static void setInitialSessionState(Connection conn) throws SQLException {
      // Your code here for the initial connection setup.
      try (Statement stmt1 = conn.createStatement()) {
         stmt1.executeUpdate("SET time_zone = \"+00:00\"");
      }
   }

   // A better executing query method when autocommit is set as the default value - true.
   private static ResultSet betterExecuteQuery(Connection conn, String query) throws SQLException {
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
               setInitialSessionState(conn);
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