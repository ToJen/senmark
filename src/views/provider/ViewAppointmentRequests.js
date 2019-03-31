import React, { useContext, useState } from "react";
import { Button, List, Loader } from "semantic-ui-react";
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
        {appointmentRequests &&
          appointmentRequests.map((appointment, i) => {
            return (
              <List divided relaxed key={i}>
                <List.Item>
                  {/* <List.Icon name="github" size="large" verticalAlign="middle" /> */}
                  <List.Content>
                    <List.Header>{appointment.recipient}</List.Header>
                    <List.Description as="a">
                      Updated 10 mins ago
                      <Button onClick={() => {
                          setSelectedAppointment(appointment);
                          toggleModal(!isModalOpen);
                      }}>View</Button>
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            );
          })}
      </>
    );
  return <Loader />;
};

export default ViewAppointmentRequests;
