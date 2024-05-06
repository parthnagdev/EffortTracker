import { User } from 'api';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import sao from 'sao/EffortTrackingSao';
import CreateUser from 'components/admin/createUser';

const BasicAlert = () => {

  const [msg, setMsg] = useState({
    log: '',
    errorMessage: ''
  });

  useEffect(() => {
    sao.setLoggers(log, logError);
  }, []);

  function log(log: string) {
    setMsg({
      log: log,
      errorMessage: ''
    });
  }

  function logError(log: string) {
    setMsg({ 
      log: '',
      errorMessage: log
    });
  }

  if (msg.log !== '') {
      return (
        <>
        <Alert key='success' variant='success' dismissible>
          {msg.log}
        </Alert>
        </>
      );
    } else if (msg.errorMessage !== '') {
      return (
        <>
        <Alert key='danger' variant='danger' dismissible>
          {msg.errorMessage}
        </Alert>
        </>
      );
    }

  return <></>;

}


const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);

  const UserContext = createContext(users);

  useEffect(() => {
    listUsers();
  }, []);

  function listUsers() {
    sao.listUsers((users: User[]) => {
      console.log("Users found: " + users.length!);
      setUsers(users);
    });
  }

  return (
    <UserContext.Provider value={users}>
       <CreateUser />
    </UserContext.Provider>
  );
}
  
export default Admin;