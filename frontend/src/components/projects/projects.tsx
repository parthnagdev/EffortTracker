import { FilterProject, Project } from "api";

import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { Button, Container } from "react-bootstrap";


import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import sao from 'sao/EffortTrackingSao';
import { useNavigate } from 'react-router-dom';


const Projects = () => {
  const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const filter: FilterProject = {};

        sao.listProjects(filter, (projects: Project[]) => {
            console.log("Projects found: " + projects.length!);
            setProjects(projects);
          });
    }, []);
  
    var i = 0;

    const constructIdTag = (project: Project) => {

      return (
        <Button variant="secondary" size="sm" onClick={() => navigate(`/tasks/${project.id}`)}> P53575{project.id} </Button>
      );
    };


  return (
      <Container className="card">
          <DataTable value={projects} selectionMode="single" stripedRows >
              <Column field="id" body={constructIdTag} ></Column>
              <Column field="name" header="Project" ></Column>
              <Column field="startDate" header="Start Date" ></Column>
              <Column field="endDate" header="End Date"></Column>
             
          </DataTable>
        </Container>
  );
}

export default Projects;
