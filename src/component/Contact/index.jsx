import styles from "./styles.module.css";
import { Link,
	useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Footer from "../footer"
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
        const url=`${process.env.REACT_APP_API}/api/contact/SendMessage`
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
        <Nav />

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
            <div className={styles.BorderSectionsContact1}>
              <h2 className={styles.TitleContact}>Contact Us</h2>
              <div className={styles.ContactPartInfoTextField}>
                <TextField
                  InputProps={{
                    className: classes.multilineColor,
                  }}
                  className={styles.InfoArea}
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  value={Data.name}
                  onChange={(e) => setData({ ...Data, name: e.target.value })}
                />

                <TextField
                  className={styles.InfoArea}
                  id="standard-basic"
                  label="Surname"
                  variant="standard"
                  value={Data.surname}
                  onChange={(e) =>
                    setData({ ...Data, surname: e.target.value })
                  }
                />
              </div>
              <div className={styles.ContactPartInfoTextField}>
                <TextField
                  className={styles.InfoArea}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  value={Data.email}
                  onChange={(e) => setData({ ...Data, email: e.target.value })}
                />

                <TextField
                  className={styles.InfoArea}
                  id="standard-basic"
                  label="Subject"
                  variant="standard"
                  value={Data.subject}
                  onChange={(e) =>
                    setData({ ...Data, subject: e.target.value })
                  }
                />
              </div>
              <div className={styles.ContactPartInfoTextField}>
                <TextField
                  className={styles.TextArea}
                  id="standard-multiline-static"
                  label="Message"
                  multiline
                  rows={2}
                  variant="standard"
                  value={Data.message}
                  onChange={(e) =>
                    setData({ ...Data, message: e.target.value })
                  }
                />
              </div>
              <div className={styles.sendMessageDiv}>
                <button onClick={handleSend} className={styles.btnSend}>
                  Envoyer le Message
                </button>
              </div>
            </div>
            <div className={styles.BorderSectionsContact}>
              <div className={styles.InfosContact}>
                <div className={styles.InfosContactHeader}>
                  <h2>Contact information</h2>
                  <p>
                    Fill out the form and our team will get back to you within
                    24 hours
                  </p>
                </div>
                <div className={styles.infosForContactDivExtern}>
                  <div className={styles.infosForContactDivIntern}>
                    <div className={styles.InfosContactBody}>
                      <div className={styles.Info}>
                        <CallIcon className={styles.InfoIcon} />
                        <h3>+216 50 19 608</h3>
                      </div>
                      <div className={styles.Info}>
                        <EmailIcon className={styles.InfoIcon} />
                        <h3>support@u!now.tn</h3>
                      </div>

                      <div className={styles.Info}>
                        <LocationOnIcon className={styles.InfoIcon} />
                        <h3>
                          Av. Yesser Arafet, Imm Bouhajeb - Sahloul - Sousse
                        </h3>
                      </div>
                    </div>
                    <div className={styles.InfosContactFooter}>
                      <a
                        href="#Facebook"
                        className={styles.InfosContactFooterLink}
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href="#Linked"
                        className={styles.InfosContactFooterLink}
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href="#Instagram"
                        className={styles.InfosContactFooterLink}
                      >
                        <InstagramIcon />
                      </a>
                    </div>
                  </div>
                  <div className={styles.map}>
                    {/* <Map location={location} zoomLevel={17} />  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </React.Fragment>
    );
}

export default Contact;