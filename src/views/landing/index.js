import React, { Component, useState } from "react";

import {
  Grid,
  Button,
  Icon,
  Card,
  Image,
  Container,
  Header,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { Link } from "react-router-dom";
function renderRoles() {
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

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const Heading = ({ mobile, toggleRoles }) => (
  <Container text>
    <Header
      as="h1"
      content="Welcome to Senmark"
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
        color: "#1678c2"
      }}
    />
    <Header
      as="h2"
      content="Get whatever help you want when you want."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button primary size="huge" onClick={() => toggleRoles(true)}>
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em", height: "100%" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a">Careers</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => this.props.toggleRoles(true)}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <Heading toggleRoles={this.props.toggleRoles} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}
class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em", height: "100%" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => this.props.toggleRoles(true)}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <Heading mobile toggleRoles={this.props.toggleRoles} />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

const ResponsiveContainer = ({ children, toggleRoles }) => (
  <>
    <DesktopContainer toggleRoles={toggleRoles}>{children}</DesktopContainer>
    <MobileContainer toggleRoles={toggleRoles}>{children}</MobileContainer>
  </>
);

export default function Landing() {
  const [showRoles, toggleRoles] = useState(false);
  return (
    <ResponsiveContainer toggleRoles={toggleRoles}>
      {showRoles && renderRoles()}
    </ResponsiveContainer>
  );
}
