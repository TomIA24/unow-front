import React from "react";
import CourseGrid from "../CourseGrid";
import styles from "./styles.module.css";

const CoursesSection = () => {
  const courses = [
    {
      image:
        "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
      tag: "Web Development",
      tagColor: "#ffe300",
      price: 1680,
      level: "Intermediate",
      title: "React: Developing a Web Application",
      rating: 4.7,
      reviews: 753,
      students: 5000,
      hours: "3h+",
    },
    {
      image:
        "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
      tag: "Web Development",
      tagColor: "#ffe300",
      price: 1680,
      level: "Intermediate",
      title: "React: Developing a Web Application",
      rating: 4.7,
      reviews: 753,
      students: 5000,
      hours: "3h+",
    },
    {
      image:
        "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
      tag: "Web Development",
      tagColor: "#ffe300",
      price: 1680,
      level: "Intermediate",
      title: "React: Developing a Web Application",
      rating: 4.7,
      reviews: 753,
      students: 5000,
      hours: "3h+",
    },
    // ... add more course objects
  ];

  return (
    <div className={styles.coursesSection}>
      <h2 className={styles.sectionTitle}>ONLINE COURSES</h2>
      <CourseGrid courses={courses} />
      <button className={styles.otherCoursesButton}>Other Courses</button>
    </div>
  );
};

export default CoursesSection;
