import { useEffect, useRef } from "react"
import CourseItem from "./CourseItem";
import Nav from "../../../Nav";
import { Button } from "react-bootstrap";

const CategoryDetails=(props)=>{
    useEffect(()=>{

    },[])
  const refHome=useRef()
    return (
        <div>
        <Nav ref={refHome} />
    <div style={{justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
        <b style={{marginLeft:"10%",fontSize:"60px",marginBottom:"30px"}}>ONLINE COURSES</b>
        <hr style={{border:"solid 3px #CD6214",width:"5%",marginLeft:"10%",fontWeight:"30px",height:"20%",borderRadius:"20px"}}/>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> {props?.onlineCourses?.map((course)=>(
            <CourseItem course={course} />

          ))}
          </div>
          <Button style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Other Courses</Button>
          <div style={{justifyContent:"center",alignItems:"center",marginTop:"20px"}}>

        <b style={{marginLeft:"10%",fontSize:"60px",marginTop:"30px"}}>OFFLINE COURSES</b>
        <hr  style={{border:"solid 3px #CD6214",width:"5%",marginLeft:"10%",fontWeight:"30px",height:"20%",borderRadius:"20px"}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        {props?.offlineCourses?.map((course)=>(
            
            <CourseItem course={course} />

          ))}
          </div>
          </div>

    </div>
    </div>)  
}
export default CategoryDetails;