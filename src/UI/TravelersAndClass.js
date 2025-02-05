import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  InputAdornment,
  Popover,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import { People } from "@mui/icons-material";

const TravelersAndClass = ({ flightOptions, setFlightOptions }) => {
  const { passengers, travelClass } = flightOptions;
  const [anchorEl, setAnchorEl] = useState(null);

  // useCallback: memoize the click handler so that it only changes if dependencies do
  const handleTravelerClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleTravelerClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // useCallback: stable function reference for handling input changes
  const handleOptionChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const numericValue = Number(value);
      if (name === "travelClass") {
        setFlightOptions((prevOptions) => ({
          ...prevOptions,
          travelClass: value,
        }));
      } else {
        setFlightOptions((prevOptions) => ({
          ...prevOptions,
          passengers: {
            ...prevOptions.passengers,
            [name]:
              name === "adults"
                ? Math.max(1, numericValue)
                : Math.max(0, numericValue),
          },
        }));
      }
    },
    [setFlightOptions]
  );

  // useMemo: calculate the total number of travelers only when relevant values change
  const totalTravelers = useMemo(() => {
    return (
      Number(passengers.adults) +
      Number(passengers.childrens) +
      Number(passengers.infants)
    );
  }, [passengers.adults, passengers.childrens, passengers.infants]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextField
        label="Travelers & Class"
        value={`${totalTravelers} travelers, ${travelClass}`}
        onClick={handleTravelerClick}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <People color="action" />
            </InputAdornment>
          ),
        }}
        fullWidth
        aria-label="Travelers and Class"
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleTravelerClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        aria-label="Select number of travelers and travel class"
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Passengers</Typography>
            {["adults", "childrens", "infants"].map((type) => (
              <TextField
                key={type}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                name={type}
                type="number"
                value={passengers[type]}
                onChange={handleOptionChange}
                fullWidth
                inputProps={{ min: type === "adults" ? 1 : 0 }}
                aria-label={type}
              />
            ))}
            <TextField
              select
              label="Travel Class"
              name="travelClass"
              value={travelClass}
              onChange={handleOptionChange}
              fullWidth
              aria-label="Travel Class"
            >
              {["economy", "business", "first"].map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls.charAt(0).toUpperCase() + cls.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
};

TravelersAndClass.propTypes = {
  flightOptions: PropTypes.shape({
    travelClass: PropTypes.string.isRequired,
    passengers: PropTypes.shape({
      adults: PropTypes.number.isRequired,
      childrens: PropTypes.number.isRequired,
      infants: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setFlightOptions: PropTypes.func.isRequired,
};

export default TravelersAndClass;
