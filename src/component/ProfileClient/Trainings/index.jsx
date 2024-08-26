import React from "react";
import styles from "./styles.module.css";

import Loading from "../../Loading";
import useProfile from "../hooks/use-profile";
import Empty from "../../assets/empty.png";
import CourseElement from "../components/CourseElement";
const Trainings = ({ user }) => {
  const { trainings, isTrainingsLoading } = useProfile();

  if (isTrainingsLoading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.coursesContainer}>
        <div className={styles.coursesContainerInner}>
          <div className={styles.titleContainer}>
            <h1>Trainings</h1>
            <div className={styles.underline} />
          </div>
          {trainings.length > 0 ? (
            <div className={styles.coursesInner}>
              {trainings.map((course) => (
                <CourseElement course={course} />
              ))}
            </div>
          ) : (
            <div className={styles.courses}>
              <img src={Empty} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Trainings;

// <div className={styles.RoomsDiv}>

//                     {isCoursesLoading?

//                         <Loading/>
//                     :

//                     courses.map(d=>{
//                         return(
//                             <React.Fragment>
//                                 <div key={d._id} className={styles.RoomDiv}>
//                                     <div  className={styles.RoomDivConfig}>

//                                         <div className={styles.RoomDivInfo}>
//                                             <img
//                                                 className={styles.imgCourse}
//                                                 src={imgcard}
//                                             />
//                                             <div className={styles.RoomDivInfoTexts}>
//                                                 {/* <p><strong>room ID : </strong>{d._id}</p> */}
//                                                 <p  className={styles.RoomDivInfoTextsCategory}>
//                                                     {d.Category}
//                                                 </p>
//                                                 <hr  className={styles.RoomDivInfoTextsCategoryHr}/>

//                                                 <Typography onClick={()=>window.location=`/Course/${d._id}`}
//                                                     className={styles.RoomDivInfoTextsTitle} noWrap>
//                                                     {d.Title}
//                                                 </Typography>
//                                                 <hr  className={styles.RoomDivInfoTextsCenterHr}/>
//                                                 {/* <p><strong>trainer ID : </strong>{user.name}</p> */}
//                                             </div>
//                                             <div className={styles.RoomDivInfoTextsVerticalHr}></div>

//                                             <div className={styles.RoomDivInfoTextsRoomInfo}>
//                                                 <p  className={styles.RoomDivInfoTextsCategory}>
//                                                 Level: {d.Level}
//                                                 </p>
//                                                 <Typography  >
//                                                 Type Of Ressources: {d.Videos.length>0? "Videos":""} {d.Videos.length>0&&d.Ressources.length>0? "/":""} {d.Ressources.length>0? "Files":""}
//                                                 </Typography>
//                                             </div>
//                                         </div>

//                                         <div style={{flex:1,display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"90%"}}>
//                                             <Button
//                                                 //disabled={course.state=="confirmed"}
//                                                 sx={{width:"90%",height:"40px", ml:2}}
//                                                 onClick={()=>window.location=`/Course/${d._id}`}
//                                                 variant="contained"
//                                                 endIcon={<SendIcon />}>
//                                                 Go Course
//                                             </Button>
//                                             {/* <Button
//                                                 //disabled={course.state=="confirmed"}
//                                                 sx={{width:"90%",height:"40px", ml:2}}
//                                                 onClick={()=>handleRoom(d.Room[0].urlId)}
//                                                 variant="contained"
//                                                 endIcon={<FolderZipIcon />}>
//                                                 Ressources
//                                             </Button> */}
//                                         </div>
//                                     </div>

//                                 </div>

//                             </React.Fragment>
//                         )
//                     })

//                     }

//             </div>
