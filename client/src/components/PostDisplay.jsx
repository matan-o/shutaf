import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CommentsProvider } from "../context/CommentContext";
import { formatDate } from "../utils/formatDate";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";


const PostDisplay = (props) => {
  const { isUser, isAdmin } = useContext(AuthContext);
  const { post, setOnEdit, deletePost } = props;
  
  const postOptions = () => {
    if (post.currentUser || isAdmin) {
      return (
        <div className="btns">
          <button className="btn delete" onClick={() => deletePost(post._id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
            <p>מחיקה</p>
          </button>
          <button className="btn edit" onClick={() => setOnEdit(true)}>
            <FontAwesomeIcon icon={faEdit} />
            <p>עריכה</p>
          </button>
        </div>
      );
    }
  };

  return (
    <div className="post-display">
      <div className="post-display-top">
        <div className="post-display-top-right">
          <Link to={`/user/${post.user._id}`}>
            <img alt="profile-img-small" src={post.user.imgUrl} className="profile-img-small" />
          </Link>
        </div>
        <div className="post-display-top-center">
          <Link to={`/user/${post.user._id}`}>
            <h3 className="post-display-username">{`${post.user.first_name} ${post.user.last_name}`}</h3>
          </Link>
          {formatDate(post.date)}
        </div>
        <div className="post-display-top-left">
          {post.category && (
            <span className="post-category">
              <p>{post.category.name}</p>
            </span>
          )}
          {post.location && (
            <span className="post-location">
              <p>{post.location}</p>
            </span>
          )}
        </div>
      </div>
      <div className="post-body">
        <Link to={`/post/${post._id}`}>
          <h3 className="postTitle">{post.title}</h3>
        </Link>
        <p className="post-body-text">{post.body}</p>
        {post.imgUrl && (
          <Link to={`/post/${post._id}`}>
            <img alt="postImg" className="postImg" src={post.imgUrl} />
          </Link>
        )}
        <br />
        {postOptions()}
      </div>
      <CommentsProvider comments={[...post.comments]}>
        <Comments hiddenState={true} />
        {isUser && <CommentForm postId={post._id} />}
      </CommentsProvider>
    </div>
  );
};

export default PostDisplay;
