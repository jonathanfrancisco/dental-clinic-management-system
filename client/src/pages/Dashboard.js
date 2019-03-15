import React from 'react';
import {Layout} from 'antd';

const {Content} = Layout;


class Dashboard extends React.Component {
 
   render() {
      return (
         <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
           <h1>Dashboard</h1>
         </Content>
      );
   }
}


export default Dashboard;