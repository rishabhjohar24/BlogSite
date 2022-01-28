import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import LoadingSpinner from "./LoadingSpinner";

const User = (props) => {
  const [userInformation, setUserInformation] = useState(null);
  const params = useParams();
  const sendRequest = () => {
    fetch(`http://localhost:5000/user/${params.id}`)
      .then((response) => response.json())
      .then((response) => setUserInformation(response));
  };
  useEffect(() => {
    sendRequest();
  }, []);
  if (userInformation) {
    if (!userInformation.payload.blog.length) {
      return (
        <h1>User {userInformation.payload.name} has not posted till now!!</h1>
      );
    }
    const content = userInformation.payload.blog.map((blogContent) => (
      <BlogCard key={blogContent._id} blogInfo={blogContent} />
    ));
    return <Fragment>{content}</Fragment>;
  }
  return (
    <Fragment>
      <LoadingSpinner />
    </Fragment>
  );
};

export default User;
