import { Task } from "api";
import { useState } from "react";
import StatusRow from "./statusrow";
import { Floppy, Pencil } from "react-bootstrap-icons";
import sao from "sao/EffortTrackingSao";

const TaskRow = ({task}: {task: Task}) => {

    const [taskState, setTaskState] = useState({
        inEditMode: false,
        title: task.title,
        estimate: task.estimate,
        username: task.username
    });

    var title = taskState.title;
    var estimate = taskState.estimate + "";
    var username = taskState.username;
  
    function handleTaskEdit() {
      const newState = {
        ...taskState,
        inEditMode: true
      }
      setTaskState(newState);
    }
  
    function handleTaskSave() {
      sao.updateTask(task.id!, title!, Number(estimate!), username!, () => {
        const newState = {
            inEditMode: false,
            title: title,
            estimate: Number(estimate),
            username: username
          }

          setTaskState(newState);
      });
    }
  
    if (taskState.inEditMode) {
      return (
            <tr key={task.id}>
              <td> <input type="text" defaultValue={title} onChange={e => title = e.target.value}/> </td>
              <td> <StatusRow taskId={task.id + ""} status={task.state!} /> </td>
              <td> <div > <input type="text" defaultValue={estimate} onChange={e => estimate = e.target.value}/> </div> </td>
              <td> <input type="text" defaultValue={username} onChange={e => username = e.target.value}/> </td>
              <td> <Floppy onClick={handleTaskSave}/> </td>
            </tr>
      );
    } else {
      return (
        <tr key={task.id}>
          <td> {title} </td>
          <td> <StatusRow taskId={task.id + ""} status={task.state!}/> </td>
          <td> {estimate} </td>
          <td> {username} </td>
          <td> <Pencil onClick={() => handleTaskEdit()}/> </td>
        </tr>
      );
    }
  }

  export default TaskRow;