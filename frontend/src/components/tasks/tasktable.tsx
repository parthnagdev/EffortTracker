import { Task } from "api";
import TaskRow from "./taskrow";
import { Table } from "react-bootstrap";

const TaskTable = ({tasks} : {tasks: Task[]}) => {
    const rows = [];
  
    console.log("Tasks isU: " + tasks);
  
    if (tasks != undefined) {
  
    console.log("Tasks: " + tasks);
  
    const ref = () => {
      console.log('Clicked outside of MyComponent');
    };
  
    var i = 0;
    for (let i = 0; i< tasks!.length; i++) {
      console.log("Task title: " + tasks[i].title);
      // console.log("Task status: " + tasks[i].status);
         rows.push(<TaskRow task={tasks[i]!} />)
      }
    };
  
    return (
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
         { rows }
        </tbody>
      </Table>
    )
  }

export default TaskTable;