import React from 'react';
import UserAccountsTable from '../components/UserAccountsTable';
import {Layout} from 'antd';
import UserAccount from '../components/UserAccount';
const {Content} = Layout;


class UserAccounts extends React.Component {
   render() {
      const {id: match} = this.props.match.params;
      if(match)
         return (
            <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
               <UserAccount id={match} />
            </Content>
         );
      return (
          <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
            <UserAccountsTable />
         </Content>
      );
   }
   
}

export default UserAccounts;