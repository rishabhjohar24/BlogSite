import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";

const NewComment = (props) => {
  const loggedInUser = useSelector((state) => state.login.userInfo);
  const commentInputRef = useRef();
  const postComment = (event) => {
    event.preventDefault();
    const enteredComment = commentInputRef.current.value;
    fetch(`http://localhost:5000/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: enteredComment,
        name: loggedInUser.name,
        blogId: props.blogId,
        ownerId: loggedInUser._id,
      }),
    });
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
