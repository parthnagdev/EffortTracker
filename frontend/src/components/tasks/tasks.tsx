import Box from '@mui/material/Box';
import { State, Task, User } from 'api';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import sao from 'sao/EffortTrackingSao';
import FilterBy from './filterby';
import TaskTable from './tasktable';
import { Margin } from '@mui/icons-material';

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);

  useEffect(() => {
    listUsers();
  }, []);

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
              <Col xs={10}>
                <FilterBy handleSetTasks={setTasks}
                          users={users} 
                          selectedState={selectedState} 
                          selectedUser={selectedUser}
                          setSelectedState={setSelectedState}
                          setSelectedUser={setSelectedUser} />
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
              <TaskTable tasks={tasks!} visible={visible} setVisible={setVisible}/>
            </Row> 
      </Container>
      
      </div>
  );
}
  
export default Tasks;