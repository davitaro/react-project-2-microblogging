import "./Account.css";
import SignIn from "./Sign In/SignIn";
import CreateNewAccount from "./Create New Account/CreateNewAccount";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const auth = getAuth();

const Account = () => {
  return (
    <div className="account-wrapper">
      <h1>Sign in or create a new account. </h1>
      <h2>
        Or, sign in with Google 👉{" "}
        <button className="google-button">
          <img
            width="20"
            alt='Google "G" Logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/16px-Google_%22G%22_Logo.svg.png"
            onClick={() => {
              signInWithRedirect(auth, provider);
            }}
          />
        </button>
      </h2>

      <div className="account-forms">
        <SignIn />
        <div className="line"></div>
        <CreateNewAccount />{" "}
      </div>
    </div>
  );
};

export default Account;
