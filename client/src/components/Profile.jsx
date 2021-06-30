import { useEffect, useState } from "react";
import { getHttp, mainUrl } from "../utils/httpWraper";
import ProfileDisplay from "./ProfileDisplay";
import ProfileEdit from "./ProfileEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [user, setUser] = useState();
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    getHttp(`${mainUrl}/users/myProfile`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [onEdit]);

  const handleToggleEdit = () => {
    setOnEdit((prevValue) => !prevValue);
  };

  return (
    <div className="profile">
      {user && (
        <>
          {onEdit ? (
            <ProfileEdit user={user} setOnEdit={setOnEdit} />
          ) : (
            <ProfileDisplay user={user} />
          )}
          <button className="btn" onClick={handleToggleEdit}>
            {onEdit ? (
              <>
                <FontAwesomeIcon icon={faArrowRight} />
                <p>חזור</p>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEdit} />
                <p>עריכה</p>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
