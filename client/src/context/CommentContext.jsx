import { createContext, useState } from "react";
import { deleteHttp, mainUrl, postHttp } from "../utils/httpWraper";

export const CommentContext = new createContext();

export const CommentsProvider = ({ children, comments }) => {
  const [commentList, setCommentList] = useState(comments);

  const addComent = (postId, comment) => {
    let newComment = {
      post_id: postId,
      body: comment,
      date: new Date(),
    };
    postHttp(`${mainUrl}/comments/comment`, newComment).then((result) => {
      const newCommentList = [...commentList];
      newCommentList.unshift(result.data);
      setCommentList(newCommentList);
    });
  };

  const deleteComment = async (id) => {
    if (window.confirm("התגובה תימחק, האם להמשיך?")) {
      await deleteHttp(`${mainUrl}/comments/delete/${id}`);
      const filtered = commentList.filter((c) => c._id !== id);
      setCommentList([...filtered]);
    }
  };



  const state = {
    deleteComment,
    commentList,
    setCommentList,
    addComent,
  };
  return (
    <CommentContext.Provider value={state}>{children}</CommentContext.Provider>
  );
};
