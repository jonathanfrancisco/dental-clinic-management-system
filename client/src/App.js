import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from './components/hoc/ProtectedRoute';

class App extends Component {

   state = {
      authenticated: true
   };

   render() {
      return (
         <div className="App">
            <Router>
               <React.Fragment>
  
                  {!this.state.authenticated ? (
                    <Switch>
                        <Route exact path={["/","/login"]} component={() => <h1>Login</h1>} />
                        <Route render={() => <Redirect to="/login"/>}/>
                     </Switch>
                  ) : (
                     <Switch>
                        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                        <Route exact path="/login" render={() => <Redirect to="/"/>} />
                        <ProtectedRoute exact path="/home" component={() => <h1>Home</h1>} auth={this.state.authenticated} />
                        <ProtectedRoute exact path="/dentalrecords" component={() => <h1>Dental Records</h1>} auth={this.state.authenticated} />
                        <ProtectedRoute exact  path="/useraccounts" component={() => <h1>User Accounts</h1>} auth={this.state.authenticated} />
                     </Switch>
                  )}

               </React.Fragment>
            </Router>
         </div>
      );
   }

}

export default App;
