import './styles/App.scss'
import React, { useEffect, useState } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import firebase from './firebase'
import history from './services/history'

import Loading from './components/Loading'
import Navbar from './containers/Navbar'
import IndexPage from './containers/IndexPage'
import Profile from './containers/Profile'
import EditForm from './containers/EditForm'
import CreatePostForm from './containers/CreatePostForm'
import PostDetails from './containers/PostDetails'
import Signin from './containers/auth/Signin'
import Signup from './containers/auth/Signup'

function App() {

  const [auth, setAuth] = useState({
    loaded: false,
    loggedIn: false
  })

  useEffect(()=> {
    firebase.auth().onAuthStateChanged((user:any) => {
      if(!user){
        setAuth({
          loggedIn: false,
          loaded: true,
        })
      }else{
        setAuth({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }, [])

  if(!auth.loaded){
    return <Loading />
  }

  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={IndexPage}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/edit" exact component={EditForm}/>
          <Route path="/create" exact component={CreatePostForm}/>
          <Route path="/details" exact component={PostDetails}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path="/signup" exact component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
