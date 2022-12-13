import "./Button.css";
const Button = ({ handleClick, buttonName, disabled, alsoDisabled, color }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled || alsoDisabled}
      className={color}
    >
      {buttonName}
    </button>
  );
};

export default Button;
