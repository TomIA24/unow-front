import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { request } from "../../../../core/api/request";
import {
  multipleFilesUploadWithName,
  singleFileUploadWithName,
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
    request.create("courses/CreateCourse", courseData).then(async (data) => {
      try {
        const videosData = UploadMultipleVideos(multipleVideosSelected);
        const ressourcesData = UploadMultipleRessources(
          multipleFilesSelectedRessources
        );

        const formDataThumbnail = new FormData();
        formDataThumbnail.append("file", img);

        await singleFileUploadWithName(
          formDataThumbnail,
          formData?.Title,
          userInfo._id,
          data?.id
        );
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
        toast.success("Course created successfully");
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
      }
    });
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
