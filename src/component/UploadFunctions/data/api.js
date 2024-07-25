import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API}/api/upload/`;

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

export const multipleFilesUploadWithName = async (data, name, id, type) => {
  const config = {
    headers: {
      authorization: `Bearer ${id}`,
      name: `name/${name}`,
      type: `type/${type}`,
    },
  };
  try {
    console.log("here Multiple videos from api file");
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