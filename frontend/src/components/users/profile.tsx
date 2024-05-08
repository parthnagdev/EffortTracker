import { User } from "api";

import { Column } from 'primereact/column';
import { Button, Col, Container, Row } from "react-bootstrap";


import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import sao from 'sao/EffortTrackingSao';
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        sao.listUsers((users: User[]) => {
            console.log("Users found: " + users.length!);
            setUsers(users);
          });
    }, []);
  
    var i = 0;

    const constructIdTag = (user: User) => {

      return (
        <Button variant="secondary" size="sm"> U53575{user.id} </Button>
      );
    };


  return (
      <Container>
         <Row>
            <Col>
            </Col>
            <Col>
            </Col>
         </Row>
         <Row>
            <DataTable value={users} selectionMode="single" stripedRows >
                <Column field="id" body={constructIdTag} ></Column>
                <Column field="name" header="Name" ></Column>
                <Column field="username" header="User Name" ></Column>
                
            </DataTable>
         </Row>
      </Container> 
  );
}

export function getUserDataList(users: User[]): UserData[] {
    const userds: UserData[] = [];
    for (let i =0; i < users.length; i++) {
        userds.push(getUserData(users[i])!);
    }

    return userds;
}

export function getUserData(user: User | undefined): UserData | undefined {
    if (!user) {
        return undefined;
    }

    return {
        name: user.username!,
        user: user
    }
}

export interface UserData {
    name: string,
    user: User | undefined
}

export default Profile;