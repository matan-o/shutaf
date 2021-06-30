import { useContext, useEffect, useState } from "react";
import { getHttp, mainUrl, putHttp } from "../utils/httpWraper";
import { AuthContext } from "../context/AuthContext"

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const { userId } = useContext(AuthContext)

  useEffect(() => {
    getHttp(`${mainUrl}/users?id=${userId}`).then((results) => setUsers(results.data));
  }, []);

  const handleToggleActive = (id, activeState) => {
    let toggle = !activeState;
    putHttp(`${mainUrl}/users/userActive/${id}`, {
      isActive: toggle,
    }).then(() => {
      const user = users.find((u) => u._id === id);
      user.isActive = !user.isActive;
      setUsers([...users]);
    });
  };

  const handleToggleAdmin = (id, adminState) => {
    let toggle = !adminState;
    putHttp(`${mainUrl}/users/isAdmin/${id}`, {
      isAdmin: toggle,
    }).then(() => {
      const user = users.find((u) => u._id === id);
      user.isAdmin = !user.isAdmin;
      setUsers([...users]);
    });
  };

  return (
    <div className="users-panel">
      <h2>ניהול משתמשים</h2>
      {users &&
        users.map((user, i) => {
          return (
            <div key={user._id}>
              <p>{`${user.first_name} ${user.last_name}`}</p>
              <div className="category-column">
              <button
                className="btn"
                onClick={() => handleToggleActive(user._id, user.isActive)}
              >
                {user.isActive ? "השהה" : "הפעל"}
              </button>
              <button
                className="btn"
                onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
              >
                {user.isAdmin ? "בטל אדמין" : "הפוך לאדמין"}
              </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UsersPanel;
