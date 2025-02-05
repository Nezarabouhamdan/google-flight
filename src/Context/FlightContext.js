import React, { createContext, useState, useContext } from "react";
const FlightContext = createContext();
export const FlightProvider = ({ children }) => {
  const [originSkyId, setOriginSkyId] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");
  const [departureEntityId, setDepartureEntityId] = useState("");
  const [destinationEntityId, setDestinationEntityId] = useState("");
  const [flightOptions, setFlightOptions] = useState({
    travelClass: "economy",
    passengers: {
      adults: 1,
      childrens: 0,
      infants: 0,
    },
    tripType: "one-way",
  });
  const [dates, setDates] = useState({
    date: "",
    returnDate: "",
  });
  return (
    <FlightContext.Provider
      value={{
        dates,
        setDates,
        flightOptions,
        setFlightOptions,
        departureEntityId,
        setDepartureEntityId,
        destinationEntityId,
        setDestinationEntityId,
        originSkyId,
        setOriginSkyId,
        destinationSkyId,
        setDestinationSkyId,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => useContext(FlightContext);
