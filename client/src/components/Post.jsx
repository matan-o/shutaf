import { useState } from "react";
import PostDisplay from "./PostDisplay";
import PostEdit from "./PostEdit";

const Post = (props) => {
  const { deletePost } = props;
  const [post, setPost] = useState(props.post);
  const [onEdit, setOnEdit] = useState(false);
  return (
    <div>
      {onEdit ? (
        <PostEdit post={post} setPost={setPost} setOnEdit={setOnEdit} />
      ) : (
        <PostDisplay
          post={post}
          deletePost={deletePost}
          setOnEdit={setOnEdit}
        />
      )}
    </div>
  );
};

export default Post;
