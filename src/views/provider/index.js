import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid } from "semantic-ui-react";

const ProviderHome = () => {
  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Link to="/provider/view-appointment-requests">
          <Button primary>View Appointment Requests</Button>
        </Link>
        <Link to="/provider/view-appointments">
        <Button secondary>View Appointments</Button>
        </Link>
      </Grid.Column>
    </Grid>
  );
};

export default ProviderHome;
