import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API}api/upload/`;

export const singleFileUploadWithName = async (
  data,
  name,
  userId,
  id,
  setUploadProgress
) => {
  const config = {
    headers: {
      authorization: `Bearer ${userId}`,
      name: `name/${name}`,
      id: `id/${id}`,
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
    setUploadProgress(progress);
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

export const multipleFilesUploadWithName = async (data, name, id,setUploadProgressRessources, type) => {
  const startTime = Date.now();
  const config = {
    headers: {
      authorization: `Bearer ${id}`,
      name: `name/${name}`,
      type: `type/${type}`,
    },
    
    onUploadProgressRessources: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentCompleted = Math.round((loaded * 100) / total);
     // setUploadProgressRessources(percentCompleted);

      // Calculer le temps estimé restant
      const elapsedTime = (Date.now() - startTime) / 1000; // temps écoulé en secondes
      const uploadSpeed = loaded / elapsedTime; // vitesse en octets par seconde
      const remainingBytes = total - loaded;
      const remainingTime = remainingBytes / uploadSpeed; // temps restant en secondes

      setUploadProgressRessources(Math.round(remainingTime));
    },
  };
  try {
    console.log("here Multiple videos from api file",type);
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