import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { mainUrl, postHttp } from "../utils/httpWraper";
import UploadImage from "./UploadImage";
import axios from "axios";
import { UPLOAD_IMAGE_URL } from "../consts";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("60a8c91606538e0e78b2dd7c");
  const [validate, setValidate] = useState(false);
  const [image, setImage] = useState(null);
  const { userId } = useContext(AuthContext);
  const { addPost, categories } = useContext(PostContext);

  useEffect(() => {
    if (title === "" || body === "") {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [title, body]);

  const handlePostClick = () => {
    if (!userId) {
      return;
    }
    if (image) {
      axios.post(UPLOAD_IMAGE_URL, image).then((response) => {
        createPost(response.data.url);
      });
    } else {
      createPost();
    }
  };

  const createPost = (imgUrl) => {
    postHttp(`${mainUrl}/posts/create`, {
      title: title,
      body: body,
      date: new Date(),
      location: location,
      category: category,
      imgUrl: imgUrl,
    }).then((result) => {
      addPost(result.data);
      setTitle("");
      setBody("");
      setLocation("");
      setImage(null);
      setCategory("60a8c91606538e0e78b2dd7c");
    });
  };

  return (
    <div className="PostForm">
      <input
        value={title}
        type="text"
        placeholder="כותרת"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={body}
        rows="5"
        placeholder="תיאור"
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        value={location}
        type="text"
        placeholder="מיקום הפעילות"
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>קטגוריה</option>
        {categories &&
          categories.map((c, i) => {
            return (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            );
          })}
      </select>
      <UploadImage uploadPreset="shutaf-post" handleImageSet={setImage} />

      <button className="btn" disabled={!validate} onClick={handlePostClick}>
        הוספה
      </button>
    </div>
  );
};

export default PostForm;
