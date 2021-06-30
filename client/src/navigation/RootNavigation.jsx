import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import AdminPanel from "../components/AdminPanel";
import Main from "../components/Main";
import PostSelected from "../components/PostSelected";
import Profile from "../components/Profile";
import Register from "../components/Register";
import Login from "../components/Login";
import UserDetailsForm from "../components/UserDetailsForm";
import UserProfile from "../components/UserProfile";
import { AuthContext } from "../context/AuthContext";

const RootNavigation = () => {
  const { isUser, isAdmin } = useContext(AuthContext);

  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>

      <Route path="/register">
        {!isUser ? <Register /> : <Redirect to="/" />}
      </Route>

      <Route path="/login">
        {isUser ? <h2>המשתמש\ת כבר מחובר\ת</h2> : <Login />}
      </Route>

      <Route path="/profile">
        {isUser ? <Profile /> : <h2>אינך משתמש\ת מחובר\ת</h2>}
      </Route>

      <Route path="/user-details">
        {isUser ? <UserDetailsForm /> : <h2>אינך משתמש\ת מחובר\ת</h2>}
      </Route>

      <Route path="/admin-panel">
        {isAdmin ? <AdminPanel /> : <h2>הרשאה לאדמינים בלבד</h2>}
      </Route>

      <Route path="/post/:id">
        <PostSelected />
      </Route>

      <Route path="/user/:id">
        <UserProfile />
      </Route>
    </Switch>
  );
};

export default RootNavigation;
