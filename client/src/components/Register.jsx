import { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { mainUrl } from "../utils/httpWraper";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const register = () => {
    let samePassword = password === password2;
    if (email && password && samePassword) {
      axios
        .post(`${mainUrl}/users/user`, {
          email: email,
          password: password,
        })
        .then((result) => {
          // console.log(result.data)
          login(result.data.jwt, false, result.data.id);
          history.push("/user-details");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="register-form">
        <h2>הרשמה</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="דוא'ל"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="סיסמא"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          placeholder="אימות סיסמא"
        />

        <button className="btn" onClick={register}>
          אישור
        </button>
      </div>
    </>
  );
};

export default Register;
