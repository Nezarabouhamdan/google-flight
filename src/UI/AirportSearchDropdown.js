import React, { useState, useCallback } from "react";
import { TextField, Autocomplete, InputAdornment } from "@mui/material";
import { getSkyId } from "../api/skyScrapper";
import { useFlightContext } from "../Context/FlightContext";
import { Flight } from "@mui/icons-material";
import { debounce } from "lodash";

const AirportSearchDropdown = ({ label }) => {
  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const [open, setOpen] = useState(false);
  const {
    setDepartureEntityId,
    setDestinationEntityId,
    setOriginSkyId,
    setDestinationSkyId,
  } = useFlightContext();

  const fetchAirports = useCallback(
    debounce(async (searchText) => {
      if (searchText.length > 1) {
        try {
          const results = await getSkyId(searchText);
          setAirports(results);
          setOpen(results.length > 0);
        } catch (error) {
          console.error("Search error:", error);
          setAirports([]);
          setOpen(false);
        }
      } else {
        setAirports([]);
        setOpen(false);
      }
    }, 300),
    []
  );

  const handleInputChange = useCallback(
    (event, value) => {
      setQuery(value);
      fetchAirports(value);
    },
    [fetchAirports]
  );

  return (
    <Autocomplete
      options={airports}
      open={open}
      onOpen={() => airports.length > 0 && setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) =>
        `${option.navigation.localizedName} (${option.skyId}) - ${option.navigation.entityType}`
      }
      onChange={(event, newValue) => {
        if (!newValue) return;

        const handlers = {
          from: [setDepartureEntityId, setOriginSkyId],
          to: [setDestinationEntityId, setDestinationSkyId],
        };

        const [setEntity, setSky] = handlers[label] || [];
        if (setEntity && setSky) {
          setEntity(newValue.entityId);
          setSky(newValue.skyId);
        }
        setQuery(newValue.navigation.localizedName);
      }}
      fullWidth
      inputValue={query}
      isOptionEqualToValue={(option, value) =>
        option.entityId === value.entityId
      }
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required
          variant="outlined"
          onChange={(e) => handleInputChange(e, e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Flight color="action" />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default AirportSearchDropdown;
