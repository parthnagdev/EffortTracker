import { Project } from "api";

import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { Button } from "react-bootstrap";


import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import sao from 'sao/EffortTrackingSao';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        sao.listProjects((projects: Project[]) => {
            console.log("Projects found: " + projects.length!);
            setProjects(projects);
          });
    }, []);
  
    var i = 0;

    const constructIdTag = (project: Project) => {

      return (
        <Button variant="secondary" size="sm"> P53575{project.id} </Button>
      );
    };


  return (
      <div className="card">
          <DataTable value={projects} selectionMode="single" stripedRows >
              <Column field="id" body={constructIdTag} ></Column>
              <Column field="name" header="Project" ></Column>
              <Column field="startDate" header="Start Date" ></Column>
              <Column field="endDate" header="End Date"></Column>
             
          </DataTable>
      </div> 
  );
}

export default Projects;