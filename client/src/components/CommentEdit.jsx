import React, { useState } from "react";
import { putHttp, mainUrl } from "../utils/httpWraper";

const CommentEdit = (props) => {
  const { comment, setOnEdit, setComment } = props;
  const [body, setBody] = useState(comment.body);

  const handleOnUpadateClick = () => {
    putHttp(`${mainUrl}/comments/update/${comment._id}`, { body });
    const newComment = { ...comment, body };
    setComment(newComment);
    setOnEdit(false);
  };

  return (
    <div className="comment edit">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button className="btn" onClick={handleOnUpadateClick}>עדכון</button>
    </div>
  );
};

export default CommentEdit;
