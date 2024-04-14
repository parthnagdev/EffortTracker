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
import { Pencil } from 'react-bootstrap-icons';
import { ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Tasks = () => {

class Task {
   key: string
   title: string;
   status: string;
   estimate: number;
   username: string;

constructor(key: string, title: string, status: string, estimate: number, username: string) {
    this.key = key;
    this.title = title;
    this.status = status;
    this.estimate = estimate;
    this.username = username;
  }
}

const [tasks, setTasks] = useState<Task[]>();


function handleListTasks() {
  var tasks = [];
  tasks.push(new Task("create_ui", "Create UI", "IP", 3, "parth"));
  tasks.push(new Task("update_open_ui", "Update Open UI", "D", 4, "rnnagdev"));
  console.log(tasks[0].status);
  console.log(tasks[1].status);
  setTasks(tasks);

  // fetch("http://localhost:8080/task/list", {
  //     method: "POST",
  //     headers: {'Content-Type': 'application/json'},
  //     body: ""
  //   }).then(response => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     setTasks(data);
  //  })
  //  .catch((err) => {
  //     console.log(err.message);
  //  });;
}

const CreateTask = () => {

  var title = "";
  var estimate = "";
  var username = "";

  function handleCreateTask(e: FormEvent) {
     // Prevent the browser from reloading the page
     e.preventDefault();

    // Read the form data
    // const form = e.target;

    // // You can pass formData as a fetch body directly:
    // fetch('/task/create', { method: form.method, body: formData });

    // // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    fetch("http://localhost:8080/task/create", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        estimate: estimate,
        username: username,
      })
    }).then(response => {
      console.log(response);
      //handleCreateTask();
    });
  }

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h4>Create Task</h4>
    <Form onSubmit={handleCreateTask}>
      <Row>
        <Col>
          <Form.Control placeholder="Task title" id='title' onChange={e => title = e.target.value}/>
        </Col>

        <Col>
          <Form.Control placeholder="Estimate" id='estimate' onChange={e => estimate = e.target.value} />
        </Col>

        <Col>
          <Form.Control placeholder="Assined to" id='username' onChange={e => username = e.target.value} />
        </Col>

       <Col>
          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </Col>
      </Row>
    </Form>
    </Box>
  );
}

function FilterBy() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h4>Filter By</h4>
      
    <Form onSubmit={handleListTasks}>
      <Row>
        <Col>
          <Form.Select aria-placeholder="Username">
                <option>No Filter</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Select aria-placeholder="Status">
                <option>No Filter</option>
                <option value="1">Inprogress</option>
                <option value="2">Inreview</option>
                <option value="3">Complete</option>
          </Form.Select>
        </Col>

       <Col>
          <Button variant="primary" type="submit">
            Filter
          </Button>
        </Col>
      </Row>
    </Form>

    </Box>
  );
}

// function TaskRow(task: Task) {
//   return 
// }

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
);

const Status = ({ value, actual }: {value: string, actual: string} ) => {
  console.log("Value " + value + "; Actual: " + actual);

  if (actual === value) {
    return (
      <Col>
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Button disabled> {value} </Button>
        </OverlayTrigger>
      </Col>
    );
  }

  return (
    <Col>
      <OverlayTrigger placement="left" overlay={tooltip}>
        <Button > {value} </Button>
      </OverlayTrigger>
    </Col>
  );
}

const StatusRow = ({ status }: {status: string} ) => {
  return (
    <ButtonToolbar >
      <Row>
        <Status value='IP' actual={status} /> 
        <Status value='R' actual={status} />
        <Status value='D' actual={status} />
      </Row>
    </ButtonToolbar>
  
    );
}

function TaskTable() {


  const rows = [];

  console.log("Tasks isU: " + tasks);

  if (tasks != undefined) {

  console.log("Tasks: " + tasks);

  var i = 0;
  for (let i = 0; i< tasks!.length; i++) {
    console.log("Task title: " + tasks[i].title);
    console.log("Task status: " + tasks[i].status);
    rows.push(
        <tr key={tasks![i].key}>
          <td> {tasks![i].title} </td>
          <td> <StatusRow status={tasks![i].status}/> </td>
          <td> <input type="text" value={tasks![i].estimate} /> </td>
          <td> {tasks![i].username} </td>
        </tr>);
  };
}


  return (
    <Box component="section" sx={{ p: 2 }} >
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Estimate</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
             { rows }
            </tbody>
          </Table>
    </Box>
  )
}


    
  

    return (
      <Box>
            <CreateTask />
            <FilterBy />
            <TaskTable />
     </Box>
    );
  }
  
  export default Tasks;