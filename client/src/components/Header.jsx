import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserAlt,
  faCogs,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { isUser, isAdmin, logout } = useContext(AuthContext);
  return (
    <div className="header">
      <h1 className="logo">שותפ</h1>

      <div className="navBar">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        {isUser ? (
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUserAlt} />
            </Link>

            {isAdmin && (
              <Link to="/admin-panel">
                <FontAwesomeIcon icon={faCogs} />
              </Link>
            )}
            <Link to="/" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} />
            </Link>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
