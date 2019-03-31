import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import { DataContext } from "../../contexts/DataContext";

const ProviderHome = () => {
  const {
    state: { appointments }
  } = useContext(DataContext);

  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Link to="/provider/view-appointment-requests">
          <Button primary>View Appointment Requests</Button>
        </Link>
        <Link to="/provider/view-appointments">
          <Button secondary>View Appointments</Button>
          {appointments &&
            appointments.map((a, i) => <pre key={i}>{JSON.stringify(a)}</pre>)}
        </Link>
      </Grid.Column>
    </Grid>
  );
};

export default ProviderHome;
