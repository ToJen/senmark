import React from "react";
import { Button, Card, Image, Modal, Icon } from "semantic-ui-react";

const ConfirmRequestModal = ({ appointment, toggleModal, visible }) => (
  <Modal open={visible}>
    <Modal.Content>
      <Card.Group>
        <Card>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />
            <Card.Header>New Appointment Request</Card.Header>
            <Card.Meta> {"<2 km away"}</Card.Meta>
            <Card.Description>
              {appointment.recipient} wants to meet you on A at B for $C to do X, Y
              &amp; Z
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Accept
              </Button>
              <Button basic color="red">
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={() => toggleModal()}>
        <Icon name="remove" /> Close
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ConfirmRequestModal;
