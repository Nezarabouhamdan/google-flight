import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchFields from "./SearchFields";
import { useFlightContext } from "../Context/FlightContext";
import { fetchFlights } from "../api/skyScrapper";
import FlightList from "./FlightList";

const FlightSearch = () => {
  const {
    departureEntityId,
    setDepartureEntityId,
    destinationEntityId,
    setDestinationEntityId,
    dates,
    setDates,
    flightOptions,
    setFlightOptions,
    originSkyId,
    destinationSkyId,
  } = useFlightContext();

  const [error, setError] = useState(null);
  const [flightDetails, setFlightDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const handleSearch = useCallback(async () => {
    if (dates.returnDate && dates.date) {
      const departureDate = new Date(dates.date);
      const returnDate = new Date(dates.returnDate);
      if (returnDate < departureDate) {
        setError("Return date cannot be before departure date.");
        return;
      }
    }

    if (!departureEntityId || !destinationEntityId || !dates.date) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
      };

      const response = await fetchFlights({
        originSkyId: originSkyId,
        destinationSkyId: destinationSkyId,
        originEntityId: departureEntityId,
        destinationEntityId: destinationEntityId,
        date: dates.date,
        returnDate:
          flightOptions.tripType === "one-way" ? null : dates.returnDate,
        cabinClass: flightOptions.travelClass,
        adults: flightOptions.passengers.adults,
        childrens: flightOptions.passengers.childrens,
        infants: flightOptions.passengers.infants,
        journeyType: flightOptions.tripType,
      });

      if (
        response &&
        response.data &&
        Array.isArray(response.data.itineraries)
      ) {
        const flightDetails = response.data.itineraries.map((item) => {
          const flightLeg = item.legs[0];
          return {
            arrival: flightLeg.arrival,
            departure: flightLeg.departure,
            duration: formatDuration(flightLeg.durationInMinutes),
            price:
              parseFloat(
                item.price.formatted.replace("$", "").replace(",", "")
              ) || 0,
            destinationImage:
              response.data.destinationImageUrl ||
              "https://via.placeholder.com/150",
            destinationname: flightLeg.destination.city,
            airportname: flightLeg.destination.name,
          };
        });

        setFlightDetails(flightDetails);
        setError(null);
      } else {
        throw new Error("Unfortunately, there are no available flights.");
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [
    dates,
    departureEntityId,
    destinationEntityId,
    flightOptions,
    originSkyId,
    destinationSkyId,
  ]);

  return (
    <Box
      sx={{
        width: "100%",
        height: flightDetails.length === 0 ? "100vh" : "100%",
        backgroundColor: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
        }}
      >
        {error && (
          <Typography
            variant="body1"
            color="error"
            sx={{ textAlign: "center" }}
          >
            {error}
          </Typography>
        )}

        <SearchFields
          dates={dates}
          setDates={setDates}
          flightOptions={flightOptions}
          setFlightOptions={setFlightOptions}
          departureEntityId={departureEntityId}
          setDepartureEntityId={setDepartureEntityId}
          destinationEntityId={destinationEntityId}
          setDestinationEntityId={setDestinationEntityId}
          isReturnDateDisabled={flightOptions.tripType === "one-way"}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginTop: 2 }}
          disabled={
            !departureEntityId ||
            !destinationEntityId ||
            !dates.date ||
            (dates.returnDate &&
              new Date(dates.returnDate) < new Date(dates.date))
          }
        >
          Search Flights
        </Button>
      </Paper>
      {loading ? (
        <CircularProgress sx={{ marginTop: 2 }} />
      ) : flightDetails.length > 0 ? (
        <Box ref={resultsRef} sx={{ width: "70%", marginTop: 2 }}>
          <FlightList flightDetails={flightDetails} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default FlightSearch;
