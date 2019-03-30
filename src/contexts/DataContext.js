import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = () => {
  const [state, setState] = useState({});

  return (
    <DataContext.Provider value={{}}>
      {this.props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer };
