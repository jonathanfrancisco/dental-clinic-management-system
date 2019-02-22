import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import { Layout, Menu, Icon, Table, Row, Col, Dropdown} from 'antd';

// PAGES
import Login from './pages/Login';

const {Content, Sider, Header} = Layout;


function Home() {
   const columns = [{
      title: 'Name',
      dataIndex: 'name',
      // render: text => <a href="javascript:;">{text}</a>,
      }, {
      title: 'Age',
      dataIndex: 'age',
      }, {
      title: 'Address',
      dataIndex: 'address',
      }];
      const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      }, {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
      }];
   
   const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
      }),
   };
   
   return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
   );
}

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
                              console.log(broken, this.state.collapsedWidth);
                           }}
                           collapsedWidth={this.state.collapsedWidth}
                           style={{minHeight: '100vh', position: 'fixed', zIndex: 100}}
                        >
                           <div className="logo" />
                           <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                              <Menu.Item key="1">
                                 <Icon type="dashboard" />
                                 <span>Dashboard</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="idcard" />
                                 <span>Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="calendar" />
                                 <span>Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="message" />
                                 <span>SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="5">
                                 <Icon type="team" />
                                 <span>Accounts</span>
                              </Menu.Item>
                              <Menu.Item key="6">
                                 <Icon type="logout" />
                                 <span>Log out</span>
                              </Menu.Item>
                           </Menu>
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
                                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                                    <Route exact path="/login" render={() => <Redirect to="/"/>} />
                                    <ProtectedRoute exact path="/home" component={() => <React.Fragment><Home /><Home /><Home /></React.Fragment>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact path="/dentalrecords" component={() => <h1>Dental Records</h1>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact  path="/useraccounts" component={() => <h1>User Accounts</h1>} auth={this.state.authenticated} />
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
