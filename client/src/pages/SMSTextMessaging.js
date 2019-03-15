import React from 'react';
import {Layout} from 'antd';
const {Content} = Layout;

class SMSTextMessaging extends React.Component {

   
   render() {
      return (
         <Content style={{margin: '24px 24px 24px 36px',padding: 24, background: '#fff'}}>
            <h1>SMS Text Messaging</h1>
         </Content>
      );
   }
}


export default SMSTextMessaging;