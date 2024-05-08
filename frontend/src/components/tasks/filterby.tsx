import { Box } from "@mui/material";
import { Filter, State, Task, User } from "api";
import { Dropdown } from "primereact/dropdown";
import { FormEvent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import sao from 'sao/EffortTrackingSao';

const FilterBy = ({handleSetTasks, users, selectedUser, selectedState, setSelectedUser, setSelectedState}: {
        handleSetTasks: Function,  
        users: User[], 
        selectedUser: User | undefined, 
        selectedState: string | undefined,
        setSelectedUser: Function,
        setSelectedState: Function
      }) => {

    const users_data: UserData[] = getUserDataList(users);

    function handleFilterBy(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const filter = createListFilter();
        sao.listTasks(filter, (tasks: Task[]) => {
          handleSetTasks(tasks);
        });
    }

    function getSelectedState(): State | undefined {
      if (!selectedState) {
        return undefined;
      }

      return State[selectedState!]
    }

    function createListFilter(): Filter {
      let stateFilter: State | undefined = undefined;
      if (selectedState) {
        stateFilter = getSelectedState();
      }
  
      let userFilter: string[] | undefined = undefined;
      if (selectedUser) {
        userFilter = [selectedUser.name!];
      }
  
      return {
        stateFilter: stateFilter,
        userFilter: userFilter
      };
    }

    function getStateData(state: string | undefined): StateData | undefined {
      if (!state) {
        return undefined;
      }
  
      return {
        name: state
      }
    }

    interface UserData {
      name: string,
      user: User
    }
  
    function getUserDataList(users: User[]): UserData[] {
      const userds: UserData[] = [];
      for (let i =0; i < users.length; i++) {
        userds.push(getUserData(users[i])!);
      }
  
      return userds;
    }

    function getUserData(user: User | undefined): UserData | undefined {
      if (!user) {
        return undefined;
      }

      return {
        name: user.name!,
        user: user
      }
    }

    interface StateData {
      name: string
    } 

    const states: StateData[] = [];
    (Object.keys(State) as Array<keyof typeof State>).forEach((key) => states.push({name: key}));



    return (
      <Box component="section" sx={{ p: 2 }}>
        
      <Form onSubmit={handleFilterBy}>
        <Row>
          <Col>
            <div className="card flex justify-content-center">
                <Dropdown value={getStateData(selectedState)} onChange={(e) => setSelectedState(e.value.name)} options={states} optionLabel="name" 
                    placeholder="Select status" className="w-full" />
            </div>
          </Col>
  
          <Col>
            <div className="card flex justify-content-center">
                <Dropdown value={getUserData(selectedUser)} onChange={(e) => setSelectedUser(e.value.user)} options={users_data} optionLabel="name" 
                    placeholder="Select user" className="w-full" />
            </div>
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