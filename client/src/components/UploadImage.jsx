import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const UploadImage = (props) => {
  const imageRef = useRef();
  const id = new Date().getMilliseconds();
  const { uploadPreset, handleImageSet, currentImage } = props;
  const [peviewUrl, setPeviewUrl] = useState(currentImage);

  const handleChange = () => {
    if (imageRef.current.files && imageRef.current.files[0]) {
      let file = imageRef.current.files[0];
      setPeviewUrl(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      handleImageSet(formData);
    }
  };

  return (
    <div>
      <div className="image-upload">
        <label
          htmlFor={`file-input_${id}`}
          className="file-input-label btn-100"
        >
          <FontAwesomeIcon className="img-icon" icon={faFileUpload} />
          <p>תמונה</p>
        </label>
        <input
          type="file"
          className="file-input"
          id={`file-input_${id}`}
          name={`files_${id}`}
          ref={imageRef}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      {peviewUrl && (
        <img alt="preview" className="previewImg" src={peviewUrl} />
      )}
    </div>
  );
};

export default UploadImage;
