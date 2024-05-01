FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy your Spring Boot application jar file into the container
COPY build/libs/EffortTracker-0.0.1-SNAPSHOT.jar EffortTracker-0.0.1-SNAPSHOT.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "EffortTracker-0.0.1-SNAPSHOT.jar"]