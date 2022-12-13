import "./Line.css";

const Line = (props) => {
  return (
    <div
      className="line"
      center={props.center ? "center" : ""}
      justify={props.between ? "between" : ""}
      gap={props.gap ? "gap" : ""}
    >
      {props.children}
    </div>
  );
};

export default Line;
