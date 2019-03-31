import React from "react";
import { Button, Icon, Card, Image, Modal, Segment } from "semantic-ui-react";
import faker from "faker";

const AppointmentDetailsModal = ({ visible, appointment, toggleModal }) => {
  return (
    <Modal open={visible}>
      <Modal.Content>
        <Card.Group>
          <Card>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src={faker.internet.avatar()}
              />
              <Card.Header>Appointment Details</Card.Header>
              <Card.Meta> {"<2 km away"}</Card.Meta>
              <Card.Description>
                {appointment && Object.keys(appointment).map((item, i) => {
                    if(item !== "_id") return <Segment.Group children={`${item}: ${appointment[item]}`} key={i} />;
                })}
              </Card.Description>
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
};

export default AppointmentDetailsModal;
