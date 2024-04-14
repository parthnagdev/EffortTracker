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
import { ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Task } from 'api';
import EffortTrackingSao from 'sao/EffortTrackingSao';
import { useOutsideClick } from '../util/click_outside_util';
import TaskTable from './tasktable';
import CreateTask from './createTask';
import FilterBy from './filterby';
import sao from 'sao/EffortTrackingSao';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>();

  const TaskContext = createContext(tasks);

  function handleListTasks() {
    sao.listTasks(setTasks);
  }    

  return (
    <TaskContext.Provider value={tasks}>
      <Box>
            <CreateTask />
            <FilterBy handleListTasks={handleListTasks} />
            <TaskTable tasks={tasks!} />
      </Box>
    </TaskContext.Provider>
  );
}
  
export default Tasks;