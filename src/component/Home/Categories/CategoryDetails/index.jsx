import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Empty from "../../../assets/empty.png";
import imageCourse from "../../../assets/icon_course.png";
import imageTraining from "../../../assets/icon_training.png";
import image from "../../../assets/image_training.png";
import loupe from "../../../assets/loupe.png";
import GenericSwitcher from "../../../GenericSwitcher";
import Nav from "../../../Nav";
import PaginationComponent from "../../../Pagination";
import TopBarComponent from "../../../TopBar";
import Footer from "../../Footer";
import CourseItem from "./CourseItem";
import "./styles.modules.css";

const fetchData = (type, setter, id) => {
  const url = `${process.env.REACT_APP_API}api/Category/specificGroupeFromCategory`;
  axios
    .post(url, { id, type })
    .then((res) => setter(res.data.data))
    .catch((err) => console.error(err));
};

const Breadcrumb = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <Typography variant="body1" fontWeight={500}>
      Home
    </Typography>
    <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
    <Typography variant="body1" fontWeight={500}>
      Design
    </Typography>
  </Box>
);

const SearchBar = () => (
  <div className={"explore_container"}>
    <button className={"explore_btn"} type="button">
      Explore
    </button>
    <div className={"explore_line"} />
    <input type="text" placeholder="Type here..." className={"explore_input"} />
    <div className={"explore_line"} />
    <button className={"search_btn"} type="button">
      <img src={loupe} alt="" className={"icon_search"} />
    </button>
  </div>
);

const groupIntoRows = (items, itemsPerRow) => {
  const rows = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }
  return rows;
};

const CourseList = ({ courses, windowWidth, indexItems }) => {
  const groupedCourses = groupIntoRows(courses, windowWidth > 900 ? 3 : 2);
  return (
    <>
      {groupedCourses
        .slice(0, windowWidth > 900 ? indexItems / 3 : indexItems / 2)
        .map((itemnested) => (
          <div key={itemnested[0].id}>
            <Row className="row1">
              {itemnested.length > 0 ? (
                itemnested.map((course) => (
                  <Col xs={6} md={4} className="col" key={course.id}>
                    <CourseItem course={course} />
                  </Col>
                ))
              ) : (
                <Empty />
              )}
            </Row>
            <br />
          </div>
        ))}
    </>
  );
};

const CategoryDetails = () => {
  const { id } = useParams();
  const [loadMoreOnline, setLoadMoreOnline] = useState(false);
  const [loadMoreOffline, setLoadMoreOffline] = useState(false);
  const [indexItems, setIndexItems] = useState(6);
  const [indexItemsOffline, setIndexItemsOffline] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [courses, setCourses] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState("COURSES");

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData("trainings", setTrainings, id);
    if (selectedType === "COURSES") fetchData("courses", setCourses, id);
  }, [currentPage, selectedType, id]);

  useEffect(() => {
    if (loadMoreOnline && !loadMoreOffline) {
      setIndexItemsOffline(3);
    } else if (!loadMoreOnline && loadMoreOffline) {
      setIndexItems(3);
    }
  }, [loadMoreOnline, loadMoreOffline]);

  const refHome = useRef();
  return (
    <>
      <div className="backimage">
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <Nav ref={refHome} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <SearchBar />
            <img className="imagestyle" src={image} alt="" />
          </div>
          <br />
        </div>
      </div>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "50px",
          }}
        >
          <Breadcrumb />
          <TopBarComponent
            items={[
              { id: 1, title: "Web Design" },
              { id: 2, title: "Graphic Design and Illustration" },
              { id: 3, title: "Design Tool" },
              { id: 4, title: "UX Design" },
            ]}
          />
          <GenericSwitcher
            items={[
              { icon: imageCourse, title: "COURSES" },
              { icon: imageTraining, title: "TRAININGS" },
            ]}
            selectedItem={selectedType}
            setSelectedItem={setSelectedType}
          />
        </Box>

        <div className="d-flex justify-content-center align-items-center mt-4 paddingbottom">
          {selectedType === "COURSES" && (
            <CourseList
              courses={courses}
              windowWidth={windowWidth}
              indexItems={indexItems}
            />
          )}
          {selectedType === "TRAININGS" && (
            <CourseList
              courses={trainings}
              windowWidth={windowWidth}
              indexItems={indexItems}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "2%",
            }}
          >
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <br />
          </Box>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryDetails;
