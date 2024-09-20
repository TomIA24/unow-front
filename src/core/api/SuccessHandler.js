import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import codeMessage from "./codeMessage";

const SuccessHandler = (
  response,
  options = { notifyOnSuccess: false, notifyOnFailed: true }
) => {
  const { data } = response;
  const [succOpen, setSuccOpen] = useState(false);
  const [errMsgOpen, setErrMsgOpen] = useState(false);

  if (data && data.success === true) {
    const message = data.message || codeMessage[response.status];
    if (options.notifyOnSuccess) {
      setSuccOpen(true);
      return (
        <Snackbar
          open={succOpen}
          onClose={() => setSuccOpen(false)}
          autoHideDuration={6000}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {`Request success: ${message}`}
          </Alert>
        </Snackbar>
      );
    }
  } else {
    const message = data.message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      return (
        <Snackbar
          open={errMsgOpen}
          onClose={() => setErrMsgOpen(false)}
          autoHideDuration={6000}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {`Request error ${status}: ${message}`}
          </Alert>
        </Snackbar>
      );
    }
  }
};

export default SuccessHandler;
