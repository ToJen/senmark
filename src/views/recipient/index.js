import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Image } from "semantic-ui-react";

const RecipientHome = () => {
  return (
    <>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        circular
        size="small"
      />
      <Grid
        textAlign="center"
        style={{ marginTop: "40%", overflow: "hidden" }}
        verticalAlign="middle"
      >
        <Grid.Row centered>
          <Link to="/recipient/make-appointment">
            <Button primary size="massive">
              Schedule Appointment
            </Button>
          </Link>
        </Grid.Row>
        <Grid.Row centered>
          <Link to="/recipient/view-appointments">
            <Button secondary size="massive">
              View Appointments
            </Button>
          </Link>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default RecipientHome;
