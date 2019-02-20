import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import { Layout, Menu, Icon, Button} from 'antd';

// PAGES
import Login from './pages/Login';

import { Table } from 'antd';


const {Content, Sider} = Layout;


function Home() {
   const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
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
      leftContentMargin: 200
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
                     <Layout style={{minHeight: '100vh'}}>
                        <Sider
                           breakpoint="md"
                           collapsedWidth="0"
                           onBreakpoint={(broken) => { console.log(broken); }}
                           onCollapse={(collapsed, type) => { 
                                const margin = this.state.leftContentMargin === 200 ? 0 : 200;
                                this.setState({leftContentMargin: margin});
                              }
                           }
                           style={{overflow: 'auto', height: '100vh', position: 'fixed'}}
                        >
                           <Button type="primary" style={{ marginBottom: 16 }}>
                              <Icon type='menu-fold' />
                           </Button>
                           <div className="logo" />
                           {/* <h3 style={{color: '#fff', textAlign: 'center', margin: '4px 16px 4px 0px'}}>Andres Dental Clinic Management System</h3> */}
                           <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                              <Menu.Item key="1">
                                 <Icon type="user" />
                                 <span className="nav-text">Home</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                 <Icon type="upload" />
                                 <span className="nav-text">Appointments</span>
                              </Menu.Item>
                              <Menu.Item key="4">
                                 <Icon type="user" />
                                 <span className="nav-text">SMS Text Messaging</span>
                              </Menu.Item>
                              <Menu.Item key="2">
                                 <Icon type="video-camera" />
                                 <span className="nav-text">Dental Records</span>
                              </Menu.Item>
                           </Menu>
                        </Sider>
                        <Layout style={{marginLeft: this.state.leftContentMargin}}>
                           <Content style={{ margin: '24px 16px 0'}}>
                              <div style={{padding: 24, background: '#fff'}}>
                                 <Switch>
                                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                                    <Route exact path="/login" render={() => <Redirect to="/"/>} />
                                    <ProtectedRoute exact path="/home" component={() => <React.Fragment><Home /><Home /><Home /></React.Fragment>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact path="/dentalrecords" component={() => <h1>Dental Records</h1>} auth={this.state.authenticated} />
                                    <ProtectedRoute exact  path="/useraccounts" component={() => <h1>User Accounts</h1>} auth={this.state.authenticated} />
                                 </Switch>     
                              </div>
                           </Content>
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
