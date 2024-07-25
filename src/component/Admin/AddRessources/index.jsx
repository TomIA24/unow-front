import React, { useState, useEffect } from "react";
import "./App.css";
import FileUploadScreen from "../../UploadFunctions/screens/FileUploadScreen";
import {
  getSingleFiles,
  getMultipleFiles,
} from "../../UploadFunctions/data/api";
import axios from "axios";
import download from "downloadjs";

function AddRessources() {
  const [multipleFiles, setMultipleFiles] = useState([]);

  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async (id, path, mimetype) => {
    try {
      console.log(id);
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/download/`,
        { params: { id: id } },
        { headers: {} },
        { responseType: "blob" },
        { withCredentials: true }
      );
      const split = path.split("/");
      const filename = split[split.length - 1];
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
      }
    }
  };

  useEffect(() => {
    getMultipleFilesList();
  }, []);
  return (
    <>
      <div className="">
        <h3 className="">Upload Ressourses</h3>
        <FileUploadScreen getMultiple={() => getMultipleFilesList()} />
      </div>
      <div className="">
        <div className="">
          <div className="" style={{ margin: "auto" }}>
            <h4 className="">Ressources per course list</h4>
            {multipleFiles.map((element, index) => (
              <div key={element._id}>
                <h6 className="">{element.title}</h6>
                <div className="">
                  {element.files.map((file, index) => (
                    <div className="">
                      <div className="">
                        {file.fileType === "image/png" ? (
                          <img
                            src={`${process.env.REACT_APP_API}/${file.filePath}`}
                            height="200"
                            className=""
                            alt="img"
                          />
                        ) : (
                          <React.Fragment>
                            <img
                              src={`${process.env.REACT_APP_API}/uploads/833px-PDF_file_icon.svg.png`}
                              height="200"
                              className=""
                              alt="img"
                              onClick={() =>
                                downloadFile(
                                  file.id,
                                  file.filePath,
                                  file.fileType
                                )
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <p>{file.fileName}</p>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRessources;
