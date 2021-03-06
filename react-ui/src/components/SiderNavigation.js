import React from 'react';
import {Menu, Icon, Modal} from 'antd';
import {Link, withRouter} from 'react-router-dom';
const {confirm} = Modal;


const SiderNavigation = withRouter((props) => {

   // get the basepath of the current url
   // to use as a selected key to correspond with the menu
   const selectedItem = `/${props.location.pathname.split('/')[1]}`; 

   if(props.role === 'patient')
      return (
         <Menu theme="dark" mode="inline" selectedKeys={[selectedItem]}>
            <Menu.Item key="/home">
               <Icon type="home" />
               <span>Home</span>
               <Link to="/home"></Link>
            </Menu.Item>
            <Menu.Item key="/settings">
               <Icon type="user" />
               <span>Account Settings</span>
               <Link to="/settings"></Link>
            </Menu.Item>
         </Menu>
      );

   return (
      <Menu theme="dark" mode="inline" selectedKeys={[selectedItem]}>
         {props.role === 'dentalaide' ? null : (
             <Menu.Item key="/dashboard">
             <Icon type="dashboard" />
             <span>Dashboard</span>
             <Link to="/dashboard"></Link>
          </Menu.Item>
         )}
        
         <Menu.Item key="/dentalrecords">
            <Icon type="idcard" />
            <span>Dental Records</span>
            <Link to="/dentalrecords"></Link>
         </Menu.Item>

         {props.role === 'dentalaide' ? null : (
             <Menu.Item key="/transactionlog">
             <Icon type="dollar" />
             <span>Transaction Log</span>
             <Link to="/transactionlog"></Link>
          </Menu.Item>
         )}

         <Menu.Item key="/appointments">
            <Icon type="calendar" />
            <span>Appointments</span>
            <Link to="/appointments"></Link>
         </Menu.Item>
         <Menu.Item key="/sms">
            <Icon type="message" />
            <span>SMS</span>
            <Link to="/sms"></Link>
         </Menu.Item>
         {props.role === 'dentalaide' ? null : (
            <Menu.Item key="/useraccounts">
               <Icon type="team" />
               <span>User Accounts</span>
               <Link to="/useraccounts"></Link>
            </Menu.Item>
         )}
      </Menu>
   );
});

export default SiderNavigation;