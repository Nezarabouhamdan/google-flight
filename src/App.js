import React from "react";
import { FlightProvider } from "./Context/FlightContext";
import FlightSearch from "./components/FlightSearch";

function App() {
  return (
    <FlightProvider>
      <FlightSearch />
    </FlightProvider>
  );
}

export default App;
