import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Feed from './components/feed/Feed';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreatePost from './components/posts/CreatePost'
import Groups from './components/groups/GroupsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Feed}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/newpost' component={CreatePost}/>
          <Route path='/groups' component={Groups}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
