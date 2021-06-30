import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { formatDate } from "../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const CommentDisplay = (props) => {
  const { comment, setOnEdit } = props;
  const { isAdmin } = useContext(AuthContext);
  const { deleteComment } = useContext(CommentContext);

  const commentOptions = (comment) => {
    if (comment.currentUser || isAdmin) {
      return (
        <div className="btns">
          <button
            className="btn delete"
            onClick={() => deleteComment(comment._id)}
          >
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
    <div className="comment-display">
      <div className="comment-user">
        <Link to={`/user/${comment.user._id}`}>
          <img
            alt="profile-img-tiny"
            className="profile-img-tiny"
            src={comment.user.imgUrl}
          />
        </Link>
        <Link to={`/user/${comment.user._id}`}>
          <small>{comment.user.first_name}</small>
        </Link>
      </div>
      <p className="comment-body">{comment.body}</p>

      <small>{formatDate(comment.date)}</small>

      {commentOptions(comment)}
    </div>
  );
};

export default CommentDisplay;
