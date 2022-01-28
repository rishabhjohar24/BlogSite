import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginAction } from "../store/login";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const sendRequest = async (email, password) => {
    const response = await fetch("http://localhost:5000/user/signin/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => res.json());
    return response;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const response = await sendRequest(enteredEmail, enteredPassword);
    if (response.status === "SUCCESS") {
      dispatch(loginAction.loginReducer());
      dispatch(loginAction.currentUserInfo(response.payload));
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("token", response.payload.token);
      localStorage.setItem("name", response.payload.name);
      localStorage.setItem("email", response.payload.email);
      localStorage.setItem("_id", response.payload._id.toString());
      history.push("/xyz/blog");
    } else {
      return prompt("please try again!");
    }
  };
  return (
    <Fragment>
      <form method="POST" onSubmit={formSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" ref={emailInputRef} />
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordInputRef} />
        <button>Log In</button>
      </form>
    </Fragment>
  );
};

export default SignIn;
