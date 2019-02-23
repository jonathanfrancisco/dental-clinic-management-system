import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Icon} from 'antd';

// MY COMPONENTS
import ProtectedRoute from './components/hoc/ProtectedRoute';
import SiderNavigation from './components/SiderNavigation';

// PAGES
import Login from './pages/Login';

const {Content, Sider, Header} = Layout;


class App extends Component {

   state = {
      authenticated: true,
      collapsedWidth: 80,
      collapsed: false,
      leftMargin: 200, 
   };

   handleLogin = (formValues) => {
      console.log(formValues);
      return {
         errors: ['yow']
      }
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
                           <SiderNavigation />
                        </Sider>
                        <Layout>
                           <Header style={{boxShadow: '0px -1px 3px rgba(0, 0, 0, 1)', marginLeft: this.state.leftMargin, background: '#fff', padding: 0, position: 'fixed', zIndex: 1, width: '100%'}}>
                              <Icon
                                 className="trigger"
                                 type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                 onClick={this.toggle}
                                 />
                           </Header>
                           <Layout style={{marginLeft: this.state.leftMargin, marginTop: 64, minHeight: '100vh'}}>
                              <Content style={{margin: '24px 16px', padding: 24, background: '#fff'}}>
                                 <Switch>
                                    <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
                                    <Route exact path="/login" render={() => <Redirect to="/"/>} />
                                    <ProtectedRoute exact path="/dashboard" component={() => <h1>Dashboard</h1>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact path="/dentalrecords" component={() => <h1>Dental Records</h1>} auth={this.state.authenticated} />  
                                    <ProtectedRoute exact path="/appointments" component={() => <h1>Apppointments</h1>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact path="/sms" component={() => <h1>SMS Text Messaging</h1>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact path="/accounts" component={() => <h1>Accounts</h1>} auth={this.state.authenticated} /> 
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
