import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Icon,
  Form,
  Step,
  Button,
  TextArea,
  Modal,
  Grid
} from "semantic-ui-react";
import ProviderProfile from "../provider/profile";
import { DataContext } from "../../contexts/DataContext";

const AppointmentRequestModal = ({ provider, visible, toggleModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, updateFormState] = useState({});
  const {
    addAppointmentRequestToLocalStorage,
    state: { appointmentRequests }
  } = useContext(DataContext);

  const renderProfileStep = () => {
    return (
      <Container fluid>
        <div className="profile-step" hidden={activeStep !== 0}>
          <Grid centered>
            <Grid.Row centered>
              <ProviderProfile data={provider} />
            </Grid.Row>
            <Grid.Row centered>
              <Button.Group>
                <Button
                  labelPosition="right"
                  icon="right chevron"
                  content="Next"
                  onClick={() => setActiveStep(1)}
                />
              </Button.Group>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  };

  const renderFormStep = () => {
    return (
      <Container fluid>
        <div className="appointment-details-step" hidden={activeStep !== 1}>
          <Grid centered>
            <Grid.Row centered>
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
            </Grid.Row>

            <Grid.Row centered>
              <Button.Group>
                <Button
                  labelPosition="left"
                  icon="left chevron"
                  content="Back"
                  onClick={() => setActiveStep(0)}
                />
                <Button
                  labelPosition="right"
                  icon="right chevron"
                  content="Next"
                  onClick={() => setActiveStep(2)}
                />
              </Button.Group>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  };

  const renderPaymentStep = () => {
    return (
      <Container fluid>
        <div className="payment-step" hidden={activeStep !== 2}>
          <Grid centered>
            <Grid.Row centered>
              <Form>
                <Form.Input
                  label="Card Number"
                  onChange={(e, { value }) => {
                    updateFormState({ ...formState, cardNo: value });
                  }}
                />
                <Grid>
                  <Grid.Row columns={3} label="Expiration Date">
                    <Grid.Column>
                      <label>MM</label>
                      <Form.Input
                        type="number"
                        min={1}
                        max={12}
                        palceholder="MM"
                        onChange={(e, { value }) => {
                          updateFormState({ ...formState, month: value });
                        }}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label>YYYY</label>
                      <Form.Input
                        type="number"
                        min={2019}
                        palceholder="YYYY"
                        onChange={(e, { value }) => {
                          updateFormState({ ...formState, year: value });
                        }}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label>CVV</label>
                      <Form.Input
                        type="number"
                        min={0}
                        max={999}
                        palceholder="CVV"
                        onChange={(e, { value }) => {
                          updateFormState({ ...formState, cvv: value });
                        }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Row>

            <Grid.Row centered>
              <Button.Group>
                <Button
                  labelPosition="left"
                  icon="left chevron"
                  content="Back"
                  onClick={() => setActiveStep(1)}
                />
                <Button
                  labelPosition="right"
                  icon="right chevron"
                  content="Next"
                  onClick={() => {
                    setActiveStep(3);
                    addAppointmentRequestToLocalStorage({
                      _id: appointmentRequests.length,
                      provider: provider.name,
                      recipient: `John Ford`,
                      price: provider.price,
                      location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1"
                    });
                  }}
                />
              </Button.Group>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  };

  const renderFinalStep = () => {
    return (
      <Container fluid>
        <div className="confirmation-step" hidden={activeStep !== 3}>
          <Grid centered>
            <Grid.Row centered>
              <Link to="/recipient/home">
                <Button color="green">Submit</Button>
              </Link>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  };
  return (
    <Modal open={visible}>
      <Modal.Content scrolling>
        <Step.Group fluid>
          <Step active={activeStep === 0} completed={activeStep > 0}>
            <Icon name="user circle" />
            <Step.Content>
              <Step.Title>{provider.name}'s Profile</Step.Title>
              {renderProfileStep()}
            </Step.Content>
          </Step>

          <Step active={activeStep === 1} completed={activeStep > 1}>
            <Icon name="unordered list" />
            <Step.Content>
              <Step.Title>Appointment Details</Step.Title>
              {renderFormStep()}
            </Step.Content>
          </Step>

          <Step active={activeStep === 2} completed={activeStep > 2}>
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Payment</Step.Title>
              {renderPaymentStep()}
            </Step.Content>
          </Step>

          <Step active={activeStep === 3}>
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Receipt</Step.Title>
              {renderFinalStep()}
            </Step.Content>
          </Step>
        </Step.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => toggleModal()}>
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AppointmentRequestModal;
