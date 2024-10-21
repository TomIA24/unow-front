import React from "react";
import Input from "../../../../shared/components/Inputs/Input";
import Select from "../../../../shared/components/Inputs/Select";
import AddRessources from "../../../AddRessources";
import ImgUploadSection from "../../../ImgUploadSection";
import Nav from "../../../Nav";
import VideosSelector from "../../../VideosSelector";
import styles from "./styles.module.css";
import { useCourseForm } from "./useCourseForm";

const CourseForm = () => {
  const {
    formData,
    categories,
    img,
    uploadProgressVideos,
    multipleVideosSelected,
    multipleFilesSelectedRessources,
    setMultipleVideosSelected,
    uploadProgressRessources,
    handleSingleFileChange,
    handleChangeFormData,
    handleMultipleVideoChange,
    MultipleRessourcesChange,
    handleDeleteSelected,
    handleSubmit,
    certifcateList
  } = useCourseForm();

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

            <Select
              label="Certificate"
              name="certificate"
              placeholder="Enter certificate"
              options={certifcateList}
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
              <button onClick={() => window.history.back()} type="button">
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
