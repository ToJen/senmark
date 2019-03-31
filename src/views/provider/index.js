import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Image } from "semantic-ui-react";

const ProviderHome = () => {
  return (
    <>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        circular
        size="small"
      />
      <Grid
        textAlign="center"
        style={{ marginTop: "40%", overflow: "hidden" }}
        verticalAlign="middle"
      >
        <Grid.Row centered>
          <Link to="/provider/view-requests">
            <Button primary size="massive">
              View Requests
            </Button>
          </Link>
        </Grid.Row>
        <Grid.Row centered>
          <Link to="/provider/view-appointments">
            <Button secondary size="massive">
              View Appointments
            </Button>
          </Link>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default ProviderHome;
