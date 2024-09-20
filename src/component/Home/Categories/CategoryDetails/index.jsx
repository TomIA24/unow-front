import { Box, CircularProgress, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import imageCourse from "../../../assets/icon_course.png";
import imageTraining from "../../../assets/icon_training.png";
import loupe from "../../../assets/loupe.png";
import GenericSwitcher from "../../../GenericSwitcher";
import Nav from "../../../Nav";
import PaginationComponent from "../../../Pagination";
import Footer from "../../Footer";
import CourseItem from "./CourseItem";
import "./styles.modules.css";

const fetchData = async (type, id, currentPage) => {
  const url = `${process.env.REACT_APP_API}api/Category/specificGroupeFromCategory/${id}?type=${type}&page=${currentPage}&limit=10`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

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

const CourseList = ({ courses }) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </Box>
    </>
  );
};

const CategoryDetails = () => {
  const { id, categoryName, contentType } = useParams();
  const [courses, setCourses] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState(
    contentType ? contentType.toUpperCase() : "COURSES"
  );
  const [loading, setLoading] = useState(false);
  const refHome = useRef();

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const [category, setCategory] = useState({});
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const urlUserData = `${process.env.REACT_APP_API}api/Category/${id}`;
        const response = await axios.get(urlUserData);
        setCategory(response.data.data);
      } catch (err) {
        console.error("Failed to fetch category", err);
      }
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    if (selectedType === "TRAININGS")
      fetchData("trainings", id, currentPage)
        .then((data) => {
          setTrainings(data.data);
          setTotalPages(data.total);
        })
        .finally(() => {
          setLoading(false);
        });

    if (selectedType === "COURSES")
      fetchData("courses", id, currentPage)
        .then((data) => {
          setCourses(data.data);
          setTotalPages(data.total);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [currentPage, selectedType, id]);

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
            <Box sx={{ width: "200px", height: "200px" }}>
              <img
                className="imagestyle"
                src={`/svg/categories/${category.Title.toLocaleLowerCase()}.svg`}
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
            </Box>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="body1" fontWeight={500}>
              Home
            </Typography>
            <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
            <Typography variant="body1" fontWeight={500}>
              Categories
            </Typography>
            <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
            <Typography variant="body1" fontWeight={500}>
              {categoryName?.split("_").join(" ")}
            </Typography>
          </Box>

          {/* TapBarComponent exists, you just need to implement the subcategory in the backend */}
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
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "40vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!loading && (
            <>
              {selectedType === "COURSES" && <CourseList courses={courses} />}
              {selectedType === "TRAININGS" && (
                <CourseList courses={trainings} />
              )}
            </>
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
