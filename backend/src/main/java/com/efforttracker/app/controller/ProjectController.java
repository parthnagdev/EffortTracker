package com.efforttracker.app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efforttracker.app.tracker.EffortTracker;
import com.efforttracker.specs.ListProjectsRequest;
import com.efforttracker.specs.ListProjectsResponse;
import com.efforttracker.specs.Project;
import com.efforttracker.specs.ProjectApi;

@RestController
public class ProjectController implements ProjectApi {

    @Autowired
	private EffortTracker effortTracker;

    @GetMapping("/test")
    public String test() {
        return "Test route";
    }

    @Override
    public ResponseEntity<Project> createProject(Project project) {
        if(project.getId() != null) {
            throw new IllegalArgumentException("Project ID must be null");
        }
        //System.out.println("creating project from controller");
        final Project createdProject = effortTracker.createProject(project);
        return ResponseEntity.of(Optional.of(createdProject));
    }

    @Override
    public ResponseEntity<Project> updateProject(Project project) {
        final Project updatedProject = effortTracker.updateProject(project);
        return ResponseEntity.of(Optional.of(updatedProject));
    }

    @Override
    public ResponseEntity<ListProjectsResponse> listProjects (ListProjectsRequest listProjectsRequest) {
        final ListProjectsResponse response = new ListProjectsResponse();
        if(listProjectsRequest.getFilter() == null) {
            response.setProjectList(effortTracker.listProjects(null, null));
            return ResponseEntity.of(Optional.of(response));
        } else

        response.setProjectList(effortTracker.listProjects(
            listProjectsRequest.getFilter().getIdFilter(),
            listProjectsRequest.getFilter().getNameFilter()
        ));
        return ResponseEntity.of(Optional.of(response));
    }

    
}
