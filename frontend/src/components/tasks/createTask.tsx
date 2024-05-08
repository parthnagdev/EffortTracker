import { Box } from "@mui/material";
import { User } from "api";
import { Dropdown } from "primereact/dropdown";
import { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";
import { UserData, getUserDataList, getUserData } from "components/users/users";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const CreateTask = ({parentId, setVisible, users, refresh}: {parentId: string | undefined, setVisible: Function, users: User[], refresh: Function}) => {

    const [title, setTitle] = useState<string>();
    const [estimate, setEstimate] = useState<number | null>();
    const [selectedUser, setSelectedUser] = useState<User>();
  
    function handleCreateTask(e: FormEvent) {
       // Prevent the browser from reloading the page
       e.preventDefault();
       e.stopPropagation();

       console.log("Creating a new Task");

       let est: number | undefined = ((estimate === null) ? undefined : estimate);
       sao.createTask(title!, est, selectedUser?.username, parentId, refresh);
       setVisible(false);
    }
  
    return (
      <Container>
        <h4>Create Task</h4>
      <Form onSubmit={handleCreateTask}>
        <Row>
          <Col xs={4}>
              <div className="p-inputgroup flex-1">
                  <InputText placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} />
              </div>
          </Col>

          <Col>
              <div className="p-inputgroup flex-1">
                  <InputNumber placeholder="Estimate" onValueChange={(e) => setEstimate(e.target.value)} />
              </div>
          </Col>

          <Col>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                  <Dropdown value={getUserData(selectedUser)} onChange={(e) => setSelectedUser(e.value.user)} options={getUserDataList(users)} optionLabel="name" 
                      placeholder="Select user" className="w-full" />
              </div>
          </Col>
  
         <Col>
            <Button size='lg' variant="primary" type="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
      </Container>
    );
  }

export default CreateTask;