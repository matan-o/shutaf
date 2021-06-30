import { useState, useContext, useEffect } from "react";
import { CommentContext } from "../context/CommentContext";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Comments = (props) => {
  const { hiddenState } = props;
  const { commentList } = useContext(CommentContext);
  const [hidden, setHidden] = useState(hiddenState);

  useEffect(() => {}, [commentList]);

  return (
    <div>
      {!hidden && (
        <div>
          {commentList &&
            commentList.map((comment) => {
              return (
                <div key={comment._id}>
                  <Comment comment={comment} />
                </div>
              );
            })}
        </div>
      )}
      {commentList && commentList.length > 0 && (
        <button className="btn" onClick={() => setHidden(!hidden)}>
          {hidden ? (
            <>
              <FontAwesomeIcon icon={faArrowDown} />
              <p>{`${commentList.length} תגובות `}</p>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArrowUp} />
              <p>סגור</p>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Comments;
