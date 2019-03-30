import React, { createContext, useState } from "react";

const DataContext = createContext();
const DataProvider = (props) => {
  const [state, setState] = useState({
    dates: [
      { title: "Hacking Health", due: new Date().setDate(new Date().getDate() - 1) },
      { title: "Hacking Health", due: new Date().setDate(new Date().getDate() + 1) },
      { title: "Hacking Health", due: new Date() }
    ]
  });

  return (
    <DataContext.Provider value={{ state, setState }}>
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
