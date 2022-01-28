import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Prompt, useHistory, useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import CommentCard from "./CommentCard";
import LoadingSpinner from "./LoadingSpinner";

const HighlightedBlog = (props) => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [blogData, setBlogData] = useState();
  const [showComments, setShowComments] = useState(false);
  const params = useParams();
  const history = useHistory();

  const sendRequest = () => {
    fetch(`http://localhost:5000/blog/${params.id}`)
      .then((response) => response.json())
      .then((res) => {
        setBlogData(res);
      });
  };

  const deleteBlogHandler = (event) => {
    event.preventDefault();
    const response = fetch(`http://localhost:5000/blog/delete/${params.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userInfo.token }),
    }).then((response) => response.json());
    if (response.status === "SUCCESS") {
      return history.push("/xyz/blog");
    }
    return <Prompt message={"Something went wrong!"} />;
  };
  const newCommentHandler = async () => {
    sendRequest();
  };

  const deleteCommentHandler = async () => {
    sendRequest();
  };

  const showCommentHandler = () => {
    setShowComments(true);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return blogData ? (
    <Fragment>
      <BlogCard blogInfo={blogData.payload} />
      {userInfo._id === blogData.payload.owner && <br /> && (
        <button onClick={deleteBlogHandler}>Delete Blog</button>
      )}
      <br />
      {!showComments && (
        <button onClick={showCommentHandler}>Show Comments</button>
      )}
      {showComments && (
        <CommentCard
          commentsPayload={blogData.payload.comments}
          blogIdForNewComment={blogData.payload._id}
          commentHandlerForNewComment={newCommentHandler}
          deleteCommentHandler={deleteCommentHandler}
        />
      )}
    </Fragment>
  ) : (
    <LoadingSpinner />
  );
};

export default HighlightedBlog;
