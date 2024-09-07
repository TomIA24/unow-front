

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
  const { candiddId ,data } = location.state || {};
  console.log("idcdnadt",candiddId);
  
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
  // const tabChanged = ({ prevIndex, nextIndex }) => {
  //   console.log("prevIndex", prevIndex);
  //   console.log("nextIndex", nextIndex);
  // };

  const IconText = (text) => {
    return <p style={{ fontSize: 13 }}>{text}</p>;
  };

  const [selectedOption, setSelectedOption] = useState('');


  const [formData, setFormData] = useState({
    interests: [],
    exploreFirst: '',
    goals: [],
    timeline: '',
    availability: [],
    style: [],
    hoursperweek: '',
    learningother: '',
    learningpace: [],
    dayslearning: '',
    timeOfDay: '',
    profilecomplited:0,
  });
  
  const [candidatdata, setcandidatdata] = useState({
    interests: [],
    exploreFirst: '',
    goals: [],
    timeline: '',
    availability: [],
    style: [],
    hoursperweek: '',
    learningother: '',
    learningpace: [],
    dayslearning: '',
    timeOfDay: '',
    profilecomplited:0,
  });

    
  const [candidateData, setcandidateData] = useState([]);
  const [missingFields, setMissingFields] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the full candidate data
        const candidateResponse = await axios.get(`${process.env.REACT_APP_API}api/candidat/candidates/${candiddId}`);
        const candidateData = candidateResponse.data;
        setcandidateData(candidateData);
        console.log("bringingdata",candidateData);


        setcandidatdata(prevState => ({
          ...prevState,
          ...candidateData,
        }));

        const checkFieldsResponse = await axios.get(`${process.env.REACT_APP_API}api/candidat/checkfields/${candiddId}`);
        
        if (checkFieldsResponse.data.message === 'Some fields are missing or incomplete') {
          setMissingFields(checkFieldsResponse.data.missingFields);
        } else {
          setMissingFields([]); 
        }
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchData();
  }, [candiddId]);

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData.interests, value]
          : prevData.interests.filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].includes(value)
        ? prevData[name].filter((item) => item !== value)
        : [...prevData[name], value],
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  console.log(e.target.value);
  
    setFormData((prevData) => {
      
      if (type === 'checkbox') {
        const currentValues = Array.isArray(prevData[name]) ? prevData[name] : [];
        return {
          ...prevData,
          [name]: checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevData,
          [name]: value, 
        };
      }
    });
  };

  const steps = [
    {
      title: "Interest Areas",
      content: (
        <>
       {(!candidatdata.interests || candidatdata.interests.length === 0 || !candidatdata.exploreFirst ) &&  (  <div className={styles.personlizestep}>
        <div className={styles.personlizesquestion}>
            {/* {candidatdata.interests.length }
            {formData.interests.map((interest, index) => (
        <div key={index}>
          {interest}
        </div>
      ))} */}
              <label>What subjects interest you most? (Select up to three)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interests" value="Sciences & Technology" className={styles.hiddenCheckbox} checked={Array.isArray(formData.interests) && formData.interests.includes('Sciences & Technology')} onChange={handleInputChange} />
                <label htmlFor="sciences" className={styles.customLabel}>
                  Sciences & Technology
                </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interests" className={styles.hiddenCheckbox} value="Arts & Creativity"
                  checked={Array.isArray(formData.interests) && formData.interests.includes('Arts & Creativity')} onChange={handleInputChange} />
                <label htmlFor="arts" className={styles.customLabel}>Arts & Creativity</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interests" className={styles.hiddenCheckbox} value="History & Culture" checked={Array.isArray(formData.interests) && formData.interests.includes('History & Culture')} onChange={handleInputChange} />
                <label htmlFor="history" className={styles.customLabel}>History & Culture</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="languages" name="interests" className={styles.hiddenCheckbox}
                  checked={Array.isArray(formData.interests) && formData.interests.includes('Languages & Communication')} value="Languages & Communication" onChange={handleInputChange} />
                <label htmlFor="languages" className={styles.customLabel}>Languages & Communication</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="development" name="interests" className={styles.hiddenCheckbox}
                  checked={Array.isArray(formData.interests) && formData.interests.includes('Personal Development')} value="Personal Development" onChange={handleInputChange} />
                <label htmlFor="development" className={styles.customLabel}>Personal Development</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="other" className={styles.hiddenCheckbox}
                  checked={Array.isArray(formData.interests) && formData.interests.includes('Other')} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
            <div >
            <div className={styles.personlizesquestion}>
                <label>Which of the selected areas would you like to explore in-depth first?</label>
                <input type="text" name="exploreFirst" className={styles.input} value={formData.exploreFirst} onChange={handleInputChange} placeholder="selected areas"/>
              </div>
              {/* <div className={styles.personlizesquestion}>
                <label>Which of the selected areas would you like to explore in-depth first?</label>
                <input type="text" name="exploreFirst" value={formData.exploreFirst}onChange={handleInputChange} />
              </div> */}
            </div>
          </div>)}
        </>
      ),
      isCompleted: candidatdata.interests && candidatdata.interests.length > 0 && candidatdata.exploreFirst
    },
    {
      title: "Goals and Aspirations",
      content: (
        <>
          
          {(!candidatdata.goals || candidatdata.goals.length === 0 || !candidatdata.timeline ) &&  ( <div className={styles.personlizestep}>
              <div className={styles.personlizesquestion}>
                <label>What are your main objectives for using this platform? (Select all that apply)</label>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="skill" name="goals" className={styles.hiddenCheckbox} checked={Array.isArray(formData.goals) && formData.goals.includes('Skill Development for Work')} value='Skill Development for Work' onChange={handleInputChange} />
                  <label htmlFor="skill" className={styles.customLabel}>
                    Skill Development for Work
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="newinterest" name="goals" className={styles.hiddenCheckbox} value='Exploring New Interests' checked={Array.isArray(formData.goals) &&formData.goals.includes('Exploring New Interests')} onChange={handleInputChange} />
                  <label htmlFor="newinterest" className={styles.customLabel}>Exploring New Interests</label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="specificproject" name="goals" className={styles.hiddenCheckbox} checked={Array.isArray(formData.goals) &&formData.goals.includes('Preparing for a Specific Project ')} value='Preparing for a Specific Project ' onChange={handleInputChange} />
                  <label htmlFor="specificproject" className={styles.customLabel}>Preparing for a Specific Project </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="other" name="goals" className={styles.hiddenCheckbox} checked={Array.isArray(formData.goals) &&formData.goals.includes('Other')} onChange={handleInputChange} />
                  <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
                </div>
              </div>
              <div>
                <div className={styles.personlizesquestion}>
                  <label>What is your expected timeline to achieve these goals?</label>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="month" name="timeline" className={styles.hiddenCheckbox} value='month' onChange={handleInputChange}  checked={formData.timeline === 'month'}/>
                    <label htmlFor="month" className={styles.customLabel} > month </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="1months" name="timeline" className={styles.hiddenCheckbox} value='1-3 months' onChange={handleInputChange} checked={formData.timeline === '1-3 months'}/>
                    <label htmlFor="1months" className={styles.customLabel} >1-3 months </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="3months" name="timeline" className={styles.hiddenCheckbox} value='3 - 6 months' onChange={handleInputChange} checked={formData.timeline === '3 - 6 months'}/>
                    <label htmlFor="3months" className={styles.customLabel} >3 - 6 months </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="6months" name="timeline" className={styles.hiddenCheckbox} value='6+months' onChange={handleInputChange} checked={formData.timeline === '6+months'}/>
                    <label htmlFor="6months" className={styles.customLabel} >6+months  </label>
                  </div>
                </div>
              </div>
            </div>)}
        
        </>
      ),
      isCompleted:candidatdata.goals && candidatdata.goals.length > 0 && candidatdata.timeline
    },
    {
      title: "Availability and Commitment:",
      content: (
        <>
        {(!candidatdata.availability || candidatdata.availability.length === 0 || !candidatdata.hoursperweek ) &&  ( <div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What is your preferred learning style? (Select all that apply)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="videos" name="availability" className={styles.hiddenCheckbox} value='Interactive videos'  checked={Array.isArray(formData.availability) &&formData.availability.includes('Interactive videos')} onChange={handleInputChange} />
                <label htmlFor="videos" className={styles.customLabel}>Interactive videos</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="liveClasses" name="availability" className={styles.hiddenCheckbox} value='Live Classes with an Instructor'checked={Array.isArray(formData.availability) &&formData.availability.includes('Live Classes with an Instructor')} onChange={handleInputChange} />
                <label htmlFor="liveClasses" className={styles.customLabel}>Live Classes with an Instructor</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="readingMaterials" name="availability" className={styles.hiddenCheckbox} value='Reading Materials & Texts'checked={Array.isArray(formData.availability) &&formData.availability.includes('Reading Materials & Texts')} onChange={handleInputChange} />
                <label htmlFor="readingMaterials" className={styles.customLabel}>Reading Materials & Texts</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="exercises" name="availability" className={styles.hiddenCheckbox} value='Practical Exercises & Quizzes'checked={Array.isArray(formData.availability) &&formData.availability.includes('Practical Exercises & Quizzes')} onChange={handleInputChange} />
                <label htmlFor="exercises" className={styles.customLabel}>Practical Exercises & Quizzes</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="mixedFormats" name="availability" className={styles.hiddenCheckbox} value='Mixed Formats'checked={Array.isArray(formData.availability) &&formData.availability.includes('Mixed Formats')} onChange={handleInputChange} />
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
    onChange={handleInputChange}
    checked={formData.hoursperweek === 'Less than 5 hours'}
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
    onChange={handleInputChange}
    checked={formData.hoursperweek === '5 to 10 hours'}
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
    onChange={handleInputChange}
    checked={formData.hoursperweek === 'More than 10 hours'}
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
                      className={styles.hiddenCheckbox} value='yes' onChange={handleInputChange} checked={formData.learningother === 'yes'} />
                    <label htmlFor="yes" className={styles.customLabel}>
                      yes
                    </label>
                  </div>

                </div>
                <div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="no" name="learningother"
                      className={styles.hiddenCheckbox} value='no' onChange={handleInputChange}     checked={formData.learningother === 'no'} />
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
      isCompleted:candidatdata.availability && candidatdata.availability.length > 0 && candidatdata.hoursperweek
    },


    {
      title: "Learning Pace",
      content: (
        <>
      { (!candidatdata.learningpace || candidatdata.learningpace.length === 0 || !candidatdata.dayslearning  ) &&  (  <div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What pace of learning do you prefer?</label>
              <div className={styles.checkboxGroup}>
  <input
    type="checkbox"
    id="intensive"
    name="learningpace"
    className={styles.hiddenCheckbox}
    value="Intensive (e.g., Bootcamp)"
    onChange={handleInputChange}
    checked={Array.isArray(formData.learningpace) && formData.learningpace.includes('Intensive (e.g., Bootcamp)')}
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
    onChange={handleInputChange}
    checked={Array.isArray(formData.learningpace) && formData.learningpace.includes('Regular and Gradual')}
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
    onChange={handleInputChange}
    checked={Array.isArray(formData.learningpace) && formData.learningpace.includes('Self-paced (No time constraints)')}
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
                       checked={ formData.dayslearning === 'weekend'} className={styles.hiddenCheckbox} value='weekend' onChange={handleInputChange} />
                  <label htmlFor="weekend" className={styles.customLabel}>
                    weekend
                  </label>
                </div>

              </div>
              <div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="weekdays" name="dayslearning"
                    checked={formData.dayslearning === 'weekdays'} className={styles.hiddenCheckbox} value='weekdays' onChange={handleInputChange} />
                  <label htmlFor="weekdays" className={styles.customLabel}>
                    weekdays
                  </label>
                </div>

              </div>
              <div>
                <div className={styles.checkboxGroup}>
                  <input type="radio" id="both" name="dayslearning" className={styles.hiddenCheckbox} checked={formData.dayslearning === 'both'} value='both' onChange={handleInputChange} />
                  <label htmlFor="both" className={styles.customLabel}>
                    both
                  </label>
                </div>

              </div>

              {(formData.dayslearning === 'weekend' || formData.dayslearning === 'weekdays' || formData.dayslearning === 'both') && (
    <div className={styles.additionalInfo}>
      <input
        type="radio"
        id="morning"
        name="timeOfDay"
        value="morning"
        onChange={handleInputChange}
        checked={formData.timeOfDay === 'morning'}
      />
      <label htmlFor="morning">Morning</label>


      <input
        type="radio"
        id="afternoon"
        name="timeOfDay"
        value="afternoon"
        onChange={handleInputChange}
        checked={formData.timeOfDay === 'afternoon'}
      />
      <label htmlFor="afternoon">Afternoon</label>

      <input
        type="radio"
        id="evening"
        name="timeOfDay"
        value="evening"
        onChange={handleInputChange}
        checked={formData.timeOfDay === 'evening'}
      />
      <label htmlFor="evening">Evening</label>
    </div>
  )}
            </div>
          </div>)}
        </>
      ),
      isCompleted:candidatdata.learningpace && candidatdata.learningpace.length > 0 && candidatdata.dayslearning
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);



  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const handleNext = async () => {
  
    const updatedProfilecomplited = candidatdata.profilecomplited + 20;

    // Make sure to include the updated profilecomplited in the formData

    const updatedFormData = {
      ...candidatdata,
      profilecomplited: updatedProfilecomplited,
    };
  console.log("updatedFormData",updatedFormData);
  
    if (currentStep < steps.length - 1) {
      try {
        console.log('Submitting data:', updatedFormData,updatedFormData.profilecomplited);
        console.log("idcdnadt",candiddId);
        // Make the API call to update the candidate
        const response = await axios.put(
          `${process.env.REACT_APP_API}api/candidat/${candiddId}`,
          updatedFormData
          
        );
       
        console.log('Updated candidate data:', response.data);
  
        // Clear form data
        setcandidatdata({
          ...formData,
          profilecomplited: updatedProfilecomplited, // Ensure profilecomplited is updated
        });
   console.log("updated",candidatdata);
   
        // Proceed to the next step
        setCurrentStep((prevStep) => prevStep + 1);
  
        // Optionally, reset step to 0 after submission
        // setCurrentStep(0); // Uncomment this line if you want to reset after submission
  
      } catch (error) {
        console.error('Error updating candidate:', error.response ? error.response.data : error.message);
  
     
      }
    } else if (currentStep == steps.length - 1) {
      try {
        console.log('Submitting data:', updatedFormData);
  
      
        const response = await axios.put(
          `${process.env.REACT_APP_API}api/candidat/${candiddId}`,
          updatedFormData
        );
        navigate("/profile")
        console.log('Updated candidate data:', response.data);
  
        // Clear form data
        // setFormData({ interests: [], exploreFirst: '' });
  
        // Proceed to the next step
        setCurrentStep((prevStep) => prevStep + 1);

      } catch (error) {
        console.error('Error updating candidate:', error.response ? error.response.data : error.message);
  
      }
    }
  };
  const [completedPercentage, setCompletedPercentage] = useState('0%');

const [progressGradient, setProgressGradient] = useState('');
const [mainColorRgb, setMainColorRgb] = useState('');
useEffect(() => {
  if (candidatdata?.profilecomplited != null) {
    const percentage = candidatdata.profilecomplited;
    setCompletedPercentage(`${percentage}%`);

    if (percentage <= 20) {
      setProgressGradient(`#E74C3C`);
      setMainColorRgb('255, 152, 0');
    } else if (20 < percentage <= 80) {
      setProgressGradient(`#F39D6E`);
      setMainColorRgb('76, 175, 80');
    } 
     if (percentage == 100){
      setProgressGradient(`#49C382`);
    }
  } else {
    setCompletedPercentage('0%');
    setProgressGradient('conic-gradient(#ff9800 0%, #ffffff00 0%)');
    setMainColorRgb('255, 152, 0');
  }
}, [candidatdata?.profilecomplited]);
const stepsWithContent = steps.filter((step) => !step.isCompleted);
console.log('steps',stepsWithContent);


const gotohome=()=>{
  navigate("/")
  console.log("candidat",{...data,candidatdata});
  
  localStorage.setItem("user", JSON.stringify({...candidateData,candidatdata}));
}
  return (
    <div >
      {/* <img
        style={{ position: "absolute", top: "0", right: "0", zIndex: "-1" }}
        src="/images/personalize/topRight.svg"
        alt="Your SVG"
      /> */}
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
                  '--main-color-rgb': mainColorRgb}}
                >
                  <div className={styles.progressInnerGap}>
                    <div className={styles.progressInner}>
                      {candidatdata.image ? (
                        <Avatar
                          alt="icon"
                          src={`${process.env.REACT_APP_API}${candidatdata.image.filePath}`}
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
     <span>{candidatdata.name}
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
          <h2>{stepsWithContent[currentStep].title}</h2>
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
