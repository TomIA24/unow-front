import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API}api/upload/`;

export const singleFileUploadWithName = async (
  data,
  name,
  userId,
  id
 
) => {
  const config = {
    headers: {
      authorization: `Bearer ${userId}`,
      name: `name/${name}`,
      id: `id/${id}`,
    },
    
  };
  try {
    await axios.post(apiUrl + "singleFilewithTitle", data, config);
  } catch (error) {
    throw error;
  }
};

export const singleFileUpload = async (data, id) => {
  const config = {
    headers: { authorization: `Bearer ${id}` },
  };
  try {
    return await axios.post(apiUrl + "singleFile", data, config);
  } catch (error) {
    throw error;
  }
};

export const multipleFilesUploadWithName = async (data, name, id,setUploadProgressRessources,setUploadProgressVideos, type) => {
  const startTime = Date.now();
  const config = {
    headers: {
      authorization: `Bearer ${id}`,
      name: `name/${name}`,
      type: `type/${type}`,
    },
    
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      
      // Calculer le temps estimé restant
      const elapsedTime = (Date.now() - startTime) / 1000; // temps écoulé en secondes
      const uploadSpeed = loaded / elapsedTime; // vitesse en octets par seconde
      const remainingBytes = total - loaded;
      const remainingTime = remainingBytes / uploadSpeed; // temps restant en secondes
      const formatTime = (timeInSeconds) => {
        if (timeInSeconds < 60) return `${Math.round(timeInSeconds)} sec`;
        if (timeInSeconds < 3600) return `${Math.round(timeInSeconds / 60)} min`;
        return `${Math.round(timeInSeconds / 3600)} h`;
      };
      const formattedTime = formatTime(remainingTime);

      type==="Ressources"?setUploadProgressRessources(formattedTime): setUploadProgressVideos(formattedTime);
    },
  };
  try {
    await axios.post(apiUrl + "multipleFileswithTitle", data, config);
   
  } catch (error) {
    console.log(error);
  }
};


export const getSingleFiles = async() => {
    try {
        const { data } = await axios.post(apiUrl + 'getSingleFiles', {}, { headers: {       } }, {   });
        console.log(data)

        return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async(data, name, id, courseId) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, { headers: { authorization: `Bearer ${id}`, courseid: `courseId/${courseId}`, name: `name/${name}`,       } }, {   });
    } catch (error) {
        console.log(error);
    }
}
export const getMultipleFiles = async() => {
    try {
        const { data } = await axios.post(apiUrl + 'getMultipleFiles', {}, { headers: {       } }, {   });
        return data;
    } catch (error) {
        throw error;
    }
}