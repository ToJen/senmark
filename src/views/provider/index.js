import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";

const ProviderHome = () => {
  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Link to="/provider/view-requests">
          <Button primary>View Requests</Button>
        </Link>
        <Link to="/provider/view-appointments">
        <Button secondary>View Appointments</Button>
        </Link>
      </Grid.Column>
    </Grid>
  );
};

export default ProviderHome;
