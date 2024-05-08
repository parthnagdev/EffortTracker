import { State } from "api";
import { useEffect, useState } from "react";
import { Button, ButtonToolbar, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";
import { Button as PButton } from 'primereact/button';

const STATUS_MAP = new Map([
    ["INPROGRESS", "I"],
    ["OPEN", "IQ"],
    ["COMPLETE", "D"],
    ["REVIEW", "R"],
    ["BLOCKED", "B"]
  ]);

  const STATUS_TO_SEVERITY_MAP: Map<string, SevType> = new Map([
    ["INPROGRESS", "info"],
    ["OPEN", "secondary"],
    ["COMPLETE", "success"],
    ["REVIEW", "warning"],
    ["BLOCKED", "danger"]
  ]);

  const STATUS_TO_TOOLTIP_MAP: Map<string, string> = new Map([
    ["INPROGRESS", "Inprogress"],
    ["OPEN", "Input Queue"],
    ["COMPLETE", "Done"],
    ["REVIEW", "Review"],
    ["BLOCKED", "Blocked"]
  ]);

type SevType = 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | undefined;

const Status = ({ taskId, value, actual, handleUpdateCallback }: {taskId: string, value: string, actual: string, handleUpdateCallback: Function} ) => {
    console.log("Value " + value + "; Actual: " + actual);
  
    const tooltip = (
      <Tooltip id="tooltip">
        {STATUS_TO_TOOLTIP_MAP.get(value)!}
      </Tooltip>);
  
    const buttonName = STATUS_MAP.get(value);

    console.log("value: " + value);
    console.log("Button name: " + buttonName);
    console.log("status: " + actual);

    const sev: SevType = STATUS_TO_SEVERITY_MAP.get(value)!;
  
    if (value === actual) {

      if (value === 'BLOCKED') {
        return (
        
          <div style={{ paddingLeft: 4, paddingRight: 0 }}>
            <OverlayTrigger placement="left" overlay={tooltip}>
             <Button size="sm" onClick={() => handleUpdateCallback(taskId, value)} variant="outline-danger" aria-label="Cancel" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg> </Button>
            </OverlayTrigger>
            </div>
        );
      }

      return (
        
        <div style={{ paddingLeft: 4, paddingRight: 0 }}>
          <OverlayTrigger placement="left" overlay={tooltip}>
          <Button size="sm" variant={sev}  onClick={() => handleUpdateCallback(taskId, value)} aria-label="Cancel" > {buttonName} </Button>
          </OverlayTrigger>
          </div>
      );
    }

    if (value === 'BLOCKED') {
      return (
      
        <div style={{ paddingLeft: 4, paddingRight: 0 }}>
          <OverlayTrigger placement="left" overlay={tooltip}>
          <Button size="sm" onClick={() => handleUpdateCallback(taskId, value)} variant="outline-link" aria-label="Cancel" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg> </Button>
          </OverlayTrigger>
          </div>
      );
    }
  
    return (
      
      <div style={{ paddingLeft: 4, paddingRight: 0 }}>
        <OverlayTrigger placement="left" overlay={tooltip} >
          {/* <Button size="sm" variant='secondary' onClick={() => handleUpdateCallback(taskId, value)}> {buttonName} </Button> */}
          <Button size="sm" variant="outline-link"  onClick={() => handleUpdateCallback(taskId, value)} aria-label="Cancel" > {buttonName} </Button>
        </OverlayTrigger>
        </div>
    );
  }
  
  const StatusRow = ({ taskId, status, refresh}: {taskId: string, status: string, refresh: Function} ) => {

    const [currentStatus, setStatus] = useState(status);

    useEffect(() => {
      setStatus(status);
    }, [status]);

    function handleUpdateStatus(taskId: string, status: string) {
        // console.log("handleUpdateStatus Status: " + status);
        // if (State.Complete === status) {
        //     status = "COMPELETE";
        // }

        setStatus(status);
        sao.updateStatus(taskId, status, () => {
              refresh();
        });
    }

    return (
      <ButtonToolbar >
        
          <Status taskId={taskId} value='OPEN' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/> 
          <Status taskId={taskId} value='INPROGRESS' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='REVIEW' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='COMPLETE' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
          <Status taskId={taskId} value='BLOCKED' actual={currentStatus} handleUpdateCallback={handleUpdateStatus}/>
        
      </ButtonToolbar>
    
      );
  }
  
export default StatusRow;