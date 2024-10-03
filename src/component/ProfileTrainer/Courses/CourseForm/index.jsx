import React, { useEffect, useState } from "react";
import { request } from "../../../../core/api/request";
import Input from "../../../../shared/components/Inputs/Input";
import AddRessources from "../../../AddRessources";
import Nav from "../../../Nav";
import styles from "./styles.module.css";

const CourseForm = () => {
  const [userInfo, setUserInfo] = React.useState({});

  useEffect(() => {
    request.read("userData").then((data) => {
      setUserInfo(data.data);
    });
  }, []);

  const [multipleFilesSelectedRessources, setMultipleFilesSelectedRessources] =
    useState([]);
  const [uploadProgressRessources, setUploadProgressRessources] = useState(0);

  const handleDeleteSelected = (fileName) => {
    setMultipleFilesSelectedRessources((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const MultipleRessourcesChange = (event) => {
    const files = Array.from(event.target.files);
    setMultipleFilesSelectedRessources((prevFiles) => [...prevFiles, ...files]);
  };
  return (
    <div>
      <div className={"background_container"}>
        <div className="appWrapper" style={{ height: "100%" }}>
          <Nav />
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <img
                src={
                  userInfo?.image?.filePath
                    ? `${process.env.REACT_APP_API}${userInfo.image.filePath}`
                    : "/default-profile.png"
                }
                alt="Profile"
              />
            </div>
            <p className={styles.title}>Add Course</p>
          </div>
        </div>
      </div>

      <div className="appWrapper">
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <Input label="Title" name="title" type="text" />

            <div className={styles.group}>
              <div className={styles.stack}>
                <Input
                  label="Reference"
                  name="reference"
                  placeholder="Enter reference"
                  type="text"
                  required
                />
                <Input
                  label="Category"
                  name="category"
                  placeholder="Enter category"
                  type="text"
                  required
                />
              </div>

              <div className={styles.stack}>
                <Input
                  label="Price"
                  name="price"
                  placeholder="Enter price"
                  type="number"
                  required
                />
                <Input
                  label="Level"
                  name="level"
                  placeholder="Enter level"
                  type="number"
                  required
                />
              </div>
            </div>

            <Input
              label="Description"
              name="description"
              placeholder="Enter desciption"
              type="text"
              required
            />

            <Input
              label="Goals"
              name="goals"
              placeholder="Enter goals"
              type="text"
              required
            />

            <Input
              label="Who Should Attend"
              name="whoShouldAttend"
              placeholder="Enter who shoud attend"
              type="text"
              required
            />

            <Input
              label="Course Content"
              name="courseContent"
              placeholder="Enter course content"
              type="text"
              required
            />

            <Input
              label="Practical Work"
              name="practicalWork"
              placeholder="Enter practical work"
              type="text"
              required
            />

            <Input
              label="Certificate"
              name="certificate"
              placeholder="Enter certificate"
              type="text"
              required
            />

            <AddRessources
              multipleFilesSelectedRessources={multipleFilesSelectedRessources}
              uploadProgressRessources={uploadProgressRessources}
              MultipleRessourcesChange={MultipleRessourcesChange}
              handleDeleteSelected={handleDeleteSelected}
            />

            <div className={`${styles.group} ${styles.buttons}`}>
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
