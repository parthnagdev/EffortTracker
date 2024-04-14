import { Task } from "api";
import { useState } from "react";
import StatusRow from "./statusrow";
import { Floppy, Pencil } from "react-bootstrap-icons";
import sao from "sao/EffortTrackingSao";

const TaskRow = ({task}: {task: Task}) => {

    const [isInEditMode, setIsInEditMode] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [estimate, setEstimate] = useState(task.estimate);
    const [username, setUsername] = useState(task.username);
  
    function handleTaskEdit() {
      setIsInEditMode(true);
    }
  
    function handleTaskSave() {
      sao.updateTask(task.id! + "", title!, estimate!, username!, () => setIsInEditMode(false));
    }
  
    if (isInEditMode) {
      return (
            <tr key={task.id}>
              <td> {task.title} </td>
              <td> <StatusRow taskId={task.id + ""} status={task.state!} /> </td>
              <td> <div > <input type="text" value={task.estimate} /> </div> </td>
              <td> <input type="text" value={task.username} /> </td>
              <td> <Floppy onClick={handleTaskSave}/> </td>
            </tr>
      );
    } else {
      return (
        <tr key={task.id}>
          <td> {task.title} </td>
          <td> <StatusRow taskId={task.id + ""} status={task.state!}/> </td>
          <td> {task.estimate} </td>
          <td> {task.username} </td>
          <td> <Pencil onClick={() => handleTaskEdit()}/> </td>
        </tr>
      );
    }
  }

  export default TaskRow;