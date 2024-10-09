import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { request } from "../../../../core/api/request";
import {
  multipleFilesUploadWithName,
  singleFileUpload,
} from "../../../UploadFunctions/data/api";

export const useCourseForm = () => {
  const { id } = useParams();
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
  });
  const [img, setImg] = useState(null);

  useEffect(() => {
    request.read("userData").then((data) => setUserInfo(data?.data));
    request.read("category/getCategories").then((data) => {
      const CategoriesTitles = data?.data.map((category) => category.Title);
      setCategories(CategoriesTitles);
    });
  }, []);

  useEffect(() => {
    if (id) {
      request.list(`courses/specific`, { id }).then((data) => {
        setImg(`${process.env.REACT_APP_API}${data?.data.Thumbnail?.filePath}`);
        setFormData({
          Reference: data?.data.Reference,
          Title: data?.data.Title,
          Description: data?.data.Description,
          Price: data?.data.Price,
          Level: data?.data.Level,
          Category: data?.data.Category,
          Goals: data?.data.Goals,
          WhoShouldAttend: data?.data.WhoShouldAttend,
          CourseContent: data?.data.CourseContent,
          PracticalWork: data?.data.PracticalWork,
          certificate: data?.data.certificate,
          testState: data?.data.testState,
        });
        setMultipleFilesSelectedRessources(data?.data.Ressources);
        setMultipleVideosSelected(data?.data.Videos);
      });
    }
  }, [id]);

  const handleSingleFileChange = (e) => setImg(e.target.files[0]);

  const handleChangeFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMultipleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setMultipleVideosSelected((prevFiles) => [...prevFiles, ...files]);
  };

  const MultipleRessourcesChange = (event) => {
    const files = Array.from(event.target.files);
    setMultipleFilesSelectedRessources((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDeleteSelected = (fileName) => {
    setMultipleFilesSelectedRessources((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const UploadMultipleVideos = (multipleFilesSelected) => {
    const formData = new FormData();
    multipleFilesSelected.forEach((file) => formData.append("files", file));
    return formData;
  };

  const UploadMultipleRessources = (multipleFilesSelectedRessources) => {
    const formData = new FormData();
    multipleFilesSelectedRessources.forEach((file) =>
      formData.append("files", file)
    );
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      Status: "processing",
      Trainer: userInfo._id,
    };

    const resetFormAndFiles = () => {
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
    };

    const handleFileUploads = async (courseId, title) => {
      try {
        const [videosData, ressourcesData] = await Promise.all([
          UploadMultipleVideos(multipleVideosSelected),
          UploadMultipleRessources(multipleFilesSelectedRessources),
        ]);

        if (typeof img === "object") {
          const formDataThumbnail = new FormData();
          formDataThumbnail.append("file", img);
          await singleFileUpload(formDataThumbnail, courseId);
        }

        await Promise.all([
          multipleFilesUploadWithName(
            ressourcesData,
            title,
            userInfo._id,
            setUploadProgressRessources,
            setUploadProgressVideos,
            "Ressources"
          ),
          multipleFilesUploadWithName(
            videosData,
            title,
            userInfo._id,
            setUploadProgressRessources,
            setUploadProgressVideos,
            "Videos"
          ),
        ]);

        toast.success("Course files uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload files");
        throw error;
      }
    };

    try {
      if (!id) {
        const createdCourse = await request.create(
          "courses/CreateCourse",
          courseData
        );
        await handleFileUploads(createdCourse?.id, formData?.Title);
        toast.success("Course created successfully");
      }

      if (id) {
        await request.create(`courses/updateCourse`, { ...courseData, id });
        await handleFileUploads(id, formData?.Title);
        toast.success("Course updated successfully");
      }
    } catch (error) {
      toast.error("An error occurred while processing the course");
    } finally {
      resetFormAndFiles();
    }
  };

  return {
    formData,
    categories,
    img,
    uploadProgressVideos,
    multipleVideosSelected,
    setMultipleVideosSelected,
    multipleFilesSelectedRessources,
    uploadProgressRessources,
    handleSingleFileChange,
    handleChangeFormData,
    handleMultipleVideoChange,
    MultipleRessourcesChange,
    handleDeleteSelected,
    handleSubmit,
  };
};
