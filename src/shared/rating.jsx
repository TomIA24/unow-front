import React from "react";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export function CourseRating(id, value, avis) {
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


export function CourseRatingSimpleView(id, value, avis) {
  console.log("value: ", value)
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
    max={1}
    icon={<StarIcon />}
    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
  />
  <Box>
    <p>{parseFloat(value.toFixed(1)).toLocaleString('en', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ({avis})</p>
  </Box>
</Box>


  );
}