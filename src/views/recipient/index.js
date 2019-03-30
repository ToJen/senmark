import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid } from "semantic-ui-react";

const RecipientHome = () => {
  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Link to="/recipient/make-appointment">
          <Button primary>Make Appointment</Button>
        </Link>
        <Link to="/recipient/view-appointments">
        <Button secondary>View Appointments</Button>
        </Link>
      </Grid.Column>
    </Grid>
  );
};

export default RecipientHome;
