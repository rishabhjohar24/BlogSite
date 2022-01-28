import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../store/login";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const logouthandler = (event) => {
    event.preventDefault();
    dispatch(loginAction.logoutReducer());
    dispatch(loginAction.clearUserInfo());
    localStorage.clear();
  };
  const button = (
    <ul style={{ padding: "2px" }}>
      <button style={{ margin: "5px" }} onClick={logouthandler}>
        Logout
      </button>
    </ul>
  );
  return (
    <header>
      <div>Blog Site!!</div>
      <nav>
        <ul>
          <ul style={{ padding: "4px" }}>
            <NavLink to="/xyz/blog">All Blog</NavLink>
          </ul>
          {!isLoggedIn && (
            <ul style={{ padding: "4px" }}>
              <NavLink to="/xyz/signup">SignUp</NavLink>
            </ul>
          )}
          {!isLoggedIn && (
            <ul style={{ padding: "4px" }}>
              <NavLink to="/xyz/signin">LogIn</NavLink>
            </ul>
          )}
          {isLoggedIn && (
            <ul style={{ padding: "4px" }}>
              <NavLink to="/xyz/newblog">New Blog</NavLink>
            </ul>
          )}
          {isLoggedIn && (
            <ul style={{ padding: "4px" }}>
              <NavLink to="/xyz/user">Users</NavLink>
            </ul>
          )}
          {isLoggedIn && button}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
