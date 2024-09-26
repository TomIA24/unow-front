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
  const [isUpdated, setIsUpdated] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProgram = {
      title: titleRef.current.value,
      duration: durationRef.current.value,
      tj: tjRef.current.value,
      certifying: isCertifying,
    };

    if (isUpdated) {
      request.update("programs", newProgram, programs._id).then(() => {
        setUserInfo((prev) => ({
          ...prev,
          programs: prev.programs.map((program) =>
            program._id === programs._id ? newProgram : program
          ),
        }));
      });
    }

    if (!isUpdated) {
      request.create("programs", newProgram).then(() => {
        setUserInfo((prev) => ({
          ...prev,
          programs: [...prev.programs, newProgram],
        }));
      });
    }
  };

  const handleSelectedProgram = (program) => {
    setOpenAddProgram(true);
    titleRef.current.value = program.title;
    durationRef.current.value = program.duration;
    tjRef.current.value = program.tj;
    setIsUpdated(true);
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
            {filterPrograms?.length > 9 && (
              <div>
                <ul>
                  {filterPrograms
                    ?.slice(9, filterPrograms?.length > 18 && 18)
                    .map((program, index) => (
                      <li key={index}>{program.title}</li>
                    ))}
                </ul>
              </div>
            )}

            <div className={styles.editSection}>
              <button onClick={() => setOpenAddProgram((prev) => !prev)}>
                <span>Add Program</span>
                <KeyboardArrowDownIcon sx={{ color: "white" }} />
              </button>

              {openAddProgram && (
                <form onSubmit={handleSubmit}>
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

                  <button type="submit">
                    <span>Confirm</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProgramsModal;
