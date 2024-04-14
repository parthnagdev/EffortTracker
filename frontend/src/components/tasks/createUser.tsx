
import { Box } from "@mui/material";
import { FormEvent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";

const CreateUser = () => {

    var name = "";
    var username = "";
  
    function handleCreateUser(e: FormEvent) {
       // Prevent the browser from reloading the page
       e.preventDefault();
       sao.createUser(name, username);
    }
  
    return (
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <h4>Add User</h4>
      <Form onSubmit={handleCreateUser}>
        <Row>
          <Col>
            <Form.Control placeholder="Name" id='name' onChange={e => name = e.target.value}/>
          </Col>
  
          <Col>
            <Form.Control placeholder="Username" id='username' onChange={e => username = e.target.value} />
          </Col>
  
          <Col>
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </Col>
        </Row>
      </Form>
      </Box>
    );
  }

export default CreateUser;