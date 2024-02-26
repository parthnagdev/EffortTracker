import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Component } from 'react';
import Box from '@mui/material/Box';

function CreateTask() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h4>Create Task</h4>
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
    </Box>
  );
}

function FilterBy() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h4>Filter By</h4>
      
    <Form>
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

function TaskTable() {
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
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
    </Box>
  )
}

function Tasks() {
    return (
      <Box>
            <CreateTask />
            <FilterBy />
            <TaskTable />
     </Box>
    );
  }
  
  export default Tasks;