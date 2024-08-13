import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
const TopListItem = (props) => {
  return (
    <div
      style={{
        display: "inline-flex",
        marginTop: "3%",
        marginLeft: "5%",
        marginBottom: "4%",
      }}
    >
      {props.items.map((item, index) => {
        if (index < props.items.length - 1)
          return (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <p style={{ fontSize: "25px" }}>{item.title}</p>{" "}
              <ArrowRightOutlinedIcon style={{ color: "orange" }} />
            </div>
          );
        else return <p style={{ fontSize: "25px" }}>{item.title}</p>;
      })}
    </div>
  );
};
export default TopListItem;
