import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHttp, mainUrl } from "../utils/httpWraper";
import PostsByUser from "./PostsByUser";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    if (id) {
      getHttp(`${mainUrl}/users/user/${id}`).then((user) => {
        setUser(user.data);
      });
    }
  }, [id]);

  return (
    <div className="profile">
      {user && (
        <>
          <div className="myProfile">
            <h2>
              {user.first_name} {user.last_name}
            </h2>
            <img alt="profile_pic" className="profile-pic" src={user.imgUrl} />

            <p>{user.email}</p>

            <p>
              {user.address.city}, {user.address.street},{" "}
              {user.address.houseNumber}
            </p>
          </div>
          <PostsByUser userId={user._id} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
