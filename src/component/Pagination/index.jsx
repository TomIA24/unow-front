import Pagination from "@mui/material/Pagination";
import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
      {totalPages > 1 && currentPage > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => {
            onPageChange(value);
          }}
          color="primary"
          shape="rounded"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      )}
    </>
  );
};

export default PaginationComponent;
