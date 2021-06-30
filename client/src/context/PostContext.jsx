import { createContext, useEffect, useState } from "react";
import { deleteHttp, getHttp, mainUrl } from "../utils/httpWraper";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  useEffect(() => {
    getHttp(`${mainUrl}/categories`).then((results) => {
      setCategories(results.data);
    });
  }, []);

  const [postList, setPostList] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchPostList = (posts) => {
    let list = [...postList, ...posts];
    setPostList(list);
    console.log(list)
  };
  
  const addPost = (newPost) => {
    newPost.currentUser = true;
    let newList = [...postList];
    newList.unshift(newPost);
    setPostList(newList);
  };

  const deletePost = async (id) => {
    if (window.confirm("הפוסט ימחק, האם להמשיך?")) {
      await deleteHttp(`${mainUrl}/posts/delete/${id}`);
      const filtered = postList.filter((p) => p._id !== id);
      setPostList([...filtered]);
    }
  };

  const state = {
    postList,
    setPostList,
    fetchPostList,
    addPost,
    deletePost,
    categories,
  };

  return <PostContext.Provider value={state}>{children}</PostContext.Provider>;
};
