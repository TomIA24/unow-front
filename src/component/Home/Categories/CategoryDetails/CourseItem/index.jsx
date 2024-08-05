import styles from "../../../../Main/styles.module.css"
const CourseItem=(props)=>{
   
  return(
    <div className={styles.topTrainingElements} style={{paddingRight:"7%",marginTop:"3%"}}>
 
        <div className={styles.inner_carousel} >
          {props.course.thumbnail ? (
            <div className={styles.image}>
              <img src={props.course.thumbnail} alt={""} className={styles.imagefeatures} />

            </div>
          ) : (
            <div className={styles.image}>
              <img src="default-image.png" alt="Default" className={styles.imagefeatures} /></div>
          )}
          <div>
            <div className={styles.categorie}>
              <div className={styles.categorietype}>{props.course.subcat}</div>
              <div className={styles.categoriprice}>{props.course.price} </div>
            </div>
            <div className={styles.categoriniveau} style={{marginTop:"20px"}}>{props.course.level}</div>
            <div className={styles.categoridomain} style={{marginTop:"20px"}}>{props.course.title}</div>
            
          </div>
        </div>
      
    <div>
    
    </div>
  </div>

  )
}
export default CourseItem