import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button } from "@mui/material";

const buttonStyles = (disable) => ({
  minWidth: "10px",
  width: "70px",
  cursor: disable ? "not-allowed" : "pointer",
  "&.Mui-disabled": disable && {
    pointerEvents: "auto",
  },
});

export const renderBCButton = (params) => (
  <Button
    sx={buttonStyles(params.row.statusMandat !== "confirmed")}
    disabled={params.row.statusMandat !== "confirmed"}
  >
    <PictureAsPdfIcon
      sx={{
        color: params.row.statusMandat === "confirmed" ? "#B33030" : "#7C99AC",
      }}
    />
  </Button>
);

export const renderResponseButton = (params, handleUpdate) => {
  const { statusMandat, reponseFormateur, id, TJ } = params.row;

  let isDisabled = false;

  let opacityConfirm = "100%";
  let opacityReject = "100%";
  let opacityWaiting = "100%";

  if (["confirmed", "closed"].includes(statusMandat)) {
    isDisabled = true;
    opacityConfirm = "20%";
    opacityReject = "20%";
    opacityWaiting = "20%";
  }

  if (statusMandat === "pending") {
    isDisabled = false;
    opacityConfirm = "50%";
    opacityReject = "50%";
    opacityWaiting = "50%"; 
  
    switch (reponseFormateur) {
      case "rejected":
        opacityReject = "100%";
        break;
      case "confirmed":
        opacityConfirm = "100%";
        break;
      case "undecided":
        opacityWaiting = "100%";
        break;
    }
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
      onClick={() => handleUpdate(id, "undecided", TJ)}
      >
        <ErrorOutlineOutlinedIcon
          sx={{ color: "#ff9100", opacity: opacityWaiting, width: "50px" }}
        />
      </Button>
    </>
  );
};
