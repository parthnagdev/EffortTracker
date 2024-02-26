import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Component } from 'react';

function CreateTask() {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Control placeholder="Task title" />
        </Col>

        <Col>
          <Form.Control placeholder="Estimate" />
        </Col>

        <Col>
          <Form.Control placeholder="Assined to" />
        </Col>

       <Col>
          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

function Tasks() {
    return (
      <div>
            <CreateTask />
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Estimate</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
     </div>
    );
  }
  
  export default Tasks;