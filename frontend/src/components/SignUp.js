import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginAction } from "../store/login";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const creadentials = { name, email, password };
    props.loginHandler(creadentials);
    const response = await fetch("http://localhost:5000/user/signup/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(creadentials),
    }).then((response) => response.json());
    if (response.status === "SUCCESS") {
      dispatch(
        loginAction.currentUserInfo({
          name,
          email,
          _id: response.id,
          token: response.token,
        })
      );
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("token", response.payload.token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("_id", response.payload._id.toString());
      history.push("/xyz/blog/");
    }
  };
  return (
    <Fragment>
      <div>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="name">Name</label>
          <input
            ref={nameInputRef}
            autoComplete="off"
            type="text"
            name="name"
          />
          <label htmlFor="email">Email</label>
          <input
            ref={emailInputRef}
            autoComplete="off"
            type="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordInputRef}
            autoComplete="off"
            type="password"
            name="password"
          />
          <button>Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
