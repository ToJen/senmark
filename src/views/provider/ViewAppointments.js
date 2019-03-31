import React, { useContext, useState } from "react";
import { Header } from "semantic-ui-react";
import Calendar from "../../components/calander";
import AppointmentDetailsModal from "../../components/AppointmentDetailsModal";
import { DataContext } from "../../contexts/DataContext";

export default function ViewAppointment() {
  const [isAppointmentModalOpen, toggleAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const {
    state: { dates, appointments }
  } = useContext(DataContext);
  console.log(dates);
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
      <Calendar
        dates={dates}
        onSelectEvent={event => {
          console.log(event);
          const { appointmentId } = event;
          const _selectedAppointment = appointments.find(
            i => i._id === appointmentId
          );
          console.log(_selectedAppointment);
          toggleAppointmentModal(!isAppointmentModalOpen)
          setSelectedAppointment(_selectedAppointment);
        }}
      />
    </>
  );
}
