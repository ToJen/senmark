import React from "react";

import {
  Grid,
  Button,
  Icon,
  Card,
  Image,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function renderRoles() {
    return (
      <Container fluid style={{ marginTop: "1rem" }}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                <Card.Content>
                  <Card.Header textAlign={"center"}>
                    <Link to={"/provider/signup"}>
                      <Button animated>
                        <Button.Content visible>Provider</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow right" />
                        </Button.Content>
                      </Button>
                    </Link>
                  </Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                <Card.Content>
                  <Card.Header textAlign={"center"}>
                    <Link to={"/recipient/signup"}>
                      <Button animated>
                        <Button.Content visible>Recipient</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow right" />
                        </Button.Content>
                      </Button>
                    </Link>
                  </Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }