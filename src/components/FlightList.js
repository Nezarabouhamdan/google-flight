import React, { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FlightCard from "../UI/FlightCard";
import SortSelector from "../UI/SortSelector";
import PaginationComponent from "../UI/PaginationComponent";
import axios from "axios";

export default function FlightList({ flightDetails }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [sortBy, setSortBy] = useState("cheapest");

  useEffect(() => {
    const fetchImage = async () => {
      const cityName = flightDetails[0]?.destinationname;
      if (cityName) {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${cityName}+cityscape&client_id=M8ei1O9wsPidOcH3AXM9zodraWkn5913yF_LdSvftQM`
          );
          setImage(
            response.data.results[0]?.urls?.small ||
              "https://placehold.co/150x100?text=No+Image"
          );
        } catch (error) {
          setImage("https://placehold.co/150x100?text=No+Image");
        } finally {
          setLoadingImage(false);
        }
      }
    };

    if (flightDetails.length > 0) fetchImage();
  }, [flightDetails]);

  const handleChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const parseDuration = useCallback((duration) => {
    const match = duration.match(/(\d+)h (\d+)m/);
    if (match) {
      return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    }
    return 0;
  }, []);

  const sortedFlights = useMemo(() => {
    return [...flightDetails].sort((a, b) => {
      if (sortBy === "cheapest") {
        return a.price - b.price;
      }
      if (sortBy === "earliest") {
        return new Date(a.departure) - new Date(b.departure);
      }
      if (sortBy === "shortest") {
        return parseDuration(a.duration) - parseDuration(b.duration);
      }
      return 0;
    });
  }, [flightDetails, sortBy, parseDuration]);

  const paginatedFlights = useMemo(() => {
    return sortedFlights.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [sortedFlights, page]);

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <SortSelector sortBy={sortBy} onSortChange={handleSortChange} />
      <Grid container spacing={2}>
        {paginatedFlights.map((flight, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FlightCard
              flight={flight}
              image={image}
              loadingImage={loadingImage}
            />
          </Grid>
        ))}
      </Grid>
      <PaginationComponent
        totalItems={sortedFlights.length}
        currentPage={page}
        onPageChange={handleChange}
      />
    </Box>
  );
}
