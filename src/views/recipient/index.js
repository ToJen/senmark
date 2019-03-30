import React from "react";
import { Button, Container, Grid, Segment } from "semantic-ui-react";

const RecipientHome = () => {
  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Segment>Make Appointment</Segment>
        <Segment>View Appointments</Segment>
      </Grid.Column>
    </Grid>
  );
};

export default RecipientHome;
