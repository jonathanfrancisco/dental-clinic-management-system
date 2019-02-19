import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from './components/hoc/ProtectedRoute';

// PAGES
import Login from './pages/Login';

class App extends Component {

   state = {
      authenticated: false
   };

   handleLogin = (formValues) => {
      console.log(formValues);
      return {
         errors: ['yow']
      }
   }

   render() {
      return (
         <div className="App">
            <Router>
               <React.Fragment>
  
                  {!this.state.authenticated ? (
                    <Switch>
                        <Route exact path={["/","/login"]} render={(routeProps) => <Login {...routeProps} handleLogin={this.handleLogin}/>} />
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
