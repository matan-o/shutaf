import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHttp, mainUrl } from "../utils/httpWraper";
import Post from "./Post";

const PostsByUser = (props) => {
  const [userId, setUserId] = useState(props.userId);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { id } = useParams()
  useEffect(()=>{
    getPosts()
  },[id])

  const getPosts = () => {
    getHttp(`${mainUrl}/posts/user/${userId}?page=${page}`).then((results) => {
      setPosts([...posts, ...results.data]);
      setPage((p) => p + 1);
    });
  };

  useEffect(() => {
    setPage(1);
    setPosts([]);
    getPosts();
  }, [userId]);

  const deletePost = () => {};

  return (
    <div>
      {posts &&
        posts.map((post, i) => {
          return (
            <div key={post._id}>
              <Post post={post} deletePost={deletePost} />
            </div>
          );
        })}
      {posts.length > 0 && (
        <button className="btn" onClick={getPosts}>
          טען עוד
        </button>
      )}
    </div>
  );
};

export default PostsByUser;
