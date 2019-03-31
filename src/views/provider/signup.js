import React, { useState } from "react";
import {
  Form,
  Step,
  Container,
  Loader,
  Dimmer,
  Segment
} from "semantic-ui-react";

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

const taskOptions = [
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

const BASIC_INFO = "BASIC_INFO";
const PREFERENCES = "PREFERENCES";
const SKILLS = "SKILLS";
const steps = {
  [BASIC_INFO]: { name: "Basic Info", completed: false, active: true },
  [PREFERENCES]: { name: "Preferences", completed: false, active: false },
  [SKILLS]: { name: "Skills", completed: false, active: false }
};
export default function ProviderSignup({ history }) {
  const [formState, updateFormState] = useState({});
  const [step, handleStepChange] = useState(steps);
  const [loading, setLoading] = useState(false);
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
          <>
            <Dimmer.Dimmable as={Segment} dimmed={loading}>
              <Dimmer active={loading} inverted>
                <Loader content="Verifying..." />
              </Dimmer>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Name"
                    placeholder="Name"
                    onChange={(e, { value }) => {
                      updateFormState({ ...formState, name: value });
                    }}
                  />
                  <Form.Input
                    fluid
                    label="Email"
                    placeholder="Email"
                    onChange={(e, { value }) => {
                      updateFormState({ ...formState, email: value });
                    }}
                  />
                  <Form.Input
                    fluid
                    label="Phone"
                    placeholder="Phone"
                    onChange={(e, { value }) => {
                      updateFormState({ ...formState, phone: value });
                    }}
                  />
                  <Form.Select
                    fluid
                    label="Gender"
                    options={genderOptions}
                    onChange={(e, { value }) => {
                      updateFormState({ ...formState, gender: value });
                    }}
                    placeholder="Gender"
                  />
                </Form.Group>
                <Form.Button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(true);
                      handleStepChange(getUpdatedStep(BASIC_INFO, false, true));
                      handleStepChange(
                        getUpdatedStep(PREFERENCES, true, false)
                      );
                    }, 1e3);
                  }}
                >
                  Next
                </Form.Button>
              </Form>
            </Dimmer.Dimmable>
          </>
        );
      case PREFERENCES:
        return (
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Location"
                placeholder="Location"
                onChange={(e, { value }) => {
                  updateFormState({ ...formState, location: value });
                }}
              />
              <Form.Input
                fluid
                label="Hourly Rate"
                placeholder="Hourly Rate"
                onChange={(e, { value }) => {
                  updateFormState({ ...formState, hourlyRate: value });
                }}
              />
            </Form.Group>
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
            <Form.Select
              fluid
              label="Languages Spoken"
              options={languageOptions}
              onChange={(e, { value }) => {
                updateFormState({ ...formState, languageOptions: value });
              }}
              placeholder=""
              multiple
            />
            <Form.Select
              fluid
              label="Tasks"
              options={taskOptions}
              onChange={(e, { value }) => {
                updateFormState({ ...formState, tasks: value });
              }}
              placeholder=""
              multiple
            />
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
                  history.push("/provider/home");
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
