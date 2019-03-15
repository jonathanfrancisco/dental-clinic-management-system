import React from 'react';
import UserAccountsTable from '../components/UserAccountsTable';
import {Layout} from 'antd';
const {Content} = Layout;


class UserAccounts extends React.Component {
   render() {
      return (
          <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
            <UserAccountsTable />
         </Content>
      );
   }
   
}

export default UserAccounts;