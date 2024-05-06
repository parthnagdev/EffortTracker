import Box from '@mui/material/Box';
import { Task, User } from 'api';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import sao from 'sao/EffortTrackingSao';
import CreateUser from '../admin/createUser';
import CreateTask from './createTask';
import FilterBy from './filterby';
import TaskTable from './tasktable';

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

  const TaskContext = createContext(tasks);
  const UserContext = createContext(users);

  useEffect(() => {
    listUsers();
  }, []);

  function listUsers() {
    sao.listUsers((users: User[]) => {
      console.log("Users found: " + users.length!);
      setUsers(users);
    });
  }

  function handleListTasks() {
    sao.listTasks(setTasks);
  }    

  return (
    <UserContext.Provider value={users}>
    <TaskContext.Provider value={tasks}>
      <Box>
            <BasicAlert />
            <FilterBy handleListTasks={handleListTasks} />
            <TaskTable tasks={tasks!} />
      </Box>
    </TaskContext.Provider>
    </UserContext.Provider>
  );
}
  
export default Tasks;