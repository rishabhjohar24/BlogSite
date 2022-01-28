import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import { Prompt, useHistory } from "react-router-dom";

const CreateBlog = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const textInputRef = useRef();
  const imageInputRef = useRef();
  const history = useHistory();

  const sendRequest = async (payload) => {
    const response = await fetch("http://localhost:5000/blog/new", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
    return response;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredText = textInputRef.current.value;
    const enteredImage = imageInputRef.current.value;

    const payload = {
      name: userInfo.name,
      text: enteredText,
      image: enteredImage,
      id: userInfo._id,
      token: userInfo.token,
    };

    const response = await sendRequest(payload);
    if (response.status === "SUCCESS") {
      history.push(`/xyz/blog/${response.id}`);
    } else {
      <Prompt
        when={response.status === "ERROR"}
        message={"Something went wrong!"}
      />;
    }
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <label htmlFor="text">Description</label>
        <input type="text" name="text" id="text" ref={textInputRef} />
        <label htmlFor="image">Image</label>
        <input type="text" name="image" id="image" ref={imageInputRef} />
        <button>Submit</button>
      </form>
    </Fragment>
  );
};

export default CreateBlog;
