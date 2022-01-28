import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Prompt, useHistory, useParams } from "react-router-dom";

const EditBlog = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const params = useParams();
  const [values, setValues] = useState();
  const textInputRef = useRef();
  const imageInputRef = useRef();
  const history = useHistory();
  const sendRequest = async () => {
    const response = await fetch(`http://localhost:5000/blog/${params.id}`)
      .then((response) => response.json())
      .then((res) => setValues(res));
    return response;
  };
  useEffect(() => {
    sendRequest();
  }, []);
  if (values && userInfo._id !== values.payload.owner) {
    const clickHandler = (event) => {
      event.preventDefault();
      history.push("/xyz/blog");
    };
    return (
      <Fragment>
        <p>You are not authorised to edit this post!!</p>
        <button onClick={clickHandler}>Click me to redirect!</button>
      </Fragment>
    );
  }
  if (values && userInfo._id === values.payload.owner) {
    const data = values.payload;
    const submitHandler = async (event) => {
      event.preventDefault();
      const enteredImage = imageInputRef.current.value;
      const enteredText = textInputRef.current.value;
      const data = {
        image: enteredImage,
        text: enteredText,
        token: userInfo.token,
      };
      const response = await fetch(
        `http://localhost:5000/blog/editblog/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      ).then((response) => response.json());
      console.log(response);
      if (response.status === "SUCCESS") {
        return history.push(`/xyz/blog/${params.id}`);
      }
      return <Prompt message="Something went wrong!" />;
    };
    return (
      <Fragment>
        <form type="submit" onSubmit={submitHandler}>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            defaultValue={data.text}
            ref={textInputRef}
          />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            defaultValue={data.image}
            ref={imageInputRef}
          />
          <button>Submit</button>
        </form>
      </Fragment>
    );
  }
  return <p>hi from editblog!!</p>;
};

export default EditBlog;
