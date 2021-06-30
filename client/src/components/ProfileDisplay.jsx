import { formatBirthday } from "../utils/formatDate";

const ProfileDisplay = (props) => {
  const { user } = props;

  return (
    <div className="myProfile">
      <div className="myProfile">
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <img
          alt="profile_pic"
          className="profile-pic"
          style={{ width: 200 }}
          src={user.imgUrl}
        />
        <br />
        <p>{formatBirthday(user.birthDay)}</p>
        <label>{user.email}</label>
        <p>
          {user.address.city}, {user.address.street}, {user.address.houseNumber}
        </p>
      </div>
    </div>
  );
};
export default ProfileDisplay;
