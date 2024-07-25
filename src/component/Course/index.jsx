import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import StandardCourse from "./standard"
import PaidCourse from "./paid"


const  Course = () =>{

    let { id } = useParams();
    const token = localStorage.getItem("token")
	const user = JSON.parse(localStorage.getItem("user"));
    const [paid, setPaid] = useState(false)

    useEffect(()=>{
        if(token){
            if(user.CoursesPaid.includes(id)){
                        setPaid(true)
               }
        }
    },[user])
    

    return (
        <React.Fragment>
            {
                paid ? 
                    <PaidCourse/>
                :
                    <StandardCourse/>
            }
        </React.Fragment>
    )
}

export default Course