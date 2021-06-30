import axios from "axios";
import { useState } from "react";
import { UPLOAD_IMAGE_URL } from "../consts";
import { mainUrl, putHttp } from "../utils/httpWraper";
import UploadImage from "./UploadImage";

const PostEdit = (props) => {
  const { post, setPost, setOnEdit } = props;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(post.location);

  const handlePostUpdate = () => {
    if (image) {
      axios.post(UPLOAD_IMAGE_URL, image).then((response) => {
        updateDetails(response.data.url);
      });
    } else {
      updateDetails();
    }
  };

  const updateDetails = (imgUrl) => {
    const updatedPost = { ...post, title, body, imgUrl, location };

    putHttp(`${mainUrl}/posts/post/${post._id}`, {
      title: title,
      body: body,
      imgUrl: imgUrl,
      location: location,
    }).then((response) => {
      console.log("post updated");
      setPost(updatedPost);
      setOnEdit(false);
    });
  };

  return (
    <div className="post-edit">
      <label>כותרת</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>תיאור</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <label>מיקום</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label>תמונה</label>
      <UploadImage
        uploadPreset="shutaf-post"
        handleImageSet={setImage}
        currentImage={post.imgUrl}
      />
      <button className="btn" onClick={() => setOnEdit(false)}>
        ביטול
      </button>
      <button className="btn" onClick={handlePostUpdate}>
        עדכן
      </button>
    </div>
  );
};

export default PostEdit;
