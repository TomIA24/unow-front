import { useEffect, useRef, useState } from "react"
import CourseItem from "./CourseItem";
import Nav from "../../../Nav";
import { Button, Col, Row,Container } from "react-bootstrap";
import "./styles.modules.css"
const CategoryDetails=(props)=>{
    useEffect(()=>{

    },[])
  const [loadMoreOnline,setLoadMoreOnline]=useState(false) 
  const [loadMoreOffline,setLoadMoreOffline]=useState(false)
  const [indexItems,setIndexItems]=useState(6)
  
  const [indexItemsOffline,setIndexItemsOffline]=useState(6)
  useEffect(()=>{
    if(loadMoreOnline && !loadMoreOffline){
      setIndexItemsOffline(3)
    }
    else     if(!loadMoreOnline && loadMoreOffline){
      setIndexItems(3)

    }
  },[loadMoreOnline,loadMoreOffline])
  const updatItemsFunction=()=>{
    setIndexItems((prev)=>prev+3)
  }
  const updatItemsOfflineFunction=()=>{
    setIndexItemsOffline((prev)=>prev+3)
  }
  const groupIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  };  const refHome=useRef()
  const arrayOnline=groupIntoRows(props.onlineCourses,3)
  const arrayOffline=groupIntoRows(props.offlineCourses,3)
   
    return (
        <div >
        <Nav ref={refHome} />
    <div className="d-flex justify-content-center align-items-center mt-4" style={{marginLeft:"3%",marginRight:"3%"}} >
      <br />
    <div className="features">
            ONLINE COURSES
            <p className="underline"></p>
          </div>
         <Container className="container-grid">
          {arrayOnline.slice(0,indexItems/3).map((itemnested)=>(
            <div>
          <Row className="row1">
            {itemnested.map((course)=>(
            <Col xs={12} md={4}  className="col">
            <CourseItem course={course} />
            </Col>
            ))
}
          
          </Row>
          <br />
          </div>
))}
          <Row>         
             <button className="btn_style btn-primary" onClick={()=>{setLoadMoreOnline(true) ;updatItemsFunction()}} ><p className="text_btn">Other Courses</p></button>
          </Row>
          </Container>
          
          <div style={{justifyContent:"center",alignItems:"center",marginTop:"70px"}}>

          <div className="features">
            OFFLINE COURSES
            <p className="underline"></p>
          </div>
          <Container className="container-grid">
          {arrayOffline.slice(0,indexItemsOffline/3).map((itemnested)=>(
            <div>
          <Row className="row1">
            {itemnested.map((course)=>(
            <Col xs={12} md={4}  className="col">
            <CourseItem course={course} />
            </Col>
            ))
}
          
          </Row>
          <br />
          </div>
))}
          <Row>         
             <button className="btn_style btn-primary" onClick={()=>{setLoadMoreOffline(true) ;updatItemsOfflineFunction()}} ><p className="text_btn">Other Courses</p></button>
          </Row>
          </Container>
          </div>

    </div>
    </div>)  

}
export default CategoryDetails;