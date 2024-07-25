import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import Main from './Main'
import PrimarySearchAppBar from './nav'
import { Link,Navigate } from 'react-router-dom'
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {MaterialUISwitch} from './elements.js'
import imgLogo from '../assets/logo.jpg'
import LineAxisIcon from '@mui/icons-material/LineAxis';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Admin = () =>{
  // localStorage.setItem("Dashboard", true)
  // localStorage.setItem("addTrainer", false)
  // localStorage.setItem("addCourse", false)
  // localStorage.setItem("showCandidats", false)
  // localStorage.setItem("showTrainers", false)
  // localStorage.setItem("showCourses", false)
  // localStorage.setItem("showTrainings", false)
  // localStorage.setItem("addTraining", false)
  // localStorage.setItem("showRessources", false)
  // localStorage.setItem("addRessources", false)
  const token = localStorage.getItem("token");

  const [error, setError] = useState("");

  const [addTrainer, setAddTrainer] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [showCandidats, setShowCandidats] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showTrainings, setShowTrainings] = useState(false);
  const [addTraining, setAddTraining] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [Dashboard, setShowDashboard] = useState(true);

  const showHideDashboard = () => {
    setShowDashboard(true);
    setAddTrainer(false);
    setAddCourse(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(false);
  };

  const showHideAddTrainer = () => {
    setAddTrainer(true);
    setAddCourse(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(false);
    setShowDashboard(false);
  };
  const showHideAddCourse = () => {
    setAddCourse(true);
    setAddTrainer(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(false);
    setShowDashboard(false);
  };

  const showHideAddTraining = () => {
    setAddCourse(false);
    setAddTrainer(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(true);
    setShowCategories(false);
    setShowDashboard(false);
  };
  const showHideShowCandidats = () => {
    setAddTrainer(false);
    setAddCourse(false);
    setShowCandidats(true);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(false);
    setShowDashboard(false);
  };
  const showHideShowTrainers = () => {
    setAddCourse(false);
    setAddTrainer(false);
    setShowCandidats(false);
    setShowTrainers(true);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(false);
    setShowDashboard(false);
  };
  const showHideShowCourses = () => {
    setAddCourse(false);
    setAddTrainer(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(true);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(false);
    setShowDashboard(false);
  };

  const showHideShowTrainings = () => {
    setAddCourse(false);
    setAddTrainer(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(true);
    setAddTraining(false);
    setShowCategories(false);
    setShowDashboard(false);
  };

  const showHideShowCategories = () => {
    setAddCourse(false);
    setAddTrainer(false);
    setShowCandidats(false);
    setShowTrainers(false);
    setShowCourses(false);
    setShowTrainings(false);
    setAddTraining(false);
    setShowCategories(true);
    handleClick6();
    setShowDashboard(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const [open2, setOpen2] = React.useState(false);

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const [open3, setOpen3] = React.useState(false);

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClick4 = () => {
    setOpen4(!open4);
  };

  const [open5, setOpen5] = React.useState(false);

  const handleClick5 = () => {
    setOpen5(!open5);
  };

  const [open6, setOpen6] = React.useState(false);

  const handleClick6 = () => {
    setOpen6(!open6);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <main className={styles.MainSection}>
        <section className={styles.leftSection}>
          <nav className={styles.leftSectionNav}>
            <Link to="/">
              <p className={`${styles.logo}`}>U!NOW</p>
            </Link>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} />}
              label=""
            />
          </nav>
          <div>
            <List
              sx={{ width: "100%", m: 0, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Managment
                </ListSubheader>
              }
            >
              <Button
                sx={{ width: "200px", margin: "5px 50px" }}
                onClick={showHideDashboard}
                variant="contained"
                startIcon={<LineAxisIcon />}
              >
                Dashboard
              </Button>

              <ListItemButton onClick={handleClick1}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Candidats" />
                {open1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={showHideShowCandidats}
                    sx={
                      showCandidats
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Afficher" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={handleClick2}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Formateurs" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={showHideShowTrainers}
                    sx={
                      showTrainers
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Afficher" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={showHideAddTrainer}
                    sx={
                      addTrainer
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ajouter" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={handleClick3}>
                <ListItemIcon>
                  <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText primary="Trainings" />
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={showHideShowTrainings}
                    sx={
                      showTrainings
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Afficher" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={showHideAddTraining}
                    sx={
                      addTraining
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ajouter" />
                  </ListItemButton>

                  {/*<ListItemButton sx={{ pl: 4 }} onClick={handleClick4}>
											<ListItemIcon>
											<AccountCircleIcon />
											</ListItemIcon>
											<ListItemText primary="Ressources" />
											{open4 ? <ExpandLess /> : <ExpandMore />}
										</ListItemButton>
										
										<Collapse in={open4} timeout="auto" unmountOnExit>
											<List component="div" disablePadding>


											 /*<ListItemButton  onClick={showHideShowRessourses} sx={{ pl: 8 }}>
												<ListItemIcon>
												<ListAltIcon />
												</ListItemIcon>
												<ListItemText primary="Afficher" />
											</ListItemButton>/* 


											<ListItemButton  onClick={showHideAddRessourses} sx={{ pl: 8 }}>
												<ListItemIcon>
												<AddCircleOutlineIcon/>
												</ListItemIcon>
												<ListItemText primary="Ajouter" />
											</ListItemButton>
											</List>
										</Collapse>*/}
                </List>
              </Collapse>

              <ListItemButton onClick={handleClick5}>
                <ListItemIcon>
                  <OndemandVideoIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
                {open5 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open5} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={showHideShowCourses}
                    sx={
                      showCourses
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Afficher" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={showHideAddCourse}
                    sx={
                      addCourse
                        ? { pl: 4, backgroundColor: "#ebebeb" }
                        : { pl: 4 }
                    }
                  >
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ajouter" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton
                onClick={showHideShowCategories}
                sx={
                  showCategories
                    ? { pl: 2, backgroundColor: "#ebebeb" }
                    : { pl: 2 }
                }
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Show Categories" />
                <ArrowForwardIosIcon sx={{ fontSize: 17 }} />
              </ListItemButton>
            </List>
          </div>
        </section>
        <section className={styles.rightSection}>
          <nav>
            <PrimarySearchAppBar />
          </nav>
          <main className={styles.ComponentContainer}>
            <Main
              addTraining={addTraining}
              addTrainer={addTrainer}
              addCourse={addCourse}
              showCourses={showCourses}
              showTrainers={showTrainers}
              showCandidats={showCandidats}
              setShowCandidats={setShowCandidats}
              showTrainings={showTrainings}
              showCategories={showCategories}
              dashboard={Dashboard}
            />
          </main>
        </section>
      </main>
    </React.Fragment>
  );
}

export default Admin;