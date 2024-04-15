import { useState } from "react";
import { Button, ButtonToolbar, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";

const STATUS_MAP = new Map([
    ["INPROGRESS", "IP"],
    ["OPEN", "O"],
    ["COMPELETE", "C"]
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
    console.log("status: " + status);
  
    if (value === actual) {
      return (
        <Col>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <Button> {buttonName} </Button>
          </OverlayTrigger>
        </Col>
      );
    }
  
    return (
      <Col>
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Button variant='secondary' onClick={() => handleUpdateCallback(taskId, value)}> {buttonName} </Button>
        </OverlayTrigger>
      </Col>
    );
  }
  
  const StatusRow = ({ taskId, status}: {taskId: string, status: string} ) => {

    const [currentStatus, setStatus] = useState(status);

    console.log("Status here: " + status);

    function handleUpdateStatus(taskId: string, status: string) {
        sao.updateStatus(taskId, status, () => setStatus(status));
    }

    return (
      <ButtonToolbar >
        <Row>
          <Status taskId={taskId} value='OPEN' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/> 
          <Status taskId={taskId} value='INPROGRESS' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='COMPELETE' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
        </Row>
      </ButtonToolbar>
    
      );
  }
  
export default StatusRow;