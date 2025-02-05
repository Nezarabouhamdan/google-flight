import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import AirportSearchDropdown from "../UI/AirportSearchDropdown";
import TravelersAndClass from "../UI/TravelersAndClass";
import TripTypeSelector from "../UI/TripTypeSelector";
import DateSelector from "../UI/DateSelector";

const SearchFields = ({
  dates,
  setDates,
  flightOptions,
  setFlightOptions,
  setDepartureEntityId,
  setDestinationEntityId,
  isReturnDateDisabled,
}) => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");

  const handleDepartureAirportChange = useCallback(
    (airport) => {
      setDepartureAirport(airport);
      setDepartureEntityId(airport.entityId);
    },
    [setDepartureEntityId]
  );

  const handleDestinationAirportChange = useCallback(
    (airport) => {
      setDestinationAirport(airport);
      setDestinationEntityId(airport.entityId);
    },
    [setDestinationEntityId]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TravelersAndClass
          flightOptions={flightOptions}
          setFlightOptions={setFlightOptions}
        />
        <TripTypeSelector
          flightOptions={flightOptions}
          setFlightOptions={setFlightOptions}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AirportSearchDropdown
          label="from"
          selectedAirport={departureAirport}
          setSelectedAirport={handleDepartureAirportChange}
          isRequired={true}
        />
        <AirportSearchDropdown
          label="to"
          selectedAirport={destinationAirport}
          setSelectedAirport={handleDestinationAirportChange}
        />
      </Box>
      <DateSelector
        isReturnDateDisabled={isReturnDateDisabled}
        dates={dates}
        setDates={setDates}
      />
    </Box>
  );
};

export default SearchFields;
