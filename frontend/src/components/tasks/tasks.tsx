import Box from '@mui/material/Box';
import { Filter, FilterProject, Project, State, Task, User } from 'api';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import sao from 'sao/EffortTrackingSao';
import FilterBy from './filterby';
import TaskTable from './tasktable';
import { Margin } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const BasicAlert = () => {

  const [msg, setMsg] = useState({
    log: '',
    errorMessage: ''
  });

  useEffect(() => {
    sao.setLoggers(log, logError);
  }, []);

  function log(log: string) {
    setMsg({
      log: log,
      errorMessage: ''
    });
  }

  function logError(log: string) {
    setMsg({
      log: '',
      errorMessage: log
    });
  }

  if (msg.log !== '') {
      return (
        <>
        <Alert key='success' variant='success' dismissible>
          {msg.log}
        </Alert>
        </>
      );
    } else if (msg.errorMessage !== '') {
      return (
        <>
        <Alert key='danger' variant='danger' dismissible>
          {msg.errorMessage}
        </Alert>
        </>
      );
    }

  return <></>;

}


const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
 // const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [project, setProject] = useState<Project | null>(null);

useEffect(() => {
  if (projectId) {
    const filter: FilterProject = {
      idFilter: [projectId]
    };

    sao.listProjects(filter, (projects: Project[]) => {
      if (projects.length > 0) {
        setProject(projects[0]);
      }
    });
  }
}, [projectId]);


  useEffect(() => {
    listUsers();
    refreshTasks();
  }, [projectId]);

  function refreshTasks() {
        const filter = createListFilter();
        sao.listTasks(filter, (tasks: Task[]) => {
          setTasks(tasks);
        });
  }

  function createListFilter(): Filter {
    let stateFilter: State | undefined = undefined;
    if (selectedState) {
      stateFilter = getSelectedState();
    }

    let userFilter: string[] | undefined = undefined;
    if (selectedUser) {
      userFilter = [selectedUser.username!];
    }

    let projectFilter: string[] | undefined = undefined;
    if (projectId) { // Use the projectId from the URL to create the projectFilter
      projectFilter = [projectId];
    }

    return {
      stateFilter: stateFilter,
      userFilter: userFilter,
      projectFilter: projectFilter
    };
  }

  function getSelectedState(): State | undefined {
    if (!selectedState) {
      return undefined;
    }

    return State[selectedState!]
  }

  function listUsers() {
    sao.listUsers((users: User[]) => {
      console.log("Users found: " + users.length!);
      setUsers(users);
    });
  }

  console.log("Tasks: " + tasks);

  const [visible, setVisible] = useState(false);

  return (
      <div>
      <Container>
            <Row>
              <BasicAlert />
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <h3>{project ? project.name + ' Dashboard' : (projectId ? 'Loading...' : 'All Tasks')}</h3>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={10}>
                <FilterBy users={users} 
                          selectedState={selectedState} 
                          selectedUser={selectedUser}
                          setSelectedState={setSelectedState}
                          setSelectedUser={setSelectedUser}
                          refresh={refreshTasks} />
              </Col>
              <Col >
              <Button variant="primary" size="lg" 
                        onClick={() => {
                          setVisible(true);
                        }}
                        style={{
                          marginTop: 10,
                          
                        }}>
                    Create Task
                </Button>
              </Col>
            </Row>
            <Row>
              <TaskTable tasks={tasks!} visible={visible} setVisible={setVisible} users={users} refresh={refreshTasks}/>
            </Row> 
      </Container>
      
      </div>
  );
}
  
export default Tasks;