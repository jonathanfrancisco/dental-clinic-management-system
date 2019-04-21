import React from 'react';
import {Layout} from 'antd';
import SMSTable from '../components/SMSTable';
const {Content} = Layout;

class SMSTextMessaging extends React.Component {

   
   render() {
      return (
         <Content style={{margin: '24px 24px 24px 36px',padding: 24, background: '#fff'}}>
            <SMSTable />
         </Content>
      );
   }
}


export default SMSTextMessaging;