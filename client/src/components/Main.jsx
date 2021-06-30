import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostProvider } from "../context/PostContext";
import PostForm from "./PostForm";
import PostsFeed from "./PostsFeed";

const Main = () => {
  const { isUser } = useContext(AuthContext);

  return (
    <div>
      <PostProvider>
        {isUser && <PostForm />}
        <PostsFeed />
      </PostProvider>
    </div>
  );
};

export default Main;
