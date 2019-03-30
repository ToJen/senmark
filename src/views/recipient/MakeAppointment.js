import _ from "lodash";
import faker from "faker";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Search, Grid, Image, List, Rating } from "semantic-ui-react";

const source = _.times(10, () => ({
  title: faker.name.jobTitle(),
  name: faker.name.firstName(),
  rating: Number(faker.random.number()) % 5,
  avatar: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, "$")
}));

const ProvidersList = ({ providers }) => {
  return (
    <List divided relaxed link>
      {providers.map((provider, i) => {
        return (
          <List.Item key={i}>
            <Image avatar src={provider.avatar} />
            <List.Content>
              <List.Header as="a">
                <>
                  {provider.name}
                  <Rating
                    icon="star"
                    defaultRating={provider.rating}
                    maxRating={5}
                    disabled
                  />
                </>
              </List.Header>
              <List.Description>
                <>
                  {provider.price}/hr
                  <Link to="/provider/profile">
                    <Button primary>View</Button>
                  </Link>
                </>
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

const MakeAppointment = ({ props }) => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const resetComponent = () => {
    setLoading(false);
    setResults([]);
    setValue("");
  };

  const handleResultSelect = (e, { result }) => setValue(result.name);

  const handleSearchChange = (e, { value }) => {
    setLoading(true);
    setValue(value);

    setTimeout(() => {
      if (value.length < 1) return resetComponent();

      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = result => re.test(result.name);

      setLoading(false);
      setResults(_.filter(source, isMatch));
    }, 300);
  };

  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true
          })}
          //   results={results}
          value={value}
          {...props}
        />
        <ProvidersList providers={results} />
      </Grid.Column>
    </Grid>
  );
};

export default MakeAppointment;
