import axios from "axios";
import { useState } from "react";
import { UPLOAD_IMAGE_URL } from "../consts";
import { mainUrl, putHttp } from "../utils/httpWraper";
import UploadImage from "./UploadImage";

const ProfileEdit = (props) => {
  const { user, setOnEdit } = props;
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastname] = useState(user.last_name);
  const [birthDay, setBirthDay] = useState(new Date(user.birthDay));
  const [city, setCity] = useState(user.address.city);
  const [street, setStreet] = useState(user.address.street);
  const [houseNumber, setHouseNumber] = useState(user.address.houseNumber);
  const [image, setImage] = useState(null);

  const handleProfileUpdate = () => {
    if (!user) {
      return;
    }
    if (image) {
      axios.post(UPLOAD_IMAGE_URL, image).then((response) => {
        updateDetails(response.data.url);
      });
    } else {
      updateDetails();
    }
  };

  const updateDetails = (imgUrl) => {
    putHttp(`${mainUrl}/users/myProfile`, {
      first_name: firstName,
      last_name: lastName,
      sex: user.sex,
      birthDay: birthDay,
      address: {
        city: city,
        street: street,
        houseNumber: houseNumber,
      },
      imgUrl: imgUrl ? imgUrl : user.imgUrl,
    })
      .then((result) => {
        setOnEdit(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ProfileEdit">
      <UploadImage
        uploadPreset="shutaf-profile"
        handleImageSet={setImage}
        currentImage={user.imgUrl}
      />
      <label>שם פרטי</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>שם משפחה</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastname(e.target.value)}
      />
      <label>תאריך לידה</label>
      <input
        type="date"
        value={birthDay}
        onChange={(e) => setBirthDay(e.target.value)}
      />
      <label>עיר</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label>רחוב</label>
      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <label>מס' בית</label>
      <input
        type="text"
        value={houseNumber}
        onChange={(e) => setHouseNumber(e.target.value)}
      />
      <button className="btn" onClick={handleProfileUpdate}>
        אישור
      </button>
    </div>
  );
};

export default ProfileEdit;
