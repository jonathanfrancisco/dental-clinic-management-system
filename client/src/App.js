import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Icon, notification} from 'antd';

// MY COMPONENTS
import ProtectedRoute from './components/hoc/ProtectedRoute';
import SiderNavigation from './components/SiderNavigation';

// PAGES
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DentalRecords from './pages/DentalRecords';
import Appointments from './pages/Appointments';
import SMSTextMessaging from './pages/SMSTextMessaging';
import Accounts from './pages/Accounts';

import axios from 'axios';

const {Content, Sider, Header} = Layout;


class App extends Component {

   state = {
      authenticated: false,
      collapsedWidth: 80,
      collapsed: false,
      leftMargin: 200, 
   };

   componentDidMount() {
      axios.get('/api/user/checkToken')
      .then((response) => {
         if(response.status === 200)
            this.setState({authenticated: true});
      }).catch((err) => {
         if(err)
            this.setState({authenticated: false});
      });
   }

   handleLogin = (formValues) => {
      return axios.post('/api/user/login', formValues)
      .then((response) => {   
         if(response.data.error === undefined) {
            this.setState({authenticated: true})
            notification['success']({
               message: 'System Message',
               description: 'Logged-in successfully!',
            });
         }
         return response;
      })
   }

   handleLogout = () => {
      axios.post('/api/user/logout')
      .then((response) => {
         if(response.status === 200)
            this.setState({authenticated: false});
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
                           <div className="logo" />
                           <SiderNavigation handleLogout={this.handleLogout}/>
                        </Sider>
                        <Layout>
                           <Header style={{boxShadow: '0px -1px 3px rgba(0, 0, 0, 1)', marginLeft: this.state.leftMargin, background: '#fff', padding: 0, position: 'fixed', zIndex: 1, width: '100%'}}>
                              <Icon
                                 className="trigger"
                                 type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                 onClick={this.toggle}
                                 />
                           </Header>
                           <Layout style={{marginLeft: this.state.leftMargin, marginTop: 64}}>
                              <Content style={{margin: '24px 16px', padding: 24, background: '#fff'}}>
                                 <Switch>
                                    <Route exact path={["/","/login"]}  render={(props) => <Redirect to="/dashboard"/>}/>
                                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                                    <ProtectedRoute exact path="/dentalrecords" component={DentalRecords}  />  
                                    <ProtectedRoute exact path="/appointments" component={Appointments}  />
                                    <ProtectedRoute exact path="/sms" component={SMSTextMessaging}  />
                                    <ProtectedRoute exact path="/accounts" component={Accounts} /> 
                                 </Switch>     
                              </Content>
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
