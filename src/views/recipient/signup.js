import React, { useState } from "react";
import { Form, Step, Container } from "semantic-ui-react";

const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const languageOptions = [
  { key: "en", text: "English", value: "english" },
  { key: "fr", text: "French", value: "french" },
  { key: "es", text: "Spanish", value: "spanish" },
  { key: "pt", text: "Portugese", value: "portugese" }
];

const BASIC_INFO = "BASIC_INFO";
const steps = {
  [BASIC_INFO]: { name: "Basic Info", completed: false, active: true }
};
export default function RecipientSignup({history}) {
  const [formState, updateFormState] = useState({});
  const [step, handleStepChange] = useState(steps);
  const [onBehalf, setOnBehalf] = useState(false);
  const getUpdatedStep = (key, active, completed) => {
    let _step = { ...step };
    _step[key].active = active;
    _step[key].completed = completed;
    return _step;
  };
  const handleChange = (e, { value }) => updateFormState({ value });
  const renderSteps = target => {
    switch (target) {
      case BASIC_INFO:
        return (
          <Form>
            <Form.Group widths="equal">
              <Form.Checkbox
                label="I'm registering on behalf of someone else"
                onChange={() => setOnBehalf(!onBehalf)}
              />
              {onBehalf && (
                <>
                  <Form.Input
                    fluid
                    label="Your name"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                  <Form.Input
                    fluid
                    label="Your phone number"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                  <Form.Input
                    fluid
                    label="Relationship to them"
                    placeholder="e.g Spouse, Family Doctor, etc."
                    onChange={handleChange}
                  />
                </>
              )}
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Age"
                placeholder="Age"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Phone"
                placeholder="Phone"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Address"
                placeholder="Address"
                onChange={handleChange}
              />
              <Form.Select
                fluid
                label="Gender"
                options={genderOptions}
                onChange={handleChange}
                placeholder="Gender"
              />
              <Form.Select
                fluid
                label="Languages Spoken"
                options={languageOptions}
                onChange={handleChange}
                placeholder=""
              />
            </Form.Group>
            <Form.Button
              onClick={() => {
                handleStepChange(getUpdatedStep(BASIC_INFO, true, true));
                history.push("/recipient/home")
              }}
            >
              Submit
            </Form.Button>
          </Form>
        );
      default:
        break;
    }
  };
  return (
    <Container style={{ margin: "1rem", textAlign: "center" }}>
      <Step.Group ordered vertical>
        {Object.entries(step).map(([k, s]) => (
          <Step key={k} active={s.active} completed={s.completed}>
            <Step.Content>
              <Step.Title>{s.name}</Step.Title>
            </Step.Content>
            <Step.Content>
              <Container style={{ marginTop: "1rem" }}>
                {renderSteps(s.active && k)}
              </Container>
            </Step.Content>
          </Step>
        ))}
      </Step.Group>
    </Container>
  );
}
