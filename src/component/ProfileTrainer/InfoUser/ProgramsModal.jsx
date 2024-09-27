import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { request } from "../../../core/api/request";
import useDebouncedState from "../../../hooks/useDebouncedState";
import styles from "./styles.module.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  minWidth: "900px",
  borderRadius: "30px",
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ProgramsModal = ({ open, handleClose, programs, setUserInfo }) => {
  const [openAddProgram, setOpenAddProgram] = useState(false);
  const [isCertifying, setIsCertifying] = useState(true);
  const [filterPrograms, setFilterPrograms] = useState(programs);
  const [update, setUpdate] = useState({
    isUpdated: false,
    programId: undefined,
  });
  const [search, setSearch] = useDebouncedState("");
  const titleRef = useRef(null);
  const durationRef = useRef(null);
  const tjRef = useRef(null);

  useEffect(() => {
    const filteredPrograms = programs?.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilterPrograms(filteredPrograms);
  }, [search, programs]);

  const handleResetForm = async () => {
    const data = await request.read("userData");
    setUserInfo(data.data);

    titleRef.current.value = "";
    durationRef.current.value = "";
    tjRef.current.value = "";
    setIsCertifying(true);
    setUpdate({ isUpdated: false, programId: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProgram = {
      title: titleRef.current.value,
      duration: durationRef.current.value,
      tj: tjRef.current.value,
      certifying: isCertifying,
    };

    if (update.isUpdated) {
      request.update("programs", update.programId, newProgram).then(() => {
        handleResetForm();
      });
    }

    if (!update.isUpdated) {
      request.create("programs", newProgram).then(() => {
        handleResetForm();
      });
    }
  };

  const handleSelectedProgram = (program) => {
    setOpenAddProgram(true);
    titleRef.current.value = program.title;
    durationRef.current.value = program.duration;
    tjRef.current.value = program.tj;
    setUpdate({
      isUpdated: true,
      programId: program._id,
    });
  };

  const handleDelete = () => {
    request.remove("programs", update.programId).then(() => {
      handleResetForm();
    });
  };

  const handleAddProgram = () => {
    setOpenAddProgram((prev) => !prev);
    handleResetForm();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <div className={styles.modalContent}>
          <div className={styles.header}>
            <p className={styles.title}>Programs</p>
            <div className={styles.input}>
              <div>
                <span>Filter</span>
              </div>
              <input
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Type here..."
              />
            </div>
            <CloseIcon
              onClick={handleClose}
              sx={{ color: "#C0BCB7", cursor: "pointer" }}
            />
          </div>

          <div className={styles.programsDetails}>
            <div>
              <ul>
                {filterPrograms?.slice(0, 9).map((program, index) => (
                  <li
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectedProgram(program)}
                  >
                    {program.title}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {filterPrograms?.length > 9 && (
                <ul>
                  {filterPrograms?.slice(9, 18).map((program, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectedProgram(program)}
                    >
                      {program.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.editSection}>
              <button onClick={handleAddProgram}>
                <span>Add Program</span>
                <KeyboardArrowDownIcon sx={{ color: "white" }} />
              </button>

              <form
                onSubmit={handleSubmit}
                style={{ opacity: openAddProgram ? 1 : 0 }}
              >
                <div>
                  <label>Title</label>
                  <input type="text" required ref={titleRef} />
                </div>

                <div>
                  <label>Certifying</label>
                  <div className={styles.ouiNonButton}>
                    <input
                      type="button"
                      className={isCertifying && styles.oui}
                      value="Yes"
                      onClick={() => setIsCertifying(true)}
                    />
                    <input
                      type="button"
                      className={!isCertifying && styles.oui}
                      value="No"
                      onClick={() => setIsCertifying(false)}
                    />
                  </div>
                </div>

                <div>
                  <label>Duration</label>
                  <input type="text" required ref={durationRef} />
                </div>

                <div>
                  <label>TJ</label>
                  <input type="text" required ref={tjRef} />
                </div>

                <div className={styles.buttons}>
                  <button
                    style={{ opacity: update.isUpdated ? 1 : 0 }}
                    type="button"
                    onClick={handleDelete}
                  >
                    <span>Delete</span>
                  </button>
                  <button type="submit">
                    <span>Confirm</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProgramsModal;
