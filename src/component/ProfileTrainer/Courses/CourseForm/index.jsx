import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../../../core/api/request";
import Input from "../../../../shared/components/Inputs/Input";
import Select from "../../../../shared/components/Inputs/Select";
import AddRessources from "../../../AddRessources";
import ImgUploadSection from "../../../ImgUploadSection";
import Nav from "../../../Nav";
import { multipleFilesUploadWithName } from "../../../UploadFunctions/data/api";
import VideosSelector from "../../../VideosSelector";
import styles from "./styles.module.css";

const CourseForm = () => {
  const [userInfo, setUserInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [uploadProgressVideos, setUploadProgressVideos] = useState(0);
  const [multipleVideosSelected, setMultipleVideosSelected] = useState([]);
  const [multipleFilesSelectedRessources, setMultipleFilesSelectedRessources] =
    useState([]);
  const [uploadProgressRessources, setUploadProgressRessources] = useState(0);
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
    thumbnail: "",
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

  const handleDeleteSelected = (fileName) => {
    setMultipleFilesSelectedRessources((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const UploadMultipleVideos = (multipleFilesSelected) => {
    const formData = new FormData();
    for (let i = 0; i < multipleFilesSelected?.length; i++) {
      formData?.append("files", multipleFilesSelected[i]);
    }

    return formData;
  };

  const UploadMultipleRessources = (multipleFilesSelectedRessources) => {
    const formData = new FormData();
    for (let i = 0; i < multipleFilesSelectedRessources.length; i++) {
      formData?.append("files", multipleFilesSelectedRessources[i]);
    }
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await request.create("courses/CreateCourse", formData);

    const videosData = UploadMultipleVideos(multipleVideosSelected);
    const ressourcesData = UploadMultipleRessources(
      multipleFilesSelectedRessources
    );

    try {
      await multipleFilesUploadWithName(
        ressourcesData,
        data?.Title,
        userInfo._id,
        setUploadProgressRessources,
        setUploadProgressVideos,
        "Ressources"
      );
      await multipleFilesUploadWithName(
        videosData,
        data?.Title,
        userInfo._id,
        setUploadProgressRessources,
        setUploadProgressVideos,
        "Videos"
      );
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setMultipleFilesSelectedRessources([]);
      setMultipleVideosSelected([]);
      setFormData({
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
      });

      toast.success("Course created successfully");
    }
  };

  const MultipleRessourcesChange = (event) => {
    const files = Array.from(event.target.files);
    setMultipleFilesSelectedRessources((prevFiles) => [...prevFiles, ...files]);
  };

  const handleChangeFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMultipleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setMultipleVideosSelected((prevFiles) => [...prevFiles, ...files]);
  };

  const [img, setImg] = useState("");

  const handleSingleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(URL.createObjectURL(file));
  };
  return (
    <div>
      <div className={"background_container"}>
        <div className="appWrapper" style={{ height: "100%" }}>
          <Nav />
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <ImgUploadSection
                SingleFileChange={handleSingleFileChange}
                img={img}
              />
            </div>
            <p className={styles.title}>Add Course</p>
          </div>
        </div>
      </div>

      <div className="appWrapper">
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <VideosSelector
              MultipleVideoChange={handleMultipleVideoChange}
              uploadProgressVideos={uploadProgressVideos}
              setMultipleVideosSelected={setMultipleVideosSelected}
              multipleVideosSelected={multipleVideosSelected}
            />
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
