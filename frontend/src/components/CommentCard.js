import { useState } from "react";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import NewComment from "./NewComment";

const CommentCard = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [showAddComment, setShowAddComment] = useState(false);
  const onClickHandler = (event) => {
    event.preventDefault();
    setShowAddComment(true);
  };
  const hideCommentInputHandler = () => {
    setShowAddComment(false);
  };
  return (
    <div style={{ border: "solid 1px red", width: "30rem" }}>
      <Comments
        comments={props.commentsPayload}
        onDeletingComment={props.deleteCommentHandler}
      />
      {isLoggedIn && showAddComment && (
        <NewComment
          blogId={props.blogIdForNewComment}
          addComment={props.commentHandlerForNewComment}
          hideCommentInput={hideCommentInputHandler}
        />
      )}
      {!showAddComment && (
        <button onClick={onClickHandler}>Add Comment!</button>
      )}
    </div>
  );
};

export default CommentCard;
