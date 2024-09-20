import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import codeMessage from "./codeMessage";

const ErrorHandler = (error) => {
  const { response } = error;
  const [errMsgOpen, setErrMsgOpen] = useState(false);
  const [conxErrOpen, setConxErrOpen] = useState(false);

  if (response && response.status) {
    const message = response.data && response.data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    setErrMsgOpen(true);

    return (
      <Snackbar
        open={errMsgOpen}
        onClose={() => setErrMsgOpen(false)}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {`Request error ${status}: ${errorText}`}
        </Alert>
      </Snackbar>
    );
  } else {
    setConxErrOpen(true);
    return (
      <Snackbar
        open={conxErrOpen}
        onClose={() => setConxErrOpen(false)}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          No internet connection: Cannot connect to the server, check your
          internet network
        </Alert>
      </Snackbar>
    );
  }
};

export default ErrorHandler;
