import { User } from "api";

import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";


import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import sao from 'sao/EffortTrackingSao';

const Users = () => {
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
      <div className="card">
          <DataTable value={users} selectionMode="single" stripedRows >
              <Column field="id" body={constructIdTag} ></Column>
              <Column field="name" header="User Name" ></Column>
             
          </DataTable>
      </div> 
  );
}

export default Users;