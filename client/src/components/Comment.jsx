import { useState } from "react";
import CommentDisplay from "./CommentDisplay";
import CommentEdit from "./CommentEdit";

const Comment = (props) => {
  const [onEdit, setOnEdit] = useState(false);
  const [comment, setComment] = useState(props.comment);

  return (
    <div className="comments">
      {onEdit ? (
        <CommentEdit
          comment={comment}
          setComment={setComment}
          setOnEdit={setOnEdit}
        />
      ) : (
        <CommentDisplay comment={comment} setOnEdit={setOnEdit} />
      )}
    </div>
  );
};

export default Comment;
