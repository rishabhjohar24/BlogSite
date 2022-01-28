import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, Prompt } from "react-router-dom";

import Navbar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import BlogList from "./components/BlogsList";
import { loginAction } from "./store/login";
import UserList from "./components/UserList";
import User from "./components/User";
import HighlightedBlog from "./components/HighlightedBlog";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import EditComment from "./components/EditComment";

const App = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const loginHandler = (payload) => {
    dispatch(loginAction.loginReducer());
  };
  let content = <SignUp loginHandler={loginHandler} />;

  if (isLoggedIn) {
    content = <p>You are logged in!</p>;
  }
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/xyz/signup" />
        </Route>
        {!isLoggedIn && (
          <Route path="/xyz/signup" exact>
            {content}
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/xyz/signin" exact>
            <SignIn />
          </Route>
        )}
        {isLoggedIn && (
          <Route path={"/xyz/user/:id"} exact>
            <User />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/xyz/user" exact>
            <UserList />
          </Route>
        )}
        <Route path="/xyz/editblog/:id">
          <EditBlog />
        </Route>
        {isLoggedIn && (
          <Route path="/xyz/newblog" exact>
            <CreateBlog />
          </Route>
        )}
        <Route path="/xyz/blog" exact>
          <BlogList />
        </Route>
        <Route path={`/xyz/blog/:id`} exact>
          <HighlightedBlog />
        </Route>
        <Route path="/xyz/edit/blog/comment/:id" exact>
          <EditComment />
        </Route>
        <Route path="*">
          <p>No such page exist!!</p>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
