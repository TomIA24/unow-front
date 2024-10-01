import styles from "./styles.module.css";

const ProfileInfo = ({ userInfo }) => (
  <div className={styles.info}>
    <div>
      <p>{userInfo?.name}</p>
      <p>Trainer</p>
    </div>
    <div>
      <p> {userInfo?.phoneNumber || "--"}</p>
      <p> {userInfo?.email || "--"}</p>
      <p> {userInfo?.address || "--"}</p>
    </div>
  </div>
);

export default ProfileInfo;
