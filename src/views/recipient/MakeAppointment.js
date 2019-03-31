import _ from "lodash";
import faker from "faker";
import React, { useState } from "react";
import {
  Button,
  Search,
  Grid,
  Image,
  List,
  Rating,
  Form,
  Container
} from "semantic-ui-react";
import AppointmentRequestModal from "./AppointmentRequestModal";

const languageOptions = [
  { key: "en", text: "English", value: "English" },
  { key: "fr", text: "French", value: "French" },
  { key: "es", text: "Spanish", value: "Spanish" },
  { key: "pt", text: "Portugese", value: "Portugese" }
];
const tasks = [
  { key: "bt", text: "Bathing", value: "Bathing" },
  { key: "dr", text: "Dressing", value: "Dressing" },
  { key: "lh", text: "Light Homekeeping", value: "Light Homekeeping" },
  { key: "so", text: "Socialization", value: "Socialization" },
  { key: "hc", text: "Haircare", value: "Haircare" },
  { key: "sc", text: "Skincare", value: "Skincare" },
  { key: "tl", text: "Toileting", value: "Toileting" },
  { key: "lf", text: "Lifts", value: "Lifts" },
  { key: "tr", text: "Transfers", value: "Transfers" },
  { key: "ot", text: "Other", value: "Other" }
];
const genderOptions = [
  { key: "m", text: "Male", value: "Male" },
  { key: "f", text: "Female", value: "Female" }
];

const source = [
  {
    title: "John Ford",
    name: "John Ford",
    rating: 4,
    avatar: faker.internet.avatar(),
    price: "$200",
    distance: 3,
    services: ["Haircare", "Skincare"],
    languages: ["English", "French"],
    gender: "Male"
  },
  ..._.times(9, () => {
    const gender =
      genderOptions[Number(faker.random.number({ min: 0, max: 1 }))].text;

    return {
      title: faker.name.title(),
      gender,
      name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
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
      )
    };
  })
];
console.log({ source });
const ProvidersList = ({ providers }) => {
  const [isRequestModalOpen, toggleRequestModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState({});
  return (
    <>
      {isRequestModalOpen && (
        <AppointmentRequestModal
          visible={isRequestModalOpen}
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
  const [formState, updateFormState] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState(source);
  const [value, setValue] = useState("");

  const resetComponent = () => {
    setLoading(false);
    setResults(source);
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
      handleFilterChange(null, null);
    }, 300);
  };

  const handleFilterChange = async (key, value) => {
    setLoading(true);
    const state = key ? { ...formState, [key]: value } : formState;
    await new Promise(r => setTimeout(r, 300));

    const result = source.filter(provider => {
      const res = Object.entries(state)
        .map(([k, v]) => {
          return Array.isArray(provider[k])
            ? provider[k].some(e => v.includes(e))
            : Array.isArray(v)
            ? v.every(e => provider[k].toString() === e.toString())
            : v && v.length < 1
            ? true
            : provider[k].toString() === `${v}`;
        })
        .every(i => i);
      return res;
    });
    if (result.length > 0) {
      setResults(result);
    }
    setLoading(false);
    key && updateFormState(state);
  };

  return (
    <Container style={{ margin: "1rem" }}>
      <Form.Group widths="equal">
        <Search
          style={{ textAlign: "center" }}
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true
          })}
          showNoResults={false}
          value={value}
          {...props}
        />
        <Form.Select
          fluid
          label="Tasks"
          options={tasks}
          onChange={(e, { value }) => {
            handleFilterChange("services", value);
          }}
          placeholder=""
          multiple
        />

        <Form.Input
          fluid
          label="Location"
          placeholder="Location"
          onChange={(e, { value }) => {
            handleFilterChange("distance", value);
          }}
        />
        <Form.Select
          fluid
          label="Languages"
          options={languageOptions}
          onChange={(e, { value }) => {
            handleFilterChange("languages", value);
          }}
          placeholder=""
          multiple
        />
        <Form.Select
          fluid
          label="Gender"
          options={genderOptions}
          onChange={(e, { value }) => {
            handleFilterChange("gender", value);
          }}
          placeholder=""
          multiple
        />
      </Form.Group>
      <ProvidersList providers={results} />
    </Container>
  );
};

export default MakeAppointment;
