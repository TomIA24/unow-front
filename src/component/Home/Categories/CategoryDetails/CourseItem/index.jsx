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
        <div className={stylesItem.inner_carousel} style={{ height: "50vh" }}>
          {props.course.Thumbnail?.filePath ? (
            <div className={stylesItem.image} style={{ marginBottom: "1%" }}>
              <img
                src={props?.course?.Thumbnail?.filePath}
                alt={""}
                style={{ height: "100%" }}
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
          <div
            style={{
              width: "100%",
              margin: "1px 3px 0px 3px",
              display: "inline-block",
            }}
          >
            <div className={stylesItem.categorie}>
              <div className={stylesItem.categorietype}>
                {props.course.Category}
              </div>
              <div
                className={stylesItem.categoriprice}
                style={{ margin: "0px 15px 0px 0px" }}
              >
                {props.course.Price} $
              </div>
            </div>
            <div style={{ display: "inline-block", float: "left" }}>
              <div
                className={stylesItem.categoriniveau}
                style={{ marginTop: "8px", fontSize: "15px" }}
              >
                {props.course.Level}
              </div>
              <div
                className={stylesItem.categoridomain}
                style={{
                  marginTop: "8px",
                  fontSize: "15px",
                  float: "left",
                  paddingLeft: "3px",
                }}
              >
                {props.course.Title}
              </div>
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
              <div
                className={stylesItem.categoriniveau}
                style={{
                  marginTop: "20px",
                  float: "left",
                  display: "flex",
                  fontSize: "13px",
                  alignItems: "center",
                }}
              >
                <StarRounded style={{ color: "yellow" }} />
                {props.course.rating} (750)
              </div>

              <AvatarGroup
                style={{
                  marginTop: "10px",
                  float: "right",
                  display: "inline-flex",
                  width: "20px",
                  height: "20px",
                }}
                renderSurplus={(surplus) => (
                  <span
                    style={{
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      fontSize: "0.5rem", // Smaller font size for the surplus indicator
                    }}
                  >
                    +{surplus.toString()[0]}k
                  </span>
                )}
                total={10}
              >
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Remy Sharp"
                  src="https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146074.png"
                />
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Travis Howard"
                  src="https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146074.png"
                />
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Agnes Walker"
                  src="https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146074.png"
                />
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  alt="Trevor Henderson"
                  src="https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146074.png"
                />
              </AvatarGroup>
            </div>
            <div
              style={{
                display: "flex",
                float: "right",
                backgroundColor: "#cd6214",
                borderRadius: "10px 0px 0px",
                cursor: "pointer",
              }}
            >
              <AddIcon style={{ fontSize: "15px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseItem;
