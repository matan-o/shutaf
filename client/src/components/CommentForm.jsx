import { useContext, useState } from "react";
import { CommentContext } from "../context/CommentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

const CommentForm = (props) => {
  const { postId } = props;
  const { addComent } = useContext(CommentContext);
  const [comment, setComment] = useState("");

  const handleCommentClick = () => {
    addComent(postId, comment);
    setComment("");
  };

  return (
    <div className="comment-form">
      <textarea
        id="comment-textarea"
        onChange={(e) => setComment(e.target.value)}
        placeholder="תגובה"
        value={comment}
      ></textarea>
      <button
        className="btn"
        disabled={comment === ""}
        onClick={handleCommentClick}
      >
        <FontAwesomeIcon icon={faCommentAlt} />
        <p>תגובה</p>
      </button>
    </div>
  );
};

export default CommentForm;
