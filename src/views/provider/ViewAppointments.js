import React, { useContext, useState } from "react";
import { Header } from "semantic-ui-react";
import Calendar from "../../components/calander";
import AppointmentDetailsModal from "../../components/AppointmentDetailsModal";
import { DataContext } from "../../contexts/DataContext";

export default function ViewAppointment() {
  const [isAppointmentModalOpen, toggleAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const {
    state: { appointments }
  } = useContext(DataContext);
  console.log(appointments);
  return (
    <>
      {isAppointmentModalOpen && (
        <AppointmentDetailsModal
          visible={isAppointmentModalOpen}
          toggleModal={() => toggleAppointmentModal(!isAppointmentModalOpen)}
          appointment={selectedAppointment}
        />
      )}
      <Header textAlign="center">Your Appointments</Header>
      {appointments ? (
        <Calendar
          dates={appointments.map(i => {
            return { ...i, title: i.recipient, due: i.date };
          })}
          onSelectEvent={event => {
            console.log(event);
            const { appointmentId } = event;
            const _selectedAppointment = appointments.find(
              i => i._id === appointmentId
            );
            console.log(_selectedAppointment);
            toggleAppointmentModal(!isAppointmentModalOpen);
            setSelectedAppointment(_selectedAppointment);
          }}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
}
