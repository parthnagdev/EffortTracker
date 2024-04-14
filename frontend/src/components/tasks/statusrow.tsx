import { Button, ButtonToolbar, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const STATUS_MAP = new Map([
    ["INPROGRESS", "IP"],
    ["REVIEW", "R"],
    ["DONE", "D"]
  ]);

const Status = ({ value, actual }: {value: string, actual: string} ) => {
    console.log("Value " + value + "; Actual: " + actual);
  
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
          <Button variant='secondary'> {buttonName} </Button>
        </OverlayTrigger>
      </Col>
    );
  }
  
  const StatusRow = ({ status }: {status: string} ) => {
    return (
      <ButtonToolbar >
        <Row>
          <Status value='INPROGRESS' actual={status} /> 
          <Status value='REVIEW' actual={status} />
          <Status value='DONE' actual={status} />
        </Row>
      </ButtonToolbar>
    
      );
  }
  
export default StatusRow;