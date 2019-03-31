import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";

const ProviderHome = () => {

  return (
    <Grid textAlign='center' style={{ marginTop: '60%' }} verticalAlign='middle'>
      <Grid.Row centered>
        <Link to="/provider/view-requests">
          <Button primary size="massive">View Requests</Button>
        </Link>
      </Grid.Row>
      <Grid.Row centered>
        <Link to="/provider/view-appointments">
        <Button secondary size="massive">View Appointments</Button>
        </Link>
      </Grid.Row>
    </Grid>
  );
};

export default ProviderHome;
