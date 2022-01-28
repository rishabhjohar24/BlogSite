import { useState, useEffect, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const UserList = () => {
  const match = useRouteMatch();
  const [users, setUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/user")
        .then((response) => response.json())
        .then((response) => setUsers(response.payload));
      return response;
    };
    sendRequest();
  }, []);
  if (users) {
    const userList = users.map((data) => (
      <ul key={data._id}>
        <Link to={`${match.url}/${data._id}`}>{data.name}</Link>
      </ul>
    ));
    return <Fragment>{userList}</Fragment>;
  }
  return (
    <Fragment>
      <LoadingSpinner />
    </Fragment>
  );
};

export default UserList;
