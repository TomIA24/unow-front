

import styles from "./styles.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";

import {
  BriefcaseBusiness,
  Cpu,
  Earth,
  FileBadge,
  FileVideo2,
  Flame,
  GraduationCap,
  Home,
  Plus,
  Settings2,
  User,
  UserRoundPlus,
  UserRoundSearch,
} from "lucide-react";

import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useRecoilState } from "recoil";
import { signupState } from "../../recoil/signup.atom";
import { set } from "date-fns";
import img from "../assets/profileImgNoUp.svg";
import imgicon from "../assets/usericon.png";
import Avatar from "@mui/material/Avatar";

const Personalize = () => {
  const location = useLocation();
  const [signup, setSignup] = useRecoilState(signupState);
  const [customDomain, setCustomDomain] = useState("");

  const [learningType, setLearningType] = useState("");
  const [learningReason, setLearningReason] = useState("");
  const [learningDomain, setLearningDomain] = useState("");
  const [learningCertif, setLearningCertif] = useState("");
  const { candiddId, data } = location.state || {};
  console.log("idcdnadt", candiddId);

  // Save quizId to sessionStorage
  const addDomain = (domain, e) => {
    if (e.target.checked) {
      setSignup({
        ...signup,
        domain: [...signup.domain, domain],
        level: [...signup.level, { domain: domain, niveau: "Débutant" }],
      });
    } else {
      setSignup({
        ...signup,
        domain: signup.domain.filter((item) => item !== domain),
        level: signup.level.filter((item) => item.domain !== domain),
      });
    }
  };

  const addLearningMethod = (method, e) => {
    if (e.target.checked) {
      setSignup({ ...signup, preferences: [...signup.preferences, method] });
    } else {
      setSignup({
        ...signup,
        preferences: signup.preferences.filter((item) => item != method),
      });
    }
  };

  const addGoal = (goal, e) => {
    if (e.target.checked) {
      setSignup({ ...signup, goals: [...signup.goals, goal] });
    } else {
      setSignup({
        ...signup,
        goals: signup.goals.filter((item) => item != goal),
      });
    }
  };

  const handleChangeSignup = ({ currentTarget: input }) => {
    console.log(input.name, input.value);
    setSignup({ ...data, [input.name]: input.value });
  };




  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setLearningReason(input.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("login");
  //   try {
  //     const config = {
  //       headers: {},
  //     };
  //     const url = `${process.env.REACT_APP_API}api/Candidat/Signup`;
  //     const { data: res } = await axios.post(url, signup);
  //     navigate("/login", { state: { signup: true } });
  //     console.log(res.message);
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       navigate("/signup", {
  //         state: { errorState: error.response.data.message },
  //       });
  //     }
  //   }
  // };

  const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };

  const IconText = (text) => {
    return <p style={{ fontSize: 13 }}>{text}</p>;
  };

  const [selectedOption, setSelectedOption] = useState('');


  const [formData, setFormData] = useState({
    stepPersonalize_1: {
      interests: [],
      exploreFirst: ''
    },
    stepPersonalize_2: {
      goals: [],
      timeline: '',
    },
    stepPersonalize_3: {
      availability:[],
      hoursperweek: '',
      learningother: ''
    },
    stepPersonalize_4: {
      learningpace: [],
    dayslearning: '',
    timeOfDay: '',
    },
    profilecomplited: 0,
 });

  const [candidatdata, setcandidatdata] = useState({
   
    stepPersonalize_1: {
      interests: [],
      exploreFirst: ''
    },
    stepPersonalize_2: {
      goals: [],
      timeline: '',
    },
    stepPersonalize_3: {
      availability: [],
      hoursperweek: '',
      learningother: ''
    },
    stepPersonalize_4: {
      learningpace: [],
    dayslearning: '',
    timeOfDay: '',
    },
    profilecomplited: 0,
 } );


  const [candidateData, setcandidateData] = useState([]);
  const [missingFields, setMissingFields] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const candidateResponse = await axios.get(`${process.env.REACT_APP_API}api/candidat/candidates/${candiddId}`);
        const candidateData = candidateResponse.data;
        setcandidatdata(candidateResponse.data)
        setcandidateData(candidateResponse.data);


        setFormData(prevFormData => ({
          ...prevFormData,
          ...candidateData,
        }));

        console.log("Existing candidate candidateData:", candidateData);
        console.log("Existing candidate candidatdata:", candidatdata);
        console.log("Existing candidate FormData:", formData);
        console.log("hasChanges:", hasChanges);
      }
      catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchData();
  }, [candiddId]);


  const handleInputChange1 = (e) => {
    const { name, value, checked, type } = e.target;

    // Handle checkbox changes
    if (type === 'checkbox') {
      setFormData(prevState => {
        // Update the interests array based on checkbox state
        const updatedInterests = checked
          ? [...prevState.stepPersonalize_1.interests, value] // Add to array if checked
          : prevState.stepPersonalize_1.interests.filter(interest => interest !== value); // Remove from array if unchecked

        return {
          ...prevState,
          stepPersonalize_1: {
            ...prevState.stepPersonalize_1,
            interests: updatedInterests
          }
        };
      });
    }
    // Handle text input changes
    else if (type === 'text') {
      setFormData(prevState => ({
        ...prevState,
        stepPersonalize_1: {
          ...prevState.stepPersonalize_1,
          exploreFirst: value // Update the text input value
        }
      }));
    }
    // Handle other input types if necessary
    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleInputChange2 = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
        setFormData(prevState => {
          // Update the goals array based on checkbox state
          const updatedGoals = checked
            ? [...prevState.stepPersonalize_2.goals, value] // Add to array if checked
            : prevState.stepPersonalize_2.goals.filter(goal => goal !== value); // Remove from array if unchecked

          return {
            ...prevState,
            stepPersonalize_2: {
              ...prevState.stepPersonalize_2,
              goals: updatedGoals
            }
          };
        });
      }
      else if (type === 'radio') {
        // Handle radio button changes
        setFormData(prevState => ({
          ...prevState,
          stepPersonalize_2: {
            ...prevState.stepPersonalize_2,
            timeline: value // Update the selected radio button value
          }
        }));
      }
  };

  const handleInputChange3 = (e) => {
    const { name, value, checked, type } = e.target;
  console.log(e.target.value);
  
    if (type === 'checkbox') {
      setFormData(prevState => {
        const updatedavailability = checked
          ? [...prevState.stepPersonalize_3.availability, value] // Add to array if checked
          : prevState.stepPersonalize_3.availability.filter(availability => availability !== value); // Remove from array if unchecked
  
        return {
          ...prevState,
          stepPersonalize_3: {
            ...prevState.stepPersonalize_3,
            availability: updatedavailability
          }
        };
      });
    } else if (type === 'radio') {
      // Check the name of the radio group to update the correct field
      setFormData(prevState => ({
        ...prevState,
        stepPersonalize_3: {
          ...prevState.stepPersonalize_3,
          [name]: value // Use the `name` to dynamically update the correct field
        }
      }));
    }
  };
  

  const handleInputChange4 = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setFormData(prevState => {
        // Update the goals array based on checkbox state
        const updatedlearningpace = checked
          ? [...prevState.stepPersonalize_4.learningpace, value] // Add to array if checked
          : prevState.stepPersonalize_4.learningpace.filter(learningpace => learningpace !== value); // Remove from array if unchecked

        return {
          ...prevState,
          stepPersonalize_4: {
            ...prevState.stepPersonalize_4,
            learningpace: updatedlearningpace
          }
        };
      });
    }
    else if (type === 'radio') {
      // Handle radio button changes
      setFormData(prevState => ({
        ...prevState,
        stepPersonalize_4: {
          ...prevState.stepPersonalize_4,
          [name]: value 
        }
      }));
    }
  };


  const handleInputChangen = (e) => {
    const { name, value, checked, type } = e.target;
console.log(e.target.value);

    // Determine the step from the input's name attribute
    if (name.startsWith('stepPersonalize_1')) {
      if (type === 'checkbox') {
        setFormData(prevState => {
          // Update the interests array based on checkbox state
          const updatedInterests = checked
            ? [...prevState.stepPersonalize_1.interests, value] // Add to array if checked
            : prevState.stepPersonalize_1.interests.filter(interest => interest !== value); // Remove from array if unchecked
  
          return {
            ...prevState,
            stepPersonalize_1: {
              ...prevState.stepPersonalize_1,
              interests: updatedInterests
            }
          };
        });
      }
      // Handle text input changes
      else if (type === 'text') {
        setFormData(prevState => ({
          ...prevState,
          stepPersonalize_1: {
            ...prevState.stepPersonalize_1,
            exploreFirst: value // Update the text input value
          }
        }));
      }
      // Handle other input types if necessary
      else {
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    }
   if (name.startsWith('stepPersonalize_2')) {
    
      if (type === 'checkbox') {
        setFormData(prevState => {
          // Update the goals array based on checkbox state
          const updatedGoals = checked
            ? [...prevState.stepPersonalize_2.goals, value] // Add to array if checked
            : prevState.stepPersonalize_2.goals.filter(goal => goal !== value); // Remove from array if unchecked

          return {
            ...prevState,
            stepPersonalize_2: {
              ...prevState.stepPersonalize_2,
              goals: updatedGoals
            }
          };
        });
      }
      else if (type === 'radio') {
        // Handle radio button changes
        setFormData(prevState => ({
          ...prevState,
          stepPersonalize_2: {
            ...prevState.stepPersonalize_2,
            timeline: value // Update the selected radio button value
          }
        }));
      }
    } if (name.startsWith('stepPersonalize_3')) {
      // Handle inputs for stepPersonalize_2
      if (type === 'checkbox') {
        setFormData(prevState => {
          // Update the goals array based on checkbox state
          const updatedavailability = checked
            ? [...prevState.stepPersonalize_3.availability, value] // Add to array if checked
            : prevState.stepPersonalize_3.availability.filter(availability => availability !== value); // Remove from array if unchecked

          return {
            ...prevState,
            stepPersonalize_3: {
              ...prevState.stepPersonalize_3,
              availability: updatedavailability
            }
          };
        });
      }
      else if (type === 'radio') {
        // Handle radio button changes
        setFormData(prevState => ({
          ...prevState,
          stepPersonalize_3: {
            ...prevState.stepPersonalize_3,
            hoursperweek: value ,
            learningother:value // Update the selected radio button value
          }
        }));
      }
    }  if (name.startsWith('stepPersonalize_4')) {
      // Handle inputs for stepPersonalize_2
      if (type === 'checkbox') {
        setFormData(prevState => {
          // Update the goals array based on checkbox state
          const updatedlearningpace = checked
            ? [...prevState.stepPersonalize_4.learningpace, value] // Add to array if checked
            : prevState.stepPersonalize_4.learningpace.filter(learningpace => learningpace !== value); // Remove from array if unchecked

          return {
            ...prevState,
            stepPersonalize_4: {
              ...prevState.stepPersonalize_4,
              learningpace: updatedlearningpace
            }
          };
        });
      }
      else if (type === 'radio') {
        // Handle radio button changes
        setFormData(prevState => ({
          ...prevState,
          stepPersonalize_4: {
            ...prevState.stepPersonalize_4,
            dayslearning: value ,
            timeOfDay:value // Update the selected radio button value
          }
        }));
      }
    }
    // Handle other input types if necessary
  };


  const [currentStep, setCurrentStep] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_API}api/candidat/step1/${candiddId}`, candidatdata);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating candidat data:', error);
    }
  };


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };



  const handleFinish = async () => {

    const currentStepData = steps[currentStep];


    // const isStepCompleted = stepCompletionStatus[currentStep];
    const hasStepBeenCompleted = currentStepData.isCompleted;

    console.log("hasChanges ", hasChanges);
    // console.log("hasStepBeenCompleted ",hasStepBeenCompleted );
    console.log(hasStepBeenCompleted && hasChanges);

    const updatedProfilecomplited = (hasStepBeenCompleted && hasChanges) ? (candidateData.profilecomplited) : (candidateData.profilecomplited + 20);
    console.log('updatedProfilecomplited', updatedProfilecomplited);


    const updatedFormData = {
      ...candidateData,
      ...formData,
      profilecomplited: updatedProfilecomplited,
    };



    const {
      password,
      _id,
      cartTrainings,
      TrainingsPaid,
      cartCourses,
      CoursesPaid,
      __v,
      ...dataToSubmit
    } = updatedFormData;

    console.log("Data to be submitted:", dataToSubmit);
    try {

      const response = await axios.put(
        `${process.env.REACT_APP_API}api/candidat/${candiddId}`,
        dataToSubmit
      );
      navigate("/profile");
      console.log("Final updated candidate data:", response.data);
      setCurrentStep(prevStep => prevStep + 1);



    } catch (error) {
      console.error("Error updating last candidate:", error.response ? error.response.data : error.message);
    };
  }
  const [completedPercentage, setCompletedPercentage] = useState('0%');

  const [progressGradient, setProgressGradient] = useState('');
  const [mainColorRgb, setMainColorRgb] = useState('');

  useEffect(() => {
    if (candidatdata?.profilecomplited != null) {
      const percentage = candidatdata.profilecomplited;
      console.log('candidatdata', candidatdata.profilecomplited);
      console.log('candidateData', candidateData.profilecomplited);

      setCompletedPercentage(`${percentage}%`);

      if (percentage <= 20) {
        setProgressGradient(`#E74C3C`);
        setMainColorRgb('255, 152, 0');
      } else if (20 < percentage <= 80) {
        setProgressGradient(`#F39D6E`);
        setMainColorRgb('76, 175, 80');
      }
      if (percentage >= 100) {
        setProgressGradient(`#49C382`);
      }
    } else {
      setCompletedPercentage('0%');
      setProgressGradient('conic-gradient(#ff9800 0%, #ffffff00 0%)');
      setMainColorRgb('255, 152, 0');
    }
  }, [candidatdata?.profilecomplited]);




  const gotohome = () => {
    navigate("/")
    console.log("candidat", { ...data, candidatdata });

    localStorage.setItem("user", JSON.stringify({ ...candidateData }));
  }
  //////////////////////************************************Steps ************************************************************************************* */
  const steps = [
    {
      title: "Interest Areas",
      content: (
        <>
          {/* (!candidatdata.stepPersonalize_1 || candidatdata.stepPersonalize_1.length >= 2 ) &&  */}
          {(<div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What subjects interest you most? (Select up to three)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interests" value="Sciences & Technology" className={styles.hiddenCheckbox} checked={Array.isArray(formData.stepPersonalize_1.interests) && formData.stepPersonalize_1.interests.includes('Sciences & Technology')} onChange={handleInputChange1} />
                <label htmlFor="sciences" className={styles.customLabel}>
                  Sciences & Technology
                </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interests" className={styles.hiddenCheckbox} value="Arts & Creativity"
                  checked={Array.isArray(formData.stepPersonalize_1.interests) && formData.stepPersonalize_1.interests.includes('Arts & Creativity')} onChange={handleInputChange1} />
                <label htmlFor="arts" className={styles.customLabel}>Arts & Creativity</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interests" className={styles.hiddenCheckbox} value="History & Culture" checked={Array.isArray(formData.stepPersonalize_1.interests) && formData.stepPersonalize_1.interests.includes('History & Culture')} onChange={handleInputChange1} />
                <label htmlFor="history" className={styles.customLabel}>History & Culture</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="languages" name="interests" className={styles.hiddenCheckbox}
                  checked={Array.isArray(formData.stepPersonalize_1.interests) && formData.stepPersonalize_1.interests.includes('Languages & Communication')} value="Languages & Communication" onChange={handleInputChange1} />
                <label htmlFor="languages" className={styles.customLabel}>Languages & Communication</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="development" name="interests" className={styles.hiddenCheckbox}
                  checked={Array.isArray(formData.stepPersonalize_1.interests) && formData.stepPersonalize_1.interests.includes('Personal Development')} value="Personal Development" onChange={handleInputChange1} />
                <label htmlFor="development" className={styles.customLabel}>Personal Development</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="other" className={styles.hiddenCheckbox}
                  checked={Array.isArray(formData.stepPersonalize_1.interests) && formData.stepPersonalize_1.interests.includes('Other')} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
            <div >
              <div className={styles.personlizesquestion}>
                <label>Which of the selected areas would you like to explore in-depth first?</label>
                <input type="text" name="exploreFirst" className={styles.input} value={formData.stepPersonalize_1.exploreFirst} onChange={handleInputChange1} placeholder="selected areas" />
              </div>
            </div>
          </div>)}
        </>
      ),
      // isCompleted: !candidatdata.stepPersonalize_1?.interests && candidatdata.stepPersonalize_1.length.interests >0  ,
      // filled:candidatdata.stepPersonalize_1 && candidatdata.stepPersonalize_1.length === 2 && candidatdata.exploreFirst
    },
    {
      title: "Goals and Aspirations",
      content: (
        <>
{/* (!candidatdata.stepPersonalize_2.goals || candidatdata.stepPersonalize_2.goals.length === 0 || !candidatdata.stepPersonalize_2.timeline) &&  */}
          {(<div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What are your main objectives for using this platform? (Select all that apply)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="skill" name="goals" className={styles.hiddenCheckbox} checked={Array.isArray(formData.stepPersonalize_2.goals) && formData.stepPersonalize_2.goals.includes('Skill Development for Work')} value='Skill Development for Work' onChange={handleInputChange2} />
                <label htmlFor="skill" className={styles.customLabel}>
                  Skill Development for Work
                </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="newinterest" name="goals" className={styles.hiddenCheckbox} value='Exploring New Interests' checked={Array.isArray(formData.stepPersonalize_2.goals) && formData.stepPersonalize_2.goals.includes('Exploring New Interests')} onChange={handleInputChange2} />
                <label htmlFor="newinterest" className={styles.customLabel}>Exploring New Interests</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="specificproject" name="goals" className={styles.hiddenCheckbox} checked={Array.isArray(formData.stepPersonalize_2.goals) && formData.stepPersonalize_2.goals.includes('Preparing for a Specific Project ')} value='Preparing for a Specific Project ' onChange={handleInputChange2} />
                <label htmlFor="specificproject" className={styles.customLabel}>Preparing for a Specific Project </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="goals" className={styles.hiddenCheckbox} checked={Array.isArray(formData.stepPersonalize_2.goals) && formData.stepPersonalize_2.goals.includes('Other')} onChange={handleInputChange2} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
            <div>
              <div className={styles.personlizesquestion}>
                <label>What is your expected timeline to achieve these goals?</label>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="month" name="timeline" className={styles.hiddenCheckbox} value='month' onChange={handleInputChange2} checked={formData.stepPersonalize_2.timeline === 'month'} />
                  <label htmlFor="month" className={styles.customLabel} > month </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="1months" name="timeline" className={styles.hiddenCheckbox} value='1-3 months' onChange={handleInputChange2} checked={formData.stepPersonalize_2.timeline === '1-3 months'} />
                  <label htmlFor="1months" className={styles.customLabel} >1-3 months </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="3months" name="timeline" className={styles.hiddenCheckbox} value='3 - 6 months' onChange={handleInputChange2} checked={formData.stepPersonalize_2.timeline === '3 - 6 months'} />
                  <label htmlFor="3months" className={styles.customLabel} >3 - 6 months </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="6months" name="timeline" className={styles.hiddenCheckbox} value='6+months' onChange={handleInputChange2} checked={formData.stepPersonalize_2.timeline === '6+months'} />
                  <label htmlFor="6months" className={styles.customLabel} >6+months  </label>
                </div>
              </div>
            </div>
          </div>)}

        </>
      ),
      // isCompleted:candidatdata.stepPersonalize_2 && candidatdata.stepPersonalize_2.length > 2,

    },
    {
      title: "Availability and Commitment:",
      content: (
        <>
        {/* (!candidatdata.stepPersonalize_3.availability || candidatdata.stepPersonalize_3.availability.length === 0 || !candidatdata.stepPersonalize_3.hoursperweek) && */}
          { (<div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What is your preferred learning style? (Select all that apply)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="videos" name="availability" className={styles.hiddenCheckbox} value='Interactive videos' checked={Array.isArray(formData.stepPersonalize_3.availability) && formData.stepPersonalize_3.availability.includes('Interactive videos')} onChange={handleInputChange3} />
                <label htmlFor="videos" className={styles.customLabel}>Interactive videos</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="liveClasses" name="availability" className={styles.hiddenCheckbox} value='Live Classes with an Instructor' checked={Array.isArray(formData.stepPersonalize_3.availability) && formData.stepPersonalize_3.availability.includes('Live Classes with an Instructor')} onChange={handleInputChange3} />
                <label htmlFor="liveClasses" className={styles.customLabel}>Live Classes with an Instructor</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="readingMaterials" name="availability" className={styles.hiddenCheckbox} value='Reading Materials & Texts' checked={Array.isArray(formData.stepPersonalize_3.availability) && formData.stepPersonalize_3.availability.includes('Reading Materials & Texts')} onChange={handleInputChange3} />
                <label htmlFor="readingMaterials" className={styles.customLabel}>Reading Materials & Texts</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="exercises" name="availability" className={styles.hiddenCheckbox} value='Practical Exercises & Quizzes' checked={Array.isArray(formData.stepPersonalize_3.availability) && formData.stepPersonalize_3.availability.includes('Practical Exercises & Quizzes')} onChange={handleInputChange3} />
                <label htmlFor="exercises" className={styles.customLabel}>Practical Exercises & Quizzes</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="mixedFormats" name="availability" className={styles.hiddenCheckbox} value='Mixed Formats' checked={Array.isArray(formData.stepPersonalize_3.availability) && formData.stepPersonalize_3.availability.includes('Mixed Formats')} onChange={handleInputChange3} />
                <label htmlFor="mixedFormats" className={styles.customLabel}>Mixed Formats</label>
              </div>
            </div>
            <div>
              <div className={styles.personlizesquestion}>
                <label>How much time can you dedicate to learning each week ?
                </label>
                <div className={styles.checkboxGroup}>
                  <input
                    type="radio"
                    id="hours"
                    name="hoursperweek"
                    className={styles.hiddenCheckbox}
                    value="Less than 5 hours"
                    onChange={handleInputChange3}
                    checked={formData.stepPersonalize_3.hoursperweek === 'Less than 5 hours'}
                  />
                  <label htmlFor="hours" className={styles.customLabel}>
                    Less than 5 hours
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="radio"
                    id="morehours"
                    name="hoursperweek"
                    className={styles.hiddenCheckbox}
                    value="5 to 10 hours"
                    onChange={handleInputChange3}
                    checked={formData.stepPersonalize_3.hoursperweek === '5 to 10 hours'}
                  />
                  <label htmlFor="morehours" className={styles.customLabel}>
                    5 to 10 hours
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="radio"
                    id="more"
                    name="hoursperweek"
                    className={styles.hiddenCheckbox}
                    value="More than 10 hours"
                    onChange={handleInputChange3}
                    checked={formData.stepPersonalize_3.hoursperweek === 'More than 10 hours'}
                  />
                  <label htmlFor="more" className={styles.customLabel}>
                    More than 10 hours
                  </label>
                </div>

              </div>
              <div className={styles.personlizesquestion}>
                <label >Are you willing to participate in collaborative activities with other learners?</label>
                <div className={styles.checkboxGroup}>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="yes" name="learningother"
                      className={styles.hiddenCheckbox} value='yes' onChange={handleInputChange3} checked={formData.stepPersonalize_3.learningother === 'yes'} />
                    <label htmlFor="yes" className={styles.customLabel}>
                      yes
                    </label>
                  </div>

                </div>
                <div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="no" name="learningother"
                      className={styles.hiddenCheckbox} value='no' onChange={handleInputChange3} checked={formData.stepPersonalize_3.learningother === 'no'} />
                    <label htmlFor="no" className={styles.customLabel}>
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </>
      ),
      isCompleted: candidatdata.stepPersonalize_3.availability && candidatdata.stepPersonalize_3.availability.length > 0 && candidatdata.stepPersonalize_3.hoursperweek
    },


    {
      title: "Learning Pace",
      content: (
        <>
        {/* (!candidatdata.stepPersonalize_4.learningpace || candidatdata.stepPersonalize_4.learningpace.length === 0 || !candidatdata.stepPersonalize_4.dayslearning) && */}
          { (<div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What pace of learning do you prefer?</label>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="intensive"
                  name="learningpace"
                  className={styles.hiddenCheckbox}
                  value="Intensive (e.g., Bootcamp)"
                  onChange={handleInputChange4}
                  checked={Array.isArray(formData.stepPersonalize_4.learningpace) && formData.stepPersonalize_4.learningpace.includes('Intensive (e.g., Bootcamp)')}
                />
                <label htmlFor="intensive" className={styles.customLabel}>
                  Intensive (e.g., Bootcamp)
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="regular"
                  name="learningpace"
                  className={styles.hiddenCheckbox}
                  value="Regular and Gradual"
                  onChange={handleInputChange4}
                  checked={Array.isArray(formData.stepPersonalize_4.learningpace) && formData.stepPersonalize_4.learningpace.includes('Regular and Gradual')}
                />
                <label htmlFor="regular" className={styles.customLabel}>
                  Regular and Gradual
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="selfpaced"
                  name="learningpace"
                  className={styles.hiddenCheckbox}
                  value="Self-paced (No time constraints)"
                  onChange={handleInputChange4}
                  checked={Array.isArray(formData.stepPersonalize_4.learningpace) && formData.stepPersonalize_4.learningpace.includes('Self-paced (No time constraints)')}
                />
                <label htmlFor="selfpaced" className={styles.customLabel}>
                  Self-paced (No time constraints)
                </label>
              </div>
            </div>
            <div className={styles.personlizesquestion}>
              <label>Do you have specific preferences for learning times ?</label>
              <div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="weekend" name="dayslearning"
                    checked={formData.stepPersonalize_4.dayslearning === 'weekend'} className={styles.hiddenCheckbox} value='weekend' onChange={handleInputChange4} />
                  <label htmlFor="weekend" className={styles.customLabel}>
                    weekend
                  </label>
                </div>

              </div>
              <div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="weekdays" name="dayslearning"
                    checked={formData.stepPersonalize_4.dayslearning === 'weekdays'} className={styles.hiddenCheckbox} value='weekdays' onChange={handleInputChange4} />
                  <label htmlFor="weekdays" className={styles.customLabel}>
                    weekdays
                  </label>
                </div>

              </div>
              <div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="both" name="dayslearning" className={styles.hiddenCheckbox} checked={formData.stepPersonalize_4.dayslearning === 'both'} value='both' onChange={handleInputChange4} />
                  <label htmlFor="both" className={styles.customLabel}>
                    both
                  </label>
                </div>

              </div>

              {(formData.stepPersonalize_4.dayslearning === 'weekend' || formData.stepPersonalize_4.dayslearning === 'weekdays' || formData.stepPersonalize_4.dayslearning === 'both') && (
                <div className={styles.additionalInfo}>
                  <input
                    type="radio"
                    id="morning"
                    name="timeOfDay"
                    value="morning"
                    onChange={handleInputChange4}
                    checked={formData.stepPersonalize_4.timeOfDay === 'morning'}
                  />
                  <label htmlFor="morning">Morning</label>


                  <input
                    type="radio"
                    id="afternoon"
                    name="timeOfDay"
                    value="afternoon"
                    onChange={handleInputChange4}
                    checked={formData.stepPersonalize_4.timeOfDay === 'afternoon'}
                  />
                  <label htmlFor="afternoon">Afternoon</label>

                  <input
                    type="radio"
                    id="evening"
                    name="timeOfDay"
                    value="evening"
                    onChange={handleInputChange4}
                    checked={formData.stepPersonalize_4.timeOfDay === 'evening'}
                  />
                  <label htmlFor="evening">Evening</label>
                </div>
              )}
            </div>
          </div>)}
        </>
      ),
      // isCompleted: candidatdata.stepPersonalize_4.learningpace && candidatdata.stepPersonalize_4.learningpace.length > 0 && candidatdata.stepPersonalize_4.dayslearning
    }
  ];
  // const stepsWithContent = steps.filter((step) => !step.isCompleted);

  const stepsWithContent = steps

  console.log('steps', stepsWithContent[0].content);


  const handleNext = async () => {
    try {
      let apiUrl;
      let stepData;

      if (currentStep === 0) {
        const { interests, exploreFirst } = formData.stepPersonalize_1;


        const filteredInterests = interests.filter(i => i.trim() !== '');

        // Log data before validation
        console.log("Step 1 Data:", { filteredInterests, exploreFirst });

        // Validate that interests array is not empty and exploreFirst is not empty
        if (!Array.isArray(filteredInterests) || filteredInterests.length === 0 || !exploreFirst.trim()) {
          setCurrentStep(prevStep => prevStep + 1);
          console.error("Interests or exploreFirst are invalid.");
          return; // Prevent sending invalid data
        }

        apiUrl = `${process.env.REACT_APP_API}api/candidat/step1/${candiddId}`;
        stepData = { stepPersonalize_1: { interests: filteredInterests, exploreFirst } };

      } else if (currentStep === 1) {
        const { goals, timeline } = formData.stepPersonalize_2;


        const filteredGoals = goals.filter(g => g.trim() !== '');

        console.log("Step 2 Data:", { filteredGoals, timeline });


        if (!Array.isArray(filteredGoals) || filteredGoals.length === 0 || !timeline) {
          setCurrentStep(prevStep => prevStep + 1);
          console.error("Goals or timeline are invalid.");
          return; // Prevent sending invalid data
        }

        apiUrl = `${process.env.REACT_APP_API}api/candidat/step2/${candiddId}`;
        stepData = { stepPersonalize_2: { goals: filteredGoals, timeline } };
      } else if (currentStep === 2) {
        const { availability
         , hoursperweek
        , learningother } = formData.stepPersonalize_3;


        const filteredavailability = availability.filter(g => g.trim() !== '');

        console.log("Step 3 Data:", { filteredavailability, hoursperweek ,learningother });


        if (!Array.isArray(filteredavailability) || filteredavailability.length === 0 || !hoursperweek || !learningother) {
          setCurrentStep(prevStep => prevStep + 1);
          console.error("availability or hoursperweek , are invalid.");
          return; // Prevent sending invalid data
        }

        apiUrl = `${process.env.REACT_APP_API}api/candidat/step3/${candiddId}`;
        stepData = { stepPersonalize_3: { availability: filteredavailability, hoursperweek ,learningother } };
      }else if (currentStep === 3) {
        const { learningpace
         , dayslearning
        , timeOfDay } = formData.stepPersonalize_4;


        const filteredlearningpace = learningpace.filter(g => g.trim() !== '');

        console.log("Step 4 Data:", { filteredlearningpace, dayslearning ,timeOfDay });


        if (!Array.isArray(filteredlearningpace) || filteredlearningpace.length === 0 || !dayslearning || !timeOfDay) {
          navigate('/profileClient');
          console.error("learningpace or dayslearning , are invalid.");
          return; // Prevent sending invalid data
        }

        apiUrl = `${process.env.REACT_APP_API}api/candidat/step4/${candiddId}`;
        stepData = { stepPersonalize_4: { learningpace: filteredlearningpace, dayslearning ,timeOfDay } };
      }

      // Log API URL and data being sent
      console.log("API URL:", apiUrl);
      console.log("Data being sent:", stepData);

      const response = await axios.put(apiUrl, stepData);

      if (response.status === 200) {
        if (currentStep === 3){
          navigate('/profileClient');
        }else {
          setCurrentStep(prevStep => prevStep + 1);
        }
      
      } else {
        console.error("Something went wrong with the API call.");
      }
    } catch (error) {
      console.error("Error while updating candidate data:", error);
    }
  };




  return (
    <div >

      <div className={styles.backimagescore}>
        <div className={styles.padding}>
          <div className={styles.logoscore}>
            <img
              src="./images/quiz/copywright.png"
              alt=""
              className={styles.logoimag}
            />


          </div>
          <div>
            <a type="button" className={styles.nav_btn_profile}>
              <div className={styles.progressCircle}
                style={{
                  '--completed-percentage': completedPercentage,
                  '--progress-gradient': progressGradient,
                  '--main-color-rgb': mainColorRgb
                }}
              >
                <div className={styles.progressInnerGap}>
                  <div className={styles.progressInner}>
                    {candidatdata.image ? (
                      <Avatar
                        alt="icon"
                        src={`${process.env.REACT_APP_API}${user.image.filePath}`}
                        sx={{ width: 150, height: 150 }}
                      />
                    ) : (
                      <Avatar
                        alt="icon"
                        src={img}
                        sx={{ width: 150, height: 150 }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <span>{user.name}
                <p className={styles.underline}></p>
              </span>
            </a>
          </div>

        </div>

      </div>
      <button className={styles.Close} onClick={gotohome}>
        Home
        <IoIosArrowForward size={30} />
      </button>
      <div>

        <div className={styles.container}>
          {stepsWithContent.length > 0 && (
            <>
              <div className={styles.progressbar}>
                <div
                  className={styles.progressline}
                  style={{
                    width: `${((currentStep + 1) / stepsWithContent.length) * 100}%`,
                  }}
                ></div>
              </div>

              <div className={styles.formcontent}>
                <h2>{stepsWithContent[currentStep]?.title}</h2>
                {stepsWithContent[currentStep]?.content}
              </div>

              <div className={styles.formnavigation}>
                <button onClick={handleNext} className={styles.nextbutton}>
                  {currentStep === stepsWithContent.length - 1 ? "Finish" : "Next"}
                </button>
                {currentStep > 0 && (
                  <div>
                    <button onClick={handleBack} className={styles.backbutton}>
                      Back
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>


    </div>
  );
};

export default Personalize;