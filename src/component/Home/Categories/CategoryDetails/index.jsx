import { Box, CircularProgress, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDebouncedState from "../../../../hooks/useDebouncedState";

import imageCourse from "../../../assets/icon_course.svg";
import imageTraining from "../../../assets/icon_training.svg";
import CourseTrainingCard from "../../../CourseTrainingCard";
import GenericSwitcher from "../../../GenericSwitcher";
import Nav from "../../../Nav";
import PaginationComponent from "../../../Pagination";
import SearchBar from "../../../SearchBar/Index";
import Footer from "../../Footer";
import useFetchCategory from "./hooks/useFetchcategory";
import useFetchData from "./hooks/useFetchData";
import "./styles.modules.css";

import EmptyTrainings from "../../../assets/empty.png";
import EmptyCourses from "../../../assets/emptyCourses.png";

const CategoryDetails = () => {
  const { id, contentType } = useParams();
  const [search, setSearch] = useDebouncedState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState(
    contentType ? contentType.toUpperCase() : "COURSES"
  );
  const { category } = useFetchCategory(id);
  const { data, totalPages, loading } = useFetchData(
    selectedType === "COURSES" ? "courses" : "trainings",
    id,
    currentPage,
    search
  );
  const navigate = useNavigate();
  const handleNavigation = (param) => {
    if (param === "home") {
      navigate(`/home`);
    }
    if (param === "categories") {
      navigate(-1);
    }
  };
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="category_container">
      <div className="background_container">
        <div>
          <Container maxWidth="xl">
            <Nav />
          </Container>
          <div className="content_overlay">
            <Container maxWidth="xl">
              <div className="box_container">
                <SearchBar search={search} setSearch={setSearch} />
                <div className="img_container">
                  <img
                    src={`/svg/categories/${category.Title?.split(" ")
                      .join("_")
                      .toLocaleLowerCase()}.svg`}
                    alt=""
                  />
                </div>
              </div>
            </Container>
          </div>
          <br />
        </div>
      </div>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "95%",
            marginInline: "auto"
          }}
        >
          <div className="breadcrumb-container">
            <div className="breadcrumb-header">
              <button
                className="breadcrumb-text"
                onClick={() => handleNavigation("home")}
              >
                Home
              </button>
              <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
              <button
                className="breadcrumb-text"
                onClick={() => handleNavigation("categories")}
              >
                Categories
              </button>
              <img src="/svg/polygon.svg" alt="Breadcrumb separator" />
              <button
                className="breadcrumb-text"
                // onClick={() => handleNavigation(category.Title)}
              >
                {category.Title}
              </button>
            </div>
          </div>

          {/* TapBarComponent exists, you just need to implement the subcategory in the backend */}
          <GenericSwitcher
            items={[
              { icon: imageCourse, title: "COURSES", width: "32px" },
              { icon: imageTraining, title: "TRAININGS", width: "37px" }
            ]}
            selectedItem={selectedType}
            setSelectedItem={setSelectedType}
          />
        </Box>

        <div className="d-flex justify-content-center align-items-center mt-4 paddingbottom innerDisplay">
          {loading && (
            <div className="center" style={{ minHeight: "40vh" }}>
              <CircularProgress />
            </div>
          )}

          {!loading && (
            <>
              {data.length === 0 ? (
                <div className="emptyBox">
                  {selectedType === "COURSES" ? (
                    <img src={EmptyCourses} alt="" />
                  ) : (
                    <img src={EmptyTrainings} alt="" />
                  )}
                </div>
              ) : (
                <div className={"box"}>
                  {data.map((course) => (
                    <CourseTrainingCard
                      key={course._id}
                      id={course._id}
                      thumbnail={course.Thumbnail?.filePath}
                      title={course.Title}
                      category={course.Category}
                      price={course.Price}
                      level={course.Level}
                      rating={course.Rating}
                      type={selectedType === "COURSES" ? "course" : "training"}
                    />
                  ))}
                </div>
              )}
            </>
          )}

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
    </div>
  );
};

export default CategoryDetails;
