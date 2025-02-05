import React, { useState, useCallback } from "react";
import { Box, TextField, FormHelperText } from "@mui/material";

const DateSelector = ({ dates, setDates, isReturnDateDisabled }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setDates((prevDates) => {
        const updatedDates = { ...prevDates, [name]: value };
        if (updatedDates.returnDate && updatedDates.date) {
          const departureDate = new Date(updatedDates.date);
          const returnDate = new Date(updatedDates.returnDate);

          if (returnDate < departureDate) {
            setErrorMessage("Return date cannot be before departure date.");
          } else {
            setErrorMessage("");
          }
        }
        return updatedDates;
      });
    },
    [setDates] // Dependency array to ensure handleDateChange only changes when setDates changes
  );

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="Departure Date"
        name="date"
        type="date"
        value={dates.date}
        onChange={handleDateChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
        error={!dates.date || errorMessage !== ""}
        helperText={!dates.date ? "Departure date is required" : ""}
      />
      <TextField
        label="Return Date"
        name="returnDate"
        type="date"
        value={dates.returnDate}
        onChange={handleDateChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        disabled={isReturnDateDisabled}
        error={errorMessage !== ""}
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </Box>
  );
};

export default DateSelector;
