import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { request } from "../../../core/api/request";
import "./styles.css";
import styles from "./styles.module.css";

const buttonStyles = (disable) => ({
  minWidth: "10px",
  width: "70px",
  cursor: disable ? "not-allowed" : "pointer",
  "&.Mui-disabled": disable && {
    pointerEvents: "auto",
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  width: "30rem",
  height: "20rem",
  overflow: "auto",
};

const Actu = () => {
  const [openChange, setOpenChange] = useState(false);
  const [valueComment, setValueComment] = useState({
    Creator: "Me",
    Comment: "",
  });
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentElement, setCurrentElement] = useState("");

  const handleChange = (e) => {
    setValueComment((prev) => ({ ...prev, Comment: e.target.value }));
  };

  const getNotifTrainer = useCallback(() => {
    request.read("Trainer/GetNotifTrainer").then((data) => {
      setData(data.data);
    });
  }, []);

  useEffect(() => getNotifTrainer(), [getNotifTrainer]);

  const handleUpdate = async (id, status, price) => {
    const jsonData = {
      data: { id, reponseFormateur: status, prixFormateur: price },
    };
    request.create("Trainer/UpdateNotifTrainer", jsonData).then(() => {
      // window.location.reload(true);
    });
  };
  const renderResponseButton = (params) => {
    const { statusMandat, reponseFormateur, id, TJ } = params.row;

    let isDisabled = false;

    let opacityConfirm = "20%";
    let opacityReject = "20%";
    let opacityWaiting = "100%";

    if (["confirmed", "closed"].includes(statusMandat)) {
      isDisabled = true;
      opacityConfirm = statusMandat === "confirmed" ? "100%" : "20%";
    }

    if (reponseFormateur === "confirmed") {
      isDisabled = true;
      opacityConfirm = "100%";
    }

    if (reponseFormateur === "rejected") {
      isDisabled = true;
      opacityReject = "100%";
    }

    return (
      <>
        <Button
          sx={buttonStyles(isDisabled)}
          disabled={isDisabled}
          onClick={() => handleUpdate(id, "confirmed", TJ)}
        >
          <CheckCircleOutlineIcon
            sx={{ color: "green", opacity: opacityConfirm, width: "50px" }}
          />
        </Button>

        <Button
          sx={buttonStyles(isDisabled)}
          disabled={isDisabled}
          onClick={() => handleUpdate(id, "rejected")}
        >
          <HighlightOffIcon
            sx={{ color: "red", opacity: opacityReject, width: "50px" }}
          />
        </Button>

        <Button
          sx={buttonStyles(isDisabled)}
          disabled={isDisabled}
          onClick={() => handleUpdate(id, "waiting")}
        >
          <ErrorOutlineOutlinedIcon
            sx={{ color: "#ff9100", opacity: opacityWaiting, width: "50px" }}
          />
        </Button>
      </>
    );
  };

  const renderBCButton = (params) => (
    <Button
      sx={buttonStyles(params.row.statusMandat !== "confirmed")}
      disabled={params.row.statusMandat !== "confirmed"}
    >
      <PictureAsPdfIcon
        sx={{
          color:
            params.row.statusMandat === "confirmed" ? "#B33030" : "#7C99AC",
        }}
      />
    </Button>
  );

  const renderCommentButton = (params) => (
    <Button
      sx={{ color: "red" }}
      onClick={() => {
        setCurrentElement(params.row.id);
        setComments(params.row.comments);
        setOpenChange(true);
      }}
    >
      Explore
    </Button>
  );

  const columns = [
    { field: "subject", headerName: "Subject", width: 140 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "TJ",
      headerName: "TJ (Frais inclus)",
      width: 150,
      editable: true,
    },
    { field: "statusMandat", headerName: "Status Mandat", width: 150 },
    { field: "NB", headerName: "NB d'inscrit", width: 130 },
    {
      field: "RF",
      headerName: "Réponse Formateur",
      width: 190,
      renderCell: renderResponseButton,
    },
    {
      field: "BC",
      headerName: "Bon de commande",
      width: 190,
      renderCell: renderBCButton,
    },
    {
      field: "commentaire",
      headerName: "Commentaire",
      width: 190,
      renderCell: renderCommentButton,
    },
  ];

  const rows = data.map((row) => ({
    id: row._id,
    subject: row.courseCertif,
    date: `${new Date(row.courseDate[0]).getDate()}/${
      new Date(row.courseDate[0]).getMonth() + 1
    } -> ${new Date(row.courseDate[1]).getDate()}/${
      new Date(row.courseDate[1]).getMonth() + 1
    } - ${new Date(row.courseDate[1]).getFullYear()}`,
    TJ: row.prixFormateur,
    statusMandat: row.StatusMandate,
    NB: row.nbInscrit,
    reponseFormateur: row.reponseFormateur,
    comments: row.comments,
  }));

  const columnsComments = [
    { field: "Creator", headerName: "Creator", width: 140 },
    { field: "Comment", headerName: "Comment", width: 640 },
  ];

  const rowsComments = comments.map((row, index) => ({
    id: index,
    Creator: row.Creator,
    Comment: row.Comment,
  }));

  const SendComment = async () => {
    const jsonData = {
      data: { id: currentElement, comments: valueComment },
    };
    request.create("Trainer/UpdateCommentsNotifTrainer", jsonData).then(() => {
      getNotifTrainer();
      setOpenChange(false);
    });
  };

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
