import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FaUserGraduate } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { MdOndemandVideo, MdCategory } from "react-icons/md";
import { FcExpired, FcApproval } from "react-icons/fc";
import { GoDotFill } from "react-icons/go";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../../Loading";
const Dashboard = () => {
  useEffect(() => {
    handleData();
    handleTrainers();
    handleTrainings();
    handleCourses();
    handleCategories();
  }, []);

  const [Loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const [candidates, setCandidates] = useState([]);
  const handleData = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Candidat/showCandidat`;
    axios.post(url, {}, config).then((res) => {
      setCandidates(res.data.users);
    });
  };

  const [trainers, setTrainers] = useState([]);
  const handleTrainers = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/trainer/showTrainers`;
    axios.post(url, {}, config).then((res) => {
      setTrainers(res.data.trainers);
    });
  };

  const [trainings, setTrainings] = useState([]);
  const handleTrainings = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/trainings/`;
    axios.post(url, {}, config).then((res) => {
      setTrainings(res.data.data);
      setTrainingsExpired(res.data.data.filter((t) => t.state === "expired"));
      setTrainingsConfirmed(
        res.data.data.filter((t) => t.state === "confirmed")
      );
    });
  };

  const [courses, setCourses] = useState([]);
  const handleCourses = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/courses/`;
    axios.post(url, config).then((res) => {
      setCourses(res.data.data);
    });
  };

  const [trainingsExpired, setTrainingsExpired] = useState([]);
  const [trainingsConfirmed, setTrainingsConfirmed] = useState([]);

  const [categories, setCategories] = useState([]);
  const handleCategories = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Category/getCategories`;
    axios.get(url,config).then((res) => {
      setCategories(res.data.data);
    });
  };
  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const MonthNb = [
    { title: "January", nbc: 0, nbf: 0 },
    { title: "February", nbc: 0, nbf: 0 },
    { title: "March", nbc: 0, nbf: 0 },
    { title: "April", nbc: 0, nbf: 0 },
    { title: "May", nbc: 0, nbf: 0 },
    { title: "June", nbc: 0, nbf: 0 },
    { title: "July", nbc: 0, nbf: 0 },
    { title: "August", nbc: 0, nbf: 0 },
    { title: "September", nbc: 0, nbf: 0 },
    { title: "October", nbc: 0, nbf: 0 },
    { title: "November", nbc: 0, nbf: 0 },
    { title: "December", nbc: 0, nbf: 0 },
  ];

  const [Months, setMonths] = useState([]);

  useEffect(() => {
    Month.map((m, index) => {
      candidates.map((c) => {
        if (Month[new Date(c.dateOfCreation).getMonth()] === m) {
          MonthNb[index].nbc += 1;
        }
      });
      trainers.map((c) => {
        if (Month[new Date(c.dateOfCreation).getMonth()] === m) {
          MonthNb[index].nbf += 1;
        }
      });
    });
    setMonths(MonthNb);
  }, [candidates, trainers]);

  useEffect(() => {
    const ss = Months.map((m) => {
      return {
        name: m.title,
        candidats: m.nbc,
        formateurs: m.nbf,
      };
    });
    setSeries(ss);
  }, [Months]);

  const [series, setSeries] = useState([]);
  useEffect(() => {
    setLoading(false);
  }, [series]);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.FirstRow}>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of candidates</p>
            <p className={styles.DescBlock}>{candidates.length}</p>
          </div>
          <div style={{ background: "#FF5D5D" }} className={styles.IconBlock}>
            <FaUserGraduate color="white" />
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of Trainers</p>
            <p className={styles.DescBlock}>{trainers.length}</p>
          </div>
          <div style={{ background: "#006E7F" }} className={styles.IconBlock}>
            <ImUserTie color="white" />
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of trainings</p>
            <p className={styles.DescBlock}>{trainings.length}</p>
          </div>
          <div style={{ background: "#FEB139" }} className={styles.IconBlock}>
            <HistoryEduIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of courses</p>
            <p className={styles.DescBlock}>{courses.length}</p>
          </div>
          <div style={{ background: "#187498" }} className={styles.IconBlock}>
            <MdOndemandVideo color="white" />
          </div>
        </div>
      </div>
      <div className={styles.SecondRow}>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of trainings expired</p>
            <p className={styles.DescBlock}>{trainingsExpired.length}</p>
          </div>
          <FcExpired size={30} />
          {/* <div style={{background: "#11468F"}}  className={styles.IconBlock}>
                                <FaUserGraduate  color='white'/>
                            </div> */}
        </div>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of trainings confirmed</p>
            <p className={styles.DescBlock}>{trainingsConfirmed.length}</p>
          </div>
          <FcApproval size={30} />
        </div>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>number of categories</p>
            <p className={styles.DescBlock}>{categories.length}</p>
          </div>
          <div style={{ background: "#4F9DA6" }} className={styles.IconBlock}>
            <MdCategory color="white" />
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.TextBlock}>
            <p className={styles.TitleBlock}>Numbre of live sessions</p>
            <p className={styles.DescBlock}>NaN</p>
          </div>
          <div style={{ background: "#FA360A" }} className={styles.IconBlock}>
            <GoDotFill color="white" />
          </div>
        </div>
      </div>
      <div className={styles.thrdRow}>
        <div className={styles.titleStats}>
          <h1>Statistics</h1>
        </div>
        <div className={styles.diag}>
          <div className={styles.diagTitle}>
            <h3>
              {" "}
              <GoDotFill /> number of new registrants per month
            </h3>
          </div>
          <LineChart
            width={1100}
            height={600}
            data={series}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="candidats"
              stroke="#ff7300"
              strokeWidth={3}
              yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="formateurs"
              stroke="#446A46"
              yAxisId={0}
              strokeWidth={3}
            />
            <XAxis dataKey="name" />

            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
