import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./services/history";
import Navbar from "./components/Navbar/Navbar";
import IndexPage from "./components/MainPage/IndexPage";
import Profile from "./components/User/UserProfile/Profile";
import EditForm from "./components/User/EditProfile/EditForm";
import CreatePostForm from "./components/Post/CreatePost/CreatePostForm";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import RequireAuth from "./components/RequireAuth";
import PostDetailsPage from "./components/Post/PostDetailsPage/PostDetailsPage";

function RouterComponent() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/#:postId">
          <IndexPage />
        </Route>
        <Route path="/postDetails/:postId">
          <PostDetailsPage />
        </Route>
        <Route path="/profile">
          <RequireAuth>
            <Profile />
          </RequireAuth>
        </Route>
        <Route path="/edit">
          <RequireAuth>
            <EditForm />
          </RequireAuth>
        </Route>
        <Route path="/create" component={CreatePostForm} />
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterComponent;
