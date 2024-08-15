import { useEffect, useRef, useState } from "react";
import CourseItem from "./CourseItem";
import Nav from "../../../Nav";
import { Button, Col, Row, Container } from "react-bootstrap";
import "./styles.modules.css";
import TopBarComponent from "../../../TopBar";
import Footer from "../../Footer";
import loupe from "../../../assets/loupe.png";
import image from "../../../assets/image_training.png";
import TopListItem from "../../../TopListItem";
import React from "react";
import PaginationComponent from "../../../Pagination";
import axios from "axios";
import GenericSwitcher from "../../../GenericSwitcher";
import imageCourse from "../../../assets/icon_course.png";
import imageTraining from "../../../assets/icon_training.png";

const CategoryDetails = (props) => {
  useEffect(() => {}, []);
  const [loadMoreOnline, setLoadMoreOnline] = useState(false);
  const [loadMoreOffline, setLoadMoreOffline] = useState(false);
  const [indexItems, setIndexItems] = useState(6);
  const [indexItemsOffline, setIndexItemsOffline] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("Course");
  const [selectedType, setSelectedType] = useState("COURSES");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getAllTraining = () => {
    axios
      .get(`http://localhost:5050/api/courses?page=${currentPage}&limit=${6}`)
      .then((res) => {
        console.log("result", res);
        setCourses(res.data.data);
        setTotalPages(res.data.totalPages);
      });
  };

  useEffect(() => {
    getAllTraining();
  }, [currentPage]);

  useEffect(() => {
    if (loadMoreOnline && !loadMoreOffline) {
      setIndexItemsOffline(3);
    } else if (!loadMoreOnline && loadMoreOffline) {
      setIndexItems(3);
    }
  }, [loadMoreOnline, loadMoreOffline]);

  const updatItemsFunction = () => {
    setIndexItems((prev) => prev + 3);
  };

  const updatItemsOfflineFunction = () => {
    setIndexItemsOffline((prev) => prev + 3);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const groupIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const refHome = useRef();
  const arrayOnline =
    windowWidth > 900 ? groupIntoRows(courses, 3) : groupIntoRows(courses, 2);
  const arrayOffline =
    windowWidth > 900
      ? groupIntoRows(props.offlineCourses, 3)
      : groupIntoRows(props.onlineCourses, 2);

  return (
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
          <div className={"explore_container"}>
            <button className={"explore_btn"} type="button" onClick={() => {}}>
              Explore
            </button>
            <div className={"explore_line"} />
            <input
              type="text"
              placeholder="Type here..."
              className={"explore_input"}
            />
            <div className={"explore_line"} />
            <button className={"search_btn"} type="button" onClick={() => {}}>
              <img src={loupe} alt="" className={"icon_search"} />
            </button>
          </div>
          <img width={300} height={253} src={image} />
        </div>
        <br />
        <TopListItem
          items={[
            { id: 0, title: "Products" },
            { id: 1, title: "Categories" },
            { id: 2, title: "Subcategories" },
          ]}
        />
        <TopBarComponent
          items={[
            { id: 0, title: "Design" },
            { id: 1, title: "Conception Web" },
            { id: 2, title: "Conception Graphique et Illustration" },
            { id: 3, title: "Outil de conception" },
            { id: 4, title: "Conception d'une expérience utilisateur" },
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
        <div className="d-flex justify-content-center align-items-center mt-4 paddingbottom">
          <br />

          <Container className="container-grid">
            {arrayOnline
              .slice(0, windowWidth > 900 ? indexItems / 3 : indexItems / 2)
              .map((itemnested) => (
                <div key={itemnested[0].id}>
                  <Row className="row1">
                    {itemnested.map((course) => (
                      <Col xs={6} md={4} className="col" key={course.id}>
                        <CourseItem course={course} />
                      </Col>
                    ))}
                  </Row>
                  <br />
                </div>
              ))}
            <div
              style={{
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
            </div>
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryDetails;
