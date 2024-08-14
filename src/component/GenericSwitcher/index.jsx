import { useState } from "react"

const GenericSwitcher=(props)=>{
    const [items,setItems]=useState(["Course","Training"])
    const [selectedItem,setSelectedItem]=useState("Course")

   return(<div style={{display:"inline-flex",width:"60%"}}>
       {items.map((item,i)=>{
        return(
            <button style={selectedItem!==item?{border:"none", fontWeight:"bold",padding:"4%",  borderBottom:"0.2px gray",width:"100%" ,marginBottom: "5%",backgroundColor:"transparent"}:
            {border:"none",width:"100%",backgroundColor:"#EAEAEA", padding:"1%", borderBottom: "5px solid #CD6214",marginBottom: "5%",             
            }} onClick={()=>setSelectedItem(item)}>
               <h2 style={{fontWeight:"bold",fontSize:"35px"}}>
                {item}
                </h2>
            </button>
        )
       })}
   </div>)

}
export default GenericSwitcher