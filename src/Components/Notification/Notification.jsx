import "./Notification.css";

const Notification = ({ children, serverError }) => {
  return (
    <div className={serverError ? "error server-error" : "notification"}>
      {children}
    </div>
  );
};

export default Notification;
