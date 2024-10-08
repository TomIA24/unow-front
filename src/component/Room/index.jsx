import React, { Component } from 'react'
import io from 'socket.io-client'

import { IconButton, Badge, OutlinedInput, Button, Modal, Box } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatIcon from '@mui/icons-material/Chat';

import Fab from '@mui/material/Fab';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {RiCameraOffFill, RiCameraFill} from 'react-icons/ri'
import {
  MdOutlineVideocamOff,
  MdOutlineVideocam,
  MdOutlineScreenShare,
  MdOutlineMessage,
  MdOutlineSupervisedUserCircle,
} from "react-icons/md";
import {
  BsFillMicMuteFill,
  BsFillMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { message } from "antd";
//import 'antd/dist/antd.css'
import Grid from "@mui/material/Grid";
// import { Row } from 'reactstrap'
import SendIcon from "@mui/icons-material/Send";
//import 'bootstrap/dist/css/bootstrap.css'
import "./Room.css";

// const server_url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API}` : "localhost:8080"
// const server_url = "http://localhost:5050";
console.log(process.env.REACT_APP_API);
const server_url = process.env.REACT_APP_API;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  border: "none",
};

var connections = {};
const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    // { 'urls': "stun:stun.l.google.com:19302" },
    {
      urls: "stun:98.67.167.71:3478",
      username: "username1",
      credential: "key1",
    },
  ],
};
var socket = null;
var socketId = null;
var elms = 0;

