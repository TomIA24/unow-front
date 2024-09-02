import React from "react";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function CourseRating(id, value, avis) {
  return (
    <Box
      key={id}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box>
        <p>({avis} avis)</p>
      </Box>
    </Box>
  );
}
