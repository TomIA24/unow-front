import { Box, CircularProgress, Container } from "@mui/material";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import useDebouncedState from "../../../../hooks/useDebouncedState";
import imageCourse from "../../../assets/icon_course.png";
import imageTraining from "../../../assets/icon_training.png";
import CourseTrainingCard from "../../../CourseTrainingCard";
import GenericSwitcher from "../../../GenericSwitcher";
import Nav from "../../../Nav";
import PaginationComponent from "../../../Pagination";
import SearchBar from "../../../SearchBar/Index";
import Footer from "../../Footer";
import useFetchCategory from "./hooks/useFetchcategory";
import useFetchData from "./hooks/useFetchData";
import "./styles.modules.css";
import axios from "axios";
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

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
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
          {!loading && (
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
