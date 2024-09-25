import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { request } from "../../../core/api/request";

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    request.read("userData").then((data) => {
      setUserInfo(data.data);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <div className={styles.container}>
        <ul>
          <li>
            Connecting Metropolis:
            <span>{userInfo.connectingMetropolis}</span>
          </li>
          <li>
            Monthly Bandwidth:
            <span>{userInfo.monthlyBandwidth}</span>
          </li>
          <li>
            Animation Language:
            <span>
              {userInfo.animationLanguage
                ?.map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </span>
          </li>
          <li>
            <div className={styles.programs}>
              Programs:
              <div>
                {userInfo.programs?.slice(0, 6).map((program, index) => (
                  <p key={index}>
                    <span>{program}</span>
                  </p>
                ))}
                {userInfo.programs?.length > 6 && (
                  <p className={styles.seeMore}>See more...</p>
                )}
              </div>
            </div>
          </li>
          <li>
            Charge TVA:
            <span>{userInfo.chargeTVA}</span>
          </li>
          <li>
            RCS:
            <span>{userInfo.RCS}</span>
          </li>
          <li>
            SIRET:
            <span>{userInfo.SIRET}</span>
          </li>
          <li>
            IBAN:
            <span>{userInfo.socialReason}</span>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default InfoUser;
