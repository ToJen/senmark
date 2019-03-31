import React from "react";

import { Grid, Button, Icon, Card, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function renderRoles() {
  return (
    <Container fluid style={{ marginTop: "1rem" }}>
      <Grid
        columns={2}
        textAlign="center"
        style={{ marginTop: "60%" }}
        verticalAlign="middle"
      >
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
              <Card.Content>
                <Card.Header textAlign={"center"}>
                  <Grid>
                    <Grid.Row centered>{"I want to help"}</Grid.Row>
                    <Grid.Row centered>
                      <Link to={"/provider/signup"}>
                        <Button animated>
                          <Button.Content visible>Provider</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      </Link>
                    </Grid.Row>
                  </Grid>
                </Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
              <Card.Content>
                <Card.Header textAlign={"center"}>
                  <Grid>
                    <Grid.Row centered>{"I want some help"}</Grid.Row>
                    <Grid.Row centered>
                      <Link to={"/recipient/signup"}>
                        <Button animated>
                          <Button.Content visible>Recipient</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      </Link>
                    </Grid.Row>
                  </Grid>
                </Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
