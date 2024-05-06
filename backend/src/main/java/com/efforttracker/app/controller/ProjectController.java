package com.efforttracker.app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.efforttracker.app.tracker.EffortTracker;
import com.efforttracker.specs.ListProjectsRequest;
import com.efforttracker.specs.ListProjectsResponse;
import com.efforttracker.specs.Project;
import com.efforttracker.specs.ProjectApi;

public class ProjectController implements ProjectApi {

    @Autowired
	private EffortTracker effortTracker;

    @Override
    public ResponseEntity<Project> createProject(Project project) {
        final Project createdProject = effortTracker.createProject(project);
        return ResponseEntity.of(Optional.of(createdProject));
    }

    @Override
    public ResponseEntity<Project> updateProject(Project project) {
        final Project updatedProject = effortTracker.updateProject(project);
        return ResponseEntity.of(Optional.of(updatedProject));
    }

    @Override
    public ResponseEntity<Project> listProject (ListProjectsRequest listProjectsRequest) {
        final ListProjectsResponse response = new ListProjectsResponse();
        response.setProjectList(effortTracker.listProjects());
        return ResponseEntity.of(Optional.of(response));
    }

    
}
