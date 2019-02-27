import React from 'react';
import {Menu, Icon, Modal} from 'antd';
import {Link, withRouter} from 'react-router-dom';
const {confirm} = Modal;


const SiderNavigation = withRouter((props) => {

   // get the basepath of the current url
   // to use as a selected key to correspond with the menu
   const selectedItem = `/${props.location.pathname.split('/')[1]}`; 

   return (
      <Menu theme="dark" mode="inline" selectedKeys={[selectedItem]}>
         <Menu.Item key="/dashboard">
            <Icon type="dashboard" />
            <span>Dashboard</span>
            <Link to="/dashboard">Dashboard</Link>
         </Menu.Item>
         <Menu.Item key="/dentalrecords">
            <Icon type="idcard" />
            <span>Dental Records</span>
            <Link to="/dentalrecords">Dental Records</Link>
         </Menu.Item>
         <Menu.Item key="/appointments">
            <Icon type="calendar" />
            <span>Appointments</span>
            <Link to="/appointments">Appointments</Link>
         </Menu.Item>
         <Menu.Item key="/sms">
            <Icon type="message" />
            <span>SMS Text Messaging</span>
            <Link to="/sms">SMS Text Messaging</Link>
         </Menu.Item>
         <Menu.Item key="/useraccounts">
            <Icon type="team" />
            <span>User Accounts</span>
            <Link to="/useraccounts">User Accounts</Link>
         </Menu.Item>
         <Menu.Item key="/logout" onClick={() => {
            confirm({
               title: 'System Message',
               content: 'Are you sure you want to Logout?!',
               okText: 'Yes',
               okType: 'danger',
               cancelText: 'No',
               onOk() {
                  props.handleLogout();
               },
               onCancel() {
                  
               },
            });
         }}>
            <Icon type="logout" />
            <span>Log out</span>
         </Menu.Item>
      </Menu>
   );
});

export default SiderNavigation;