class Room extends Component {
  constructor(props) {
    super(props);

    this.localVideoref = React.createRef();
    this.masterVideoref = React.createRef();

    this.videoAvailable = false;
    this.audioAvailable = false;

    const token = localStorage.getItem("token");
    if (!token) {
      const currentPath = window.location.pathname;
      console.log(currentPath);
      localStorage.setItem("redirectPath", currentPath);
      window.location.href = "/login";
    } else {
      this.state = {
        video: true,
        audio: true,
        speaking: false,
        screen: false,
        showModal: false,
        screenAvailable: false,
        messages: [],
        message: "",
        newmessages: 0,
        userRole: "user",
        showMessages: true,
        showVideos: false,
        askForUsername: true,
        user: JSON.parse(localStorage.getItem("user")),
        // username: JSON.parse(localStorage.getItem("user")).name,
      };
      this.getPermissions();

      console.log("user: ", JSON.parse(localStorage.getItem("user")));
    }

    connections = {};
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const messageBody = document.querySelector(".MessagesBody");
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight;
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        messageBody.scrollTop = messageBody.scrollHeight;
      });
    }
  };

  getPermissions = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));

      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));

      if (navigator.mediaDevices.getDisplayMedia) {
        this.state.screenAvailable = true;
      } else {
        this.state.screenAvailable = false;
      }

      if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices
          .getUserMedia({
            video: this.videoAvailable,
            audio: this.audioAvailable,
          })
          .then((stream) => {
            window.localStream = stream;
            this.localVideoref.current.srcObject = stream;
          })
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMedia = () => {
    this.setState({}, () => {
      this.getUserMedia();
      this.connectToSocketServer();
    });
  };

  getUserMedia = () => {
    if (
      (this.state.video && this.videoAvailable) ||
      (this.state.audio && this.audioAvailable)
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: this.state.video, audio: this.state.audio })
        .then(this.getUserMediaSuccess)
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = this.localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              video: false,
              audio: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                  connections[id]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        id,
                        JSON.stringify({
                          sdp: connections[id].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        })
    );
  };

  getDislayMedia = () => {
    if (this.state.screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(this.getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              screen: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              this.getUserMedia();
            }
          );
        })
    );
  };

  gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  // changeCssVideos = (main) => {
  //   let widthMain = main.offsetWidth;
  //   let minWidth = "200px";
  //   if ((widthMain * 30) / 100 < 300) {
  //     minWidth = "200px";
  //   }

  //   let width = String(100 / elms) + "%";

  //   let videos = main.querySelectorAll("video");
  //   for (let a = 0; a < videos.length; ++a) {
  //     videos[a].style.minWidth = minWidth;
  //     videos[a].style.margin = "auto";
  //     videos[a].style.setProperty("width", width);
  //   }

  //   return { minWidth, width };
  // };

  connectToSocketServer = () => {
    socket = io.connect(server_url, { secure: true });

    socket.on("signal", this.gotMessageFromServer);

    socket.on("connect", () => {
      socket.emit("join-call", {
        path: window.location.href,
        userId: JSON.parse(localStorage.getItem("user"))._id,
      });
      socketId = socket.id;

      socket.on("chat-message", this.addMessage);

      socket.on("user-left", (id) => {
        let video = document.querySelector(`[data-socket="${id}"]`);
        if (video !== null) {
          elms--;
          video.parentNode.removeChild(video);

          let main = document.getElementById("StreamsVideos");
          // this.changeCssVideos(main);
        }
      });

      socket.on("user-joined", (id, clients, userRole) => {
        console.log("userRole: ", userRole);
        this.setState({ userRole: userRole });
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConnectionConfig
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socket.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            // TODO mute button, full screen button
            var searchVidep = document.querySelector(
              `[data-socket="${socketListId}"]`
            );
            if (searchVidep !== null) {
              // if i don't do this check it make an empyt square
              searchVidep.srcObject = event.stream;
            } else {
              elms = clients.length;
              let main = document.getElementById("StreamsVideos");
              // let cssMesure = this.changeCssVideos(main);

              let video = document.createElement("video");

              let css = {
                // minWidth: cssMesure.minWidth,
                // minHeight: cssMesure.minHeight,
                width: "100%",
                maxHeight: "100%",
                margin: "10px",
                borderStyle: "solid",
                borderColor: "#bdbdbd",
                objectFit: "fill",
              };
              for (let i in css) video.style[i] = css[i];

              // video.style.setProperty("width", cssMesure.width);
              // video.style.setProperty("height", cssMesure.height);
              video.setAttribute("data-socket", socketListId);
              video.srcObject = event.stream;
              video.autoplay = true;
              video.playsinline = true;

              main.appendChild(video);
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketId) {
          for (let id2 in connections) {
            if (id2 === socketId) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  handleVideo = () =>
    this.setState({ video: !this.state.video }, () => this.getUserMedia());
  handleAudio = () =>
    this.setState({ audio: !this.state.audio }, () => this.getUserMedia());
  handleScreen = () =>
    this.setState(
      { screen: !this.state.screen, video: !this.state.video },
      () => {
        this.getDislayMedia();
        if (this.state.screen === false) {
          this.handleVideo();
          this.state.video = false;
        }
      }
    );

  handleEndCall = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/";
  };

  openChat = () => this.setState({ showModal: true, newmessages: 0 });
  closeChat = () => this.setState({ showModal: false });
  handleMessage = (e) => this.setState({ message: e.target.value });

  addMessage = (data, sender, socketIdSender) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: sender, data: data }],
    }));
    if (socketIdSender !== socketId) {
      this.setState({ newmessages: this.state.newmessages + 1 });
    }
  };

  handleUsername = (e) => this.setState({ username: e.target.value });

  sendMessage = () => {
    console.log("test messages: ", this.state.message, this.state.user.name);
    socket.emit("chat-message", this.state.message, this.state.user.name);
    this.setState({ message: "", sender: this.state.user.name }, () => {
      // After the state has been updated, scroll the message body to the bottom
      const messageBody = document.querySelector(".MessagesBody");
      if (messageBody) {
        console.log("height messages body: ", messageBody.scrollHeight);
        messageBody.scrollTop = messageBody.scrollHeight;
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.message !== this.state.message) {
      const messageBody = document.querySelector(".MessagesBody");
      if (messageBody) {
        console.log("height messages body: ", messageBody.scrollHeight);
        messageBody.scrollTop = messageBody.scrollHeight;

        // Use setTimeout to ensure scrolling happens after DOM update
        setTimeout(() => {
          messageBody.scrollTop = messageBody.scrollHeight;
        }, 0);
      }
    }
  }
  /*/////////////////////////////////////////////////////////////////////////////////////*/
  copyUrl = () => {
    let text = window.location.href;
    if (!navigator.clipboard) {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        message.success("Link copied to clipboard!");
      } catch (err) {
        message.error("Failed to copy");
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        message.success("Link copied to clipboard!");
      },
      () => {
        message.error("Failed to copy");
      }
    );
  };

  connect = () =>
    this.setState({ askForUsername: false }, () => {
      this.getMedia();
      console.log(this.state.video);
    });

  // isChrome = function () {
  //   let userAgent = (navigator && (navigator.userAgent || "")).toLowerCase();
  //   let vendor = (navigator && (navigator.vendor || "")).toLowerCase();
  //   let matchChrome = /google inc/.test(vendor)
  //     ? userAgent.match(/(?:chrome|crios)\/(\d+)/)
  //     : null;
  //   // let matchFirefox = userAgent.match(/(?:firefox|fxios)\/(\d+)/)
  //   // return matchChrome !== null || matchFirefox !== null
  //   return matchChrome !== null;
  // };
  handleShowVideos = () => {
    this.setState({ showMessages: false, showVideos: true });
  };
  handleShowMessages = () => {
    this.setState({ showVideos: false, showMessages: true });
  };
  render() {
    // if (this.isChrome() === false) {
    //   return (
    //     <div
    //       style={{
    //         background: "white",
    //         width: "30%",
    //         height: "auto",
    //         padding: "20px",
    //         minWidth: "400px",
    //         textAlign: "center",
    //         margin: "auto",
    //         marginTop: "50px",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <h1>Sorry, this works only with Google Chrome</h1>
    //     </div>
    //   );
    // }
    return (
      <div className="Room">
        {this.state.askForUsername === true ? (
          <div className="PreConnectionPage">
            <div
              style={{
                margin: "auto",
                justifyContent: "center",
                textAlign: "center",
                paddingTop: "40px",
              }}
            >
              {this.state.video ? (
                <video
                  id="my-video-pre-connection"
                  ref={this.localVideoref}
                  autoPlay
                  muted
                  className="videoPreConnect"
                ></video>
              ) : (
                <div className="videoPreConnectOffContainer">
                  <MdOutlineVideocamOff color="white" size={60} />
                </div>
              )}
            </div>

            <div className="InfoSpace">
              <div className="ConnectButton">
                <h3>{this.state.user.name}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.connect}
                  style={{ margin: "20px" }}
                >
                  Connect
                </Button>
              </div>

              <div className="ButtonsPreConnection">
                <Fab
                  onClick={this.handleAudio}
                  sx={
                    this.state.audio === true
                      ? {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#343A40",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "#686D76",
                            marginTop: "-5px",
                          },
                        }
                      : {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#BD1616",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "rgba(189, 22, 22, 0.75)",
                            marginTop: "-5px",
                          },
                        }
                  }
                >
                  {this.state.audio === true ? (
                    <BsFillMicFill color="white" size={20} />
                  ) : (
                    <BsFillMicMuteFill color="white" size={20} />
                  )}
                </Fab>

                <Fab
                  onClick={this.handleVideo}
                  sx={
                    this.state.video === true
                      ? {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#343A40",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "#686D76",
                            marginTop: "-5px",
                          },
                        }
                      : {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#BD1616",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "rgba(189, 22, 22, 0.75)",
                            marginTop: "-5px",
                          },
                        }
                  }
                >
                  {this.state.video === true ? (
                    <MdOutlineVideocam color="white" size={27} />
                  ) : (
                    <MdOutlineVideocamOff color="white" size={27} />
                  )}
                </Fab>

                <Fab
                  onClick={this.handleEndCall}
                  sx={{
                    width: "60px",
                    borderRadius: "50px",
                    height: "40px",
                    backgroundColor: "#BD1616",
                    color: "white",
                    transition: "margin-top 0.2s ease-out",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "rgba(189, 22, 22, 0.75)",
                      marginTop: "-5px",
                    },
                  }}
                >
                  <CallEndIcon />
                </Fab>
              </div>
            </div>
          </div>
        ) : (
          <div className="Room">
            <div className="LeftDiv">
              <div
                id="main"
                className="flex-container"
                style={{ margin: "10px", padding: 0 }}
              >
                <div className="video-container">
                  <video
                    id="my-video"
                    ref={this.localVideoref}
                    autoPlay
                    muted
                  ></video>
                </div>

                <div className="Buttons">
                  <Fab
                    onClick={this.handleAudio}
                    sx={
                      this.state.audio === true
                        ? {
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#343A40",
                            transition: "margin-top 0.2s ease-out",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "#686D76",
                              marginTop: "-5px",
                            },
                          }
                        : {
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#BD1616",
                            transition: "margin-top 0.2s ease-out",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "rgba(189, 22, 22, 0.75)",
                              marginTop: "-5px",
                            },
                          }
                    }
                  >
                    {this.state.audio === true ? (
                      <BsFillMicFill color="white" size={20} />
                    ) : (
                      <BsFillMicMuteFill color="white" size={20} />
                    )}
                  </Fab>

                  <Fab
                    onClick={this.handleVideo}
                    sx={
                      this.state.video === true
                        ? {
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#343A40",
                            transition: "margin-top 0.2s ease-out",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "#686D76",
                              marginTop: "-5px",
                            },
                          }
                        : {
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#BD1616",
                            transition: "margin-top 0.2s ease-out",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "rgba(189, 22, 22, 0.75)",
                              marginTop: "-5px",
                            },
                          }
                    }
                  >
                    {this.state.video === true ? (
                      <MdOutlineVideocam color="white" size={27} />
                    ) : (
                      <MdOutlineVideocamOff color="white" size={27} />
                    )}
                  </Fab>

                  <Fab
                    onClick={this.handleScreen}
                    sx={
                      this.state.screen === false
                        ? {
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#343A40",
                            transition: "margin-top 0.2s ease-out",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "#686D76",
                              marginTop: "-5px",
                            },
                          }
                        : {
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#5D8BF4",
                            transition: "margin-top 0.2s ease-out",
                            border: "none",
                            "&:hover": {
                              backgroundColor: "rgba(93, 139, 244, 0.75)",
                              marginTop: "-5px",
                            },
                          }
                    }
                  >
                    <MdOutlineScreenShare color="white" size={24} />
                  </Fab>

                  <Fab
                    sx={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#343A40",
                      transition: "margin-top 0.2s ease-out",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "#686D76",
                        marginTop: "-5px",
                      },
                    }}
                  >
                    <BsThreeDotsVertical color="white" size={23} />
                  </Fab>
                  <Fab
                    onClick={this.handleEndCall}
                    sx={{
                      width: "60px",
                      borderRadius: "50px",
                      height: "40px",
                      backgroundColor: "#BD1616",
                      color: "white",
                      transition: "margin-top 0.2s ease-out",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "rgba(189, 22, 22, 0.75)",
                        marginTop: "-5px",
                      },
                    }}
                  >
                    <CallEndIcon />
                  </Fab>
                </div>
              </div>
            </div>
            <div className="rightDiv">
              {this.state.showMessages ? (
                <div className="StreamsChat">
                  <div className="MessagesHeader">
                    <h3>Messages in the call</h3>
                  </div>
                  <hr />
                  <div className="MessagesBody">
                    {this.state.messages.length > 0 ? (
                      this.state.messages.map((item, index) =>
                        item.sender === this.state.user.name ? (
                          <div
                            key={index}
                            className="message"
                            style={{ textAlign: "right" }}
                          >
                            <p
                              style={{
                                fontSize: "10px",
                                margin: "5px",
                                fontWeight: "200",
                              }}
                            >
                              {item.sender}
                            </p>
                            <p
                              style={{ wordBreak: "break-all", margin: "5px" }}
                            >
                              {" "}
                              {item.data}
                            </p>
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="message"
                            style={{ textAlign: "left" }}
                          >
                            <p
                              style={{
                                fontSize: "10px",
                                margin: "5px",
                                fontWeight: "200",
                              }}
                            >
                              {item.sender}
                            </p>

                            <p
                              style={{ wordBreak: "break-all", margin: "5px" }}
                            >
                              {item.data}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p style={{ textAlign: "center" }}>No message yet</p>
                    )}
                  </div>
                  <div className="MessagesFooter">
                    <input
                      variant="outlined"
                      placeholder="Message"
                      value={this.state.message}
                      className="InputMessage"
                      onChange={(e) => this.handleMessage(e)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          this.state.message.trim() !== ""
                        ) {
                          e.preventDefault();
                          this.sendMessage();
                        }
                      }}
                    />

                    <IconButton
                      disabled={this.state.message.trim() === ""}
                      aria-label="delete"
                      Message-btn
                      onClick={this.sendMessage}
                      sx={{ color: "white", cursor: "pointer" }}
                    >
                      <SendIcon />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <div id="StreamsVideos" className="StreamsVideosContainer"></div>
              )}
              <div>
                <Fab
                  onClick={this.handleShowVideos}
                  sx={
                    this.state.showVideos === false
                      ? {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#343A40",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "#686D76",
                            marginTop: "-5px",
                          },
                        }
                      : {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#5D8BF4",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "rgba(93, 139, 244, 0.75)",
                            marginTop: "-5px",
                          },
                        }
                  }
                >
                  <MdOutlineSupervisedUserCircle color="white" size={24} />
                </Fab>
                <Fab
                  onClick={this.handleShowMessages}
                  sx={
                    this.state.showMessages === false
                      ? {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#343A40",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "#686D76",
                            marginTop: "-5px",
                          },
                        }
                      : {
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#5D8BF4",
                          transition: "margin-top 0.2s ease-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "rgba(93, 139, 244, 0.75)",
                            marginTop: "-5px",
                          },
                        }
                  }
                >
                  <MdOutlineMessage color="white" size={24} />
                </Fab>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Room
