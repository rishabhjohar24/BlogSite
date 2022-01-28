import { useSelector } from "react-redux";
import Comments from "./Comments";
import NewComment from "./NewComment";

const CommentCard = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <div style={{ border: "solid 1px red", width: "30rem" }}>
      <Comments
        comments={props.commentsPayload}
        onDeletingComment={props.deleteCommentHandler}
      />
      {isLoggedIn && (
        <NewComment
          blogId={props.blogIdForNewComment}
          addComment={props.commentHandlerForNewComment}
        />
      )}
    </div>
  );
};

export default CommentCard;
