import {
  AddTwoTone,
  PlusOneOutlined,
  StarOutline,
  StarRounded,
} from "@mui/icons-material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddIcon from "@mui/icons-material/Add";
import stylesItem from "./styles.module.css";

import { Avatar, AvatarGroup } from "@mui/material";
const CourseItem = (props) => {
  return (
    <div>
      <div className={stylesItem.topTrainingElements}>
        <div className={stylesItem.inner_carousel}>
          {props.course.Thumbnail?.filePath ? (
            <div className={stylesItem.image}>
              <img
                src={props?.course?.Thumbnail?.filePath}
                alt={""}
                className={stylesItem.imagefeatures}
              />
            </div>
          ) : (
            <div className={stylesItem.image}>
              <img
                src="default-image.png"
                alt="Default"
                className={stylesItem.imagefeatures}
              />
            </div>
          )}
          <div className={stylesItem.containercard}>
            <div className={stylesItem.categorie}>
              <div className={stylesItem.categorietype}>
                {props.course.Category}
              </div>
              <div className={stylesItem.categoriprice}>
                {props.course.Price} $
              </div>
            </div>
            <div
              className={stylesItem.categoriniveau}
              style={{ marginTop: "8px", fontSize: "15px" }}
            >
              {props.course.Level}
            </div>
            <div className={stylesItem.categoridomain}>
              {props.course.Title}
            </div>
            <div
              style={{
                display: "inline-flex",
                float: "left",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div className={stylesItem.categoriniveau}>
                <StarRounded style={{ color: "yellow" }} />
                {props.course.rating} (750)
              </div>

              <AvatarGroup
                sx={{
                  float: "right",
                  width: "20px",
                  height: "20px",
                  display: "inline-flex",
                  "& .MuiAvatar-root": {
                    width: "20px",
                    height: "20px",
                    fontSize: "9px",
                    backgroundColor: "transparent",
                    color: "black",
                  },
                }}
                renderSurplus={(surplus) => (
                  <span>+{surplus.toString()[0]}k</span>
                )}
                total={10}
              >
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Remy Sharp"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                />
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Travis Howard"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                />
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Agnes Walker"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                />
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Trevor Henderson"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                />
              </AvatarGroup>
            </div>
            <div className={stylesItem.containerplus}>
              <AddIcon className={stylesItem.plusstyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseItem;
