import axios from "axios";
import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const Category = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(async () => {
    await HandleCategories();
    await HandleTrainings();
    await HandleCourses();
  }, []);

  const token = localStorage.getItem("token");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [valueAlert, setValueAlert] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const HandleCategories = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API}/api/Category/getCategories`, config)
      .then(async (res) => {
        setCategories(res.data.data);
      });
  };
  const HandleCourses = async () => {
    const url = `${process.env.REACT_APP_API}/api/courses`;
    await axios.post(url).then((res) => {
      setCourses(res.data.data);
    });
  };

  const HandleTrainings = async () => {
    const url = `${process.env.REACT_APP_API}/api/trainings`;
    await axios.post(url).then((res) => {
      setTrainings(res.data.data);
    });
  };

  const AddCategory = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/Category/setCategory`,
        {
          Category: category,
        },
        config
      )
      .then(async (res) => {
        setOpenAdd(false);
        setValueAlert(true);
        await new Promise((r) => {
          setTimeout(r, 2000);
        });
        setValueAlert(false);
        await HandleCategories();
      });
  };

  const HandleDeleteCategory = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/Category/deleteCategory`,
        {
          id: id,
        },
        config
      )
      .then(async (res) => {
        await HandleCategories();
      });
  };

  useEffect(() => {
    const list = [];
  }, [categories]);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => {
    setExpanded(expanded !== panel ? panel : false);
  };

  return (
    <div>
      <div className={styles.Success}>
        {valueAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              severity="success"
              variant="filled"
              onClose={() => {
                setValueAlert(false);
              }}
            >
              Category created successfully — check it out!
            </Alert>
          </Stack>
        )}
        {/*you can remove variant="filled" */}
      </div>
      <div className={styles.ButtonAddCategory}>
        <Button
          onClick={() => setOpenAdd(true)}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          Add Category
        </Button>
        <Modal
          sx={{ p: 1 }}
          open={openAdd}
          onClose={() => {
            setOpenAdd(false);
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 450,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "85vh",
              alignItems: "center",
            }}
          >
            <h1>Add Category</h1>
            <TextField
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              sx={{ width: "90%", margin: "20px auto" }}
              id="outlined-basic"
              label="Category"
              variant="outlined"
            />
            <Button
              onClick={AddCategory}
              variant="outlined"
              startIcon={<SaveIcon />}
            >
              Save Category
            </Button>
          </Box>
        </Modal>
      </div>
      <div className={styles.Categories}>
        {categories.map((c) => {
          return (
            <Accordion
              sx={{}}
              expanded={expanded === c._id}
              onClick={() => handleChange(c._id)}
            >
              <AccordionSummary
                sx
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {c.Title}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    {c.Trainings ? c.Trainings.length : "0"} Training and &nbsp;
                    {c.Courses ? c.Courses.length : "0"} Course
                  </Typography>
                  <IconButton
                    onClick={() => HandleDeleteCategory(c._id)}
                    aria-label="delete"
                  >
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {c.Trainings.length > 0 ? (
                  <React.Fragment>
                    <h3>Trainings</h3>

                    {trainings.map((t) => {
                      if (c.Trainings.includes(t._id)) {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              boxSizing: "content-box",
                              padding: "0 30px",
                            }}
                          >
                            <p>- {t.Title}</p>
                            <p>{t.state}</p>
                          </Box>
                        );
                      }
                    })}
                  </React.Fragment>
                ) : (
                  ""
                )}
                {c.Courses.length > 0 ? (
                  <React.Fragment>
                    <h3>Courses</h3>

                    {courses.map((t) => {
                      if (c.Courses.includes(t._id)) {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              boxSizing: "content-box",
                              padding: "0 30px",
                            }}
                          >
                            <p>- {t.Title}</p>
                          </Box>
                        );
                      }
                    })}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
