import _ from "lodash";
import faker from "faker";
import React, { useState } from "react";
import { Button, Search, Grid, Image, List, Rating } from "semantic-ui-react";
import AppointmentRequestModal from "./AppointmentRequestModal";

const languageOptions = [
  { key: "en", text: "English", value: "english" },
  { key: "fr", text: "French", value: "french" },
  { key: "es", text: "Spanish", value: "spanish" },
  { key: "pt", text: "Portugese", value: "portugese" }
];
const tasks = [
  { key: "bt", text: "Bathing", value: "bathing" },
  { key: "dr", text: "Dressing", value: "dressing" },
  { key: "lh", text: "Light Homekeeping", value: "lightHomekeeping" },
  { key: "so", text: "Socialization", value: "socialization" },
  { key: "hc", text: "Haircare", value: "haircare" },
  { key: "sc", text: "Skincare", value: "skincare" },
  { key: "tl", text: "Toileting", value: "toileting" },
  { key: "lf", text: "Lifts", value: "lifts" },
  { key: "tr", text: "Transfers", value: "transfers" },
  { key: "ot", text: "Other", value: "other" }
];
const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];
const source = _.times(10, () => ({
  title: faker.name.title(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  rating: Number(faker.random.number()) % 5,
  avatar: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, "$"),
  distance: Number(faker.random.number()) % 6,
  services: _.times(
    Number(faker.random.number({ min: 1, max: tasks.length })),
    i => tasks[i].text
  ),
  languages: _.times(
    Number(faker.random.number({ min: 1, max: languageOptions.length })),
    i => languageOptions[i].text
  ),
  gender: genderOptions[Number(faker.random.number({ min: 0, max: 1 }))].text
}));
console.log({ source });
const ProvidersList = ({ providers }) => {
  const [isRequestModalOpen, toggleRequestModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState({});
  return (
    <>
      {isRequestModalOpen && (
        <AppointmentRequestModal
          toggleModal={() => toggleRequestModal(!isRequestModalOpen)}
          provider={selectedProvider}
        />
      )}
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
                    {provider.services.length}{" "}
                    {provider.services.length === 1 ? "skill" : "skills"}
                  </>
                </List.Header>
                <List.Description>
                  <>
                    {provider.price}/hr &nbsp;
                    {provider.distance}km
                    <Button
                      primary
                      onClick={() => {
                        toggleRequestModal(!isRequestModalOpen);
                        setSelectedProvider(provider);
                      }}
                    >
                      View
                    </Button>
                  </>
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </>
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
          noResultsMessage=""
          value={value}
          {...props}
        />
        <ProvidersList providers={results} />
      </Grid.Column>
    </Grid>
  );
};

export default MakeAppointment;
