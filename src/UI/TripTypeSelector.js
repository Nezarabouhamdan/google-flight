import React, { useCallback } from "react";
import { Box, TextField, MenuItem } from "@mui/material";

const TripTypeSelector = ({ flightOptions, setFlightOptions }) => {
  const handleTripTypeChange = useCallback(
    (event) => {
      const { value } = event.target;
      setFlightOptions((prevOptions) => ({
        ...prevOptions,
        tripType: value,
      }));
    },
    [setFlightOptions]
  ); // Memoizing the function to prevent re-creations

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        select
        label="Journey Type"
        name="tripType"
        value={flightOptions.tripType}
        onChange={handleTripTypeChange}
        fullWidth
      >
        {["one-way", "round-trip"].map((type) => (
          <MenuItem key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default TripTypeSelector;
