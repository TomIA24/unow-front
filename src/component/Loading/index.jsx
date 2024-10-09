import React from "react";
import "./styles.css";

const Loading = ({ h = "100vh" }) => (
  <div style={{ minHeight: h }} className="allLoading">
    <div className="loading">
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loading;
