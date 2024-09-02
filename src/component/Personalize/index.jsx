

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


  });

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
          [name]: value, // For radio and other input types, simply set the value
        };
      }
    });
  };
  // const handleInputChange = (event) => {
  //   const { name, value, checked } = event.target;
  //   console.log("value", value);
  //   if (name === 'interests') {
  //     setFormData((prevState) => {
  //       const updatedInterests = checked
  //         ? [...prevState.interests, value] // Add selected value
  //         : prevState.interests.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         interests: updatedInterests,
  //       };
  //     });
  //   } else if (name === 'exploreFirst') {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       exploreFirst: value,
  //     }));
  //   } else if (name === 'goal') {
  //     setFormData((prevState) => {
  //       const updatedgoals = checked
  //         ? [...prevState.goals, value] // Add selected value
  //         : prevState.goals.filter((goal) => goal !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         goals: updatedgoals,
  //       };
  //     });
  //   } else if (name === 'timeline') {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       timeline: value,
  //     }));
  //   }
  //   if (name === 'availability') {
  //     setFormData((prevState) => {
  //       const updatedavail = checked
  //         ? [...prevState.availability, value] // Add selected value
  //         : prevState.availability.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         availability: updatedavail,
  //       };
  //     });
  //   }
  //   if (name === 'style') {
  //     setFormData((prevState) => {
  //       const updatedstyle = checked
  //         ? [...prevState.style, value] // Add selected value
  //         : prevState.style.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         style: updatedstyle,
  //       };
  //     });
  //   }
  //   if (name === 'hoursperweek') {
  //     setFormData((prevState) => {
  //       const updatedshoursperweek = checked
  //         ? [...prevState.hoursperweek, value] // Add selected value
  //         : prevState.hoursperweek.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         hoursperweek: updatedshoursperweek,
  //       };
  //     });
  //   }
  //   if (name === 'learningother') {
  //     setFormData((prevState) => {
  //       const updatedother
  //         = checked
  //           ? [...prevState.learningother, value] // Add selected value
  //           : prevState.learningother.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         learningother: updatedother,
  //       };
  //     });
  //   }
  //   if (name === 'learningpace') {

  //     setFormData((prevState) => {
  //       const updatedlearningpace = checked
  //         ? [...prevState.learningpace, value] // Add selected value
  //         : prevState.learningpace.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         learningpace: updatedlearningpace,
  //       };
  //     });
  //   }
  //   if (name === 'dayslearning') {
  //     setSelectedOption(true)
  //     setFormData((prevState) => {
  //       const updateddayslearning = checked
  //         ? [...prevState.dayslearning, value] // Add selected value
  //         : prevState.dayslearning.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         dayslearning: updateddayslearning,
  //       };
  //     });
  //   }
  //   if (name === 'timeOfDay') {
  //     setFormData((prevState) => {
  //       const updatedtimeOfDay = checked
  //         ? [...prevState.timeOfDay, value] // Add selected value
  //         : prevState.timeOfDay.filter((interest) => interest !== value); // Remove unselected value

  //       return {
  //         ...prevState,
  //         timeOfDay: updatedtimeOfDay,
  //       };
  //     });
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.put(`/api/candidate/66a22641a8d879e703dbe057`, formData);
  //     console.log('Candidate updated successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error updating candidate:', error.response?.data || error.message);
  //   }
  // };


  const steps = [
    {
      title: "Interest Areas",
      content: (
        <>
          <div className={styles.personlizestep}>
            <div className={styles.personlizesquestion}>
              <label>What subjects interest you most? (Select up to three)</label>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="sciences" name="interests" value="Sciences & Technology" className={styles.hiddenCheckbox} checked={formData.interests.includes('Sciences & Technology')} onChange={handleInputChange} />
                <label htmlFor="sciences" className={styles.customLabel}>
                  Sciences & Technology
                </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="arts" name="interests" className={styles.hiddenCheckbox} value="Arts & Creativity"
                  checked={formData.interests.includes('Arts & Creativity')} onChange={handleInputChange} />
                <label htmlFor="arts" className={styles.customLabel}>Arts & Creativity</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="history" name="interests" className={styles.hiddenCheckbox} value="History & Culture" checked={formData.interests.includes('History & Culture')} onChange={handleInputChange} />
                <label htmlFor="history" className={styles.customLabel}>History & Culture</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="languages" name="interests" className={styles.hiddenCheckbox}
                  checked={formData.interests.includes('Languages & Communication')} value="Languages & Communication" onChange={handleInputChange} />
                <label htmlFor="languages" className={styles.customLabel}>Languages & Communication</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="development" name="interests" className={styles.hiddenCheckbox}
                  checked={formData.interests.includes('Personal Development')} value="Personal Development" onChange={handleInputChange} />
                <label htmlFor="development" className={styles.customLabel}>Personal Development</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="other" name="other" className={styles.hiddenCheckbox}
                  checked={formData.interests.includes('Other')} />
                <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
              </div>
            </div>
            <div >
              <div className={styles.personlizesquestion}>
                <label>Which of the selected areas would you like to explore in-depth first?</label>
                <input type="text" name="exploreFirst" value={formData.exploreFirst} onChange={handleInputChange} />
              </div>
              {/* <div className={styles.personlizesquestion}>
                <label>Which of the selected areas would you like to explore in-depth first?</label>
                <input type="text" name="exploreFirst" value={formData.exploreFirst}onChange={handleInputChange} />
              </div> */}
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
                  <input type="checkbox" id="skill" name="goal" className={styles.hiddenCheckbox} checked={formData.goals.includes('Skill Development for Work')} value='Skill Development for Work' onChange={handleInputChange} />
                  <label htmlFor="skill" className={styles.customLabel}>
                    Skill Development for Work
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="newinterest" name="goal" className={styles.hiddenCheckbox} value='Exploring New Interests' checked={formData.goals.includes('Exploring New Interests')}onChange={handleInputChange} />
                  <label htmlFor="newinterest" className={styles.customLabel}>Exploring New Interests</label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="specificproject" name="goal" className={styles.hiddenCheckbox} checked={formData.goals.includes('Preparing for a Specific Project ')} value='Preparing for a Specific Project ' onChange={handleInputChange} />
                  <label htmlFor="specificproject" className={styles.customLabel}>Preparing for a Specific Project </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="other" name="goal" className={styles.hiddenCheckbox} checked={formData.goals.includes('Other')} onChange={handleInputChange} />
                  <label htmlFor="other" className={styles.customLabel}>Other (Specify)</label>
                </div>
              </div>
              <div>
                <div className={styles.personlizesquestion}>
                  <label>What is your expected timeline to achieve these goals?</label>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="month" name="timeline" className={styles.hiddenCheckbox} value='month' onChange={handleInputChange} />
                    <label htmlFor="month" className={styles.customLabel} checked={formData.timeline.includes('month ')}> month </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="1months" name="timeline" className={styles.hiddenCheckbox} value='1-3 months ' onChange={handleInputChange} />
                    <label htmlFor="1months" className={styles.customLabel} checked={formData.timeline.includes('1-3 months')}>1-3 months  </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="3months" name="timeline" className={styles.hiddenCheckbox} value='3 - 6 months' onChange={handleInputChange} />
                    <label htmlFor="3months" className={styles.customLabel} checked={formData.timeline.includes('3 - 6 months')}>3 - 6 months </label>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <input type="radio" id="6months" name="timeline" className={styles.hiddenCheckbox} value='6+months' onChange={handleInputChange} />
                    <label htmlFor="6months" className={styles.customLabel} checked={formData.timeline.includes('6+months')}>6+months  </label>
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
                <input type="checkbox" id="videos" name="availability" className={styles.hiddenCheckbox} value='Interactive Videos 'checked={formData.availability.includes('Interactive Videos')} onChange={handleInputChange} />
                <label htmlFor="videos" className={styles.customLabel}>Interactive Videos</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="liveClasses" name="availability" className={styles.hiddenCheckbox} value='Live Classes with an Instructor'checked={formData.availability.includes('Live Classes with an Instructor')} onChange={handleInputChange} />
                <label htmlFor="liveClasses" className={styles.customLabel}>Live Classes with an Instructor</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="readingMaterials" name="availability" className={styles.hiddenCheckbox} value='Reading Materials & Texts'checked={formData.availability.includes('Reading Materials & Texts')} onChange={handleInputChange} />
                <label htmlFor="readingMaterials" className={styles.customLabel}>Reading Materials & Texts</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="exercises" name="availability" className={styles.hiddenCheckbox} value='Practical Exercises & Quizzes'checked={formData.availability.includes('Practical Exercises & Quizzes')} onChange={handleInputChange} />
                <label htmlFor="exercises" className={styles.customLabel}>Practical Exercises & Quizzes</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="mixedFormats" name="availability" className={styles.hiddenCheckbox} value='Mixed Formats'checked={formData.availability.includes('Mixed Formats')} onChange={handleInputChange} />
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
  <input
    type="checkbox"
    id="intensive"
    name="learningpace"
    className={styles.hiddenCheckbox}
    value="Intensive (e.g., Bootcamp)"
    onChange={handleInputChange}
    checked={formData.learningpace.includes('Intensive (e.g., Bootcamp)')}
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
    checked={formData.learningpace.includes('Regular and Gradual')}
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
    checked={formData.learningpace.includes('Self-paced (No time constraints)')}
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
                       checked={formData.dayslearning === 'weekend'} className={styles.hiddenCheckbox} value='weekend' onChange={handleInputChange} />
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
                  <input type="radio" id="both" name="dayslearning" className={styles.hiddenCheckbox}checked={formData.dayslearning === 'both'}value='both' onChange={handleInputChange} />
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
          </div>
        </>
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // const handleNext = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep((prevStep) => prevStep + 1);
  //   }
  // };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log('Submitting data:', formData);
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API}api/candidat/66a22641a8d879e703dbe057`,
          formData
        );
        console.log('Updated candidate data:', response.data);

        alert('Data submitted successfully');

        // Clear form data
        setFormData({ interests: [], exploreFirst: '' });

        // Optionally, reset step
        setCurrentStep(0); // Reset to the first step or adjust as needed

      } catch (error) {
        console.error('Error updating candidate:', error.response ? error.response.data : error.message);

        // Display specific error messages
        if (error.response && error.response.status === 400) {
          alert('Validation error: ' + error.response.data);
        } else if (error.response && error.response.status === 404) {
          alert('Candidate not found.');
        } else {
          alert('Failed to submit data. Please try again.');
        }
      }
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
