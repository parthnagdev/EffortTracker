import { Filter, Task, User } from "api";

import { Column } from 'primereact/column';
import { Button, Col, Container, Row } from "react-bootstrap";


import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import sao from 'sao/EffortTrackingSao';
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User | undefined>();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const filter: Filter = {
            userFilter: [username!]
        }

        sao.listTasks(filter, (tasks: Task[]) => {
            setTasks(tasks);
          });

        sao.listUsers((users: User[]) => users.forEach((user) => {
            if (user.username === username) {
                setUser(user);
                return;
            }
        }));
    }, [username]);

    const constructIdTag = (task: User) => {

      return (
        <Button variant="secondary" size="sm"> T53575{task.id} </Button>
      );
    };

    const header = (
        <div className="circle">
        <p className="circle-inner">AY</p>
        </div>
    );

  return (
      <Container>
         <Row>
            <Col>
            <Card title={user ? user.name : 'Loading...'} subTitle={'@' + username}  header={header} className="md:w-30rem">
                <p>parthagdev@gmail.com | +91 9876542435</p>
                <p>Student | CSE</p>
            </Card>
            </Col>
            <Col>
            <Card title='Anothe card' subTitle="Card subtitle"  header={header} className="md:w-30rem">
                <p className="m-0">

                    </p>
            </Card>
            </Col>
         </Row>
         <Row>
            <div className="card">
            <DataTable value={tasks} scrollable scrollHeight="400px" selectionMode="single" stripedRows >
                <Column field="id" body={constructIdTag} ></Column>
                <Column field="title" header="Title" ></Column>
                
            </DataTable>
            </div>
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