import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Modal } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import useProgramsModal from "./useProgramsModal";

const ProgramsModal = ({ open, handleClose, programs, setUserInfo }) => {
  const {
    openAddProgram,
    isCertifying,
    setIsCertifying,
    filterPrograms,
    search,
    setSearch,
    titleRef,
    durationRef,
    tjRef,
    update,
    handleSubmit,
    handleSelectedProgram,
    handleDelete,
    handleAddProgram,
  } = useProgramsModal(programs, setUserInfo);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <Box>
            <Box sx={{ textAlign: "end", marginBottom: "1rem" }}>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  color: "#C0BCB7",

                  cursor: "pointer",
                }}
              />
            </Box>

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
            </div>
          </Box>

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
      </div>
    </Modal>
  );
};

export default ProgramsModal;
