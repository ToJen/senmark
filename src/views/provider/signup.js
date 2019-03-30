import React, {  useState } from "react";
import { Form, Step,  Container } from "semantic-ui-react";

const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const BASIC_INFO = "BASIC_INFO";
const PREFERENCES = "PREFERENCES";
const SKILLS = "SKILLS";
const steps = {
  [BASIC_INFO]: { name: "Basic Info", completed: false, active: true },
  [PREFERENCES]: { name: "Preferences", completed: false, active: false },
  [SKILLS]: { name: "Skills", completed: false, active: false }
};
export default function ProviderSignup() {
  const [formState, updateFormState] = useState({});
  const [step, handleStepChange] = useState(steps);
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
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Phone"
                placeholder="Phone"
                onChange={handleChange}
              />
              <Form.Select
                fluid
                label="Gender"
                options={genderOptions}
                onChange={handleChange}
                placeholder="Gender"
              />
            </Form.Group>
            <Form.Button
              onClick={() => {
                handleStepChange(getUpdatedStep(BASIC_INFO, false, true));
                handleStepChange(getUpdatedStep(PREFERENCES, true, false));
              }}
            >
              Next
            </Form.Button>
          </Form>
        );
      case PREFERENCES:
        return (
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Location"
                placeholder="Location"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Hourly Rate"
                placeholder="Hourly Rate"
                onChange={handleChange}
              />
            </Form.Group >
            <Form.Group inline style={{ marginTop: "1rem" }}>
            <Form.Button
              onClick={() => {
                handleStepChange(getUpdatedStep(PREFERENCES, false, false));
                handleStepChange(getUpdatedStep(BASIC_INFO, true, false));
              }}
            >
              Back
            </Form.Button>
            <Form.Button
              onClick={() => {
                handleStepChange(getUpdatedStep(PREFERENCES, false, true));
                handleStepChange(getUpdatedStep(SKILLS, true, false));
              }}
            >
              Next
            </Form.Button>
            </Form.Group>
          </Form>
        );
      case SKILLS:
        return (
          <Form>
              <Form.Input
                fluid
                label="Qualifications"
                placeholder="Qualifications"
                onChange={handleChange}
              />
              <Form.Checkbox onChange={handleChange} label="Skill 1" />
              <Form.Checkbox onChange={handleChange} label="Skill 2" />
              <Form.Checkbox onChange={handleChange} label="Skill 3" />
              <Form.Checkbox onChange={handleChange} label="Skill 4" />
            <Form.TextArea
            //   label="About"
              placeholder="Tell us more about you..."
            />
            <Form.Checkbox label="I agree to the Terms and Conditions" />
            <Form.Group inline style={{ marginTop: "1rem" }}>
            <Form.Button
              onClick={() => {
                handleStepChange(getUpdatedStep(PREFERENCES, true, false));
                handleStepChange(getUpdatedStep(SKILLS, false, false));
              }}
            >
              Back
            </Form.Button>
            <Form.Button
              onClick={() => {
                handleStepChange(getUpdatedStep(SKILLS, true, true));
              }}
            >
              Submit
            </Form.Button>
            </Form.Group>
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
                <Container style={{marginTop:"1rem"}}>
            {renderSteps(s.active && k)}
                </Container>
            </Step.Content>
          </Step>
        ))}
      </Step.Group>
    </Container>
  );
}
