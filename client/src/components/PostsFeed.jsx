import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { getHttp, mainUrl } from "../utils/httpWraper";
import Post from "./Post";

const PostsFeed = () => {
  const { postList, fetchPostList, deletePost, isUser } =
    useContext(PostContext);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts();
  }, [isUser]);

  const getPosts = () => {
    getHttp(`${mainUrl}/posts?page=${page}`).then((result) => {
      fetchPostList(result.data);
      setPage((p) => p + 1);
    });
  };

  return (
    <div className="posts-feed">
      {postList &&
        postList.map((post, i) => {
          return (
            <div key={post._id}>
              <Post post={post} deletePost={deletePost} />
            </div>
          );
        })}
      <button className="posts-feed-btn" onClick={getPosts}>
        טען עוד
      </button>
    </div>
  );
};

export default PostsFeed;
