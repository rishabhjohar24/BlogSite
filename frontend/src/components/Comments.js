import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, Prompt } from "react-router-dom";

const Comments = (props) => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const deleteComment = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost/:5000/comment/${event.target.value}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userInfo.token }),
      }
    );
    if (response.status === "SUCCESS") {
      props.deleteComment();
    }
    return <Prompt message={"Something went wrong!"} />;
  };
  const comments = props.comments.map((comment) => (
    <div key={comment._id}>
      <p>{comment.name}</p>
      <p>{comment.comment}</p>
      {userInfo._id === comment.owner && (
        <Link to={`/xyz/edit/blog/comment/${comment._id}`}> Edit Comment</Link>
      )}
      {userInfo._id === comment.owner && (
        <button value={comment._id} onClick={deleteComment}>
          Delete
        </button>
      )}
    </div>
  ));
  return <Fragment>{comments}</Fragment>;
};

export default Comments;
