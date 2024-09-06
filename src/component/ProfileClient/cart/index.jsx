import React from "react";

import styles from "./styles.module.css";

import Loading from "../../Loading";
import useCart from "../hooks/use-cart";
import Empty from "../../assets/empty.png";
import CourseElement from "../components/CourseCardElement";

const Cart = ({ user }) => {
  const {
    data,
    cart,
    loading,
    isCoursesLoading,
    isTrainingsLoading,
    handleCourse,
    handleTraining,
    handleBuySTRIPE,
  } = useCart();

  // const ListTrainingsCart = cart.map((element) => {
  //   //
  //   return (
  //     <div key={element._id} className={styles.Courses}>
  //       <div className={styles.display}>
  //         <img className={styles.imgCourse} src={imgcard} />
  //         <div className={styles.ListCoursesInfoCourse}>
  //           <Typography className={styles.ListCoursesCardCategory} noWrap>
  //             {element.Category}
  //           </Typography>

  //           <hr className={styles.ListCoursesCardCategoryHr} />
  //           <Link
  //             key={element._id}
  //             to={{ pathname: `/Training/${element._id}` }}
  //             onClick={() => {
  //               window.scrollTo(0, 0);
  //             }}
  //           >
  //             <Typography className={styles.ListCoursesCardTitle} noWrap>
  //               {element.Title}
  //             </Typography>
  //           </Link>
  //           <hr className={styles.ListCoursesCardCenterHr} />
  //           <p className={styles.ListCoursesCardLevel}>
  //             {/* Level: <span>Hard</span> */}
  //             <Typography noWrap>
  //               Level: <span>{element.Level}</span>
  //             </Typography>
  //           </p>
  //         </div>
  //         <div className={styles.stateFieldDiv}>
  //           <div className={styleField}>
  //             <FiberManualRecordIcon sx={{ fontSize: 10 }} />
  //             <p>{CourseState}</p>
  //           </div>
  //           {CourseState === "confirmed" ? (
  //             <React.Fragment>
  //               {element.enrolledPaid.includes(user._id) ? (
  //                 <Button
  //                   sx={{}}
  //                   onClick={() => {
  //                     handleTraining(element._id);
  //                   }}
  //                   variant="contained"
  //                 >
  //                   Training
  //                 </Button>
  //               ) : (
  //                 <Button
  //                   sx={{}}
  //                   onClick={() => {
  //                     handleBuySTRIPE(element._id);
  //                   }}
  //                   variant="contained"
  //                 >
  //                   Pay fees
  //                 </Button>
  //               )}
  //             </React.Fragment>
  //           ) : (
  //             ""
  //           )}
  //         </div>
  //       </div>
  //       <div className={styles.ListCoursesFooter}>
  //         <div className={styles.ListCoursesCardRating}>
  //           {TextRating2(element.rating, element.evaluate.length)}
  //           {/* {TextRating2(element.note,element.avis)} */}
  //         </div>
  //         {/* <p className={styles.priceFooter}>1600 $ HT</p> */}
  //         <p className={styles.priceFooter}>{element.Price} TTC</p>
  //       </div>
  //     </div>
  //   );
  // });

  return (
    <div className={styles.leftSectionProfile}>
      <div className={styles.CartDiv}>
        <div className={styles.titleContainer}>
          <h1>Courses</h1>
          <div className={styles.underline} />
        </div>
        <div className={styles.carouselDivContainer}>
          <div className={styles.carouselDiv}>
            {isCoursesLoading ? (
              <Loading />
            ) : (
              <>
                {cart?.courses?.length > 0 ? (
                  <div className={styles.coursesInner}>
                    {cart?.courses?.map((course) => (
                      <CourseElement course={course} type="Course" />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyBox}>
                    <img src={Empty} alt="" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.CartDiv}>
        <div className={styles.titleContainer}>
          <h1>Trainings</h1>
          <div className={styles.underline} />
        </div>
        <div className={styles.carouselDivContainer}>
          <div className={styles.carouselDiv}>
            {isTrainingsLoading ? (
              <Loading />
            ) : (
              <>
                {cart?.trainings?.length > 0 ? (
                  <div className={styles.coursesInner}>
                    {cart?.trainings?.map((course) => (
                      <CourseElement course={course} type="Training" />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyBox}>
                    <img src={Empty} alt="" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
