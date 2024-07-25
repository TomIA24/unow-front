import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import axios from "axios";

const Notifications = ({ setNotifOpenModal }) => {
  const [NotificationsData, setNotificationsData] = useState([]);
  useEffect(() => {
    handleSubmit();
    localStorage.setItem("NbNotif", NotificationsData.length);
  }, []);
  useEffect(() => {
    localStorage.setItem("NbNotif", NotificationsData.length);
  }, [NotificationsData]);

  const handleSubmit = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const url = `${process.env.REACT_APP_API}/api/notifications/getNotifications`;
      axios.post(url, {}, config).then(async (res) => {
        setNotificationsData(res.data.data);
        //console.log(NotificationsData)
        localStorage.setItem("AllNotifications", JSON.stringify(res.data.data));
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
      }
    }
  };

  return (
    <List
      sx={{
        width: "500px",
        maxWidth: 500,
        bgcolor: "background.paper",
      }}
    >
      {NotificationsData.map((notif, index) => {
        const notifDateFormated = new Date(notif.NotifDate);
        const now = new Date();

        var period = "";
        now.getFullYear() - notifDateFormated.getFullYear() == 0
          ? now.getMonth() - notifDateFormated.getMonth() == 0
            ? now.getDay() - notifDateFormated.getDay() == 0
              ? now.getHours() - notifDateFormated.getHours() == 0
                ? now.getMinutes() - notifDateFormated.getMinutes() == 0
                  ? now.getSeconds() - notifDateFormated.getSeconds() < 60
                    ? (period = " Just now ")
                    : (period = `${
                        now.getMinutes() - notifDateFormated.getMinutes()
                      } Minutes ago`)
                  : (period = `${
                      now.getMinutes() - notifDateFormated.getMinutes()
                    } Minutes ago`)
                : (period = `${
                    now.getHours() - notifDateFormated.getHours()
                  } Hours ago`)
              : (period = `${-(
                  now.getDay() - notifDateFormated.getDay()
                )} Days ago`)
            : (period = `${
                now.getMonth() - notifDateFormated.getMonth()
              } Months ago`)
          : (period = `${
              now.getFullYear() - notifDateFormated.getFullYear()
            } Years ago`);

        //console.log(notif)

        const primaryMsg =
          "<p>" +
          `${
            notif.message && !(notif.Date || notif.time || notif.duration)
              ? notif.user.name.bold() + " send a message to customize a course"
              : notif.user.name.bold() + " want to customize : "
          }` +
          `${
            notif.Date !== [null, null] && notif.time
              ? " Date,"
              : notif.Date !== [null, null]
              ? " Date"
              : ""
          }` +
          `${
            notif.time && notif.duration ? " Time," : notif.time ? " Time" : ""
          }` +
          `${notif.duration ? " Duration" : ""}` +
          `${
            notif.message && (notif.Date || notif.time || notif.duration)
              ? " and send a message"
              : ""
          }` +
          "</p>";
        return (
          <React.Fragment>
            <ListItem
              onClick={() => {
                setNotifOpenModal(notif);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary={period}>
                <div dangerouslySetInnerHTML={{ __html: primaryMsg }}></div>
              </ListItemText>
            </ListItem>
            <React.Fragment>
              {!(index === NotificationsData.length - 1) ? (
                <Divider variant="inset" component="li" />
              ) : (
                ""
              )}
            </React.Fragment>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Notifications;
