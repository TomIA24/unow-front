import React, { useEffect, useState } from "react";

import styles from './styles.module.css'
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
const VideoSelected =({element,setMultipleFilesSelected,multipleFilesSelected})=>{

    const [close, setClose] = useState(false)
    const handleDeleteSelected=(name)=>{
        setMultipleFilesSelected(multipleFilesSelected.filter(item => item.name !== name))
    }
    const fileSizeFormatter = (bytes, decimal) => {
        if(bytes === 0){
            return '0 Bytes';
        }
        const dm = decimal || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
        const index = Math.floor(Math.log(bytes) / Math.log(1000));
        return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
    
    }
		return(
			<div key={element.name} className={styles.fileUploaded}>
				<UploadFileIcon className={styles.IconFile}/>
				<div className={styles.TitleFile}>
					<Typography noWrap sx={{color: "black", width:"80%"}}>{element.name}</Typography>
					<span className="">{fileSizeFormatter(element.size, 2)} </span>
					
				</div>	
				<Box onMouseOver={()=>setClose(true)} onMouseLeave={() => setClose(false)}>
					{
						close ?

						<CloseIcon onClick={()=>(handleDeleteSelected(element.name))} className={styles.IconFile} />

						:
						
						<DoneIcon  className={styles.IconFile} />
					}
				</Box>
				

			</div>	
            
    )
}

export default VideoSelected