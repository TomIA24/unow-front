import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
        variant="outlined"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationComponent;
