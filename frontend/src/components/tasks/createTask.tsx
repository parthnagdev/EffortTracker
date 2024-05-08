import { Box } from "@mui/material";
import { FormEvent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";

const CreateTask = ({parentId, setVisible}: {parentId: string | undefined, setVisible: Function}) => {

    var title = "";
    var estimate = "";
    var username = "";
  
    function handleCreateTask(e: FormEvent) {
       // Prevent the browser from reloading the page
       e.preventDefault();
       sao.createTask(title, Number(estimate), username, parentId);
       setVisible(false);
    }
  
    return (
      <Box sx={{ p: 2, bgcolor:  (theme) => theme.palette.mode === "light"
      ? "#f5f5f5"
      : "#0f0f0f"}}>
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

export default CreateTask;