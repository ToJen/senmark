import React, { createContext, useState, useEffect } from "react";
import faker from "faker";
import _ from "lodash";

const stubAppointments = [
  {
    _id:0,
    recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
    price: faker.finance.amount(0, 100, 2, "$"),
    location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
    services: ["bathing", "dressing", "toileting"]
  },
  {
    _id: 1,
    recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
    price: faker.finance.amount(0, 100, 2, "$"),
    location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
    services: ["hair care", "skin care", "toileting"]
  },
  {
    _id: 2,
    recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
    price: faker.finance.amount(0, 100, 2, "$"),
    location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1",
    services: ["dressing", "light homekeeping", "socialization"]
  }
];

const stubAppointmentRequests = _.times(10, index => ({
  _id: index,
  recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
  provider: `${faker.name.firstName()} ${faker.name.lastName()}`,
  price: faker.finance.amount(0, 100, 2, "$"),
  location: "307 Lake Shore Blvd E, Toronto, ON M5A 1C1"
}))

const DataContext = createContext();

const fetchAppointmentRequestsFromLocalStorage = () => {
  return localStorage.getItem("appointmentRequests")
    ? JSON.parse(localStorage.getItem("appointmentRequests"))
    : stubAppointmentRequests;
};

const DataProvider = props => {
  const [state, setState] = useState({
    dates: [
      {
        title: "Hacking Health",
        due: new Date().setDate(new Date().getDate() - 1),
        appointmentId: "0"
      },
      {
        title: "Hacking Health",
        due: new Date().setDate(new Date().getDate() + 1),
        appointmentId: "1"
      },
      { title: "Hacking Health", due: new Date(), appointmentId: "2" }
    ],
    appointments: stubAppointments,
    appointmentRequests: fetchAppointmentRequestsFromLocalStorage()
  });
  


  const addAppointmentRequestToLocalStorage = appointmentRequest => {
    localStorage.setItem(
      "appointmentRequests",
      JSON.stringify([...fetchAppointmentRequestsFromLocalStorage(), appointmentRequest])
    );
  };

  const localStorageUpdated = () => {
    const localAppointmentRequests = fetchAppointmentRequestsFromLocalStorage();
    console.log(localAppointmentRequests);
    setState({ appointmentRequests: localAppointmentRequests });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", localStorageUpdated);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ state, setState, addAppointmentRequestToLocalStorage }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
