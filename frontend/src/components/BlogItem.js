import { Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";

const BlogItem = (props) => {
  const match = useRouteMatch();
  const userInfo = useSelector((state) => state.login.userInfo);
  return (
    <Fragment>
      <BlogCard blogInfo={props.data} />
      <p>
        <Link to={`${match.url}/${props.data._id}`}>To</Link>
      </p>
      {props.data.owner === userInfo._id && (
        <p>
          <Link to={`/xyz/editblog/${props.data._id}`}>Edit</Link>
        </p>
      )}
    </Fragment>
  );
};

export default BlogItem;
