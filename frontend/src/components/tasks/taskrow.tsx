import { Task } from "api";
import { useState } from "react";
import StatusRow from "./statusrow";
import { Floppy, Pencil } from "react-bootstrap-icons";

const TaskRow = ({task}: {task: Task}) => {

    const [isInEditMode, setIsInEditMode] = useState(false);
  
    function handleTaskEdit() {
      setIsInEditMode(true);
    }
  
    function handleTaskSave() {
      setIsInEditMode(false);
    }
  
    if (isInEditMode) {
      return (
            <tr key={task.id}>
              <td> {task.title} </td>
              <td> <StatusRow status="DONE"/> </td>
              <td> <div > <input type="text" value={task.estimate} /> </div> </td>
              <td> <input type="text" value={task.username} /> </td>
              <td> <Floppy onClick={handleTaskSave}/> </td>
            </tr>
      );
    } else {
      return (
        <tr key={task.id}>
          <td> {task.title} </td>
          <td> <StatusRow status="DONE"/> </td>
          <td> {task.estimate} </td>
          <td> {task.username} </td>
          <td> <Pencil onClick={() => handleTaskEdit()}/> </td>
        </tr>
      );
    }
  }

  export default TaskRow;