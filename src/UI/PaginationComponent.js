import * as React from "react";
import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({ totalItems, currentPage, onPageChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
        count={Math.ceil(totalItems / 5)}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
      />
    </Box>
  );
};

export default PaginationComponent;
