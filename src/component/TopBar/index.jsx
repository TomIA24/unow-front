import { set } from "date-fns"
import { useState } from "react"

const TopBarComponent=(props)=>{
     const [selectedIndex,setSelectedIndex]=useState(null)
     console.log("props",props.items)
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{border:"1px solid black",borderRadius:"20px",width:"auto",display:"flex",justifyContent:"center",alignItems:"center",height:"70px"}}>
            {props?.items?.map((item,index)=>(
                <button key={index} onClick={()=>setSelectedIndex(index)} style={ item.id==selectedIndex? (selectedIndex===0)? {border: "none",
                    backgroundColor: "#3E4678",
                    display:"inline-flex",
                    borderRadius:"20px 0px 0px 20px",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                    marginRight:"10px",
                    width:"auto",
                    height: "100%",
                }:selectedIndex==props.items.length-1?{border: "none",
                    backgroundColor: "#3E4678",
                    display:"inline-flex",
                    borderRadius:"0px 20px 20px 0px",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                    width:"auto",
                    height: "100%",
                }:
                {border: "none",
                    backgroundColor: "#3E4678",
                    display:"inline-flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                    width:"auto",
                    height: "100%",
                }
                
                :{backgroundColor: "transparent",
                borderRadius:"20px 0px 0px 20px",
                display:"inline-flex",
                justifyContent:"center",
                alignItems:"center",
                cursor:"pointer",
                width:"auto",
                marginRight:"10px",
                border:"none",
                height: "100%"}}> 
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p style={{marginRight:"20px",    fontSize: "20px",paddingLeft:"10px",
                    fontWeight: "bold"}}>{item.title} </p>
                    </div>
                    {( item.id!==props.items.length-1)  &&<div style={{ color:"#CD6214",height:"70px", width: "4px",
                        backgroundColor: "#CD6214",
                        borderRadius:"15px",
                        marginRight:"13px",
                        height: "30px", 
                        float: "left" }}></div>}</button> 
            ))

            }

        </div>
        </div>
    )
}
export default TopBarComponent