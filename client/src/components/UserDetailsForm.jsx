import { useContext, useState } from "react";
import { mainUrl, putHttp } from "../utils/httpWraper";
import { useHistory } from "react-router-dom";
import UploadImage from "./UploadImage";
import axios from "axios";
import { UPLOAD_IMAGE_URL } from "../consts";
import { AuthContext } from "../context/AuthContext";

const UserDetailsForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDay, setBirthDay] = useState();
  const [sex, setSex] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [houseNumber, setHouseNumber] = useState();
  const [image, setImage] = useState(null);

  const { userId } = useContext(AuthContext);

  const history = useHistory();

  const handleDetailsOnClick = () => {
    if (!userId) {
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
      sex: sex,
      birthDay: birthDay,
      address: {
        city: city,
        street: street,
        houseNumber: houseNumber,
      },
      imgUrl: imgUrl,
    })
      .then((result) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="user-details-form">
        <h2>פרטי משתמש</h2>
        <h3>פרטים כללים</h3>

        <input
          placeholder="שם פרטי"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          placeholder="שם משפחה"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <fieldset
          id="group1"
          onChange={(e) => {
            setSex(e.target.value);
          }}
        >
          <label>זכר</label>
          <input type="radio" value="male" name="group1" />
          <label>נקבה</label>
          <input type="radio" value="female" name="group1" />
          <label>אחר</label>
          <input type="radio" value="other" name="group1" />
        </fieldset>

        <label>תאריך לידה: </label>
        <input
          type="date"
          onChange={(e) => {
            setBirthDay(e.target.value);
          }}
        />

        <label>תמונה:</label>

        <UploadImage uploadPreset="shutaf-profile" handleImageSet={setImage} />

        <h3>כתובת מגורים</h3>
        <input
          placeholder="עיר \ מושב \ יישוב"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          placeholder="רחוב"
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <input
          placeholder="מספר בית \ דירה"
          onChange={(e) => {
            setHouseNumber(e.target.value);
          }}
        />
        <br />
        <button onClick={handleDetailsOnClick}>אישור</button>
      </div>
    </>
  );
};

export default UserDetailsForm;
