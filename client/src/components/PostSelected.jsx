import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHttp, mainUrl } from "../utils/httpWraper";
import { CommentsProvider } from "../context/CommentContext";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const PostSelected = () => {
  let { id } = useParams();
  const { isUser } = useContext(AuthContext);
  const [post, setPost] = useState();

  useEffect(() => {
    getHttp(`${mainUrl}/posts/post/${id}`).then((post) => {
      setPost(post.data);
    });
  }, [id]);

  return (
    <div className="post-selected">
      {post && (
        <div>
          <Link to={`/user/${post.user._id}`}>
            <img
              alt="profile-img-mid"
              src={post.user.imgUrl}
              className="profile-img-mid"
            />
          </Link>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          {post.imgUrl && (
            <img alt="postImg" className="postImg" src={post.imgUrl} />
          )}

          <CommentsProvider comments={[...post.comments]}>
            <Comments hiddenState={false} />
            {isUser && <CommentForm postId={post._id} />}
          </CommentsProvider>
        </div>
      )}
    </div>
  );
};

export default PostSelected;
