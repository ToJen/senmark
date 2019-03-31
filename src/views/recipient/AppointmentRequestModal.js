import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Icon,
  Form,
  Step,
  Button,
  TextArea
} from "semantic-ui-react";
import ProviderProfile from "../provider/profile";
import { DataContext } from "../../contexts/DataContext";

const AppointmentRequestModal = ({ provider }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, updateFormState] = useState({});
  const { addAppointmentToLocalStorage } = useContext(DataContext);
  //   unstackable step.group
  return (
    <Container>
      <Step.Group>
        <Step active={activeStep === 0} completed={activeStep > 0}>
          <Icon name="user circle" />
          <Step.Content>
            <Step.Title>{provider.name}'s Profile</Step.Title>
          </Step.Content>
        </Step>

        <Step active={activeStep === 1} completed={activeStep > 1}>
          <Icon name="unordered list" />
          <Step.Content>
            <Step.Title>Appointment Details</Step.Title>
          </Step.Content>
        </Step>

        <Step active={activeStep === 2} completed={activeStep > 2}>
          <Icon name="payment" />
          <Step.Content>
            <Step.Title>Payment</Step.Title>
          </Step.Content>
        </Step>

        <Step active={activeStep === 3}>
          <Icon name="info" />
          <Step.Content>
            <Step.Title>Receipt</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>

      <Container>
        <div className="profile-step" hidden={activeStep !== 0}>
          <ProviderProfile data={provider} />
          <Button onClick={() => setActiveStep(1)}>Next</Button>
        </div>
        <div className="appointment-details-step" hidden={activeStep !== 1}>
          <Form>
            <Form.Input
              type="time"
              label="Time"
              onChange={(e, { value }) => {
                updateFormState({ ...formState, time: value });
              }}
            />
            <Form.Input
              type="date"
              label="Date"
              onChange={(e, { value }) => {
                updateFormState({ ...formState, date: value });
              }}
            />
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              label="Other details"
              onChange={(e, { value }) => {
                updateFormState({ ...formState, otherDetails: value });
              }}
            />
          </Form>
          <Button
            onClick={() => {
              setActiveStep(2);
            }}
          >
            Next
          </Button>
        </div>
        <div className="appointment-details-step" hidden={activeStep !== 2}>
          <Form>
            <Form.Input
              label="Card Number"
              onChange={(e, { value }) => {
                updateFormState({ ...formState, cardNo: value });
              }}
            />
            <Form.Group label="Expiration Date">
              <Form.Input
                type="number"
                min={1}
                max={12}
                palceholder="MM"
                onChange={(e, { value }) => {
                  updateFormState({ ...formState, month: value });
                }}
              />
              <Form.Input
                type="number"
                min={2019}
                palceholder="YYYY"
                onChange={(e, { value }) => {
                  updateFormState({ ...formState, year: value });
                }}
              />
              <Form.Input
                type="number"
                min={0}
                max={999}
                palceholder="CVV"
                onChange={(e, { value }) => {
                  updateFormState({ ...formState, cvv: value });
                }}
              />
            </Form.Group>
          </Form>
          <Button
            onClick={() => {
              setActiveStep(3);
              addAppointmentToLocalStorage({ formState, provider });
            }}
          >
            Confirm
          </Button>
        </div>
        <div className="appointment-details-step" hidden={activeStep !== 3}>
          <Link to="/recipient/home">
            <Button>Done</Button>
          </Link>
        </div>
      </Container>
    </Container>
  );
};

export default AppointmentRequestModal;
