import React, { useEffect, useState } from "react";
import { request } from "../../../../core/api/request";
import Input from "../../../../shared/components/Inputs/Input";
import Select from "../../../../shared/components/Inputs/Select";
import AddRessources from "../../../AddRessources";
import Nav from "../../../Nav";
import styles from "./styles.module.css";

const CourseForm = () => {
  const [userInfo, setUserInfo] = React.useState({});
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    Reference: "",
    Title: "",
    Description: "",
    Price: "",
    Level: "",
    Category: "",
    Goals: "",
    WhoShouldAttend: "",
    CourseContent: "",
    PracticalWork: "",
    certificate: "",
    testState: "notStarted",
    // thumbnail: "",
  });

  useEffect(() => {
    request.read("userData").then((data) => {
      setUserInfo(data?.data);
    });

    request.read("category/getCategories").then((data) => {
      const CategoriesTitles = data?.data.map((category) => category.Title);
      setCategories(CategoriesTitles);
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
    request.create("courses/CreateCourse", formData).then((data) => {
      console.log("Course created successfully", data);
    });
    // console.log(formData);
  };

  const MultipleRessourcesChange = (event) => {
    const files = Array.from(event.target.files);
    setMultipleFilesSelectedRessources((prevFiles) => [...prevFiles, ...files]);
  };

  const handleChangeFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            <Input
              label="Title"
              name="Title"
              type="text"
              value={formData.Title}
              onChange={(e) => handleChangeFormData(e)}
              required
            />

            <div className={styles.group}>
              <div className={styles.stack}>
                <Input
                  label="Reference"
                  name="Reference"
                  placeholder="Enter reference"
                  type="text"
                  value={formData.Reference}
                  onChange={(e) => handleChangeFormData(e)}
                  required
                />
                <Select
                  label="Category"
                  name="Category"
                  placeholder="Enter category"
                  options={categories}
                  value={formData.Category}
                  onChange={(e) => handleChangeFormData(e)}
                  required
                />
              </div>

              <div className={styles.stack}>
                <Input
                  label="Price"
                  name="Price"
                  placeholder="Enter price"
                  value={formData.Price}
                  onChange={(e) => handleChangeFormData(e)}
                  type="number"
                  required
                />
                <Select
                  label="Level"
                  name="Level"
                  placeholder="Enter level"
                  options={["Level 1", "Level 2", "Level 3"]}
                  value={formData.Level}
                  onChange={(e) => handleChangeFormData(e)}
                  required
                />
              </div>
            </div>

            <Input
              label="Description"
              name="Description"
              placeholder="Enter desciption"
              type="text"
              value={formData.Description}
              onChange={(e) => handleChangeFormData(e)}
              required
            />

            <Input
              label="Goals"
              name="Goals"
              placeholder="Enter goals"
              type="text"
              value={formData.Goals}
              onChange={(e) => handleChangeFormData(e)}
              required
            />

            <Input
              label="Who Should Attend"
              name="WhoShouldAttend"
              placeholder="Enter who shoud attend"
              type="text"
              value={formData.WhoShouldAttend}
              onChange={(e) => handleChangeFormData(e)}
              required
            />

            <Input
              label="Course Content"
              name="CourseContent"
              placeholder="Enter course content"
              type="text"
              value={formData.CourseContent}
              onChange={(e) => handleChangeFormData(e)}
              required
            />

            <Input
              label="Practical Work"
              name="PracticalWork"
              placeholder="Enter practical work"
              type="text"
              value={formData.PracticalWork}
              onChange={(e) => handleChangeFormData(e)}
              required
            />

            <Input
              label="Certificate"
              name="certificate"
              placeholder="Enter certificate"
              type="text"
              value={formData.certificate}
              onChange={(e) => handleChangeFormData(e)}
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
