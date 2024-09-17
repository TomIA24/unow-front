import styles from "./styles.module.css";
import { Link,
	useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Footer from "../Home/Footer"
import SliderNav from '../slider'
import imgUK from "../assets/UK.svg"
import Loading from '../Loading'
import Alert from '@mui/material/Alert';
import imgLogo from '../assets/logo.jpg'
import Nav from "../Nav"
import Map from './map'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import background from "./Rectangle 175.png"
import Team from "./contact 1.png"
import phone from "./Clip path group.png"
import message from "./Group.png"
import Location from "./Clip path groupa.png"
import facebook from "./in 3.png"
import instagram from "./in 1.png"
import linkedin from "./in 2.png"
import map from "./Capture d’écran 2024-05-21 à 4.05 1.png"

const Contact = (props) =>{


    const [saved, setSaved] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    


	const [error, setError] = useState("");
	
	const [Data, setData] = useState({
        name:"",
        surname:"",
        email:"",
        message:"",
        subject:""
	});


    const location = {
        address: 'av yesser arafet, immbouhejeb - sahloul - sousse',
        lat: 35.834351,
        lng: 10.593440,
      }

 

   


  

	const [mobile, setMobile] = useState(false);






    const handleSend = async (e) => {
        e.preventDefault();
        
   
        const config = {
            headers: {    }, 
              
        };
        const url = `${process.env.REACT_APP_API}api/contact/SendMessage`;
        axios.post(url,Data )
        .then(async res=>{
            setSaved(true)
            setData({
                name:"",
                surname:"",
                email:"",
                message:"",
                subject:""
            });
            await new Promise(r => {
                setTimeout(r, 2000)
            });
            setSaved(false)
            
        })
        .catch (async error=>{
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setErrorAlert(true)
                setError(error.response.data.message);
                await new Promise(r => {
                    setTimeout(r, 4000)
                });
                setErrorAlert(false)
            }
        })
        
    }



   
/*///////////////////////////////////*/
	
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
		window.removeEventListener("scroll", handleScroll);
		};
	}, []);


        const [tool, setTool] = useState(false);
        const toolClose = () => {
            setTool(false);
          };
        
          const toolOpen = () => {
            setTool(true);
          };
/************///////////////////////// */
const [WindowWidth, setWindowWidth] = useState(0);
const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
    
};

useEffect(() => {
    handleWidthChange()
    window.addEventListener('resize', handleWidthChange);
    return () => {
    window.removeEventListener('resize', handleWidthChange);
    };
}, []);
const [mobileView, setMobileView]=useState(false)
useEffect(()=>{
    //console.log(WindowWidth)
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[])
useEffect(()=>{
    console.log(WindowWidth)
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[WindowWidth])
const classes = theme => ({
    multilineColor:{
        color:'red'
    }
});

    return (
      <React.Fragment>
              
    <div className={styles.nav}>
    <Nav />
    <div className={styles.containerimage}>
      <div className={styles.contactus}>
      <p className={styles.contact}>CONTACT US</p>
      <p className={styles.underline}></p>
      <p className={styles.the}>The quickest way to get in touch with us is by using the contact information below.</p>
      </div>
      <img src={Team} alt="" className={styles.image} /> 
    </div>
      </div>
      <div className={styles.sendtitle}>
      <p className={styles.send}>Send a message</p>
      <p className={styles.underline2}></p>
      </div>
        
        <main className={styles.MotherDivCourse}>
          <div className={styles.Success}>
            {saved && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                  severity="success"
                  variant="filled"
                  onClose={() => {
                    setSaved(false);
                  }}
                >
                  Message send successfully — thanks for your cantact!
                </Alert>
              </Stack>
            )}
            {/*you can remove variant="filled" */}
            {errorAlert && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                  severity="error"
                  variant="filled"
                  onClose={() => {
                    setSaved(false);
                  }}
                >
                  Message not Send — {error}!
                </Alert>
              </Stack>
            )}
            {/*you can remove variant="filled" */}
          </div>
          <div className={styles.containerContactBlocks}>
            <div className={styles.containerSend}>
            <div className={styles.BorderSectionsContact1}>
          
              <div className={styles.ContactPartInfoTextField}>
              <p className={styles.text}>Full Name</p>
                <input
                  InputProps={{
                    className: classes.multilineColor,
                  }}
                  className={styles.InfoArea}
                  id="standard-basic"
                  
                  
                  value={Data.name}
                  onChange={(e) => setData({ ...Data, name: e.target.value })}
                />

               
              </div>
              <div className={styles.ContactPartInfoinput}>
              <p className={styles.text}>Subject</p>
                <input
                  className={styles.InfoArea}
                  id="standard-basic"
                
                
                  value={Data.email}
                  onChange={(e) => setData({ ...Data, email: e.target.value })}
                />
                <p className={styles.text}>Email</p>
                <input
                  className={styles.InfoArea}
                  id="standard-basic"
                 
                 
                  value={Data.subject}
                  onChange={(e) =>
                    setData({ ...Data, subject: e.target.value })
                  }
                />
              </div>
              <div className={styles.ContactPartInfoinput}>
              <p className={styles.text}>Message</p>
              <input
  className={styles.InfoArea2}
  id="standard-multiline-static"
  multiline
  rows={10}  // Augmenté à 10 lignes
  value={Data.message}
  onChange={(e) =>
    setData({ ...Data, message: e.target.value })
  }
/>
              </div>
              </div>
              <div className={styles.sendMessageDiv}>
                <button onClick={handleSend} className={styles.btnSend}>
                Submit
                </button>
              </div>
            </div>
            <div className={styles.BorderSectionsContact}>
              <div className={styles.InfosContact}>
                <div className={styles.InfosContactHeader}>
                  <h2>Contact information</h2>
                  <p className={styles.underline3}></p>
                  <p className={styles.Fill}>
                    Fill out the form and our team will get back to you within
                    24 hours
                  </p>
               
                  </div>
                  
               
                  <div className={styles.infosForContactDivIntern}>
                    <div className={styles.InfosContactBody}>
                      <div className={styles.Info}>
                      <img src={phone} className={styles.InfoIcon} />
                        <h3>+216 50 19 608</h3>
                      </div>
                      <div className={styles.Info}>
                        <img src={message} className={styles.InfoIcon} />
                        <h3>support@u!now.tn</h3>
                      </div>

                      <div className={styles.Info}>
                      <img src={Location} className={styles.InfoIcon} />
                        <h3>
                          Av. Yesser Arafet, Imm Bouhajeb - Sahloul - Sousse
                        </h3>
                      </div>
                    </div>
                    <div className={styles.InfosContactHeader}>
                  <h2>follow us</h2>
                  <p className={styles.underline3}></p>
                  </div>
                    <div className={styles.InfosContactFooter}>
                    <a href="https://www.facebook.com/unow.tn" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} className={styles.logo} alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/unowelearning/" target="_blank" rel="noopener noreferrer">
                   <img src={instagram} className={styles.logo} alt="Instagram" />
                    </a>
                  <a href="https://www.linkedin.com/company/u-now-elearning-platform/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} className={styles.logo2} alt="LinkedIn" />
                  </a>

                    </div>
                  </div>
                  
                </div>
               
              </div>

            </div>
            <a href="https://maps.app.goo.gl/ysWaC8RZH8nfrob39" target="_blank" rel="noopener noreferrer">
  <img src={map} className={styles.map} alt="Map" />
</a>
          
        </main>

        <Footer />
      </React.Fragment>
    );
}

export default Contact;