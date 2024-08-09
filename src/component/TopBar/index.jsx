import { MoreVertOutlined } from "@material-ui/icons"
import { set } from "date-fns"
import { useState } from "react"
import  styles from"./styles.module.css"
const TopBarComponent=(props)=>{
     const [selectedIndex,setSelectedIndex]=useState(null)
     console.log("props",props.items)
    return(
        <div className={styles.topcontainer}>
        <div className={styles.secondcontainer}>
            {props?.items?.map((item,index)=>(
                <button key={index} onClick={()=>setSelectedIndex(index)} className={ item.id==selectedIndex? (selectedIndex===0)? 
                styles.btnstyle:selectedIndex==props.items.length-1?styles.lastbtnstyle:
                styles.btn2style
                
                :styles.btn3style}> 
                <div className={styles.topcontainer}>
                <p className={styles.itemstyle}>{item.title} </p>
                    </div>
                    {(selectedIndex!==item.id)  &&<div className={styles.verticalline}></div>}</button> 
            ))

            }

        </div>
        <button className={styles.morestyle} ><MoreVertOutlined  /> </button>
        </div>
    )
}
export default TopBarComponent