import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Prompt, useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const EditComment = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [comment, setComment] = useState();
  const commentInputRef = useRef();
  const params = useParams();
  const history = useHistory();

  const sendRequest = async () => {
    const response = await fetch(`http://localhost:5000/comment/${params.id}`)
      .then((response) => response.json())
      .then((res) => setComment(res));
  };

  useEffect(() => {
    sendRequest();
  }, []);

  if (comment && comment.payload.owner !== userInfo._id) {
    return <h1>You're nor authorised to edit this comment!</h1>;
  }

  if (comment) {
    console.log(comment);
    const data = comment.payload;
    const submitHandler = async (event) => {
      event.preventDefault();
      const editedComment = commentInputRef.current.value;
      const response = await fetch(
        `http://localhost:5000/comment/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editedComment, token: userInfo.token }),
        }
      ).then((response) => response.json());

      if (response.status === "SUCCESS") {
        return history.push("/xyz/blog");
      }

      return <Prompt message="Something went wrong!" />;
    };

    return (
      <Fragment>
        <form type="submit" onSubmit={submitHandler}>
          <input
            type="text"
            defaultValue={data.comment}
            ref={commentInputRef}
          />
          <button>Submit</button>
        </form>
      </Fragment>
    );
  }
  return <LoadingSpinner />;
};

export default EditComment;
