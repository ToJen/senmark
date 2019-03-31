import React, { useContext } from "react";
import {
  Button,
  Card,
  Image,
  Modal,
  Icon,
  Grid,
  List
} from "semantic-ui-react";
import { DataContext } from "../../contexts/DataContext";

const ConfirmRequestModal = ({ appointment, toggleModal, visible }) => {
  console.log(appointment);

  const { removeAppointmentRequest, appendAppointment } = useContext(DataContext);

  return (
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
                <Grid>
                  <Grid.Row textAlign="justified">
                    {appointment.recipient} wants to meet with you
                    <br />
                    <br />
                    When: {appointment.date} at {appointment.time}
                    <br />
                    <br />
                    Location: {appointment.location}
                    <br />
                    <br />
                    Price: {appointment.price}
                  </Grid.Row>
                  <Grid.Row textAlign="justified">
                    Tasks:
                    <br />
                    <br />
                    <List>
                      {appointment && appointment.services && appointment.services.map((service, i) => {
                        return <List.Item key={i}>{service}</List.Item>;
                      })}
                    </List>
                  </Grid.Row>
                </Grid>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={() => {
                  appendAppointment(appointment._id);
                  toggleModal();
                  window.location.href = "/provider/view-appointments";
                }}>
                  Accept
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => {
                    removeAppointmentRequest(appointment._id);
                    toggleModal();
                  }}
                >
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
};

export default ConfirmRequestModal;
