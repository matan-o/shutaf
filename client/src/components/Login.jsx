import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import axios from "axios";
import { mainUrl } from "../utils/httpWraper";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("matanohana87@gmail.com");
  const [password, setPassword] = useState("12345678");
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const onLoginClick = () => {
    //TODO: email/password verify logic
    if (email && password) {
      axios
        .post(`${mainUrl}/users/login`, {
          email: email,
          password: password,
        })
        .then((result) => {
          login(result.data.jwt, result.data.isAdmin, result.data.id);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="register-form">
        <h2>התחברות</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="דוא'ל"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="סיסמא"
          value={password}
        />
        <button className="btn" onClick={onLoginClick}>אישור</button>
      </div>
    </>
  );
};

export default Login;
