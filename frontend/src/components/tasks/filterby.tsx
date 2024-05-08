import { Box } from "@mui/material";
import { FormEvent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const FilterBy = ({handleListTasks}: {handleListTasks: Function}) => {

    function handleFilterBy(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleListTasks();
    }

    return (
      <Box component="section" sx={{ p: 2 }}>
        
      <Form onSubmit={handleFilterBy}>
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

export default FilterBy;