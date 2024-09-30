import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import Nav from "../../Nav";
import ProgramsModal from "../InfoUser/ProgramsModal";
import styles from "./styles.module.css";
import useForm from "./useForm";

const EditProfile = () => {
  const {
    formData,
    setFormData,
    countryListValue,
    handleSubmit,
    handleChange,
    handleAnimationLanguageChange,
    handleConnectingMetropolisChange,
  } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className={"background_container"}>
        <div className="appWrapper" style={{ height: "100%" }}>
          <Nav />
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <img
                src={
                  formData?.image?.filePath
                    ? `${process.env.REACT_APP_API}${formData.image.filePath}`
                    : "/default-profile.png"
                }
                alt="Profile"
              />
            </div>
            <p className={styles.title}>Edit Profile</p>
          </div>
        </div>
      </div>

      <div className="appWrapper">
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.group}>
              <div className={styles.stack}>
                <Input
                  label="First Name"
                  name="name"
                  placeholder="Enter your first name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="User Name"
                  name="userName"
                  placeholder="Enter your user name"
                  type="text"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.stack}>
                <Input
                  label="Last Name"
                  name="surname"
                  placeholder="Enter your last name"
                  type="text"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Contact Number"
                  name="phone"
                  placeholder="Enter your contact number"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Input
              label="Programs"
              name="programs"
              type="text"
              onClick={handleOpenModal}
            />

            <Input
              label="Address"
              name="address"
              placeholder="Enter your address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <MultiSelect
              label={"Connecting Metropolis"}
              data={countryListValue}
              value={formData.connectingMetropolis}
              onChange={handleConnectingMetropolisChange}
            />

            <div className={styles.group}>
              <Select
                label="Country of Residence"
                name="country"
                options={countryListValue}
                value={formData.country}
                onChange={handleChange}
                required
              />
              <MultiSelect
                label={"Animation Language"}
                data={["English", "French"]}
                value={formData.animationLanguage}
                onChange={handleAnimationLanguageChange}
              />
            </div>

            <Input
              label="Monthly Bandwidth"
              name="monthlyBandwidth"
              placeholder="Enter your monthly bandwidth"
              type="text"
              value={formData.monthlyBandwidth}
              onChange={handleChange}
              required
            />

            <Input
              label="RCS"
              name="RCS"
              placeholder="Enter your RCS"
              type="text"
              value={formData.RCS}
              onChange={handleChange}
              required
            />

            <Input
              label="SIRET"
              name="SIRET"
              placeholder="Enter your SIRET"
              type="text"
              value={formData.SIRET}
              onChange={handleChange}
              required
            />

            <Input
              label="Social Reason"
              name="socialReason"
              placeholder="Enter your social reason"
              type="text"
              value={formData.socialReason}
              onChange={handleChange}
              required
            />

            <div className={`${styles.group} ${styles.buttons}`}>
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
          <ProgramsModal
            open={openModal}
            handleClose={handleCloseModal}
            setUserInfo={setFormData}
            programs={formData.programs}
          />
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  onClick,
  required,
}) => {
  return (
    <div className={styles.inputContainer} onClick={onClick}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

const Select = ({ label, name, options, value, onChange, required }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange} required={required}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

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

export default EditProfile;
