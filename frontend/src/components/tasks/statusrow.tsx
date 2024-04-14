import { useState } from "react";
import { Button, ButtonToolbar, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";

const STATUS_MAP = new Map([
    ["INPROGRESS", "IP"],
    ["OPEN", "O"],
    ["COMPELETE", "C"]
  ]);

function handleUpdateStatus(taskId: string, status: string, successCallback: Function) {
    sao.updateStatus(taskId, status, successCallback);
}

const Status = ({ taskId, value, actual }: {taskId: string, value: string, actual: string} ) => {
    console.log("Value " + value + "; Actual: " + actual);

    const [status, setStatus] = useState(actual);
  
    const tooltip = (
      <Tooltip id="tooltip">
        {value}
      </Tooltip>);
  
    const buttonName = STATUS_MAP.get(value);
  
    if (actual === value) {
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
          <Button variant='secondary' onClick={() => handleUpdateStatus(taskId, actual, setStatus)}> {buttonName} </Button>
        </OverlayTrigger>
      </Col>
    );
  }
  
  const StatusRow = ({ taskId, status}: {taskId: string, status: string} ) => {

    console.log("Status here: " + status);

    return (
      <ButtonToolbar >
        <Row>
          <Status taskId={taskId} value='OPEN' actual={status} /> 
          <Status taskId={taskId} value='INPROGRESS' actual={status} />
          <Status taskId={taskId} value='COMPELETE' actual={status} />
        </Row>
      </ButtonToolbar>
    
      );
  }
  
export default StatusRow;