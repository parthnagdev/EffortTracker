import { Task } from "api";
import { useState } from "react";
import StatusRow from "./statusrow";
import { Floppy, Pencil } from "react-bootstrap-icons";
import sao from "sao/EffortTrackingSao";
import { Button } from "react-bootstrap";
import { toggleButtonClasses } from "@mui/material";
import TaskData from "components/models/task_data";

const TaskRow = ({taskd}: {taskd: TaskData}) => {
    let task = taskd.task;

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

    let spacing: any[] = [];
    for (let i = 0; i< taskd.depth; i++) {
      spacing.push((<span> &nbsp; &nbsp; </span>));
    }

    let toggle = taskd.hasChild ? (<Button variant="text">&#x25BE;</Button>) : (<span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>);
  
    if (taskState.inEditMode) {
      
      return (
            <tr key={task.id} className="h-3">
              {/* <td> {spacing} {toggle} <Button size="sm" variant='secondary' > T53575{task.id} </Button> </td>
              <td> <input type="text" defaultValue={title} onChange={e => title = e.target.value}/> </td>
              <td> <input type="text" defaultValue={username} onChange={e => username = e.target.value}/> </td>
              <td> <StatusRow taskId={task.id + ""} status={task.state!} /> </td>
              <td> <div > <input type="text" defaultValue={estimate} onChange={e => estimate = e.target.value}/> </div> </td>
              <td> <Floppy onClick={handleTaskSave}/> </td> */}
            </tr>
      );
    } else {
      return (
        <tr key={task.id} className="h-3">
          {/* <td> {spacing} {toggle} <Button size="sm" variant='secondary' > T53575{task.id} </Button>  </td>
          <td> {title} </td>
          <td> {username} </td>
          <td> <StatusRow taskId={task.id + ""} status={task.state!}/> </td>
          <td> {estimate} </td>
          <td> <Pencil onClick={() => handleTaskEdit()}/> </td>
          <td> <Button variant="text">&#x25BE;</Button> </td> */}
        </tr>
      );
    }
  }

  export default TaskRow;