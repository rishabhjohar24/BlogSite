import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import { Prompt } from "react-router-dom";

const NewComment = (props) => {
  const loggedInUser = useSelector((state) => state.login.userInfo);
  const commentInputRef = useRef();
  const postComment = async (event) => {
    event.preventDefault();
    props.hideCommentInput();
    const enteredComment = commentInputRef.current.value;
    const response = await fetch(`http://localhost:5000/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: enteredComment,
        name: loggedInUser.name,
        blogId: props.blogId,
        ownerId: loggedInUser._id,
        token: loggedInUser.token,
      }),
    }).then((response) => response.json());
    if (response.status === "ERROR") {
      return <Prompt message="Something went wrong!" />;
    }
    props.addComment();
    commentInputRef.current.value = "";
  };
  return (
    <Fragment>
      <form type="submit">
        <input type="text" ref={commentInputRef} />
        <button onClick={postComment}>Submit</button>
      </form>
    </Fragment>
  );
};

export default NewComment;
