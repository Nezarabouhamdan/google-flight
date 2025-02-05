import React, { useMemo } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ImageLoader from "./ImageLoader";

const FlightCard = ({ flight, image, loadingImage }) => {
  const { departure, arrival, duration, price, destinationname, airportname } =
    flight;

  const formattedDeparture = useMemo(() => {
    const departureDate = new Date(departure);
    return {
      date: departureDate.toLocaleDateString(),
      time: departureDate.toLocaleTimeString(),
    };
  }, [departure]);

  const formattedArrival = useMemo(() => {
    const arrivalDate = new Date(arrival);
    return {
      date: arrivalDate.toLocaleDateString(),
      time: arrivalDate.toLocaleTimeString(),
    };
  }, [arrival]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ImageLoader
        image={image}
        loadingImage={loadingImage}
        altText={destinationname}
      />

      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
        >
          {`${airportname} - ${destinationname}`}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            fontWeight: "bold",
          }}
        >
          Departure:
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
          {formattedDeparture.date} at {formattedDeparture.time}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            fontWeight: "bold",
            mt: 1,
          }}
        >
          Arrival:
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
          {formattedArrival.date} at {formattedArrival.time}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            color: "text.secondary",
          }}
        >
          Duration: {duration}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            color: "text.secondary",
          }}
        >
          Price: {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
