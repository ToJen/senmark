import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";

const RecipientHome = () => {
  return (
    <Grid textAlign='center' style={{ marginTop: '60%' }} verticalAlign='middle'>
      <Grid.Row centered>
        <Link to="/recipient/make-appointment">
          <Button primary size="massive">Make Appointment</Button>
        </Link>
      </Grid.Row>
      <Grid.Row centered>
        <Link to="/recipient/view-appointments">
        <Button secondary size="massive">View Appointments</Button>
        </Link>
      </Grid.Row>
    </Grid>
  );
};

export default RecipientHome;
