import { useEffect, useRef, useState } from "react";
import { request } from "../../../core/api/request";
import useDebouncedState from "../../../hooks/useDebouncedState";

const useProgramsModal = (programs, setUserInfo) => {
  const [openAddProgram, setOpenAddProgram] = useState(false);
  const [isCertifying, setIsCertifying] = useState(true);
  const [filterPrograms, setFilterPrograms] = useState(programs);
  const [update, setUpdate] = useState({
    isUpdated: false,
    programId: undefined,
  });
  const [search, setSearch] = useDebouncedState("");
  const titleRef = useRef(null);
  const durationRef = useRef(null);
  const tjRef = useRef(null);

  useEffect(() => {
    const filteredPrograms = programs?.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilterPrograms(filteredPrograms);
  }, [search, programs]);

  const handleResetForm = async () => {
    const data = await request.read("userData");
    setUserInfo((prev) => ({ ...prev, programs: data.data.programs }));

    titleRef.current.value = "";
    durationRef.current.value = "";
    tjRef.current.value = "";
    setIsCertifying(true);
    setUpdate({ isUpdated: false, programId: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProgram = {
      title: titleRef.current.value,
      duration: durationRef.current.value,
      tj: tjRef.current.value,
      certifying: isCertifying,
    };

    if (update.isUpdated) {
      request.update("programs", update.programId, newProgram).then(() => {
        handleResetForm();
      });
    } else {
      request.create("programs", newProgram).then(() => {
        handleResetForm();
      });
    }
  };

  const handleSelectedProgram = (program) => {
    setOpenAddProgram(true);
    titleRef.current.value = program.title;
    durationRef.current.value = program.duration;
    tjRef.current.value = program.tj;
    setUpdate({
      isUpdated: true,
      programId: program._id,
    });
  };

  const handleDelete = () => {
    request.remove("programs", update.programId).then(() => {
      handleResetForm();
    });
  };

  const handleAddProgram = () => {
    setOpenAddProgram((prev) => !prev);
    handleResetForm();
  };

  return {
    openAddProgram,
    isCertifying,
    setIsCertifying,
    filterPrograms,
    search,
    setSearch,
    titleRef,
    durationRef,
    tjRef,
    update,
    handleSubmit,
    handleSelectedProgram,
    handleDelete,
    handleAddProgram,
  };
};

export default useProgramsModal;
