import React, { createContext, useState, useEffect } from "react";
import faker from "faker";
import _ from "lodash";

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

const stubAppointments = [
  {
    _id: 0,
    recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
    price: faker.finance.amount(0, 100, 2, "$"),
    location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
    date: new Date().setDate(new Date().getDate()),
    time: new Date().getTime(),
    services: ["bathing", "dressing", "toileting"]
  },
  {
    _id: 1,
    recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
    price: faker.finance.amount(0, 100, 2, "$"),
    date: new Date().setDate(new Date().getDate()-1),
    time: new Date().getTime(),
    location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
    services: ["hair care", "skin care", "toileting"]
  },
  {
    _id: 2,
    recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
    price: faker.finance.amount(0, 100, 2, "$"),
    date: new Date().setDate(new Date().getDate()+1),
    time: new Date().getTime(),
    location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
    services: ["dressing", "light homekeeping", "socialization"]
  }
];

const stubAppointmentRequests = _.times(10, index => ({
  _id: index,
  recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
  provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
  price: faker.finance.amount(0, 100, 2, "$"),
  location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
  services: _.times(
    Number(faker.random.number({ min: 1, max: tasks.length })),
    i => tasks[i].text
  )
}));

const DataContext = createContext();

const fetchAppointmentRequestsFromLocalStorage = () => {
  return localStorage.getItem("appointmentRequests")
    ? JSON.parse(localStorage.getItem("appointmentRequests"))
    : stubAppointmentRequests;
};

const fetchAppointmentFromLocalStorage = () => {
  return localStorage.getItem("appointments")
    ? JSON.parse(localStorage.getItem("appointments"))
    : stubAppointments;
};

const DataProvider = props => {
  const [state, setState] = useState({
    appointments: fetchAppointmentFromLocalStorage(),
    appointmentRequests: fetchAppointmentRequestsFromLocalStorage()
  });

  const addAppointmentRequestToLocalStorage = appointmentRequest => {
    localStorage.setItem(
      "appointmentRequests",
      JSON.stringify([
        ...fetchAppointmentRequestsFromLocalStorage(),
        appointmentRequest
      ])
    );
    // localStorageUpdated();
  };

  const removeAppointmentRequest = appointmentRequestId => {
    const stateData = [...fetchAppointmentRequestsFromLocalStorage()];
    stateData.splice(appointmentRequestId, 1);
    console.log(stateData);
    localStorage.setItem("appointmentRequests", JSON.stringify(stateData));
    // localStorageUpdated();
  };

  const localStorageUpdated = () => {
    const localAppointmentRequests = fetchAppointmentRequestsFromLocalStorage();
    const localAppointments = fetchAppointmentFromLocalStorage();
    console.log({ localAppointmentRequests, localAppointments });
    setState({ appointmentRequests: localAppointmentRequests });
    setState({ appointments: localAppointments });
  };

  const appendAppointment = appointmentRequestId => {
    const newAppointment = [
      ...state.appointments,
      fetchAppointmentRequestsFromLocalStorage().find(appointment => {
        return Number(appointment._id) === Number(appointmentRequestId);
      })
    ];
    localStorage.setItem("appointments", JSON.stringify(newAppointment));
    removeAppointmentRequest(appointmentRequestId);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // localStorageUpdated()
      window.addEventListener("storage", localStorageUpdated);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        setState,
        addAppointmentRequestToLocalStorage,
        removeAppointmentRequest,
        appendAppointment
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
