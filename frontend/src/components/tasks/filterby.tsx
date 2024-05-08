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

    interface UserData {
      name: string,
      user: User | undefined
    }

    const remove_filter = 'Remove Filter';

    const users_data: UserData[] = [{name: remove_filter, user: undefined}];
    users_data.push(...getUserDataList(users));

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
        userFilter = [selectedUser.username!];
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
        name: user.username!,
        user: user
      }
    }

    interface StateData {
      name: string
    } 

    const states: StateData[] = [{name: remove_filter}];
    (Object.keys(State) as Array<keyof typeof State>).forEach((key) => states.push({name: key}));

    function setState(state: StateData) {
      if (state.name === remove_filter) {
        console.log("Setting undef state");
        setSelectedState(undefined);
        return;
      }

      setSelectedState(state.name);
    }

    function setUser(user: UserData) {
      if (user.name === remove_filter) {
        setSelectedUser(undefined);
        return;
      }

      setSelectedUser(user.user);
    }

    return (
      
        
      <Form onSubmit={handleFilterBy}>
        <Row>
          <Col>
            <div className="card flex justify-content-center">
                <Dropdown value={getStateData(selectedState)} onChange={(e) => setState(e.value)} options={states} optionLabel="name" 
                    placeholder="Select state" className="w-full" />
            </div>
          </Col>
  
          <Col>
            <div className="card flex justify-content-center">
                <Dropdown value={getUserData(selectedUser)} onChange={(e) => setUser(e.value)} options={users_data} optionLabel="name" 
                    placeholder="Select user" className="w-full" />
            </div>
          </Col>
  
         <Col>
            <Button variant="primary" size="lg" type="submit">
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

export default FilterBy;