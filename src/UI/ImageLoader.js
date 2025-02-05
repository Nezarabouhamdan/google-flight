import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

const ImageLoader = ({ image, loadingImage, altText }) => {
  return loadingImage ? (
    <Box
      sx={{
        width: "100%",
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={40} />
    </Box>
  ) : (
    <CardMedia
      component="img"
      sx={{
        width: "100%",
        height: 200,
        objectFit: "cover",
        borderRadius: 1,
      }}
      src={image}
      alt={altText}
      loading="lazy"
    />
  );
};

export default ImageLoader;
