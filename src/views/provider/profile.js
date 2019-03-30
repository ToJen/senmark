import React from "react";
import { Grid, Container, Image, Segment, Rating } from "semantic-ui-react";

const ProviderProfile = ({ data }) => {
  return (
    <Container>
      <Grid stackable>
        <Grid.Column>
          <Segment.Group>
            <Segment className="provider-profile-header">
              <Image avatar src={data.avatar} />
            </Segment>
            <Segment>{data.name}</Segment>
            <Segment>{data.title}</Segment>
            <Segment>
              <Rating
                icon="star"
                defaultRating={data.rating}
                maxRating={5}
                disabled
              />
              <Segment>{data.price}</Segment>
              <Segment>About {data.distance}km from you</Segment>
              <Segment>
                Services
                {data.services.map((service, i) => {
                  return <Segment.Group children={service} key={i} />;
                })}
              </Segment>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ProviderProfile;
