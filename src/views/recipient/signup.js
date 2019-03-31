import React, { useState } from "react";
import { Form, Step, Container } from "semantic-ui-react";

const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
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
                    onChange={(e, {value}) =>{
                      updateFormState({...formState,  name: value }
                      )}}
                  />
                  <Form.Input
                    fluid
                    label="Your phone number"
                    placeholder="Phone"
                    onChange={(e, {value}) =>{
                      updateFormState({...formState,  phone: value }
                      )}}
                  />
                  <Form.Input
                    fluid
                    label="Relationship to them"
                    placeholder="e.g Spouse, Family Doctor, etc."
                    onChange={(e, {value}) =>{
                      updateFormState({...formState,  relationship: value }
                      )}}
                  />
                </>
              )}
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                onChange={(e, {value}) =>{
                  updateFormState({...formState,  relationName: value }
                  )}}
              />
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                onChange={(e, {value}) =>{
                  updateFormState({...formState,  email: value }
                  )}}
              />
              <Form.Input
                fluid
                label="Phone"
                placeholder="Phone"
                onChange={(e, {value}) =>{
                  updateFormState({...formState,  relationPhone: value }
                  )}}
              />
              <Form.Input
                fluid
                label="Location"
                placeholder="Location"
                onChange={(e, {value}) =>{
                  updateFormState({...formState,  location: value }
                  )}}
              />
              <Form.Select
                fluid
                label="Gender"
                options={genderOptions}
                onChange={(e, {value}) =>{
                  updateFormState({...formState,  gender: value }
                  )}}
                placeholder="Gender"
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
