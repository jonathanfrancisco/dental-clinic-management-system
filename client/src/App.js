import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Icon, notification} from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// MY COMPONENTS
import ProtectedRoute from './components/hoc/ProtectedRoute';
import SiderNavigation from './components/SiderNavigation';
import SpinningComponent from './components/SpinningComponent';

// PAGES 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DentalRecords from './pages/DentalRecords';
import Payments from './pages/Payments';
import Appointments from './pages/Appointments';
import SMSTextMessaging from './pages/SMSTextMessaging';
import UserAccounts from './pages/UserAccounts';

import axios from 'axios';

const {Content, Sider, Header} = Layout;


class App extends Component {

   state = {
      authenticated: false,
      user: '',
      collapsedWidth: 80,
      collapsed: false,
      leftMargin: 200, 
      loginLoading: false
   };

   componentDidMount() {;
      axios.get('/api/users/checkToken')
      .then((response) => {
         if(response.status === 200) {
            this.setState({authenticated: true, user: response.data.user});
         }
      }).catch((err) => {
         if(err)
            this.setState({authenticated: false});
      });
   }

   handleLogin = (formValues) => {
      this.setState({loginLoading: true});
      return axios.post('/api/users/login', formValues)
      .then((response) => {   
         if(response.data.error === undefined) {
            this.setState({authenticated: true, user: response.data.user});
            setTimeout(() => {
               this.setState({loginLoading: false});
               notification['success']({
                  message: 'System Message',
                  description: 'Logged-in successfully!',
               });
            },2000);
           
         }
         return response;
      })
   }

   handleLogout = () => {
      axios.post('/api/users/logout')
      .then((response) => {
         if(response.status === 200)
            this.setState({authenticated: false, user: ''});
      })
      .catch((err) => {
         console.log(err);
      });
   }

   // TOGGLE FOR NAVIGATION
   toggle = () => {
      const newMargin = this.state.leftMargin === 200 && this.state.collapsedWidth === 80 ? 80 
      : this.state.leftMargin === 200 && this.state.collapsedWidth === 0 ? 0 
      : 200;
      this.setState({
        collapsed: !this.state.collapsed,
        leftMargin: newMargin
      });
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
               
                  ) : this.state.loginLoading ? (
                        <SpinningComponent />
                  ) : (
                     <Layout>
                        <Sider
                           trigger={null}
                           collapsed={this.state.collapsed}
                           breakpoint="sm"
                           onBreakpoint={(broken) => {
                              if(broken)
                                 this.setState({collapsedWidth: 0, collapsed: true, leftMargin: 0});
                              else
                                 this.setState({collapsedWidth: 80, collapsed: false, leftMargin: 200});  
                           }}
                           collapsedWidth={this.state.collapsedWidth}
                           style={{minHeight: '100vh', position: 'fixed', zIndex: 100}}
                        > 
                           <h4 style={{textAlign: 'center', margin: 0, padding: '12px 12px 0 12px', color: 'rgba(255,255,255,0.65)'}}>
                              Logged in as <br /> <span style={{fontWeight: 'bold'}}>{this.state.user.name} </span>
                           </h4>
                           <div className="logo" />
                           <SiderNavigation role={this.state.user.role} handleLogout={this.handleLogout}/>
                        </Sider>
                        <Layout>
                           <Header style={{boxShadow: '0px -1px 3px rgba(0, 0, 0, 1)', marginLeft: this.state.leftMargin, background: '#fff', padding: 0, position: 'fixed', zIndex: 100, width: '100%'}}>
                              <Icon
                                 className="trigger"
                                 type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                 onClick={this.toggle}
                                 />
                           </Header>
                           <Layout style={{marginLeft: this.state.leftMargin, marginTop: 64, minHeight: '100vh'}}>
                             
                                 <Route render={({location}) => (
                                    <TransitionGroup>
                                    <CSSTransition
                                       onEnter={() => {
                                          window.scrollTo(0,0);
                                       }}
                                       key={location.key}
                                       timeout={500}
                                       classNames="move"
                                    >
                                       <Switch location={location}>
                                          <Route exact path={["/","/login"]}  render={(props) => {
                                             if(this.state.user.role === 'dentalaide')
                                                return <Redirect to="/dentalrecords" />
                                             return <Redirect to="/dashboard"/>
                                          }}/>
                                          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                                          <ProtectedRoute exact path="/dentalrecords" component={DentalRecords}  /> 
                                          <ProtectedRoute exact path="/dentalrecords/:code" component={DentalRecords}  /> 
                                          <ProtectedRoute exact path="/payments" component={Payments} />
                                          <ProtectedRoute exact path="/appointments" component={Appointments}  />
                                          <ProtectedRoute exact path="/sms" component={SMSTextMessaging}  />
                                          <ProtectedRoute exact path="/useraccounts" component={UserAccounts} /> 
                                       </Switch>     
                                    </CSSTransition>
                                    </TransitionGroup>
                                 )} />

                           </Layout>
                        </Layout>
                     </Layout>
                  )}

                  </React.Fragment>
                 
               

               
            </Router>
         </div>
      );
   }

}

export default App;
