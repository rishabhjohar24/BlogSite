const BlogCard = (props) => {
  const data = props.blogInfo;
  return (
    <div
      style={{
        border: "1px solid blue",
        width: "40rem",
      }}
    >
      <img style={{ width: "39rem", height: "39rem" }} src={`${data.image}`} />
      <p>{data.name}</p>
      <p>{data.text}</p>
    </div>
  );
};

export default BlogCard;
