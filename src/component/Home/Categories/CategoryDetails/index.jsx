import { useEffect, useRef, useState } from "react";
import CourseItem from "./CourseItem";
import Nav from "../../../Nav";
import { Button, Col, Row, Container } from "react-bootstrap";
import "./styles.modules.css";
import TopBarComponent from "../../../TopBar";

const CategoryDetails = (props) => {
  useEffect(() => {}, []);
  const [loadMoreOnline, setLoadMoreOnline] = useState(false);
  const [loadMoreOffline, setLoadMoreOffline] = useState(false);
  const [indexItems, setIndexItems] = useState(6);
  const [indexItemsOffline, setIndexItemsOffline] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const groupIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const refHome = useRef();
  const arrayOnline = windowWidth>900? groupIntoRows(props.onlineCourses, 3): groupIntoRows(props.onlineCourses, 2)
  const arrayOffline = windowWidth>900?groupIntoRows(props.offlineCourses, 3): groupIntoRows(props.onlineCourses, 2)

  return (
    <div>
      <Nav ref={refHome} />
      <br />
      <TopBarComponent
        items={[
          { id: 0, title: "Design" },
          { id: 1, title: "Conception Web" },
          { id: 2, title: "Conception Graphique et Illustration" },
          { id: 3, title: "Outil de conception" },
          { id: 4, title: "Conception d'une expérience utilisateur" }
        ]}
      />
      <div
        className="d-flex justify-content-center align-items-center mt-4"
        style={{ marginLeft: "8%", marginRight: "8%" }}
      >
        <br />
        <div className="features">
          ONLINE COURSES
          <p className="underline"></p>
        </div>
        <Container className="container-grid">
          {arrayOnline.slice(0,  windowWidth>900?indexItems / 3:indexItems/2).map((itemnested) => (
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
          <Row>
            <Col className="text-center">
              <button
                className="btn_style btn-primary"
                onClick={() => {
                  setLoadMoreOnline(true);
                  updatItemsFunction();
                }}
              >
                <p className="text_btn">Other Courses</p>
              </button>
            </Col>
          </Row>
        </Container>

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70px",
          }}
        >
          <div className="features">
            OFFLINE COURSES
            <p className="underline"></p>
          </div>
          <Container className="container-grid">
            {arrayOffline.slice(0, windowWidth>900?indexItemsOffline / 3:indexItemsOffline / 2).map((itemnested) => (
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
            <Row>
              <Col className="text-center">
                <button
                  className="btn_style btn-primary"
                  onClick={() => {
                    setLoadMoreOffline(true);
                    updatItemsOfflineFunction();
                  }}
                >
                  <p className="text_btn">Other Courses</p>
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
