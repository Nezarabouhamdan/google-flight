import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Sort by</InputLabel>
      <Select value={sortBy} onChange={onSortChange}>
        <MenuItem value="cheapest">Cheapest Price</MenuItem>
        <MenuItem value="earliest">Earliest Departure</MenuItem>
        <MenuItem value="shortest">Shortest Duration</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
