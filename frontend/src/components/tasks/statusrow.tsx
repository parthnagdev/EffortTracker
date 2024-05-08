import { State } from "api";
import { useState } from "react";
import { Button, ButtonToolbar, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";

const STATUS_MAP = new Map([
    ["INPROGRESS", "IP"],
    ["OPEN", "O"],
    ["COMPELETE", "C"],
    ["REVIEW", "R"],
    ["BLOCKED", "B"]
  ]);

const Status = ({ taskId, value, actual, handleUpdateCallback }: {taskId: string, value: string, actual: string, handleUpdateCallback: Function} ) => {
    console.log("Value " + value + "; Actual: " + actual);
  
    const tooltip = (
      <Tooltip id="tooltip">
        {value}
      </Tooltip>);
  
    const buttonName = STATUS_MAP.get(value);

    console.log("value: " + value);
    console.log("Button name: " + buttonName);
    console.log("status: " + actual);
  
    if (value === actual) {
      return (
        
        <div style={{ paddingLeft: 4, paddingRight: 0 }}>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <Button size="sm">{buttonName}</Button>
          </OverlayTrigger>
          </div>
      );
    }
  
    return (
      
      <div style={{ paddingLeft: 4, paddingRight: 0 }}>
        <OverlayTrigger placement="left" overlay={tooltip} >
          <Button size="sm" variant='secondary' onClick={() => handleUpdateCallback(taskId, value)}> {buttonName} </Button>
        </OverlayTrigger>
        </div>
    );
  }

  function getCorrectedState(status: string) {
    console.log("handleUpdateStatus Status: " + status);
    if (State.Complete === status) {
        return "COMPELETE";
    }

    return status
  }
  
  const StatusRow = ({ taskId, status}: {taskId: string, status: string} ) => {

    const [currentStatus, setStatus] = useState(getCorrectedState(status));

    console.log("Status here: " + status);

    function handleUpdateStatus(taskId: string, status: string) {
        // console.log("handleUpdateStatus Status: " + status);
        // if (State.Complete === status) {
        //     status = "COMPELETE";
        // }

        sao.updateStatus(taskId, status, () => setStatus(status));
    }

    return (
      <ButtonToolbar >
        
          <Status taskId={taskId} value='OPEN' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/> 
          <Status taskId={taskId} value='INPROGRESS' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='REVIEW' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='COMPELETE' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='BLOCKED' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
        
      </ButtonToolbar>
    
      );
  }
  
export default StatusRow;