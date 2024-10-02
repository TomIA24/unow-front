import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./styles.module.css";

const MultiSelect = ({ label, data, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <Autocomplete
        multiple
        limitTags={3}
        id="multiple-limit-tags"
        options={data}
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} placeholder={label} />}
        popupIcon={<AddIcon sx={{ color: "var(--primary-color)" }} />}
        sx={{
          "& > div > div ": {
            color: "1px solid #3e4678",
            minHeight: "70px",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
};

export default MultiSelect;
