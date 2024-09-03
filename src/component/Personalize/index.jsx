

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

const Personalize = () => {
  const [signup, setSignup] = useRecoilState(signupState);
  const [customDomain, setCustomDomain] = useState("");

  const [learningType, setLearningType] = useState("");
  const [learningReason, setLearningReason] = useState("");
  const [learningDomain, setLearningDomain] = useState("");
  const [learningCertif, setLearningCertif] = useState("");

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

  const location = useLocation();
  const { data } = location.state || {};

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setLearningReason(input.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login");
    try {
      const config = {
        headers: {},
      };
      const url = `${process.env.REACT_APP_API}api/Candidat/Signup`;
      const { data: res } = await axios.post(url, signup);
      navigate("/login", { state: { signup: true } });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        navigate("/signup", {
          state: { errorState: error.response.data.message },
        });
      }
    }
  };

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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const steps = [
    {
      title: "Interest Areas",
      content: (
        <>
          <div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What subjects interest you most? (Select up to three)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="sciences"  className={styles.customLabel}>
                  Sciences & Technology
                </label>
              </div>
              <div  className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="arts" className={styles.customLabel}>Arts & Creativity</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="history" className={styles.customLabel}>History & Culture</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="languages" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="languages" className={styles.customLabel}>Languages & Communication</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="development" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="development" className={styles.customLabel}>Personal Development</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
            <div >
            <div className={styles.personlizesquestion}>
              <label>Which of the selected areas would you like to explore in-depth first?</label>
              <input type="text" name="exploreFirst" />
            </div>
            <div className={styles.personlizesquestion}>
              <label>Which of the selected areas would you like to explore in-depth first?</label>
              <input type="text" name="exploreFirst" />
            </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Goals and Aspirations",
      content: (
        <>
            <>
          <div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What are your main objectives for using this platform? (Select all that apply)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="sciences"  className={styles.customLabel}>
                Skill Development for Work
                </label>
              </div>
              <div  className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="arts" className={styles.customLabel}>Exploring New Interests</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="history" className={styles.customLabel}>Preparing for a Specific Project </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
            <div>
            <div className={styles.personlizesquestion}>
            <label>What is your expected timeline to achieve these goals?</label>
              <div  className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="arts" className={styles.customLabel}> month </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="history" className={styles.customLabel}>1-3 months  </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="other" className={styles.customLabel}>3 - 6 months </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="other" className={styles.customLabel}>6+months  </label>
              </div>
            </div>
            </div>
          </div>
        </>
        </>
      ),
    },
    {
      title: "Availability and Commitment:",
      content: (
        <>
          <div className={styles.personlizestep}>
          <div className={styles.personlizesquestion}>
            <label>What is your preferred learning style? (Select all that apply)</label>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="videos" name="learningStyle"  className={styles.hiddenCheckbox}/>
              <label htmlFor="videos" className={styles.customLabel}>Interactive Videos</label>
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="liveClasses" name="learningStyle" className={styles.hiddenCheckbox} />
              <label htmlFor="liveClasses" className={styles.customLabel}>Live Classes with an Instructor</label>
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="readingMaterials" name="learningStyle"  className={styles.hiddenCheckbox}/>
              <label htmlFor="readingMaterials" className={styles.customLabel}>Reading Materials & Texts</label>
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="exercises" name="learningStyle"  className={styles.hiddenCheckbox}/>
              <label htmlFor="exercises" className={styles.customLabel}>Practical Exercises & Quizzes</label>
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="mixedFormats" name="learningStyle"  className={styles.hiddenCheckbox}/>
              <label htmlFor="mixedFormats" className={styles.customLabel}>Mixed Formats</label>
            </div>
          </div>
          <div>
          <div className={styles.personlizesquestion}>
              <label>What is your preferred learning style? (Select all that apply)      
              </label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="sciences"  className={styles.customLabel}>
                  Sciences & Technology
                </label>
              </div>
              <div  className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="arts" className={styles.customLabel}>Arts & Creativity</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="history" className={styles.customLabel}>History & Culture</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="languages" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="languages" className={styles.customLabel}>Languages & Communication</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="development" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="development" className={styles.customLabel}>Personal Development</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
          <div>
            <label>Do you have any specific needs regarding accessibility or additional support for your learning?</label>
            <input type="text" name="accessibilityNeeds" />
          </div>
          </div>
          </div>
        </>
      ),
    },
   
  
    {
      title: "Learning Pace",
      content: (
        <>
            <div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What pace of learning do you prefer?</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interest" className={styles.hiddenCheckbox} />
                <label htmlFor="sciences"  className={styles.customLabel}>
                Intensive (e.g., Bootcamp)
                </label>
              </div>
              <div>
              <div  className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interest" className={styles.hiddenCheckbox}   />
                <label htmlFor="arts" className={styles.customLabel}>Regular and Gradual </label>
              </div>
          
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interest" className={styles.hiddenCheckbox}   />
                <label htmlFor="history" className={styles.customLabel}>Self-paced (No time constraints)</label>
              </div>
            </div>
            <div className={styles.personlizesquestion}>
              <label>Do you have specific preferences for learning times ?</label>
              <div>
              <div className={styles.checkboxGroup}>
                <input type="radio" id="weekend" name="weekend"
                 checked={selectedOption === 'weekend'} className={styles.hiddenCheckbox}  onChange={handleOptionChange} />
                <label htmlFor="weekend"  className={styles.customLabel}>
                weekend
                </label>
              </div>
       
              </div>
              <div>
              <div className={styles.checkboxGroup}>
                <input type="radio" id="weekdays" name="weekdays"
                  checked={selectedOption === 'weekdays'} className={styles.hiddenCheckbox}  onChange={handleOptionChange} />
                <label htmlFor="weekdays"  className={styles.customLabel}>
                weekdays
                </label>
              </div>
         
              </div>
              <div>
              <div className={styles.checkboxGroup}>
                <input type="radio" id="both" name="both" className={styles.hiddenCheckbox}   checked={selectedOption === 'both'} onChange={handleOptionChange} />
                <label htmlFor="both"  className={styles.customLabel}>
               both
                </label>
              </div>
         
              </div>

         {selectedOption && (
  <div className={styles.additionalInfo}>
    <input 
      type="radio" 
      id="morning" 
      name="timeOfDay" 
    />
    <label htmlFor="morning">Morning</label>
    
    <input 
      type="radio" 
      id="afternoon" 
      name="timeOfDay" 
    />
    <label htmlFor="afternoon">Afternoon</label>
    
    <input 
      type="radio" 
      id="evening" 
      name="timeOfDay" 
    />
    <label htmlFor="evening">Evening</label>
  </div>
)}
            </div>
          </div>
        </>
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  
  return (
    <div >
      {/* <img
        style={{ position: "absolute", top: "0", right: "0", zIndex: "-1" }}
        src="/images/personalize/topRight.svg"
        alt="Your SVG"
      /> */}
      <div className={styles.backimagescore}>
        <div className={styles.logoscore}>
          <img
            src="./images/quiz/copywright.png"
            alt=""
            className={styles.logoimag}
          />
        </div>
      </div>
      <Link className={styles.Close} to="/">
        Home
        <IoIosArrowForward size={30} />
      </Link>
      <div>

        <div className={styles.container}>
          <div className={styles.progressbar}>
            <div
              className={styles.progressline}
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className={styles.formcontent}>
            <h2>{steps[currentStep].title}</h2>
            {steps[currentStep].content}
          </div>

          <div className={styles.formnavigation}>
            {currentStep > 0 && (
              <button onClick={handleBack} className={styles.backbutton}>
                Back
              </button>
            )}
            <button onClick={handleNext} className={styles.nextbutton}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Personalize;
