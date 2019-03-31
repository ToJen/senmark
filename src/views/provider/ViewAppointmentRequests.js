import React, { useContext, useState } from "react";
import { Button, List, Loader, Grid, Header } from "semantic-ui-react";
import { DataContext } from "../../contexts/DataContext";
import ConfirmRequestModal from "./ConfirmRequestModal";

const ViewAppointmentRequests = () => {
  const {
    state: { appointmentRequests }
  } = useContext(DataContext);
  const [isModalOpen, toggleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  console.log(appointmentRequests);

  if (appointmentRequests)
    return (
      <>
        {isModalOpen && (
          <ConfirmRequestModal
            visible={isModalOpen}
            toggleModal={() => toggleModal(!isModalOpen)}
            appointment={selectedAppointment}
          />
        )}
        <Grid>
          <Grid.Row centered>
            <Header>Appointment Requests</Header>
          </Grid.Row>
          {appointmentRequests &&
            appointmentRequests.map((appointment, i) => {
              return (
                <Grid.Row centered key={i}>
                  <List divided relaxed>
                    <List.Item>
                      <List.Content>
                        <List.Header>{appointment.recipient}</List.Header>
                        <List.Description as="a">
                          <Grid.Column>{appointment.price}</Grid.Column>
                          <Grid.Column>
                            <Button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                toggleModal(!isModalOpen);
                              }}
                            >
                              View
                            </Button>
                          </Grid.Column>
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Row>
              );
            })}
        </Grid>
      </>
    );
  return <Loader />;
};

export default ViewAppointmentRequests;
