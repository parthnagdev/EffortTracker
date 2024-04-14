import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Component, FormEvent, useEffect, useState } from 'react';
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

const sao = new EffortTrackingSao();

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>();

  function handleListTasks() {
    sao.listTasks(setTasks);
  }    

  return (
    <Box>
          <CreateTask />
          <FilterBy handleListTasks={handleListTasks} />
          <TaskTable tasks={tasks!} />
    </Box>
  );
}
  
export default Tasks;