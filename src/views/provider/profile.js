import React from "react";
import {
  Button,
  Container,
  Image,
  Card,
  Segment,
  Rating
} from "semantic-ui-react";
import faker from "faker";

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black"
];

const getRandomColor = () => {
  return colors[Number(faker.random.number({ min: 1, max: colors.length }))];
};

const ProviderProfile = ({ data }) => {
  return (
    <Container fluid>
      <Card centered fluid>
        <Image src={data.avatar} fluid centered />
        <Card.Content>
          <Card.Header>{data.name}</Card.Header>
          <Card.Meta>
            <Rating
              icon="star"
              defaultRating={data.rating}
              maxRating={5}
              disabled
            />
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <Segment>{data.price}/hr</Segment>
          <Segment>About {data.distance}km from you</Segment>
          <Segment>{data.gender}</Segment>
        </Card.Content>
        <Card.Content>
          <Card.Description>Services</Card.Description>
          {data.services.map((service, i) => {
            return (
              <Button
                children={service}
                key={i}
                disabled
                color={getRandomColor()}
              />
            );
          })}
        </Card.Content>
        <Card.Content>
          <Card.Description>Languages Spoken</Card.Description>
          {data.languages.map((language, i) => {
            return (
              <Button
                children={language}
                key={i}
                disabled
                color={getRandomColor()}
              />
            );
          })}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default ProviderProfile;
