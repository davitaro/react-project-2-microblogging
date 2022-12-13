import "./Error.css";

const Error = ({ children, serverError }) => {
  return (
    <div className={serverError ? "error server-error" : "error"}>
      {children}
    </div>
  );
};

export default Error;
