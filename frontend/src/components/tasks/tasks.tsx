import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Component, FormEvent, createContext, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { title } from 'process';
import { log } from 'console';
import { Floppy, Pencil, Save2 } from 'react-bootstrap-icons';
import { Alert, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Task, User } from 'api';
import { useOutsideClick } from '../util/click_outside_util';
import TaskTable from './tasktable';
import CreateTask from './createTask';
import FilterBy from './filterby';
import sao from 'sao/EffortTrackingSao';
import CreateUser from './createUser';

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
            <CreateUser />
            <CreateTask />
            <FilterBy handleListTasks={handleListTasks} />
            <TaskTable tasks={tasks!} />
      </Box>
    </TaskContext.Provider>
    </UserContext.Provider>
  );
}
  
export default Tasks;