import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Icon, notification, Row, Col, Dropdown, Menu, Modal, Typography, Avatar} from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// MY COMPONENTS
import ProtectedRoute from './components/hoc/ProtectedRoute';
import SiderNavigation from './components/SiderNavigation';
import SpinningComponent from './components/SpinningComponent';

// PAGES 
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PatientHomePage from './pages/PatientHomePage';
import PatientAccountSettings from './pages/PatientAccountSettings';
import Dashboard from './pages/Dashboard';
import DentalRecords from './pages/DentalRecords';
import Payments from './pages/Payments';
import Appointments from './pages/Appointments';
import SMSTextMessaging from './pages/SMSTextMessaging';
import UserAccounts from './pages/UserAccounts';

import axios from 'axios';
import Logo from './andres-logo.svg';


const {Text} = Typography;
const {Sider, Header} = Layout;
const {confirm} = Modal;
 


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
            },1000);
           
         }
         return response;
      })
   }


   handleLogout = () => {

      confirm({
         title: 'System Message',
         content: 'Are you sure you want to Logout?!',
         okText: 'Yes',
         okType: 'danger',
         cancelText: 'No',
         onOk: () => {
            axios.post('/api/users/logout')
            .then((response) => {
               if(response.status === 200)
                  this.setState({authenticated: false, user: ''});
            })
            .catch((err) => {
               console.log(err);
            });
         },
         onCancel() {
            
         },
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
   const logoutMenu = (
      <Menu>
      <Menu.Item key="1" onClick={this.handleLogout}>
         <Icon type="logout" /> Logout
      </Menu.Item>
      </Menu>
   );

      return (
         <div className="App">
            <Router>
            
                  <React.Fragment>
                  {!this.state.authenticated ? (

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
                           <Route exact path="/" render={() => <HomePage handleLogin={this.handleLogin} />} />
                           <Route exact path={["/","/login"]} render={(routeProps) => <Login {...routeProps} handleLogin={this.handleLogin}/>} />
                           <Route render={() => <Redirect to="/"/>}/>
                           </Switch>     
                        </CSSTransition>
                        </TransitionGroup>
                     )} />
                    
                 
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
                           style={{minHeight: '100vh', position: 'fixed', zIndex: 100, boxShadow: '3px 0px 15px 2px #8c8c8c'}}
                        >        
                           <div className="logo">
                              <img style={{width: '100%', maxWidth: '100px'}} src={Logo} />
                              <br />
                              {
                                 this.state.user.role === 'patient' ? (
                                    <Text style={{color: '#fff'}}>Andres Dental<br />Clinic Patient Portal</Text>
                                 ) : (
                                    <Text style={{color: '#fff'}}>Andres Dental Clinic Management System</Text>
                                 )
                              }
                             
                           </div>
                           <SiderNavigation role={this.state.user.role} />
                        </Sider>
                        <Layout>
                           <Header style={{boxShadow: '0px -1px 3px rgba(0, 0, 0, 1)', marginLeft: this.state.leftMargin, paddingRight: this.state.leftMargin, paddingLeft: 0, background: '#fff', position: 'fixed', zIndex: 100, width: '100%'}}>
                              <Row>
                                 <Col span={12}>
                                    <Icon
                                       className="trigger"
                                       type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                       onClick={this.toggle}
                                       />
                                 </Col>
                                 <Col style={{paddingRight: 16}} align="right" span={12}>
                                 <Dropdown overlay={logoutMenu} trigger={['click']}>
                                 
                                    <a className="ant-dropdown-link" href="#">
                                    <Avatar style={{ backgroundColor: '#1890ff' }} icon="user" />
                                    <Text style={{color: '#1890ff'}}> {'Logged in as '+ this.state.user.username} </Text>
                                    <Icon type="down" />
                                    </a>
                                 </Dropdown>
                                 </Col>
                              </Row>
                            
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
                                             else if(this.state.user.role === 'dentist')
                                                return <Redirect to="/dashboard"/>
                                             return <Redirect to="/home" />
                                          }} />
                                          <ProtectedRoute exact path="/home" component={PatientHomePage} user={this.state.user} />
                                          <ProtectedRoute exact path="/settings" component={PatientAccountSettings} user={this.state.user} />
                                          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                                          <ProtectedRoute exact path="/dentalrecords" component={DentalRecords}  /> 
                                          <ProtectedRoute exact path="/dentalrecords/:code" component={DentalRecords}  /> 
                                          <ProtectedRoute exact path="/transactionlog" component={Payments} />
                                          <ProtectedRoute exact path="/appointments" component={Appointments}  />
                                          <ProtectedRoute exact path="/sms" component={SMSTextMessaging}  />
                                          <ProtectedRoute exact path="/useraccounts" component={UserAccounts} /> 
                                          <ProtectedRoute exact path="/useraccounts/:id" component={UserAccounts} />
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
