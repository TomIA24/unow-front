import { Box, CircularProgress, Container } from "@mui/material";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import imageCourse from "../../../assets/icon_course.png";
import imageTraining from "../../../assets/icon_training.png";
import loupe from "../../../assets/loupe.png";
import GenericSwitcher from "../../../GenericSwitcher";
import Nav from "../../../Nav";
import PaginationComponent from "../../../Pagination";
import Footer from "../../Footer";
import CourseTrainingCard from "./CourseTrainingCard";
import useFetchCategory from "./hooks/useFetchcategory";
import useFetchData from "./hooks/useFetchData";
import "./styles.modules.css";

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

const CategoryDetails = () => {
  const { id, contentType } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState(
    contentType ? contentType.toUpperCase() : "COURSES"
  );
  const { category } = useFetchCategory(id);
  const { data, totalPages, loading } = useFetchData(
    selectedType === "COURSES" ? "courses" : "trainings",
    id,
    currentPage
  );
  const refHome = useRef();

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
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
            <Box sx={{ width: "13rem", height: "13rem" }}>
              <img
                className="imagestyle"
                src={`/svg/categories/${category.Title?.split(" ")
                  .join("_")
                  .toLocaleLowerCase()}.svg`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <div className="breadcrumb-container">
            <div className="breadcrumb-header">
              <span className="breadcrumb-text">Home</span>
              <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
              <span className="breadcrumb-text">Categories</span>
              <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
              <span className="breadcrumb-text">{category.Title}</span>
            </div>
          </div>

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
            <div className="center" style={{ minHeight: "40vh" }}>
              <CircularProgress />
            </div>
          )}
          {/* {!loading && (
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {data.map((course) => (
                <CourseItem key={course.id} course={course} />
              ))}
            </Box>
          )} */}
          <CourseTrainingCard />
          <div className="center" style={{ paddingTop: "2%" }}>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <br />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryDetails;
