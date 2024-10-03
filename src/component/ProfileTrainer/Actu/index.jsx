import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import "./styles.css";
import styles from "./styles.module.css";
import useNotifTrainer from "./useNotifTrainer";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 100,
  p: 2,
  width: "30rem",
  height: "20rem",
  overflow: "auto",
};

const Actu = () => {
  const {
    openChange,
    setOpenChange,
    valueComment,
    handleChange,
    rows,
    columns,
    columnsComments,
    rowsComments,
    SendComment,
  } = useNotifTrainer();

  return (
    <div className={styles.leftSectionProfile}>
      <div className={styles.ActuDiv}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
      <Modal
        open={openChange}
        onClose={() => setOpenChange(false)}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={modalStyle}>
          <h2 id="parent-modal-title" className={styles.ModalTitle}>
            Comments
          </h2>
          <DataGrid
            rows={rowsComments}
            columns={columnsComments}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
          <Box className={styles.addComment} sx={{ width: "100%", mt: 2 }}>
            <TextField
              value={valueComment.Comment}
              onChange={handleChange}
              multiline
              sx={{ width: "75%" }}
              label="Outlined"
              variant="outlined"
              size="small"
            />
            <Button onClick={SendComment}>
              <SendIcon sx={{ color: "green" }} />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Actu;
