import { Fragment, useEffect, useState } from "react";

import LoadingSpinner from "./LoadingSpinner";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/blog")
        .then((res) => res.json())
        .then((res) => setData(res.payload));
      return response;
    };
    fetchData();
  }, []);
  if (data && !data.length) {
    return <h1>No blogs has been posted till now!</h1>;
  }
  return (
    <Fragment>
      {data ? (
        data.map((x, i) => (
          <div key={i} style={{ border: "1px solid green", margin: "10px" }}>
            <BlogItem data={x} key={i} />
          </div>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default BlogList;
