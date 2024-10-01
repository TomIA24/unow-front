import React, { useState } from "react";
import Input from "../../../shared/components/Inputs/Input";
import MultiSelect from "../../../shared/components/Inputs/MultiSelect";
import Select from "../../../shared/components/Inputs/Select";
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

export default EditProfile;
